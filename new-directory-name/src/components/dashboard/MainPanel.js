import React from 'react';
import { MainPanel as StyledMainPanel } from './StyledComponents';
import Chart from './ChartContainer';

const MainPanel = ({ selectedPatient, handleIframeLoad, dashboardCharts, onDemandCharts }) => {

    // Hardcoded order of chart titles
    const preferredOrder = [
        "1. Patient OVERVIEW",
        "2. Vitals with trends",
        "3. Labs Summary Scatter Plot with Drill Downs",
        "4. Labs with Trends",
        "5. Radiology Findings",
        "6 Medical Events Timeline",
        "7. medications",
        "8. REFERALS AND PREVENTATIVE SERVICES"
    ];

    // Function to sort charts based on the numeric prefix in the title dynamically
    const sortCharts = (charts) => {
        return charts.sort((a, b) => {
            // Extract numbers from chart titles
            const numberA = parseInt((a.Record.chartTitle || '').match(/^\d+/)); // Extracts the leading number
            const numberB = parseInt((b.Record.chartTitle || '').match(/^\d+/)); // Extracts the leading number

            // If either title does not contain a number, treat it as being at the end
            if (isNaN(numberA)) return 1;
            if (isNaN(numberB)) return -1;

            // Sort by the extracted numbers
            return numberA - numberB;
        });
    };


    // Sort the charts of the selected patient
    const sortedCharts = selectedPatient?.charts ? sortCharts([...selectedPatient.charts]) : [];

    return (
        <StyledMainPanel>
            {sortedCharts.length > 0 && sortedCharts.map((chart, index) => (
                <Chart
                    key={index}
                    chart={chart}
                    index={index}
                    handleIframeLoad={handleIframeLoad}
                    dashboardCharts={dashboardCharts}
                    onDemandCharts={onDemandCharts}
                />
            ))}
        </StyledMainPanel>
    );
};

export default MainPanel;
