// components/MarkdownMessage.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownMessage = ({ text }) => {
    return (
        <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
    );
};

export default MarkdownMessage;
