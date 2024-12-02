import React from 'react';
import { StyledCard, InfoText } from '../StyledComponents';

const PatientDetails = ({ patient }) => (
    <StyledCard>
            <InfoText><strong>Full Name:</strong> Vickie J. Moore</InfoText>
            <InfoText><strong>Former Aliases:</strong> Vickie Jane Moore, Vickie Vmoore5408@Yahoo.Com</InfoText>
            <InfoText><strong>Date of Birth:</strong> March 1, 1950</InfoText>
            <InfoText><strong>Address:</strong> 627 Floyd Rd NE, Calhoun, GA 30701-9703</InfoText>
            <InfoText><strong>Phone Numbers:</strong></InfoText>
            <ul>
                    <li>Home: 770-548-5408</li>
                    <li>Work: 770-548-5408</li>
                    <li>Mobile: 770-548-5408</li>
            </ul>
            <InfoText><strong>Email Addresses:</strong> vmoore5408@yahoo.com, VMOORE5408@YAHOO.COM</InfoText>
            <InfoText><strong>Marital Status:</strong> Married</InfoText>
            <InfoText><strong>Language:</strong> English (Written - Preferred)</InfoText>
            <InfoText><strong>Race/Ethnicity:</strong> White / Unknown</InfoText>
            <InfoText><strong>Family History:</strong></InfoText>
            <ul>
                    <li>Mother: Osteoporosis, diagnosed in her 60s</li>
                    <li>Father: Coronary artery disease, died at age 72</li>
                    <li>Siblings: One brother with hypertension and Type 2 diabetes</li>
            </ul>
            <InfoText><strong>Chronic Illnesses:</strong></InfoText>
            <ul>
                    <li>Hypothyroidism</li>
                    <li>Osteoporosis</li>
                    <li>Essential Hypertension</li>
                    <li>Nuclear Senile Cataract</li>
                    <li>Chronic Sinusitis</li>
                    <li>Idiopathic Peripheral Neuropathy</li>
                    <li>Fibromyositis</li>
            </ul>
            <InfoText><strong>Smoking Status:</strong> Never smoked tobacco, never used smokeless tobacco</InfoText>
            <InfoText><strong>Allergies:</strong> Levofloxacin (reaction: Racing thoughts)</InfoText>
    </StyledCard>
);

export default PatientDetails;