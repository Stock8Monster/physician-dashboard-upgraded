import React from 'react';
import { Box, IconButton, TextField, CircularProgress } from '@material-ui/core';
import { Mic, Send } from '@material-ui/icons';

const ChatInput = ({ inputText, setInputText, handleFocus, handleBlur, loading, handleVoiceCommand, listening, sendMessage, inputStyle }) => {
    return (
        <Box style={{ width: '100%', display: 'flex', marginTop: '8px' }}>
            <TextField
                placeholder="Type your message here..."
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                multiline
                rowsMax={10}
                variant="outlined"
                fullWidth
                disabled={loading} // Disable TextField when loading
                InputProps={{
                    style: inputStyle
                }}
            />
            <IconButton color="primary" onClick={handleVoiceCommand} disabled={loading}>
                <Mic color={listening ? 'secondary' : 'primary'} />
            </IconButton>
            <IconButton color="primary" onClick={() => sendMessage(inputText)} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : <Send />}
            </IconButton>
        </Box>
    );
};

export default ChatInput;


