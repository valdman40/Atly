import React, { useState } from 'react';
import { Comment, NewComment } from '../../types/comment'; // Assuming you have a type definition for Comment
import styled from 'styled-components';
import LoadingIndicator from '../common/LoadingIndicator';
import { getText } from '../../i18n/lang';

const SubmitButtonInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const FormWrapper = styled.div`
  margin-bottom: 20px;
  padding: 16px;
  background-color: #f0f4f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #2980b9;
  }
`;

interface EditCommentProps {
    onAddComment: (comment: Comment) => void;
    comment?: NewComment;
}

/**
 * Component to edit or add a comment.
 * @param onAddComment - Callback function to handle the addition of a new comment.
 * @param comment - Optional comment object to pre-fill the form for editing.
 * @returns 
 */
const EditComment: React.FC<EditCommentProps> = ({ onAddComment, comment: givenComment }) => {
    const [comment, setComment] = useState<NewComment>(givenComment || { name: "", email: "", body: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Set up the AbortController to enforce a 4-second timeout.
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort("Submition timed out and was aborted")
        , 4000);

        const newComment: NewComment | undefined = { ...comment };

        try {
            setLoading(true);
            const response = await fetch('https://test.atly.com/test/testAssignComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment),
                signal: controller.signal,
            });
            if (response.ok) {
                const createdComment: Comment = await response.json() as Comment;
                onAddComment(createdComment);
            }
        } catch (error) {
            // Fail silently – log the error if you need it for debugging.
            console.error('Failed to send comment:', error);
        } finally {
            setLoading(false);
            clearTimeout(timeoutId);
            setComment({ ...comment, name: "", email: "", body: "" });
        }

    };

    return (
        <FormWrapper>
            <form onSubmit={handleSubmit} >
                <Input
                    type="text"
                    placeholder={getText("YOUR_NAME")}
                    value={comment.name}
                    onChange={(e) => setComment((comment) => ({ ...comment, name: e.target.value }))}
                    required
                />
                <Input
                    type="email"
                    placeholder={getText("YOUR_EMAIL")}
                    value={comment.email}
                    onChange={(e) => setComment((comment) => ({ ...comment, email: e.target.value }))}
                    required
                />
                <Textarea
                    placeholder={getText("YOUR_COMMENT")}
                    value={comment.body}
                    onChange={(e) => setComment((comment) => ({ ...comment, body: e.target.value }))}
                    required
                    rows={4}
                />
                <Button type="submit" disabled={loading}>
                    <SubmitButtonInnerWrapper>
                        {loading && <LoadingIndicator size={'small'} />}
                        {loading ? getText("SENDING") : getText("SEND")}
                    </SubmitButtonInnerWrapper>
                </Button>
            </form>
        </FormWrapper>
    );
};

export default EditComment;
