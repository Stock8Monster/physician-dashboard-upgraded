import React, { useEffect, useState } from 'react';
import { Box, List } from 'grommet';
import patientService from '../services/patientService';

const PatientList = ({ onSelect }) => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientData = await patientService.listPatientsWithCharts();
                // Map the patient data to a simpler format
                const mappedPatients = patientData.map(patient => ({
                    key: patient.Key,
                    name: patient.Record.name,
                    ...patient.Record
                }));
                setPatients(mappedPatients);
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        };
        fetchPatients();
    }, []);

    return (
        <Box width="medium">
            <List
                primaryKey="name"
                data={patients}
                onClickItem={({ item }) => onSelect(item)}
            />
        </Box>
    );
};

export default PatientList;
