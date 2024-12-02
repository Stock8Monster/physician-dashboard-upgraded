import React, { useState, useEffect } from 'react';
import { Box, Heading, Card, CardBody, CardHeader, Text } from 'grommet';
import { StyledCard } from './StyledComponents'; // Assuming this exists
import patientService from '../../services/patientService'; // Assuming this is your API service

const PortalAlerts = ({ selectedPatient }) => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        if (selectedPatient) {
            try {
                const response = await patientService.getAppointments(selectedPatient.id);
                const appointmentsData = response.map(item => item.Record);
                setAppointments(appointmentsData);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        }
    };

    useEffect(() => {
        if (selectedPatient) {
            fetchAppointments();
        }
    }, [selectedPatient]);

    return (
        <Box style={{ height: '50vh', overflowY: 'auto' }}>
            <StyledCard>
                <Heading level={3} color="#00FFFC">Appointments</Heading>
                {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                        <Card
                            key={index}
                            pad="small"
                            margin={{ bottom: 'small' }}
                            background="#333333"
                            border={{ color: '#444444', size: 'small' }}
                        >
                            <CardHeader pad={{ vertical: 'small' }}>
                                <Text weight="bold" size="large" color="#00FFFC">
                                    {appointment.appointmentDate}
                                </Text>
                            </CardHeader>
                            <CardBody>
                                <Text size="medium" color="#f0f0f0">Time: {appointment.appointmentTime}</Text>
                                <Text size="medium" color="#f0f0f0">Type: {appointment.appointmentType}</Text>
                                <Text size="medium" color="#f0f0f0">Physician: {appointment.requestedPhysician}</Text>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Text color="#f0f0f0">No appointments available.</Text>
                )}
            </StyledCard>
        </Box>
    );
};

export default PortalAlerts;
