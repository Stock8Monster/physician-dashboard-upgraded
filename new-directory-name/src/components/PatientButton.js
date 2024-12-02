// components/PatientButton.js
import React from 'react';
import { Box } from 'grommet';

const PatientButton = ({ name, onClick, expanded, disabled }) => (
    <Box
        style={{
            backgroundColor: disabled ? '#f0f0f0' : '#0072ff',
            color: disabled ? '#aaa' : 'white',
            margin: '8px 0',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            width: '100%',
            maxWidth: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled ? 0.6 : 1,
        }}
        onClick={!disabled ? onClick : undefined} // Prevent onClick when disabled
    >
        {expanded ? `${name}` : `${name}`}
    </Box>
);

export default PatientButton;
