// components/ResizableSplitPane.js
import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import { FormNext, FormPrevious } from 'grommet-icons';

const ResizableSplitPane = ({ children }) => {
    const [leftWidth, setLeftWidth] = useState('50%');
    const [isDragging, setIsDragging] = useState(false);

    const startDragging = () => setIsDragging(true);
    const stopDragging = () => setIsDragging(false);
    const handleDragging = (e) => {
        if (!isDragging) return;
        const newLeftWidth = `${(e.clientX / window.innerWidth) * 100}%`;
        setLeftWidth(newLeftWidth);
    };

    return (
        <Box
            direction="row"
            fill
            onMouseMove={handleDragging}
            onMouseUp={stopDragging}
            style={{ userSelect: 'none' }}
        >
            <Box width={leftWidth} overflow="hidden">
                {children[0]}
            </Box>
            <Box
                width="10px"
                background={isDragging ? 'accent-2' : 'dark-3'}
                cursor="col-resize"
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                style={{
                    zIndex: 1,
                    borderLeft: '2px solid',
                    borderColor: isDragging ? 'accent-1' : 'dark-3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                <FormPrevious color="light-1" style={{ position: 'absolute', left: '-12px' }} />
                <FormNext color="light-1" style={{ position: 'absolute', right: '-12px' }} />
            </Box>
            <Box flex overflow="hidden">
                {children[1]}
            </Box>
        </Box>
    );
};

export default ResizableSplitPane;
