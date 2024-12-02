import React from 'react';
import { Box, Grid } from 'grommet';
import CardTemplate from './CardTemplate';
import { bloodPressureData } from '../data/bloodPressureData';

const ChartArea = ({ chartScript }) => {
    return (
        <Box fill overflow="auto" width={'50%'}>
            <Grid
                fill
                rows={['auto']}  // Each row adjusts to the content
                columns={['full']}
                gap="medium"
            >
                <CardTemplate title="Heart Rate" data={bloodPressureData} chartScript={chartScript} />
                <CardTemplate title="Blood Pressure" data={bloodPressureData} chartScript={chartScript} />
                <CardTemplate title="Risk Factors" data={bloodPressureData} chartScript={chartScript} />
            </Grid>
        </Box>
    );
};

export default ChartArea;
