import React from 'react';
import { ChartContainer, Iframe } from './StyledComponents';
import { useResponsive } from '../../contexts/ResponsiveContext';

const Chart = ({ chart, index, handleIframeLoad, dashboardCharts, onDemandCharts }) => {
    const isHidden = (!dashboardCharts && chart.Record.chartDescription !== 'dynamic') ||
        (!onDemandCharts && chart.Record.chartDescription === 'dynamic');
    const { isMobile } = useResponsive();

    return (
        <ChartContainer 
            key={index} 
            style={{ 
                display: isHidden ? 'none' : 'block',
                height: isMobile ? '400px' : 'auto',
                marginBottom: isMobile ? '20px' : '15px'
            }}
        >
            <Iframe
                srcDoc={chart.Record.chartHTML}
                title={`chart-${index}`}
                onLoad={handleIframeLoad}
                data-dashboard-chart
            />
        </ChartContainer>
    );
};

export default Chart;
