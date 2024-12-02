import React, { useRef, useEffect } from 'react';
import {Box, Button, Heading} from 'grommet';
import { Microphone, Send } from 'grommet-icons';
import {StyledChatContainer, StyledTextArea, StyledTextInput} from './StyledComponents';
import Message from '../Message';
import ProcessingOverlay from './ProcessingOverlay';

const Chat = ({ chatHistory, inputText, setInputText, sendMessage, handleVoiceCommand, listening, loading }) => {
    const messageListRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // Preload the welcome message in the chat history
    const initialMessage = {
        type: 'ai',
        text: 'Welcome to Agama AI, how may I assist you today?',
        label: '',
        timestamp: new Date().toLocaleTimeString(),
    };

    //VOICE COMMANDS
    const voiceCommands = {
        type: 'ai',
        text: 'Click "Commands" tab above to view the Voice input guide',
        label: '',
        timestamp: new Date().toLocaleTimeString(),
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
        inputRef.current.style.height = 'auto'; // Reset height to auto to measure new height
        if (`${inputRef.current.scrollHeight}` < 128) {
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set the height based on scrollHeight
        } else {
            inputRef.current.style.height = '128px';
        }
    };

    const preloadedChatHistory = [initialMessage, voiceCommands, ...chatHistory];

    return (
        <StyledChatContainer style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {loading && <ProcessingOverlay />}

            {/* Container to hold chat messages */}
            <Box
                flex
                overflow="auto"  // Enable scrolling if content overflows
                pad="small"
                style={{
                    flexGrow: 1,
                    overflowY: 'auto', // Make sure to apply vertical scrolling
                    scrollbarWidth: 'thin' // Optional: For Firefox, to set a thinner scrollbar
                }}
            >
                <Box ref={messageListRef} style={{ minHeight: 'fit-content', maxHeight: '100%' }}>
                    {preloadedChatHistory.map((msg, index) => (
                        <Message key={index} message={msg} />
                    ))}
                </Box>
            </Box>

            {/* Input Box and Send Button */}
            <Box direction="row" pad="small" border={{ side: 'top', color: '#444' }} style={{ flexShrink: 0 }}>
                <Button
                    icon={<Microphone color={listening ? 'green' : 'red'} />}
                    onClick={handleVoiceCommand}
                />
                <StyledTextArea
                    ref={inputRef}
                    placeholder="Talk or Text..."
                    value={inputText}
                    onChange={handleInputChange}  // Use the function to handle resizing
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                            sendMessage(inputText);
                            event.preventDefault(); // Prevents creating a new line on Enter
                        }
                    }}
                    style={{ flexGrow: 1 }} // Allow the text area to take available space
                />
                <Button icon={<Send />} onClick={() => sendMessage(inputText)} />
            </Box>
        </StyledChatContainer>
    );
};

export default Chat;
