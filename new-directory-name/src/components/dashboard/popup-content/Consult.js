import React from 'react';
import { Box, Heading } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const Consult = () => {
    const previousConsultations = [
        {
            date: '03/15/2023',
            department: 'Hematology Oncology at AdventHealth',
            careTeam: 'Shanna Brooke Guess, RN, FNP-C',
            reason: 'Routine oncology follow-up after diagnosis of benign neoplasm of the cerebral meninges.',
            findings: 'No significant changes, follow-up recommended annually.',
        },
    ];

    const upcomingAppointments = [
        {
            date: '07/19/2024',
            department: 'AdventHealth Endocrinology at Calhoun',
            physician: 'Dr. Swati Chopra',
            reason: 'Osteoporosis and thyroid follow-up',
        },
    ];

    return (
        <StyledCard>
            <Heading level={3} margin={{ bottom: 'small' }} color="#fff">Previous Consultations</Heading>
            <Box pad="small">
                {previousConsultations.map((consultation, index) => (
                    <Box key={index} margin={{ bottom: 'small' }}>
                        <InfoText><strong>Date:</strong> {consultation.date}</InfoText>
                        <InfoText><strong>Department:</strong> {consultation.department}</InfoText>
                        <InfoText><strong>Care Team:</strong> {consultation.careTeam}</InfoText>
                        <InfoText><strong>Reason:</strong> {consultation.reason}</InfoText>
                        <InfoText><strong>Findings:</strong> {consultation.findings}</InfoText>
                    </Box>
                ))}
            </Box>
            <Heading level={4} margin={{ bottom: 'small', top: 'medium' }} color="#fff">Upcoming Appointments</Heading>
            <Box pad="small">
                {upcomingAppointments.map((appointment, index) => (
                    <Box key={index} margin={{ bottom: 'small' }}>
                        <InfoText><strong>Date:</strong> {appointment.date}</InfoText>
                        <InfoText><strong>Department:</strong> {appointment.department}</InfoText>
                        <InfoText><strong>Physician:</strong> {appointment.physician}</InfoText>
                        <InfoText><strong>Reason:</strong> {appointment.reason}</InfoText>
                    </Box>
                ))}
            </Box>
        </StyledCard>
    );
};

export default Consult;
