// src/components/PortalAlerts.js
import React from 'react';
import { Box, Heading, Card, CardHeader, CardBody, Text } from 'grommet';
import { StyledCard } from './StyledComponents'; // Assuming StyledCard is already defined

const PortalAlerts = ({ appointments }) => (
    <Box style={{ height: '50vh', overflowY: 'auto', boxShadow: "none" }}>
        <StyledCard>
            <Heading level={3} color="#fff">Appointments</Heading> {/* Neon Cyan for Heading */}
            {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                    <Card key={index} pad="small" margin={{ bottom: 'small' }}>
                        <CardHeader pad={{ vertical: 'small' }}>
                            <Text weight="bold" size="large"> {/* Text should default to white */}
                                {appointment.appointmentDate}
                            </Text>
                        </CardHeader>
                        <CardBody>
                            <Text size="medium"> {/* Text should default to white */}
                                Time: {appointment.appointmentTime}
                            </Text>
                            <Text size="medium"> {/* Text should default to white */}
                                Type: {appointment.appointmentType}
                            </Text>
                            <Text size="medium"> {/* Text should default to white */}
                                Physician: {appointment.requestedPhysician}
                            </Text>
                        </CardBody>
                    </Card>
                ))
            ) : (
                <Text color="#fff">No appointments available.</Text>
            )}
        </StyledCard>
    </Box>
);

export default PortalAlerts;
