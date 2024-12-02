import React from 'react';
import { Box, Heading } from 'grommet';
import { StyledCard, InfoText } from '../StyledComponents';

const Commands = () => (
    <StyledCard>
        {/* Heading for Voice Interaction Guide */}
        <Heading level={3} color="white" margin={{ bottom: 'medium' }}>
            Voice Interaction Guide for Agama Dashboard
        </Heading>

        {/* Voice Interaction Guide Content */}
        <Box margin={{ bottom: 'medium' }}>
            <InfoText>• When using voice-activated features, follow these steps for optimal performance:</InfoText>

            {/* Microphone Status Section */}
            <InfoText margin={{ top: 'small', bottom: 'small' }}>• <strong>Microphone Status:</strong></InfoText>
            <InfoText margin={{ left: 'large' }}>
                - <strong>Green Microphone:</strong> The system is actively listening. <br />
                - <strong>Red Microphone:</strong> The system is not listening.
            </InfoText>

            {/* Providing Input Section */}
            <InfoText margin={{ top: 'medium', bottom: 'small' }}>• <strong>Providing Input:</strong></InfoText>
            <InfoText margin={{ left: 'large' }}>
                When giving input to the Agama AI system, end your query with the word "send" to execute it. <br />
                Example: “Tell me her full vital signs history send.”
            </InfoText>

            {/* Quick Commands Section */}
            <InfoText margin={{ top: 'medium', bottom: 'small' }}>• <strong>Quick Commands:</strong></InfoText>
            <InfoText margin={{ left: 'large' }}>
                For quick actions like opening or closing tabs or charts, you do not need to use "send." <br />
                Example: “Open imaging,” “Close imaging,” or “Toggle dashboard charts.”
            </InfoText>

            {/* Quick Commands Section */}
            <InfoText margin={{ top: 'medium', bottom: 'small' }}>• <strong>Multi-Tab Commands:</strong></InfoText>
            <InfoText margin={{ left: 'large' }}>
                You can open multiple popups simultaneously and manage each one independently. <br />
                Use voice commands like “Open orders” or “Close vitals” to open or close specific popups. <br />
                To close all popups at once, simply say: “Close all tabs.” <br />
                You can also move, resize, and collapse popups using touch or mouse controls.
            </InfoText>

            {/* Erasing Text Section */}
            <InfoText margin={{ top: 'medium', bottom: 'small' }}>• <strong>Erasing Text:</strong></InfoText>
            <InfoText margin={{ left: 'large' }}>
                To erase all text in the text box, simply say the word "erase".
            </InfoText>

            {/* Switching Between Voice and Text Input Section */}
            <InfoText margin={{ top: 'medium', bottom: 'small' }}>• <strong>Switching Between Voice and Text Input:</strong></InfoText>
            <InfoText margin={{ left: 'large' }}>
                You can switch between voice and text input simultaneously without changing any settings.
            </InfoText>

            {/* Reminder Section */}
            <InfoText margin={{ top: 'medium', bottom: 'small' }}>• <strong>Reminder:</strong></InfoText>
            <InfoText margin={{ left: 'large' }}>
                If the microphone is green, it is listening. Make sure it is red if you don’t want the system to record your speech.
            </InfoText>

            {/* Future Features Section */}
            <InfoText margin={{ top: 'medium', bottom: 'small' }}>• <strong>Future Features (Full Version):</strong></InfoText>
            <InfoText margin={{ left: 'large' }}>
                - <strong>Multifunctional Commands:</strong> In the full version, you will be able to use commands for multi-view options, editing tab content, and approving or clicking buttons via voice. <br />
                - <strong>Ambient Mode:</strong> The full version will include a selective ambient mode that smartly parses conversation data between patient and physician without fully transcribing every word during consults.
            </InfoText>

            {/* Final Note Section */}
            <InfoText margin={{ top: 'medium' }}>• Make sure to familiarize yourself with these features for an efficient workflow!</InfoText>
        </Box>
    </StyledCard>
);

export default Commands;
