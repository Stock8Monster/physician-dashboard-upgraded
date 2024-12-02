import React from 'react';
import { Box } from 'grommet';
import Message from './Message';

const MessageList = ({ chatHistory }) => {
    return (
        <Box flex overflow="auto" pad="medium" style={{ marginBottom: 'auto', background: '#f0f0f0' }}>
            {chatHistory.map((message, index) => (
                <Message key={index} message={message} />
            ))}
        </Box>
    );
};

export default MessageList;
