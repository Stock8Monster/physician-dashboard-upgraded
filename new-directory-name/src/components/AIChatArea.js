import React, { useEffect, useState, useRef } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import '../styles/styles.css'; // Import the CSS file
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {jerry_ehr_dashboard_html, jerry_ehr_dashboard_vitals_html, vicki_ehr_dashboard_html} from "../data/staticData";

const AIChatArea = ({ charts, setCharts, setChartScript, setLoading, selectedChartIndex, setIsChartModalOpen, setSelectedChartIndex, loading, activePatient, chatHistory, setChatHistory }) => {
    const [inputText, setInputText] = useState('');
    const [textAreaHeight, setTextAreaHeight] = useState('50px');
    const [isTranscribed, setIsTranscribed] = useState(false); // State to track if text is transcribed
    const textareaRef = useRef(null);
    const { transcript, listening, resetTranscript } = useSpeechRecognition();
    const messageListRef = useRef(null); // Ref for the message list container

    useEffect(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            console.warn("Browser doesn't support speech recognition.");
        }
    }, []);

    useEffect(() => {
        if (transcript) {
            if (transcript.toLowerCase().includes('stop listening')) {
                SpeechRecognition.stopListening();
                setInputText(''); // Clear the text area
            } else if (transcript.toLowerCase().includes('send')) {
                sendMessage(inputText);
            } else if (transcript.toLowerCase().includes('erase')) {
                setInputText(''); // Erase the text area
            } else {
                setInputText(transcript);
                setIsTranscribed(true); // Mark the text as transcribed
            }
        }
    }, [transcript]);

    useEffect(() => {
        const lines = inputText.split('\n').length;  // Count the number of line breaks
        const newHeight = Math.min(20 * lines, 300); // Calculate new height, 20px per line, max 300px
        setTextAreaHeight(`${newHeight}px`);
    }, [inputText]);

    const sendMessage = async (prompt) => {
        if (!prompt.trim()) return;  // Check for empty input
        setLoading(true); // Set loading state
        const currentTime = new Date().toLocaleTimeString();

        try {
            let fullPrompt = `Patient = ${activePatient}: \n${prompt}`; // Include active patient in the prompt

            setChatHistory(currentHistory => [
                ...currentHistory,
                { type: 'user', text: prompt, label: 'USER', timestamp: currentTime }
            ]);

            // Make API call
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    prompt: fullPrompt,
                    max_tokens: 1000,
                    temperature: 0.7
                })
            };

            const response = await fetch('https://us-east4-agama-qrf-poc.cloudfunctions.net/generate-ai-charts-1-anthropic', requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data && typeof data === 'object') {
                const messageContent = data.response || data.completion || data;
                const promptType = messageContent.includes('<html') ? 'chart' : 'question';

                if (promptType === 'chart') {
                    let cleanedScript = messageContent.replace(/\n/g, '').replace(/javascript/g, '');
                    const newChartTitle = `Chart ${charts.length + 1}`;  // Generate a dynamic title

                    // Add the new chart to the charts array
                    setCharts(prevCharts => [
                        ...prevCharts,
                        { script: cleanedScript, title: newChartTitle }
                    ]);

                    setSelectedChartIndex(charts.length);  // Set the index of the new chart
                    setIsChartModalOpen(true);  // Open the modal to display the new chart

                    setChatHistory(currentHistory => [
                        ...currentHistory,
                        { type: 'ai', text: 'Chart loaded successfully.', label: 'AI', timestamp: new Date().toISOString() }
                    ]);
                } else {
                    setChatHistory(currentHistory => [
                        ...currentHistory,
                        { type: 'ai', text: messageContent, label: 'AI', timestamp: new Date().toISOString() }
                    ]);
                }
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setChatHistory(currentHistory => [
                ...currentHistory,
                { type: 'ai', text: 'Failed to fetch data', label: 'AI', timestamp: new Date().toISOString() }
            ]);
        } finally {
            setLoading(false); // Clear loading state
        }

        setInputText('');
        setIsTranscribed(false); // Reset the transcribed state
        resetTranscript(); // Reset transcript after sending the message
    };


    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [chatHistory]); // This effect runs whenever the chatHistory changes

    const handleVoiceCommand = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            setInputText(''); // Clear the text area when listening stops
        } else {
            resetTranscript();
            setInputText(''); // Clear the text area when listening starts
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    const inputStyle = isTranscribed ? { color: 'green', fontStyle: 'italic' } : { color: 'white' };

    return (
        <div style={{ height: '94vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1px 16px 60px 16px' }} ref={messageListRef}>
                <MessageList chatHistory={chatHistory} />
            </div>
            <div
                style={{
                    borderTop: '1px solid #ccc',
                    width: '100%',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    position: 'sticky',
                    bottom: 0,
                    background: '#000', // Changed to fit with the theme
                }}
            >
                <ChatInput
                    inputText={inputText}
                    setInputText={setInputText}
                    loading={loading}
                    handleVoiceCommand={handleVoiceCommand}
                    listening={listening}
                    sendMessage={sendMessage}
                    inputStyle={inputStyle}
                />
            </div>
        </div>
    );
};

export default AIChatArea;
