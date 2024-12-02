import React, { useState } from 'react';
import Draggable from 'react-draggable'; // To make it draggable
import styled from 'styled-components';
import { Box, Text, Button } from 'grommet';

const FloatingBox = styled(Box)`
  position: fixed;
  top: 50%;
  left: 15px; /* Positioned 15px from the left */
  transform: translateY(-50%);
  width: 400px;
  max-height: 500px; /* Set max height */
  overflow-y: auto; /* Add vertical scrollbar */
  background-color: #333;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
  z-index: 1000;
  padding: 0; /* Remove padding to adjust for header */
  box-shadow: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* Prevent focus for the entire floating box */
  &[tabindex="-1"] {
    outline: none;
    box-shadow: none;
  }
`;

const CloseButton = styled(Button)`
  position: absolute; /* Position absolutely within the header */
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: center; /* Center the title text */
  align-items: center;
  position: relative; /* Enable absolute positioning within the header */
  padding: 10px; /* Adjust padding to fit content correctly */
  border-bottom: 1px solid #555;
  cursor: move; /* Show move cursor for draggable header */
  width: 100%;
`;

const VoiceCommandHelp = ({ onClose }) => {
    const [isExpanded, setIsExpanded] = useState(true); // State to handle collapsing/expanding

    const toggleExpand = () => {
        setIsExpanded(!isExpanded); // Toggle between expanded and collapsed
    };

    return (
        <Draggable handle=".draggable-header">
            <FloatingBox tabIndex="-1">
                <Header className="draggable-header">
                    <Text
                        weight="bold"
                        size="medium"
                        onClick={toggleExpand}
                        style={{ cursor: 'pointer' }}
                    >
                        Voice Commands Help
                    </Text>
                    <CloseButton type="button" onClick={onClose}>
                        X
                    </CloseButton>
                </Header>
                {isExpanded && (
                    <Box pad={{ vertical: 'small' }}>
                        <dl>
                            {/* Control Commands */}
                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">stop listening</Text>
                                </dt>
                                <dd>
                                    <Text>Stops voice recognition.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">send</Text>
                                </dt>
                                <dd>
                                    <Text>Sends the current message.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">erase</Text>
                                </dt>
                                <dd>
                                    <Text>Erases the text area.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">show voice commands</Text>
                                </dt>
                                <dd>
                                    <Text>Shows the Voice Commands Help List.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide voice commands</Text>
                                </dt>
                                <dd>
                                    <Text>Hides the Voice Commands Help List.</Text>
                                </dd>
                            </Box>

                            {/* Toggle Commands */}
                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">Show dashboard charts</Text>
                                </dt>
                                <dd>
                                    <Text>Shows the display of dashboard charts.</Text>
                                </dd>
                            </Box>
                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">Hide dashboard charts</Text>
                                </dt>
                                <dd>
                                    <Text>Hides the display of dashboard charts.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">show live view charts</Text>
                                </dt>
                                <dd>
                                    <Text>Shows the display of live view charts.</Text>
                                </dd>
                            </Box>
                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide live view charts</Text>
                                </dt>
                                <dd>
                                    <Text>Hides the display of live view charts.</Text>
                                </dd>
                            </Box>

                            {/* Open Commands */}
                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open patient info</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Patient Info popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open overview</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Overview popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open orders</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Orders popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open refills</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Refills popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open consult</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Consult popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open ambient</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Ambient Notes popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open notes</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Notes popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open summary</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Summary popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open ai insights</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the AI Insights popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open imaging</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Imaging popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open labs</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Labs popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open vitals</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Vitals popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">open commands</Text>
                                </dt>
                                <dd>
                                    <Text>Opens the Commands popup.</Text>
                                </dd>
                            </Box>

                            {/* Close Commands */}
                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide patient info</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Patient Info popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide overview</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Overview popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide orders</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Orders popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide refills</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Refills popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide consult</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Consult popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide ambient</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Ambient Notes popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide notes</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Notes popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide summary</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Summary popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide ai insights</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the AI Insights popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide imaging</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Imaging popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide labs</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Labs popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide vitals</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Vitals popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide commands</Text>
                                </dt>
                                <dd>
                                    <Text>Closes the Commands popup.</Text>
                                </dd>
                            </Box>

                            <Box margin={{ bottom: 'small' }}>
                                <dt>
                                    <Text weight="bold">hide all tabs</Text>
                                </dt>
                                <dd>
                                    <Text>Closes all open popups.</Text>
                                </dd>
                            </Box>
                        </dl>
                    </Box>
                )}
            </FloatingBox>
        </Draggable>
    );
};

export default VoiceCommandHelp;
