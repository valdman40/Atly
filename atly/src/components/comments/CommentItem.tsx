import React from 'react';
import styled from 'styled-components';
import Comment from '../../types/comment';

const StyledCommentItem = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 10px;
  background-color: #f0f4f8;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Arial', sans-serif;
  line-height: 1.5;

  strong {
    color: #333;
    font-weight: 600;
  }

  &:hover {
    background-color: #e2e8f0;;
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

// CommentItem component to display individual comment details
const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <StyledCommentItem>
      <strong>{comment.email}:</strong> {comment.body}
    </StyledCommentItem>
  );
};

export default CommentItem;
