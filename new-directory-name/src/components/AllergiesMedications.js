import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';
import Allergies from './Allergies';
import Medications from './Medications';

// Styled Box to apply the background colors and other styles
const StyledBox = styled(Box)`
  background-color: #333; /* Center panel background */
  padding: 1rem;
  border-radius: 5px;
  color: #fff; /* Default text color */
`;

const AllergiesMedications = ({ allergies, medications, onAllergiesUpdate, onMedicationsUpdate }) => {
    return (
        <StyledBox direction="row" gap="large">
            <StyledBox width="50%">
                <Allergies allergies={allergies} onUpdate={onAllergiesUpdate} />
            </StyledBox>
            <StyledBox width="50%">
                <Medications medications={medications} onUpdate={onMedicationsUpdate} />
            </StyledBox>
        </StyledBox>
    );
};

export default AllergiesMedications;
