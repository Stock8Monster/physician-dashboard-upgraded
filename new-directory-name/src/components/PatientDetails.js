import React, { useEffect, useState } from 'react';
import { Box, Heading, Button, Text } from 'grommet';
import PatientCharts from './PatientCharts';
import EditPatient from './EditPatient';
import patientService from '../services/patientService';

const PatientDetails = ({ patient }) => {
    const [editing, setEditing] = useState(false);
    const [patientDetails, setPatientDetails] = useState(null);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const details = await patientService.getPatientDetails(patient.id);
                setPatientDetails(details);
            } catch (error) {
                console.error('Failed to fetch patient details:', error);
            }
        };
        fetchPatientDetails();
    }, [patient]);

    return (
        <Box flex>
            <Heading level="3">{patientDetails.name}</Heading>
            <Text>Details about {patientDetails.name}</Text>
            <Button label="Edit" onClick={() => setEditing(!editing)} />
            {editing ? (
                <EditPatient patient={patientDetails} onClose={() => setEditing(false)} />
            ) : (
                <PatientCharts patientId={patient.id} />
            )}
        </Box>
    );
};

export default PatientDetails;
