// components/Sidebar.js
import React from 'react';
import { Box, Button, Layer, Heading } from 'grommet';
import PatientButtons from './PatientButtons';

const Sidebar = ({ isOpen, onClose, patientNames, handlePatientClick, expandedButton, loading }) => {
    return (
        isOpen && (
            <Layer
                position="left"
                full={false}
                modal={true}
                onEsc={onClose}
                onClickOutside={onClose}
                style={{ width: '300px', height: 'auto' }} // Adjust dimensions to fit the middle white area
            >
                <Box
                    background="dark-2"
                    pad="medium"
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <Heading level={3} margin="none">Select a Patient</Heading>
                    <PatientButtons
                        patientNames={patientNames}
                        handlePatientClick={(patient) => { handlePatientClick(patient); onClose(); }}
                        expandedButton={expandedButton}
                        loading={loading}
                    />
                    <Button label="Close" onClick={onClose} margin={{ top: 'auto' }} />
                </Box>
            </Layer>
        )
    );
};

export default Sidebar;
