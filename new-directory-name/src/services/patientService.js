import axios from 'axios';
import mockPatients from '../data/mockPatients';

const API_BASE_URL = 'https://qft.agamanetworks.com/create-patient-record';
const API_KEY = 'qrf-poc-123456-key';
const USE_MOCK_DATA = true; // Toggle this to use mock data when API is unavailable

// Create an Axios instance with default headers
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }
});

const listPatientsWithCharts = async () => {
    // Use mock data when API is unavailable
    if (USE_MOCK_DATA) {
        console.log(`Using mock data: Found ${mockPatients.length} patients`);
        return mockPatients;
    }
    
    try {
        // Fetch all patients
        const response = await axiosInstance.post('', {
            action: 'queryAllPatients'
        });
        const patients = response.data;

        console.log('Fetched patients:', patients);

        // Fetch charts for each patient
        const patientsWithCharts = await Promise.all(
            patients.map(async (patient) => {
                try {
                    const charts = await getCharts(patient.Key);
                    return {
                        ...patient,
                        Record: {
                            ...patient.Record,
                            charts: charts
                        }
                    };
                } catch (chartError) {
                    console.error(`Error fetching charts for patient ${patient.Key}:`, chartError);
                    return {
                        ...patient,
                        Record: {
                            ...patient.Record,
                            charts: []
                        }
                    };
                }
            })
        );

        console.log('Patients with charts:', patientsWithCharts);
        return patientsWithCharts;
    } catch (error) {
        console.error('Error listing patients with charts:', error);
        // Fallback to mock data on error
        console.log('Falling back to mock data');
        return mockPatients;
    }
};

const getPatientDetails = async (patientId) => {
    // Use mock data when API is unavailable
    if (USE_MOCK_DATA) {
        const patient = mockPatients.find(p => p.Key === patientId);
        return patient ? patient.Record : null;
    }
    
    try {
        const response = await axiosInstance.get(`/patients/${patientId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting patient details:', error);
        throw error;
    }
};

const createPatient = async (patientData) => {
    try {
        const response = await axiosInstance.post('/', patientData);
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};

const updatePatient = async (patientId, patientData) => {
    try {
        const response = await axiosInstance.patch(`/${patientId}`, {
            ...patientData,
            action: 'updatePatient' // Ensure action is specified if needed by the backend
        });
        return response.data;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};

const deletePatient = async (patientId) => {
    try {
        const response = await axiosInstance.delete(`/${patientId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting patient:', error);
        throw error;
    }
};

// Chart functions

const createChart = async (chartData) => {
    try {
        console.log(chartData);
        const response = await axiosInstance.post('/', {
            action: 'createChart',
            ...chartData
        });
        return response.data;
    } catch (error) {
        console.error('Error creating chart:', error);
        throw error;
    }
};

const replaceChart = async (chartData) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'replaceChart',
            ...chartData
        });
        return response.data;
    } catch (error) {
        console.error('Error replacing chart:', error);
        throw error;
    }
};

const deleteChart = async (chartId) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'deleteChart',
            chartId
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting chart:', error);
        throw error;
    }
};

const getCharts = async (patientId) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'getCharts',
            patientId
        });
        return response.data;
    } catch (error) {
        console.error('Error getting charts:', error);
        throw error;
    }
};

// Appointment functions

const createAppointment = async (appointmentData) => {
    try {
        const response = await axiosInstance.post('/', {
            action: 'createAppointment',
            ...appointmentData
        });
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

const getAppointments = async (patientId) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'getAppointments',
            patientId
        });
        return response.data;
    } catch (error) {
        console.error('Error getting appointments:', error);
        throw error;
    }
};

const updateAppointment = async (appointmentData) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'updateAppointment',
            ...appointmentData
        });
        return response.data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

const deleteAppointment = async (appointmentId) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'deleteAppointment',
            appointmentId
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
};

// JournalEntry functions

const createJournalEntry = async (journalEntryData) => {
    try {
        const response = await axiosInstance.post('/', {
            action: 'createJournalEntry',
            ...journalEntryData
        });
        return response.data;
    } catch (error) {
        console.error('Error creating journal entry:', error);
        throw error;
    }
};

const getJournalEntries = async (patientId) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'getJournalEntries',
            patientId
        });
        return response.data;
    } catch (error) {
        console.error('Error getting journal entries:', error);
        throw error;
    }
};

const updateJournalEntry = async (journalEntryData) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'updateJournalEntry',
            ...journalEntryData
        });
        return response.data;
    } catch (error) {
        console.error('Error updating journal entry:', error);
        throw error;
    }
};

const deleteJournalEntry = async (journalEntryId) => {
    try {
        const response = await axiosInstance.patch('/', {
            action: 'deleteJournalEntry',
            journalEntryId
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting journal entry:', error);
        throw error;
    }
};

export default {
    listPatientsWithCharts,
    getPatientDetails,
    createPatient,
    updatePatient,
    deletePatient,
    createChart,
    replaceChart,
    getCharts,
    deleteChart,
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment,
    createJournalEntry,
    getJournalEntries,
    updateJournalEntry,
    deleteJournalEntry,
};
