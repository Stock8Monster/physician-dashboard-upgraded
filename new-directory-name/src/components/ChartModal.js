// components/ChartModal.js
import React, { useState, useEffect } from 'react';
import { Box, Layer, Heading, Button, Select, Text } from 'grommet';
import { FullHeightIframeWrapper } from '../styles/StyledComponents';

const ChartModal = ({ charts, selectedChartIndex, setIsChartModalOpen, patientName }) => {
    const [currentChartIndex, setCurrentChartIndex] = useState(selectedChartIndex);
    console.log("CHART MODAL IS OPEN");
    console.log("Initial selectedChartIndex:", selectedChartIndex);
    console.log("Charts:", charts);

    useEffect(() => {
        setCurrentChartIndex(selectedChartIndex);
    }, [selectedChartIndex]);

    return (
        <Layer
            onEsc={() => setIsChartModalOpen(false)}
            onClickOutside={() => setIsChartModalOpen(false)}
            position="center"
            style={{ width: '80%', height: '80%' }}
        >
            <Box
                background="dark-2"
                pad="medium"
                style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <Box direction="row" align="center" justify="between" margin={{ bottom: 'medium' }}>
                    <Heading level={3} margin="none">{charts.length} Patient Chart(s) Available</Heading>
                    <Box direction="row" align="center">
                        <Text margin={{ right: 'small' }}>Viewing Chart</Text>
                        <Select
                            options={charts.map(chart => chart.Record.chartTitle)}
                            value={charts[currentChartIndex]?.Record?.chartTitle}
                            onChange={({ option, selected }) => setCurrentChartIndex(selected)}
                        />
                    </Box>
                </Box>
                <Box flex style={{ height: '100%', width: '100%' }}>
                    <FullHeightIframeWrapper>
                        <iframe
                            srcDoc={charts[currentChartIndex]?.Record?.chartHTML}
                            title={`Chart ${currentChartIndex + 1}`}
                            style={{ width: '100%', height: '125%' }}
                        />
                    </FullHeightIframeWrapper>
                </Box>
                <Button label="Close" onClick={() => setIsChartModalOpen(false)} margin={{ top: 'auto' }} />
            </Box>
        </Layer>
    );
};

export default ChartModal;
