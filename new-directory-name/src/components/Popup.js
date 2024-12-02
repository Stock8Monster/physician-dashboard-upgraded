import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import { Box, Button, Text } from 'grommet';
import { Up, Down } from 'grommet-icons';
import { useResponsive } from '../contexts/ResponsiveContext';

// Styled component for the Popup container
const FloatingBox = styled(Box)`
  position: fixed;
  background-color: #333;
  color: white;
  border: 1px solid #444;
  border-radius: 5px;
  z-index: 9500;
  padding: 0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: opacity 0.3s ease, height 0.3s ease, pointer-events 0.3s ease;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &[tabindex='-1'] {
    outline: none;
    box-shadow: none;
  }
`;

const CloseButton = styled(Button)`
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
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #555;
  background-color: #444444;
  outline: none !important;
  box-shadow: none !important;
  cursor: move;
  width: 100%;
`;

const CollapsedBody = styled(Box)`
  pointer-events: none;
  height: 0;
  overflow: hidden;
  flex: 0;
`;

const Popup = ({ isVisible, onClose, content, title }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [popupSize, setPopupSize] = useState({ width: 800, height: 600 });
    const [position, setPosition] = useState({ x: window.innerWidth / 2 - 400, y: 100 });
    const [isResizing, setIsResizing] = useState(false); // New state for resizing
    const rndRef = useRef(null);
    const { isMobile } = useResponsive();

    // Toggle expand state and reset position if necessary
    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
        if (!isExpanded) {
            setPosition((prevPos) => ({ x: prevPos.x, y: prevPos.y }));
            setPopupSize((prevSize) => ({ width: prevSize.width, height: 600 }));
        }
    };

    // Handle position updates during drag events
    const handleDragStop = (e, data) => {
        setPosition({ x: data.x, y: data.y });
    };

    // Handle resizing events
    const handleResizeStop = (e, direction, ref, delta, position) => {
        setIsResizing(false); // Stop resizing
        setPopupSize({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        });
        setPosition(position);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay to capture mouse events during resizing */}
            {isResizing && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 9499, // Less than Popup's zIndex
                        cursor: 'nwse-resize', // Show resize cursor
                    }}
                />
            )}
            <Rnd
                ref={rndRef}
                size={{
                    width: isMobile ? '100vw' : popupSize.width,
                    height: isMobile ? 'auto' : popupSize.height
                }}
                position={isMobile ? { x: 0, y: 0 } : position}
                onDragStop={handleDragStop}
                onResizeStart={(e, dir, ref) => {
                    setIsResizing(true); // Start resizing
                }}
                onResizeStop={handleResizeStop}
                minWidth={400}
                minHeight={50}
                bounds="window"
                dragHandleClassName="draggable-header"
                enableUserSelectHack={false}
                disableDragging={isMobile}
                style={{
                    maxWidth: '100vw',
                    overflow: 'auto'
                }}
            >
                <FloatingBox
                    tabIndex="-1"
                    style={{
                        width: `${popupSize.width}px`,
                        height: isExpanded ? `${popupSize.height}px` : '50px',
                        opacity: isExpanded ? '1' : '0.8',
                    }}
                >
                    <Header className="draggable-header">
                        <Text weight="bold" size="medium" style={{ flex: 1, textAlign: 'center' }}>
                            {title}
                        </Text>
                        <Box direction="row" align="center">
                            <Button onClick={toggleExpand}>
                                {isExpanded ? <Up color="white" /> : <Down color="white" />}
                            </Button>
                            <CloseButton onClick={onClose} style={{ marginLeft: '10px' }}>
                                X
                            </CloseButton>
                        </Box>
                    </Header>

                    {isExpanded ? (
                        <Box pad={{ vertical: 'small' }} style={{ flex: '1', overflowY: 'auto' }}>
                            <div className="popup-content" style={{ paddingRight: '20px' }}>
                                {content}
                            </div>
                        </Box>
                    ) : (
                        <CollapsedBody />
                    )}
                </FloatingBox>
            </Rnd>
        </>
    );
};

export default Popup;
