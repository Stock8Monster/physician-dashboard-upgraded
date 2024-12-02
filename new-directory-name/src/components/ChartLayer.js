import React from 'react';
import { Box, Layer, Heading, Button, Text, Anchor } from 'grommet';

const ChartLayer = ({ charts, handleChartClick, setIsChartSidebarOpen }) => (
    <Layer
        position="right"
        full="vertical"
        modal={false}
        onEsc={() => setIsChartSidebarOpen(false)}
        onClickOutside={() => setIsChartSidebarOpen(false)}
    >
        console.log("in chart layer now");
        <Box
            background="dark-2"
            pad="medium"
            width="medium"
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <Heading level={3} margin="none">Patient Charts</Heading>
            <br/>
            <Box gap="small">
                {charts.map((chart, index) => (
                    <Box key={index} margin={{ bottom: 'small' }}>
                        <Anchor href="#" onClick={() => handleChartClick(index)}>
                            <Text>{chart.Record.chartTitle}</Text>
                        </Anchor>
                    </Box>
                ))}
            </Box>
            <Button label="Close" onClick={() => setIsChartSidebarOpen(false)} margin={{ top: 'auto' }} />
        </Box>
    </Layer>
);

export default ChartLayer;
