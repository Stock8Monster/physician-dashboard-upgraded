// components/Header.js
import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { StyledHeader, StyledButton } from '../styles/StyledComponents';

const Header = ({ selectedPatient, setIsSidebarOpen, isChartSidebarOpen, setIsChartSidebarOpen }) => (
    <StyledHeader>
        <Box>
            {selectedPatient ? (
                <Heading level={3} margin="none" color="white">{selectedPatient.name}'s Dashboard</Heading>
            ) : (
                <Text color="light-1">Welcome Doctor, Please select a Patient to get Started:</Text>
            )}
        </Box>
        <Box direction="row" gap="small">
            <StyledButton label="Select Patient" onClick={() => setIsSidebarOpen(true)} />
            <StyledButton
                label={isChartSidebarOpen ? "Close Chart Sidebar" : "Open Chart Sidebar"}
                onClick={() => setIsChartSidebarOpen(!isChartSidebarOpen)}
            />
        </Box>
    </StyledHeader>
);

export default Header;
