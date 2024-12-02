import React, { useState, useEffect } from 'react';
import { Grommet, Box } from 'grommet';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import patientService from '../services/patientService';
import { Container } from '../components/dashboard/StyledComponents';
import LeftPanel from '../components/dashboard/LeftPanel';
import MainPanel from '../components/dashboard/MainPanel';
import VoiceCommandHelp from "../components/dashboard/VoiceCommandHelp";
import PatientDetails from '../components/dashboard/popup-content/PatientDetails';
import Notes from '../components/dashboard/popup-content/Notes';
import Overview from '../components/dashboard/popup-content/Overview';
import Orders from "../components/dashboard/popup-content/Orders";
import Refills from "../components/dashboard/popup-content/Refills";
import Consult from "../components/dashboard/popup-content/Consult";
import Ambient from "../components/dashboard/popup-content/Ambient";
import Summary from "../components/dashboard/popup-content/Summary";
import AIInsights from "../components/dashboard/popup-content/AIInsights";
import Imaging from "../components/dashboard/popup-content/Imaging";
import Labs from "../components/dashboard/popup-content/Labs";
import Vitals from "../components/dashboard/popup-content/Vitals";
import Commands from "../components/dashboard/popup-content/Commands";
import { useResponsive } from '../contexts/ResponsiveContext';

const Dashboard = ({ popups, removePopup, addPopup }) => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [inputText, setInputText] = useState('');
    const [charts, setCharts] = useState([]);
    const [dashboardCharts, setDashboardCharts] = useState(true);
    const [onDemandCharts, setOnDemandCharts] = useState(false);
    const { transcript, finalTranscript, listening, resetTranscript } = useSpeechRecognition();
    const [activeContent, setActiveContent] = useState(null);
    const [showVoiceHelp, setShowVoiceHelp] = useState(false);
    const [popupMapping, setPopupMapping] = useState({});
    const [isTriggered, setIsTriggered] = useState(false);


    // State for tracking LeftPanel width
    const [leftPanelWidth, setLeftPanelWidth] = useState(window.innerWidth > 768 ? 800 : '100%');
    const [isResizing, setIsResizing] = useState(false); // Track if resizing

    const { isMobile } = useResponsive();

    // Handle resizing when the user clicks on the resizer bar
    const handlePointerDown = (e) => {
        setIsResizing(true);
        e.preventDefault(); // Prevent default behavior
        e.target.setPointerCapture(e.pointerId); // Capture pointer on the resizer
    };

    const handlePointerMove = (e) => {
        if (!isResizing) return;
        const newWidth = e.clientX;
        if (newWidth > 200 && newWidth < window.innerWidth - 200) { // Limit min/max width
            setLeftPanelWidth(newWidth);
        }
    };

    const handlePointerUp = (e) => {
        setIsResizing(false);
        e.target.releasePointerCapture(e.pointerId); // Release the pointer capture
    };

    useEffect(() => {
        // Attach event listeners to handle resizing while the pointer moves
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
        return () => {
            // Cleanup event listeners when the component unmounts
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
        };
    }, [isResizing]);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const patientData = await patientService.listPatientsWithCharts();
            const mappedPatients = patientData.map(patient => ({
                key: patient.Key,
                name: patient.Record.name,
                birthDate: patient.Record.birthDate,
                gender: patient.Record.gender,
                address: patient.Record.address,
                email: patient.Record.communication.email,
                phone: patient.Record.communication.home,
                charts: patient.Record.charts || [],
                ...patient.Record
            }));
            setPatients(mappedPatients);
        } catch (error) {
            console.error('Failed to fetch patients:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    // useEffect to update popupMapping whenever isTriggered or selectedPatient changes
    useEffect(() => {
        console.log("triggered = ", isTriggered);
            setPopupMapping({
                'Patient Info': <PatientDetails patient={selectedPatient} />,
                Overview: <Overview />,
                Orders: <Orders />,
                Refills: <Refills />,
                Consult: <Consult />,
                Notes: <Notes />,
                Summary: <Summary />,
                'AI Insights': <AIInsights />,
                Imaging: <Imaging />,
                Labs: <Labs />,
                Vitals: <Vitals />,
                Commands: <Commands />,
            });
    }, [selectedPatient]);

    // Use another useEffect to handle the popup addition once popupMapping is updated
    useEffect(() => {
        console.log("triggered ambient dfirect = ", isTriggered);
        if (isTriggered) {
            addPopup('Ambient', <Ambient isTriggered={isTriggered} />); // Use the updated popupMapping
        } else {
            removePopupByContentType('Ambient');
        }
    }, [isTriggered]); // Run this effect when popupMapping or isTriggered changes


    useEffect(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            console.warn("Browser doesn't support speech recognition.");
        }
    }, []);

    const sendMessage = async (prompt) => {
        prompt = sanitizePrompt(prompt);
        if (!prompt.trim()) return;  // Check for empty input
        setLoading(true); // Set loading state
        const currentTime = new Date().toLocaleTimeString();

        try {
            let fullPrompt = `${selectedPatient?.name}: \n${prompt}`;

            setChatHistory(currentHistory => [
                ...currentHistory,
                { type: 'user', text: prompt, label: 'USER', timestamp: currentTime }
            ]);

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
                    let htmlContent = messageContent.match(/<html\b[^>]*>[\s\S]*<\/html>/i);
                    let cleanedScript = htmlContent ? htmlContent[0] : '';
                    let newChartTitle = 'New Chart';

                    let chartData = {
                        patientId: selectedPatient.key,
                        chartId: undefined,
                        chartTitle: newChartTitle,
                        chartDescription: 'dynamic',
                        chartHTML: cleanedScript,
                        Record: {
                            chartId: undefined,
                            chartTitle: newChartTitle,
                            chartDescription: 'dynamic',
                            chartHTML: cleanedScript,
                        }
                    };

                    const updatedPatient = {
                        ...selectedPatient,
                        charts: [...selectedPatient.charts, chartData]
                    };

                    setSelectedPatient(updatedPatient);
                    setCharts(updatedPatient.charts);

                    setChatHistory(currentHistory => [
                        ...currentHistory,
                        { type: 'ai', text: `${newChartTitle} created.`, label: 'Agama AI', timestamp: new Date().toLocaleTimeString() }
                    ]);
                } else {
                    setChatHistory(currentHistory => [
                        ...currentHistory,
                        { type: 'ai', text: messageContent, label: 'Agama AI', timestamp: new Date().toLocaleTimeString() }
                    ]);
                }
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setChatHistory(currentHistory => [
                ...currentHistory,
                { type: 'ai', text: 'Failed to fetch data', label: 'Agama AI', timestamp: new Date().toISOString() }
            ]);
        } finally {
            setLoading(false);
        }

        setInputText('');
        resetTranscript();
    };

    // Function to handle voice command interactions
    const handleVoiceCommand = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            setInputText('');
        } else {
            resetTranscript();
            setInputText('');
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    const handleIframeLoad = (event) => {
        const iframe = event.target;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDocument) {
            const body = iframeDocument.body;
            const html = iframeDocument.documentElement;
            const height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            iframe.style.height = '100%';
        }
    };

    // Function to remove a popup by content type
    const removePopupByContentType = (contentType) => {
        const popupToRemove = popups.find((popup) => popup.contentType === contentType);
        if (popupToRemove) {
            removePopup(popupToRemove.id);
        }
    };

// Voice command actions mapped to add or remove popups and other commands
    const commandActions = {
        // Open commands with both contentType and content
        'openpatientinfo': () => addPopup('Patient Info', popupMapping['Patient Info']),
        'openoverview': () => addPopup('Overview', popupMapping['Overview']),
        'openorders': () => addPopup('Orders', popupMapping['Orders']),
        'openrefills': () => addPopup('Refills', popupMapping['Refills']),
        'openconsult': () => addPopup('Consult', popupMapping['Consult']),
        'openambient': () => {
            setIsTriggered(true);
            //addPopup('Ambient', popupMapping['Ambient']);
        },
        'opennotes': () => addPopup('Notes', popupMapping['Notes']),
        'opensummary': () => addPopup('Summary', popupMapping['Summary']),
        'openaiinsights': () => addPopup('AI Insights', popupMapping['AI Insights']),
        'openimaging': () => addPopup('Imaging', popupMapping['Imaging']),
        'openlabs': () => addPopup('Labs', popupMapping['Labs']),
        'openvitals': () => addPopup('Vitals', popupMapping['Vitals']),
        'opencommands': () => addPopup('Commands', popupMapping['Commands']),

        // Close commands remain the same, just remove by contentType
        'hidepatientinfo': () => removePopupByContentType('Patient Info'),
        'hideoverview': () => removePopupByContentType('Overview'),
        'hideorders': () => removePopupByContentType('Orders'),
        'hiderefills': () => removePopupByContentType('Refills'),
        'hideconsult': () => removePopupByContentType('Consult'),
        'hideambient': () => {
            setIsTriggered(false);
            //removePopupByContentType('Ambient');
        },
        'hidenotes': () => removePopupByContentType('Notes'),
        'hidesummary': () => removePopupByContentType('Summary'),
        'hideaiinsights': () => removePopupByContentType('AI Insights'),
        'hideimaging': () => removePopupByContentType('Imaging'),
        'hidelabs': () => removePopupByContentType('Labs'),
        'hidevitals': () => removePopupByContentType('Vitals'),
        'hidecommands': () => removePopupByContentType('Commands'),
        // New command to close all popups
        'closealltabs': () => removeAllPopups(),
        // New command to close all popups
        'hidealltabs': () => removeAllPopups(),

        // Control commands
        'stoplistening': () => {
            SpeechRecognition.stopListening();
            setInputText('');
            setShowVoiceHelp(false);
            resetTranscript();
        },
        'send': () => sendMessage(inputText),
        'erase': () => {
            setInputText('');
            resetTranscript();
        },
        'showvoicecommands': () => setShowVoiceHelp(true),
        'hidevoicecommands': () => setShowVoiceHelp(false),

        // Toggle commands
        'hidedashboardcharts': () => setDashboardCharts(false),
        'showdashboardcharts': () => setDashboardCharts(true),
        'hideliveviewcharts': () => setOnDemandCharts(false),
        'showliveviewcharts': () => setOnDemandCharts(true),
    };

    const removeAllPopups = () => {
        // Loop through all popups and remove each by its ID
        popups.forEach((popup) => {
            removePopup(popup.id);
        });
    };

    // Function to sanitize the prompt and remove any known commands
    const sanitizePrompt = (prompt) => {
        const commandsToRemove = [
            'hide voice commands',
            'show voice commands',
            'open patient info',
            'open overview',
            'open orders',
            'open refills',
            'open consult',
            'open ambient',
            'open notes',
            'open summary',
            'open ai insights',
            'open imaging',
            'open labs',
            'open vitals',
            'open commands',
            'hide patient info',
            'hide overview',
            'hide orders',
            'hide refills',
            'hide consult',
            'hide ambient',
            'hide notes',
            'hide summary',
            'hide ai insights',
            'hide imaging',
            'hide labs',
            'hide vitals',
            'hide commands',
            'stop listening',
            'send',
            'erase',
            'open vitals tab',
            'close ai insights',
            'open consult notes',
            'show ai recommendations',
            'close floating panel',
            'hide dashboard charts',
            'hide live view charts',
            'show dashboard charts',
            'show live view charts',
        ];

        // Remove each command from the prompt
        let sanitizedPrompt = prompt;
        commandsToRemove.forEach((command) => {
            const regex = new RegExp(`\\b${command}\\b`, 'gi'); // Use word boundaries to prevent partial matches
            sanitizedPrompt = sanitizedPrompt.replace(regex, '').trim();
        });

        return sanitizedPrompt;
    };


    useEffect(() => {
        if (finalTranscript) {
            const normalizedTranscript = finalTranscript.toLowerCase().replace(/\s+/g, '');
            Object.keys(commandActions).forEach((command) => {
                if (normalizedTranscript.includes(command)) {
                    commandActions[command](); // Execute the detected command
                }
            });
            setInputText((prevInputText) => prevInputText + ' ' + finalTranscript);
            resetTranscript();
        }
    }, [finalTranscript]);

    const handleButtonClick = (content) => {
        setActiveContent(activeContent === content ? null : content);
    };

    const handleToggleButtonClick = (buttonType) => {
        if (buttonType === 'dashboard') {
            setDashboardCharts(!dashboardCharts);
        } else if (buttonType === 'onDemand') {
            setOnDemandCharts(!onDemandCharts);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setLeftPanelWidth('100%');
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Grommet>
            <Container direction="row">
                {/* Left Panel with dynamic width */}
                <Box direction="column" width={`${leftPanelWidth}px`} height="100vh">
                    {showVoiceHelp && <VoiceCommandHelp onClose={() => setShowVoiceHelp(false)} />}
                    <LeftPanel
                        activeContent={activeContent}
                        setActiveContent={setActiveContent}
                        selectedPatient={selectedPatient}
                        setSelectedPatient={setSelectedPatient}
                        handleButtonClick={handleButtonClick}
                        handleToggleButtonClick={handleToggleButtonClick}
                        dashboardCharts={dashboardCharts}
                        onDemandCharts={onDemandCharts}
                        chatHistory={chatHistory}
                        inputText={inputText}
                        setInputText={setInputText}
                        sendMessage={sendMessage}
                        handleVoiceCommand={handleVoiceCommand}
                        listening={listening}
                        loading={loading}
                        setLoading={setLoading}
                        setLeftPanelWidth={setLeftPanelWidth}
                        popups={popups}
                        addPopup={addPopup}
                        removePopup={removePopup}
                    />
                </Box>

                {/* Resizer Button */}
                <div
                    style={{
                        width: '6px',
                        height: '50px',
                        background: '#888',
                        borderRadius: '5px',
                        cursor: 'ew-resize',
                        position: 'relative',
                        top: '50%',
                        left: '0px',
                        transform: 'translateY(-50%)',
                        zIndex: 800,
                    }}
                    onPointerDown={handlePointerDown}
                />

                {/* Main Panel that grows as LeftPanel resizes */}
                <Box
                    direction="column"
                    flex="grow"
                    height="100vh"
                    style={{ transition: 'width 0.3s ease-in-out' }}
                >
                    <MainPanel
                        selectedPatient={selectedPatient}
                        handleIframeLoad={handleIframeLoad}
                        dashboardCharts={dashboardCharts}
                        onDemandCharts={onDemandCharts}
                        charts={charts}
                    />
                </Box>
            </Container>
        </Grommet>
    );
};

export default Dashboard;
