// AIInsights.js
import React from 'react';
import { Box, Text } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const AIInsights = () => {
    return (
        <StyledCard>
            {/* Patient Journal Summarization */}
            <Box pad="medium">
                <InfoText>
                    <Text weight="bold" size="large">Patient Journal Summarization:</Text><br />
                    {/* Journal Entries */}
                    <Box margin={{ top: 'small' }}>
                        <Text><strong>04/15/2024:</strong> "Feeling more tired than usual, especially in the evenings. No changes in medications."</Text>
                        <Text margin={{ top: 'small' }}><strong>05/01/2024:</strong> "Noticing shortness of breath when going up stairs. Mild chest pain after walking to the mailbox."</Text>
                    </Box>

                    {/* AI Insight */}
                    <Box margin={{ top: 'medium' }}>
                        <Text weight="bold" size="large">AI Insight:</Text><br />
                        <Text>The patient has consistently reported increasing fatigue and mild shortness of breath, potentially indicating a worsening of cardiac or pulmonary condition. The progression of symptoms suggests the need for imaging and further cardiovascular workup.</Text>
                    </Box>
                </InfoText>
            </Box>
        </StyledCard>
    );
};

export default AIInsights;
