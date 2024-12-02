// Message.js
import React from 'react';
import { Box } from 'grommet';
import MarkdownMessage from './MarkdownMessage'; // Import the MarkdownMessage component

const Message = ({ message }) => (
    <Box
        pad="small"
        style={{
            alignSelf: message.type === 'user' ? 'end' : 'start',
            maxWidth: '80%',
            color: message.type === 'ai' ? 'white' : '#00b2cc',
            overflow: 'hidden',  // Ensure the content doesn't overflow
            display: 'flex',
            flexDirection: 'column',
            whiteSpace: 'pre-wrap',  // Ensure text wraps correctly
        }}
    >
        <p style={{ margin: 0, fontWeight: 'bold' }}>
            {message.type === 'ai' ? message.label : ''}
        </p>
        <div style={{ fontWeight: 'normal' }}>
            {message.type === 'ai' ? <MarkdownMessage text={message.text} /> : message.text}
        </div>
    </Box>
);

export default Message;
