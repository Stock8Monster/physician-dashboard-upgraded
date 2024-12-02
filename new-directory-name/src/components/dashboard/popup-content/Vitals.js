// Vitals.js
import React from 'react';
import { Box, Text } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const Vitals = () => {
    return (
        <StyledCard>
            <Box pad="medium">
                {/* Section Title */}
                <InfoText>
                    <Text weight="bold" size="large">Recent Vitals (04/30/2024) at AdventHealth Medical Group:</Text><br />

                    {/* Vitals Entry */}
                    <Box margin={{ top: 'small' }}>
                        <Text margin={{ left: 'medium' }}>Blood Pressure: 142/88 mmHg <span style={{ color: 'orange' }}>(elevated)</span></Text>
                        <Text margin={{ left: 'medium' }}>Pulse: 58 bpm <span style={{ color: 'green' }}>(normal)</span></Text>
                        <Text margin={{ left: 'medium' }}>Oxygen Saturation: 99%</Text>
                        <Text margin={{ left: 'medium' }}>Weight: 66.7 kg (147 lb)</Text>
                        <Text margin={{ left: 'medium' }}>Height: 154.9 cm (5'1")</Text>
                    </Box>

                    {/* Flag Section */}
                    <Box margin={{ top: 'medium' }}>
                        <Text weight="bold" size="medium">Flag:</Text>
                        <Text margin={{ left: 'medium' }}>Elevated blood pressure continues to trend upwards since the previous visit.</Text>
                    </Box>
                </InfoText>
            </Box>
        </StyledCard>
    );
};

export default Vitals;
