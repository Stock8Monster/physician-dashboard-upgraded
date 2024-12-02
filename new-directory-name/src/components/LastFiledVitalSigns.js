import React from 'react';
import { Box, FormField, TextInput, TextArea, Card, CardBody, CardHeader, Heading } from 'grommet';
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
  grid-template-columns: repeat(4, 1fr); /* 4 columns in the grid */
  grid-gap: 32px; /* Gap between the cards both horizontally and vertically */
  width: 100%;
  align-items: start; /* Align all items to the start to prevent any vertical misalignment */
  padding: 1rem;
`;

const LastFiledVitalSigns = ({ vitals = {}, onUpdate }) => {
    const defaultVitals = {
        bloodPressure: '',
        pulse: '',
        temperature: '',
        respiratoryRate: '',
        oxygenSaturation: '',
        inhaledOxygenConcentration: '',
        weight: '',
        height: '',
        bmi: '',
        comments: ''
    };

    const vitalsData = { ...defaultVitals, ...vitals };

    const handleChange = (field, value) => {
        onUpdate({
            ...vitalsData,
            [field]: value,
        });
    };

    return (
        <GridContainer>
            <StyledCard>
                <StyledCardHeader>
                    <Heading level="3" margin="none">Basic Vitals</Heading>
                </StyledCardHeader>
                <CardBody pad="medium">
                    <StyledFormField name="bloodPressure" label="Blood Pressure">
                        <TextInput
                            name="bloodPressure"
                            value={vitalsData.bloodPressure}
                            onChange={(event) => handleChange('bloodPressure', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="pulse" label="Pulse">
                        <TextInput
                            name="pulse"
                            value={vitalsData.pulse}
                            onChange={(event) => handleChange('pulse', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="temperature" label="Temperature">
                        <TextInput
                            name="temperature"
                            value={vitalsData.temperature}
                            onChange={(event) => handleChange('temperature', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="respiratoryRate" label="Respiratory Rate">
                        <TextInput
                            name="respiratoryRate"
                            value={vitalsData.respiratoryRate}
                            onChange={(event) => handleChange('respiratoryRate', event.target.value)}
                        />
                    </StyledFormField>
                </CardBody>
            </StyledCard>

            <StyledCard>
                <StyledCardHeader>
                    <Heading level="3" margin="none">Oxygen & Weight</Heading>
                </StyledCardHeader>
                <CardBody pad="medium">
                    <StyledFormField name="oxygenSaturation" label="Oxygen Saturation">
                        <TextInput
                            name="oxygenSaturation"
                            value={vitalsData.oxygenSaturation}
                            onChange={(event) => handleChange('oxygenSaturation', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="inhaledOxygenConcentration" label="Inhaled Oxygen Concentration">
                        <TextInput
                            name="inhaledOxygenConcentration"
                            value={vitalsData.inhaledOxygenConcentration}
                            onChange={(event) => handleChange('inhaledOxygenConcentration', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="weight" label="Weight">
                        <TextInput
                            name="weight"
                            value={vitalsData.weight}
                            onChange={(event) => handleChange('weight', event.target.value)}
                        />
                    </StyledFormField>
                </CardBody>
            </StyledCard>

            <StyledCard>
                <StyledCardHeader>
                    <Heading level="3" margin="none">Height & BMI</Heading>
                </StyledCardHeader>
                <CardBody pad="medium">
                    <StyledFormField name="height" label="Height">
                        <TextInput
                            name="height"
                            value={vitalsData.height}
                            onChange={(event) => handleChange('height', event.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField name="bmi" label="Body Mass Index">
                        <TextInput
                            name="bmi"
                            value={vitalsData.bmi}
                            onChange={(event) => handleChange('bmi', event.target.value)}
                        />
                    </StyledFormField>
                </CardBody>
            </StyledCard>

            <StyledCard>
                <StyledCardHeader>
                    <Heading level="3" margin="none">Comments</Heading>
                </StyledCardHeader>
                <CardBody pad="medium">
                    <StyledFormField name="comments" label="Comments">
                        <TextArea
                            name="comments"
                            value={vitalsData.comments}
                            onChange={(event) => handleChange('comments', event.target.value)}
                        />
                    </StyledFormField>
                </CardBody>
            </StyledCard>
        </GridContainer>
    );
};

export default LastFiledVitalSigns;
