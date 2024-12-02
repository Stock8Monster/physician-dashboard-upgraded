import React from 'react';
import { Box, Heading } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents'; // Adjust the import path as needed

const Refills = () => {
    const refillsNeeded = [
        'Levothyroxine 50 MCG tablet – 1 tablet daily (needs refill)',
        'Chlorthalidone (Hygroton) 25 MG tablet – 1 tablet daily (needs refill)',
    ];

    const otherMedications = [
        'Omega-3 Acid (1 g capsule), 4 capsules/day',
        'Progesterone PO 25 mg, 1 tablet/day',
        'Vitamin D3 125 MCG (5000 IU) capsule, 1 daily',
        'Niacin 500 MG tablet, 1 daily',
        'Multivitamin with Iron, 1 daily',
    ];

    return (
        <StyledCard>
            <Heading level={3} margin={{ bottom: 'small' }} color="#fff">Medication Refills Needed</Heading>
            <Box pad="small">
                {refillsNeeded.map((medication, index) => (
                    <InfoText key={index} margin={{ bottom: 'small' }}>
                        {medication}
                    </InfoText>
                ))}
            </Box>
            <Heading level={4} margin={{ bottom: 'small', top: 'medium' }} color="#fff">Other Active Medications</Heading>
            <Box pad="small">
                {otherMedications.map((medication, index) => (
                    <InfoText key={index} margin={{ bottom: 'small' }}>
                        {medication}
                    </InfoText>
                ))}
            </Box>
        </StyledCard>
    );
};

export default Refills;
