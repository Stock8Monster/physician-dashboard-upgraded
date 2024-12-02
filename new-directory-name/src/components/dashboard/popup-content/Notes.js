import React from 'react';
import { Box, Heading } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const Notes = () => {
    const previousFlags = [
        '07/27/2022: TSH levels elevated, medication adjustment recommended.',
        '04/30/2024: Elevated blood pressure during routine visit, flagged for hypertension management.'
    ];

    const currentNotes = [
        'Flag: Mild pulmonary hypertension noted on echo, follow-up imaging ordered.',
        'New Flag: Patient reports increased fatigue and shortness of breath, potential heart involvement.'
    ];

    return (
        <StyledCard>
            <Heading level={3} margin={{ bottom: 'small' }} color="#fff">Notes</Heading>
            <Box pad="small">
                <Heading level={4} margin={{ bottom: 'small' }} color="#fff">Previous Flags:</Heading>
                {previousFlags.map((flag, index) => (
                    <InfoText key={index} margin={{ bottom: 'small' }}>{flag}</InfoText>
                ))}
                <Heading level={4} margin={{ bottom: 'small' }} color="#fff">Current Notes:</Heading>
                {currentNotes.map((note, index) => (
                    <InfoText key={index} margin={{ bottom: 'small' }}>{note}</InfoText>
                ))}
            </Box>
        </StyledCard>
    );
};

export default Notes;
