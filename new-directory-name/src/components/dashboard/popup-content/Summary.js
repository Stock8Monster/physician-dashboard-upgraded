// Summary.js
import React, {useState} from 'react';
import { Box, Text, Button } from 'grommet';
import {StyledCard, InfoText, StyledColorButton} from '../StyledComponents';

const Summary = ({ onApprove, onEdit }) => {
    const [isApproved, setIsApproved] = useState(false);
    // Handle approval action
    const handleApprove = () => {
        setIsApproved(true);
    };
    return (
        <StyledCard>
            {/* SOAP Note Sections */}
            <Box pad="medium">
                {/* Subjective Section */}
                <InfoText>
                    <Text weight="bold" size="large">S: Subjective</Text><br />
                    Vickie J. Moore presented today for evaluation of chest discomfort and shortness of breath.<br />
                    Patient describes intermittent episodes of chest tightness during exertion, lasting 5-10 minutes and relieved by rest.<br />
                    No associated dizziness or syncope reported.<br />
                    Reports increased fatigue, but denies recent weight changes, infections, or fever.
                </InfoText>

                {/* Objective Section */}
                <InfoText margin={{ top: 'medium' }}>
                    <Text weight="bold" size="large">O: Objective</Text><br />
                    <strong>Blood Pressure:</strong> 142/88 mmHg (elevated)<br />
                    <strong>Recent Imaging:</strong><br />
                    - Transthoracic echocardiogram shows mild regurgitation in both aortic and mitral valves.<br />
                    - Mild pulmonary hypertension noted.<br />
                    <strong>Labs:</strong> Pending results of lipid panel and bone density scan.
                </InfoText>

                {/* Assessment Section */}
                <InfoText margin={{ top: 'medium' }}>
                    <Text weight="bold" size="large">A: Assessment</Text><br />
                    - Mild pulmonary hypertension likely contributing to symptoms.<br />
                    - Potential heart involvement needs further evaluation due to persistent shortness of breath and chest discomfort.<br />
                    - Blood pressure management required due to elevated readings.
                </InfoText>

                {/* Plan Section */}
                <InfoText margin={{ top: 'medium' }}>
                    <Text weight="bold" size="large">P: Plan</Text><br />
                    - Order CT chest with contrast for further evaluation of pulmonary hypertension and heart involvement.<br />
                    - Discussed potential medication adjustments; consider antihypertensives if elevated BP persists.<br />
                    - Patient instructed to follow up in 2 weeks for review of imaging results and reassessment.<br />
                    - Dietary consultation to address vitamin D levels and management of osteoporosis.
                </InfoText>

                {/* Buttons */}
                <Box direction="row" justify="" gap={"large"} margin={{ top: 'medium' }}>
                    <StyledColorButton
                        primary
                        label={isApproved ? 'Approved ✓' : 'Approve'}
                        onClick={handleApprove}
                        disabled={isApproved}

                    />
                    <StyledColorButton
                        label="Edit"
                        onClick={onEdit}
                    />
                </Box>
            </Box>
        </StyledCard>
    );
};

export default Summary;
