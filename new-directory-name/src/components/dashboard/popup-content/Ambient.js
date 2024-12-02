import React, { useState } from 'react';
import { Box, Heading, Text } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const Ambient = ({ isTriggered }) => {
    console.log("Ambient trigger = ", isTriggered);

    const ambientRecording = `Waiting for input...`;

    // Content for Doctor-Patient Transcript
    const transcriptContent = [
        { speaker: "Doctor", text: "How have you been feeling since our last consultation, Vickie?" },
        { speaker: "Vickie", text: "I’ve been feeling more tired than usual, and I’ve had some mild chest pain that comes and goes. My blood pressure seems higher too." },
        { speaker: "Doctor", text: "Can you describe the chest pain? Does it get worse when you’re active?" },
        { speaker: "Vickie", text: "Yes, it feels a bit worse in the mornings, especially after I walk to work." },
        { speaker: "Doctor", text: "Do you also notice any shortness of breath?" },
        { speaker: "Vickie", text: "Sometimes, especially when I’m climbing stairs." },
        { speaker: "Doctor", text: "Thanks for sharing that. I’ll order an ECG to check your heart and adjust your blood pressure medication slightly. We may also do some blood work to rule out other issues." },
        { speaker: "Vickie", text: "Okay, should I be worried?" },
        { speaker: "Doctor", text: "These symptoms can be caused by a few things, many of which are manageable. We’ll know more after the tests. For now, take it easy, and avoid overexertion. We’ll get to the bottom of this." },
        { speaker: "Vickie", text: "Thanks, Doctor." },
        { speaker: "Doctor", text: "Great. I’ll see you in two weeks for a follow-up. If anything gets worse, reach out, okay?" },
        { speaker: "Vickie", text: "Got it. Thanks again." }
    ];

    // AI Transcription and Summary
    const transcriptionSummary = `
        Patient Vickie reports increased fatigue and intermittent chest pain, worsening in the mornings,
        especially after physical activity like walking. Also experiencing occasional shortness of breath.
        Blood pressure readings higher than usual. Doctor recommends ECG, potential medication adjustment, 
        and blood work. Next follow-up scheduled for 2 weeks.
    `;

    // Action Items as a plain list
    const actionItems = [
        "Order ECG.",
        "Adjust prescription for blood pressure.",
        "Conduct blood work.",
        "Schedule follow-up consultation in 2 weeks."
    ];

    return (
        <StyledCard>
            <Heading level={3} margin={{ bottom: 'small' }} color="#fff">
                Live Ambient Recording
            </Heading>
            <Box pad="small">
                {isTriggered ? (
                    <Box>
                        {/* Doctor-Patient Transcript */}
                        <Box margin={{ bottom: 'medium' }}>
                            <Text weight="bold" size="large">Doctor-Patient Transcript:</Text>
                            {transcriptContent.map((line, index) => (
                                <Box key={index} margin={{ bottom: 'xsmall' }}>
                                    <Text weight="bold">{line.speaker}:</Text> <Text>{line.text}</Text>
                                </Box>
                            ))}
                        </Box>

                        {/* AI Transcription and Summary */}
                        <Box margin={{ bottom: 'medium' }}>
                            <Text weight="bold" size="large">AI Transcription and Summary:</Text>
                            <Text>{transcriptionSummary}</Text>
                        </Box>

                        {/* Action Items as a plain list */}
                        <Box>
                            <Text weight="bold" size="large">Action Items Generated:</Text>
                            {actionItems.map((item, index) => (
                                <Text key={index}>{item}</Text>
                            ))}
                        </Box>
                    </Box>
                ) : (
                    <InfoText>{ambientRecording}</InfoText>
                )}
            </Box>
        </StyledCard>
    );
};

export default Ambient;
