// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Box, Grommet, ResponsiveContext, Spinner, Text, Layer } from 'grommet';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/dashboard-theme.js';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChartLayer from '../components/ChartLayer';
import ChartModal from '../components/ChartModal';
import AIChatArea from '../components/AIChatArea';
import patientService from '../services/patientService'; // Ensure this is the correct path to your patientService

const Dashboard = () => {
    const [patients, setPatients] = useState([]);
    const [charts, setCharts] = useState([]);  // Initialized as an array of chart objects
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChartSidebarOpen, setIsChartSidebarOpen] = useState(false);
    const [isChartModalOpen, setIsChartModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedChartIndex, setSelectedChartIndex] = useState(0);

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            try {
                const patientData = await patientService.listPatientsWithCharts();
                // Map the patient data to a simpler format
                const mappedPatients = patientData.map(patient => ({
                    key: patient.Key,
                    name: patient.Record.name,
                    birthDate: patient.Record.birthDate,
                    gender: patient.Record.gender,
                    address: patient.Record.address,
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

        fetchPatients();
    }, []);

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        setIsSidebarOpen(false);

        // Clear the current charts
        setCharts([]);
        setSelectedChartIndex(0);
        console.log('Selected Patient:', patient);
        // Use the charts directly from the patient object
        setCharts(patient.charts);
        setIsChartModalOpen(true);
    };

    const handleChartClick = (index) => {
        setSelectedChartIndex(index);
        setIsChartModalOpen(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <ResponsiveContext.Consumer>
                {() => (
                    <Box overflow="hidden" style={{ height: '96.5vh', backgroundColor: '#1a1a1a' }}>
                        <Header
                            selectedPatient={selectedPatient}
                            setIsSidebarOpen={setIsSidebarOpen}
                            isChartSidebarOpen={isChartSidebarOpen}
                            setIsChartSidebarOpen={setIsChartSidebarOpen}
                        />
                        <Box flex direction="row" style={{ position: 'relative', height: '100%' }}>
                            <Box flex direction="column" style={{ flex: 1, height: '100%', overflow: 'hidden' }}>
                                <AIChatArea
                                    charts={charts}  // Pass the array of chart objects
                                    setCharts={setCharts}
                                    setLoading={setLoading}
                                    loading={loading}
                                    activePatient={selectedPatient}
                                    chatHistory={chatHistory}
                                    setChatHistory={setChatHistory}
                                    selectedChartIndex={selectedChartIndex}  // Pass the selected chart index
                                    setSelectedChartIndex={setSelectedChartIndex}  // Pass the function to update selected chart index
                                    setIsChartModalOpen={setIsChartModalOpen}  // Pass the function to open the chart modal
                                />
                            </Box>
                        </Box>
                        <Sidebar
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                            patientNames={patients}
                            handlePatientClick={handlePatientClick}
                            loading={loading}
                        />
                        {isChartSidebarOpen && (
                            <ChartLayer
                                charts={charts}  // Pass the array of chart objects
                                handleChartClick={handleChartClick}
                                setIsChartSidebarOpen={setIsChartSidebarOpen}
                            />
                        )}
                        {isChartModalOpen && (
                            <ChartModal
                                charts={charts}  // Pass the array of chart objects
                                selectedChartIndex={selectedChartIndex}
                                setIsChartModalOpen={setIsChartModalOpen}
                                patientName={selectedPatient?.name}
                            />
                        )}
                        {loading && (
                            <Layer>
                                <Box pad="large" align="center" gap="small">
                                    <Spinner />
                                    <Text>Loading...</Text>
                                </Box>
                            </Layer>
                        )}
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </ThemeProvider>
    );
};

export default Dashboard;
