import React, { useState } from 'react';
import MarkdownMessage from "../MarkdownMessage";

const ChatBoxCard = ({ selectedPatient }) => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChatFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const chatData = {
            chatTopic: e.target.chatTopic.value,
            chatMessage: e.target.chatMessage.value,
            patientName: selectedPatient.Record.name
        };

        // Create the full prompt to send to the AI API
        const fullPrompt = `patient-portal = Patient: ${chatData.patientName}\nTopic: ${chatData.chatTopic}\nQuestion: ${chatData.chatMessage}`;

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

        try {
            const response = await fetch('https://us-east4-agama-qrf-poc.cloudfunctions.net/generate-ai-charts-1-anthropic', requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            if (data && typeof data === 'object') {
                const messageContent = data.response || data.completion || data;
                setResponses((prevResponses) => [...prevResponses, { 
                    question: chatData.chatMessage, 
                    answer: { response: messageContent } 
                }]);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error sending message to AI API:', error);
            alert('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        outputArea: {
            maxHeight: '300px',
            overflowY: 'auto',
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#1e1e1e',
            border: '1px solid #333',
            borderRadius: '4px'
        },
        response: {
            marginBottom: '15px'
        },
        responseText: {
            margin: '5px 0'
        },
        loadingOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: '1.5em',
            zIndex: 1000
        },
        cardPosition: {
            position: 'relative'
        }
    };

    return (
        <div className="card chat-box" style={styles.cardPosition}>
            <h3>Chat with Agama AI - Your Health Education</h3>
            <form id="chatForm" onSubmit={handleChatFormSubmit}>
                <div className="form-group">
                    <label htmlFor="chatTopic">Select a Topic</label>
                    <select id="chatTopic" name="chatTopic" required>
                        <option value="general">General Inquiry</option>
                        <option value="preconsult">Pre-Consult Information</option>
                        {/* <option value="treatment">Treatment Plans</option> */}
                        {/* <option value="alerts">Health Alerts</option> */}
                    </select>
                </div>
                <textarea id="chatMessage" name="chatMessage" rows="4" placeholder="Type your message here" required></textarea>
                <button type="submit" className="btn">Send Message</button>
            </form>
            {loading && (
                <div style={styles.loadingOverlay}>
                    Waiting on AI to Answer...
                </div>
            )}
            <div style={styles.outputArea}>
                {responses.map((response, index) => (
                    <div key={index} style={styles.response}>
                        <p style={styles.responseText}><strong>Question:</strong> {response.question}</p>
                        <p style={styles.responseText}><strong>Answer:</strong> <MarkdownMessage text={response.answer.response} /></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatBoxCard;
