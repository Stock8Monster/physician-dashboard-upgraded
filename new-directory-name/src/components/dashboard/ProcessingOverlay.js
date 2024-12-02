// components/ProcessingOverlay.js
import React from 'react';
import { Box, Text, Spinner } from 'grommet';

const ProcessingOverlay = () => (
    <Box
        fill
        align="center"
        justify="center"
        background={{ color: 'rgba(0, 0, 0, 0.7)', opacity: 'strong' }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
    >
        <Spinner size="large" />
        <Text margin={{ top: 'small' }} size="large" color="white">Processing...</Text>
    </Box>
);

export default ProcessingOverlay;
