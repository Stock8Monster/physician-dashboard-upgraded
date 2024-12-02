import React, { useState, useEffect } from 'react';
import { Box, Heading } from 'grommet';
import { SplitButtonSection, SplitButtonContainer, LeftPanel as StyledLeftPanel, StyledColorButton } from './StyledComponents';
import PatientDetails from './popup-content/PatientDetails';
import Chat from './ChatContainer';
import Popup from '../Popup';
import Overview from './popup-content/Overview';
import Orders from './popup-content/Orders';
import Refills from './popup-content/Refills';
import Consult from './popup-content/Consult';
import Ambient from './popup-content/Ambient';
import Notes from './popup-content/Notes';
import Summary from './popup-content/Summary';
import AIInsights from './popup-content/AIInsights';
import Imaging from './popup-content/Imaging';
import Labs from './popup-content/Labs';
import Vitals from './popup-content/Vitals';
import Commands from './popup-content/Commands';
import patientService from '../../services/patientService';

const LeftPanel = ({
                       selectedPatient,
                       setSelectedPatient,
                       handleToggleButtonClick,
                       dashboardCharts,
                       onDemandCharts,
                       chatHistory,
                       inputText,
                       setInputText,
                       sendMessage,
                       handleVoiceCommand,
                       listening,
                       loading,
                       setLoading,
                       popups,
                       addPopup,
                       removePopup,
                       closePopup,
                       setClosePopup,
                       popUpRequested,
                       popupContentType,
                       setPopUpRequested,
                   }) => {
    const [patients, setPatients] = useState([]);
    const [showButtons, setShowButtons] = useState(false);
    const [boxSize, setBoxSize] = useState({ width: '100%', height: '81vh' });

    // Function to toggle button visibility
    const handleToggle = () => {
        setShowButtons((prevState) => !prevState);
    };

    // Function to fetch patients
    const fetchPatients = async () => {
        setLoading(true);
        try {
            const patientData = await patientService.listPatientsWithCharts();
            const mappedPatients = patientData.map((patient) => ({
                key: patient.Key,
                name: patient.Record.name,
                charts: patient.Record.charts || [],
                ...patient.Record,
            }));
            setPatients(mappedPatients);
            if (mappedPatients.length > 0) {
                setSelectedPatient(mappedPatients[0]);
            }
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        } finally {
            setLoading(false);
        }
    };

    // Initial patient fetch
    useEffect(() => {
        fetchPatients();
    }, []);

    // Function to handle button clicks and load content into popup
    const handleButtonClick = (contentType) => {
        const popupExists = popups.some(popup => popup.contentType === contentType);
        if (popupExists) return; // If it exists, do not add another one
        const popupMapping = {
            // First Row
            Vickie: <PatientDetails patient={selectedPatient} />,
            Overview: <Overview />,
            Orders: <Orders />,
            Refills: <Refills />,
            // Second Row
            Consult: <Consult />,
            Ambient: <Ambient />,
            Notes: <Notes />,
            Summary: <Summary />,
            // Third Row
            'AI Insights': <AIInsights />,
            Imaging: <Imaging />,
            Labs: <Labs />,
            Vitals: <Vitals />,
            // Chart Row
            Commands: <Commands />,
        };

        // If valid contentType is provided, add the popup
        if (popupMapping[contentType]) {
            addPopup(contentType, popupMapping[contentType]); // Adds popup using the deduplication logic in App.js
        }
    };

    // Handle automatic popup state changes based on external triggers (like voice commands)
    useEffect(() => {
        if (popUpRequested && popupContentType) {
            handleButtonClick(popupContentType);
            setPopUpRequested(false); // Reset the flag after handling
        }
    }, [popUpRequested, popupContentType, setPopUpRequested]);

    return (
        <StyledLeftPanel style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Section for rendering buttons */}
            <Box flex={false}>
                <SplitButtonContainer>
                    <SplitButtonSection onClick={() => handleButtonClick('Vickie')}>Patient Info</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Overview')}>Overview</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Orders')}>Orders</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Refills')}>Refills</SplitButtonSection>
                </SplitButtonContainer>
                <SplitButtonContainer>
                    <SplitButtonSection onClick={() => handleButtonClick('Consult')}>Consult</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Ambient')}>Ambient</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Notes')}>Notes</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Summary')}>Summary</SplitButtonSection>
                </SplitButtonContainer>
                <SplitButtonContainer>
                    <SplitButtonSection onClick={() => handleButtonClick('AI Insights')}>AI Insights</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Imaging')}>Imaging</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Labs')}>Labs</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Vitals')}>Vitals</SplitButtonSection>
                </SplitButtonContainer>
                <SplitButtonContainer>
                    <SplitButtonSection onClick={() => handleToggleButtonClick('dashboard')}>Dashboard Charts</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleToggleButtonClick('onDemand')}>Live View Charts</SplitButtonSection>
                    <SplitButtonSection onClick={() => handleToggle()} style={{ backgroundColor: showButtons ? '#555' : '#333' }}>
                        Multi View
                    </SplitButtonSection>
                    <SplitButtonSection onClick={() => handleButtonClick('Commands')}>Commands</SplitButtonSection>
                </SplitButtonContainer>
            </Box>

            {/* Chat Container */}
            <Box
                flex="grow"
                pad="xsmall"
                round="small"
                style={{
                    width: boxSize.width,
                    height: boxSize.height,
                    resize: 'vertical',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#333',
                    borderRadius: '5px',
                }}
            >
                <Box direction="row" justify="between" align="" gap="small" pad="none" margin="none" style={{ minHeight: '35px', width: '100%' }}>
                    <Heading level={3} margin={{ right: 'small', vertical: 'none' }} style={{ width: '175px' }} color="white">
                        Agama AI
                    </Heading>
                    {/* Render additional buttons */}
                    {showButtons && (
                        <SplitButtonContainer direction="row" align="right" gap="small" pad="none">
                            <StyledColorButton style={{ fontSize: '14px', padding: '4px 10px', height: '28px', lineHeight: '1' }} label="Charts X Labs" />
                            <StyledColorButton style={{ fontSize: '14px', padding: '4px 10px', height: '28px', lineHeight: '1' }} label="Consults, Labs, Imaging" />
                            <StyledColorButton style={{ fontSize: '14px', padding: '4px 10px', height: '28px', lineHeight: '1' }} label="Full Charts" />
                            <StyledColorButton style={{ fontSize: '14px', padding: '4px 10px', height: '28px', lineHeight: '1' }} label="Full AI Chat" />
                        </SplitButtonContainer>
                    )}
                </Box>

                <Chat
                    chatHistory={chatHistory}
                    inputText={inputText}
                    setInputText={setInputText}
                    sendMessage={sendMessage}
                    handleVoiceCommand={handleVoiceCommand}
                    listening={listening}
                    loading={loading}
                    style={{ flexGrow: 1 }}
                />
            </Box>

                {popups.map((popup, index) => {
                    console.log(`Rendering Popup ${index}:`, popup);

                    const popupContent = popup.content;
                    console.log(`Popup content type:`, typeof popupContent);
                    console.log(`Popup content value:`, popupContent);

                    return (
                        <Popup
                            key={popup.id}
                            isVisible={popup.isVisible}
                            onClose={() => {
                                console.log("Removing Popup:", popup.id);
                                removePopup(popup.id);
                            }}
                            content={
                                popupContent ? (
                                    popupContent
                                ) : (
                                    <div style={{ color: 'red' }}>
                                        No valid content available for popup with id: {popup.id}
                                    </div>
                                )
                            }
                            title={popup?.title || popup.contentType.toString()}
                        />
                    );
                })}
        </StyledLeftPanel>
    );
};

export default LeftPanel;
