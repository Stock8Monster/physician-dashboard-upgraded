// Labs.js
import React from 'react';
import { Box, Text } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const Labs = () => {
    return (
        <StyledCard>
            <Box pad="medium">
                {/* Section Title */}
                <InfoText>
                    <Text weight="bold" size="large">Recent Labs:</Text><br />

                    {/* Recent Lab Entry */}
                    <Box margin={{ top: 'small' }}>
                        <Text><strong>CBC with Differential (05/01/2024)</strong> at AdventHealth Gordon Infusion Center:</Text>
                        <Text margin={{ left: 'medium' }}>WBC: 8.15 <span style={{ color: 'green' }}>(normal)</span></Text>
                        <Text margin={{ left: 'medium' }}>RBC: 4.29 <span style={{ color: 'red' }}>(low)</span></Text>
                        <Text margin={{ left: 'medium' }}>Hemoglobin: 14.9 <span style={{ color: 'green' }}>(normal)</span></Text>
                        <Text margin={{ left: 'medium' }}>Iron: 154.1 ug/dL <span style={{ color: 'green' }}>(normal)</span></Text>
                    </Box>

                    {/* Additional Lab Entry */}
                    <Box margin={{ top: 'medium' }}>
                        <Text><strong>Iron and TIBC (05/01/2024)</strong> at AdventHealth Lab:</Text>
                        <Text margin={{ left: 'medium' }}>Iron Saturation: 47%</Text>
                        <Text margin={{ left: 'medium' }}>Transferrin: 234.0 mg/dL <span style={{ color: 'green' }}>(normal)</span></Text>
                    </Box>

                    {/* Flags Section */}
                    <Box margin={{ top: 'medium' }}>
                        <Text weight="bold" size="medium">Flags:</Text>
                        <Text margin={{ left: 'medium' }}>No major abnormalities.</Text>
                    </Box>
                </InfoText>
            </Box>
        </StyledCard>
    );
};

export default Labs;
