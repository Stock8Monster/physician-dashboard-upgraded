import React, { useState, useEffect } from 'react';
import { Box, FormField, TextInput, TextArea, Button, Layer, Select, Text, Spinner } from 'grommet';
import styled from 'styled-components';
import patientService from '../services/patientService';
import {CustomSelect, StyledFormField} from "../styles/admin";

// Styled components using the provided color scheme
const StyledButton = styled(Button)`
  border-radius: 5px;
  border: 0px solid #333 !important; // Neon cyan border
  padding: 0.5rem 1rem;
  background-color: #444444 !important;; // Background for buttons
  color: #FFFFFF !important;; // Text color
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover {
    background-color: #555555 !important;; // Hover background
    box-shadow: 0 4px 12px #444 !important;;
  }
  &:disabled {
    background-color: #c6c6c6;
    border-color: #c6c6c6;
  }
  &:focus {
    outline: none;
    box-shadow: none; // Remove focus outline
  }
`;

// Styled delete button
const DeleteButton = styled(Button)`
  border-radius: 5px;
  border: 1px solid #ff0000;
  padding: 0.5rem 1rem;
  background-color: #ff0000;
  color: #FFFFFF;
  font-weight: bold;
  transition: all 0.3s ease;
  &:hover {
    background-color: #cc0000;
    box-shadow: 0 4px 12px rgba(255, 0, 0, 0.4);
  }
  &:focus {
    outline: none;
    box-shadow: none; // Remove focus outline
  }
`;

const PatientCharts = ({ patientId, charts, onChartsUpdate }) => {
    const [chartTitle, setChartTitle] = useState('');
    const [chartDescription, setChartDescription] = useState('');
    const [chartHTML, setChartHTML] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [selectedChart, setSelectedChart] = useState('Add New Chart');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
            setIsAdmin(true);
        }
    }, []);

    useEffect(() => {
        if (selectedChart !== 'Add New Chart') {
            const selected = charts.find((chart) => chart.Key === selectedChart);
            if (selected && selected.Record) {
                setChartTitle(selected.Record.chartTitle);
                setChartDescription(selected.Record.chartDescription);
                setChartHTML(selected.Record.chartHTML);
            }
        }
    }, [selectedChart, charts]);

    const handlePreview = () => {
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    const handleSaveChart = async () => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            return; // Exit function if user is not an admin
        }
        setIsLoading(true);
        const chartData = {
            patientId,
            chartId: selectedChart === 'Add New Chart' ? undefined : selectedChart,
            chartTitle,
            chartDescription,
            chartHTML,
        };

        let updatedCharts;
        try {
            if (selectedChart === 'Add New Chart') {
                const newChart = { Key: `new-${Date.now()}`, Record: { chartTitle, chartDescription, chartHTML } };
                updatedCharts = [...charts, newChart];
                await patientService.createChart(chartData);
            } else {
                updatedCharts = charts.map((chart) =>
                    chart.Key === selectedChart
                        ? { Key: chart.Key, Record: { ...chart.Record, chartTitle, chartDescription, chartHTML } }
                        : chart
                );
                await patientService.replaceChart(chartData);
            }
            onChartsUpdate(updatedCharts);
        } catch (error) {
            console.error('Failed to save chart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectChart = (option) => {
        if (option === 'Add New Chart') {
            setSelectedChart(option);
            setChartTitle('');
            setChartDescription('');
            setChartHTML('');
        } else {
            const selected = charts.find((chart) => chart.Record.chartTitle === option);
            if (selected) {
                setSelectedChart(selected.Key);
                setChartTitle(selected.Record.chartTitle);
                setChartDescription(selected.Record.chartDescription);
                setChartHTML(selected.Record.chartHTML);
            }
        }
    };

    const handleDeleteChart = async () => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            return; // Exit function if user is not an admin
        }
        setIsLoading(true);
        if (selectedChart && selectedChart !== 'Add New Chart') {
            try {
                await patientService.deleteChart({ chartId: selectedChart });
                const updatedCharts = charts.filter((chart) => chart.Key !== selectedChart);
                onChartsUpdate(updatedCharts);
                setSelectedChart('Add New Chart');
                setChartTitle('');
                setChartDescription('');
                setChartHTML('');
                setShowConfirmDelete(false);
            } catch (error) {
                console.error('Failed to delete chart:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Box direction="row" gap="medium">
            {isLoading && (
                <Layer>
                    <Box pad="large" align="center" gap="small">
                        <Spinner />
                        <Text>Processing...</Text>
                    </Box>
                </Layer>
            )}
            <Box width="30%" gap="medium">
                <StyledFormField name="selectChart" label="Select Chart">
                    <CustomSelect
                        plain
                        options={['Add New Chart', ...charts.map((chart) => chart.Record.chartTitle)]}
                        value={selectedChart === 'Add New Chart' ? selectedChart : charts.find(chart => chart.Key === selectedChart)?.Record.chartTitle}
                        onChange={({ option }) => handleSelectChart(option)}
                    />
                </StyledFormField>
                <StyledFormField name="chartTitle" label="Chart Title">
                    <TextInput
                        name="chartTitle"
                        value={chartTitle}
                        onChange={(event) => setChartTitle(event.target.value)}
                    />
                </StyledFormField>
                <StyledFormField name="chartDescription" label="Chart Description">
                    <TextInput
                        name="chartDescription"
                        value={chartDescription}
                        onChange={(event) => setChartDescription(event.target.value)}
                    />
                </StyledFormField>
                <Box direction="row" gap="medium" justify="center" align="center">
                    <StyledButton
                        label="Save Chart"
                        onClick={handleSaveChart}
                        disabled={!isAdmin || !chartTitle.trim() || !chartHTML.trim()}
                    />
                    <StyledButton
                        label="Preview Chart"
                        onClick={handlePreview}
                        disabled={!chartHTML.trim()}
                    />
                    {selectedChart !== 'Add New Chart' && (
                        <DeleteButton
                            label="Delete Chart"
                            disabled={!isAdmin}
                            onClick={() => setShowConfirmDelete(true)}
                        />
                    )}
                </Box>
            </Box>
            <Box width="70%">
                <FormField name="chartHTML" label="HTML">
                    <TextArea
                        name="chartHTML"
                        value={chartHTML}
                        onChange={(event) => setChartHTML(event.target.value)}
                        rows={20}
                    />
                </FormField>
            </Box>
            {showPreview && (
                <Layer onEsc={handleClosePreview} onClickOutside={handleClosePreview} align="center" justify="center">
                    <Box pad="medium" gap="small" width="80vw" height="80vh" overflow="auto" align="center" justify="center">
                        <Box direction="row" justify="between" align="center" width="100%">
                            <h1>{chartTitle}</h1>
                            <Button label="Close" onClick={handleClosePreview} />
                        </Box>
                        <p>{chartDescription}</p>
                        <Box width="100%" height="100%">
                            <iframe
                                srcDoc={chartHTML}
                                title="Chart Preview"
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            />
                        </Box>
                    </Box>
                </Layer>
            )}
            {showConfirmDelete && (
                <Layer position="center" onClickOutside={() => setShowConfirmDelete(false)} onEsc={() => setShowConfirmDelete(false)}>
                    <Box pad="medium" gap="small">
                        <Text>Are you sure you want to delete this chart?</Text>
                        <Box direction="row" gap="medium" justify="center">
                            <DeleteButton label="Yes" onClick={handleDeleteChart} disabled={!isAdmin} />
                            <Button label="No" onClick={() => setShowConfirmDelete(false)} />
                        </Box>
                    </Box>
                </Layer>
            )}
        </Box>
    );
};

export default PatientCharts;
