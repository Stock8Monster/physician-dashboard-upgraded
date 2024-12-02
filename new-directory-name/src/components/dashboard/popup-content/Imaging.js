// Imaging.js
import React from 'react';
import { Box, Text } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const Imaging = () => {
    return (
        <StyledCard>
            {/* Imaging Section */}
            <Box pad="medium">
                <InfoText>
                    <Text weight="bold" size="large">Recent Imaging:</Text><br />
                    {/* Recent Imaging Entry */}
                    <Box margin={{ top: 'small' }}>
                        <Text><strong>Transthoracic Echo (05/03/2024)</strong> at AdventHealth Gordon, reviewed by Dr. Spencer Collin Maddox:</Text>
                        <Text><strong>Findings:</strong> Mild regurgitation in the aortic and mitral valves, mild pulmonary hypertension noted.</Text>
                    </Box>

                    {/* Previous Imaging Section */}
                    <Box margin={{ top: 'medium' }}>
                        <Text weight="bold" size="large">Previous Imaging:</Text><br />
                        {/* Previous Imaging Entries */}
                        <Text margin={{ top: 'small' }}><strong>Bilateral digital screening mammogram (09/29/2022):</strong> No evidence of malignancy, benign findings, recommended annual follow-up.</Text>
                        <Text margin={{ top: 'small' }}><strong>CT Chest without contrast (03/01/2022):</strong> Subtle peripheral nodules suggestive of chronic inflammatory process, follow-up per Fleischner criteria.</Text>
                    </Box>
                </InfoText>
            </Box>
        </StyledCard>
    );
};

export default Imaging;
