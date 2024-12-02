// components/LoadingSpinner.js
import React from 'react';
import { Box, Spinner, Text } from 'grommet';

const LoadingSpinner = () => (
    <Box fill align="center" justify="center">
        <Spinner size="large" />
        <Text margin={{ top: 'small' }}>Loading...</Text>
    </Box>
);

export default LoadingSpinner;
