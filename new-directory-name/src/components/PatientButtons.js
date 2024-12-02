// components/PatientButtons.js
import React from 'react';
import { Box, Button } from 'grommet';
import PatientButton from './PatientButton';

const PatientButtons = ({ patientNames, handlePatientClick, expandedButton, loading }) => {
    return (
        <Box style={{ width: '100%', padding: '16px', position: 'relative' }}>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {patientNames.map((patient, index) => (
                    <PatientButton
                        key={index}
                        name={patient.name}
                        onClick={() => handlePatientClick(patient)}
                        expanded={expandedButton === patient.name}
                        disabled={loading} // Disable buttons when loading
                    />
                ))}
            </Box>
        </Box>
    );
};

export default PatientButtons;
