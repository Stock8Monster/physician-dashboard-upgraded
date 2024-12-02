import React from 'react';
import { Box, FormField, TextInput, Card, CardBody, CardHeader, Heading } from 'grommet';
import styled from 'styled-components';
import {StyledFormField} from "../styles/admin";

// Styled components for the card, headers, and form fields to match the dark theme
const StyledCard = styled(Card)`
  background-color: #444; /* Left panel background */
  color: #fff; /* Default text color */
  border-radius: 5px;
  box-shadow: none;
  height: 100%; /* Ensure equal height for all cards */
`;

const StyledCardHeader = styled(CardHeader)`
  background-color: #444; /* Top menu background */
  color: #fff; /* Neon cyan for headings */
  padding: 1rem;
`;

// Parent container with CSS grid
const GridContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Adjust columns to fit your layout */
  grid-gap: 32px; /* Gap between cards */
  width: 100%;
  align-items: start; /* Align items to the top */
  padding: 1rem;
`;

const SocialHistory = ({ socialHistory, onUpdate }) => {
    const handleChange = (field, value) => {
        onUpdate({
            ...socialHistory,
            [field]: value,
        });
    };

    return (
        <GridContainer>
            <StyledCard>
                <StyledCardHeader>
                    <Heading level="3" margin="none">Tobacco Use</Heading>
                </StyledCardHeader>
                <CardBody pad="medium">
                    <StyledFormField name="smokingTobacco" label="Smoking Tobacco">
                        <TextInput
                            name="smokingTobacco"
                            value={socialHistory.smokingTobacco}
                            onChange={(event) => handleChange('smokingTobacco', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="smokelessTobacco" label="Smokeless Tobacco">
                        <TextInput
                            name="smokelessTobacco"
                            value={socialHistory.smokelessTobacco}
                            onChange={(event) => handleChange('smokelessTobacco', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="tobaccoCessation" label="Tobacco Cessation">
                        <TextInput
                            name="tobaccoCessation"
                            value={socialHistory.tobaccoCessation}
                            onChange={(event) => handleChange('tobaccoCessation', event.target.value)}
                        />
                    </StyledFormField>
                </CardBody>
            </StyledCard>

            <StyledCard>
                <StyledCardHeader>
                    <Heading level="3" margin="none">Sex and Gender Information</Heading>
                </StyledCardHeader>
                <CardBody pad="medium">
                    <StyledFormField name="sexAssignedAtBirth" label="Sex Assigned at Birth">
                        <TextInput
                            name="sexAssignedAtBirth"
                            value={socialHistory.sexAssignedAtBirth}
                            onChange={(event) => handleChange('sexAssignedAtBirth', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="genderIdentity" label="Gender Identity">
                        <TextInput
                            name="genderIdentity"
                            value={socialHistory.genderIdentity}
                            onChange={(event) => handleChange('genderIdentity', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="sexualOrientation" label="Sexual Orientation">
                        <TextInput
                            name="sexualOrientation"
                            value={socialHistory.sexualOrientation}
                            onChange={(event) => handleChange('sexualOrientation', event.target.value)}
                        />
                    </StyledFormField>
                </CardBody>
            </StyledCard>

            {/* Add additional cards following the same structure here */}
        </GridContainer>
    );
};

export default SocialHistory;
