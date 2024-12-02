import React from 'react';
import { Box, Grid } from 'grommet';
import CardTemplate from './CardTemplate';
import { bloodPressureData } from '../data/bloodPressureData';
import DynamicIframePage from "./DynamicIframePage";

const ChartArea = ({ chartScript }) => {
    return (
        <Box fill overflow="hidden" width={'50%'}>
            <Grid
                fill
                rows={['auto']}  // Each row adjusts to the content
                columns={['full']}
                gap="medium"
            >
                <DynamicIframePage chartScript={chartScript} />
            </Grid>
        </Box>
    );
};

export default ChartArea;
