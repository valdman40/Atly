import React, { useState } from "react";
import CommentsList from "../components/comments/CommentsList";
import EditComment from "../components/comments/EditComment";
import styled from 'styled-components';
import { Language, setLanguage } from "../i18n/lang";
import { Comment } from "../types/comment";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const LanguageToggle = styled.select`
  margin-top: 1rem;
  padding: 0.5rem;
  font-size: 0.8rem;
  align-self: flex-end;
`;

const Main: React.FC = () => {
    const [language, setLang] = useState<Language>('en');
    const [addedComment, setAddedComment] = useState<Comment>();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = e.target.value as Language;
        setLang(selectedLanguage);
        setLanguage(selectedLanguage as Language); // Update the language globally
    };

    return (<Container>
        <LanguageToggle value={language} onChange={handleLanguageChange}>
            <option value="en">en</option>
            <option value="he">עבר</option>
        </LanguageToggle>
        <EditComment onAddComment={setAddedComment} />
        <CommentsList newComment={addedComment} />
    </Container>);
};

export default Main;