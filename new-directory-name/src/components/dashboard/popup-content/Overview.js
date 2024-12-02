import React from 'react';
import { Box } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const Overview = () => (
    <StyledCard>
        <InfoText><strong>Reason for Visit:</strong> Vickie reports chest discomfort and shortness of breath during physical exertion over the past week. She is here for evaluation of possible cardiac issues.</InfoText>

        <InfoText><strong>Recent Labs/Imaging:</strong></InfoText>
        <ul>
            <li>Lab (05/01/2024): WBC: 8.15, Hemoglobin: 14.9, Iron Saturation: 47%</li>
            <li>Imaging (05/03/2024): Transthoracic Echo shows mild regurgitation in the aortic and mitral valves, mild pulmonary hypertension.</li>
        </ul>

        <InfoText><strong>Recent Vitals (04/30/2024):</strong></InfoText>
        <ul>
            <li>Blood Pressure: 142/88 mmHg</li>
            <li>Pulse: 58 bpm</li>
            <li>Weight: 66.7 kg (147 lb)</li>
            <li>Height: 154.9 cm (5'1")</li>
            <li>Oxygen Saturation: 99%</li>
        </ul>
    </StyledCard>
);

export default Overview;
