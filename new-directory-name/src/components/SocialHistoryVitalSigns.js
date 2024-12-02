import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';
import SocialHistory from './SocialHistory';
import LastFiledVitalSigns from './LastFiledVitalSigns';

// Styled Box to apply the background and text colors
const StyledBox = styled(Box)`
  background-color: transparent; /* Center panel background */
  padding: 1rem;
  border-radius: 5px;
  color: #fff; /* Default text color */
  height: 100%; /* Make sure all boxes have equal height */
`;

// Parent container with CSS grid
const GridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* 3 columns in the grid */
  grid-gap: 60px; /* Gap between the cards both horizontally and vertically */
  width: 100%;
  align-items: start; /* Align all items to the start to prevent any vertical misalignment */
  padding: 1rem;
`;

const Spacer = styled.div`
  width: 100%;
  height: 2rem; /* Adjust height to add vertical spacing */
`;

const SocialHistoryVitalSigns = ({ socialHistory, vitalSigns, onSocialHistoryUpdate, onVitalSignsUpdate }) => {
    return (
        <GridContainer>
                <SocialHistory socialHistory={socialHistory} onUpdate={onSocialHistoryUpdate} />
            <Spacer />
                <LastFiledVitalSigns vitals={vitalSigns} onUpdate={onVitalSignsUpdate} />
            {/* Add more cards here as needed */}
        </GridContainer>
    );
};

export default SocialHistoryVitalSigns;
