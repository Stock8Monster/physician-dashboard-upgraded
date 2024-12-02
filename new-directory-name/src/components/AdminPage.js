import React, { useState } from 'react';
import { Box, Heading, Button, Layer } from 'grommet';
import { Add } from 'grommet-icons';
import PatientDataTable from './PatientDataTable';
import PatientDetails from './PatientDetails';
import EditPatient from './EditPatient'; // This will be used for adding a new patient

const AdminPage = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAddPatient, setShowAddPatient] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
    };

    const handleAddPatient = () => {
        setEditingPatient(null);
        setShowAddPatient(true);
    };

    const handleEditPatient = (patient) => {
        setEditingPatient(patient);
        setShowAddPatient(true);
    };

    const handleCloseAddPatient = () => {
        setShowAddPatient(false);
    };

    return (
        <Box
            pad="medium"
            background="#1c1c1c" // Body background color
            style={{ minHeight: '100vh' }} // Ensure the background fills the viewport
        >
            <Heading
                level="2"
                color="#fff" // Neon cyan text for specific headings
                margin={{ bottom: 'small' }}
            >
                Admin Page
            </Heading>

            <Box
                direction="row"
                justify="between"
                align="center"
                margin={{ bottom: 'medium' }}
                background="#333333" // Background for the top menu
                pad="small"
                round="small"
            >
                <Button
                    icon={<Add />}
                    label="Add New Patient"
                    onClick={handleAddPatient}
                    primary
                    color="#FFFFFF" // Button text color
                    style={{borderRadius: "5px"}}
                />
            </Box>

            <Box
                direction="row"
                gap="medium"
                background="#1c1c1c" // Background for the left panel
                pad="medium"
                round="small"
            >
                <PatientDataTable onSelect={handlePatientSelect} onEdit={handleEditPatient} />
            </Box>

            {showAddPatient && (
                <Layer
                    position="center"
                    onClickOutside={handleCloseAddPatient}
                    onEsc={handleCloseAddPatient}
                >
                    <Box
                        pad="medium"
                        gap="small"
                        background="#1c1c1c" // Layer content background
                        round="small"
                    >
                        <Heading level="3" margin="none" color="#fff">
                            {editingPatient ? 'Edit Patient' : 'Add New Patient'}
                        </Heading>
                        <EditPatient
                            patient={editingPatient || {}}
                            onClose={handleCloseAddPatient}
                        />
                    </Box>
                </Layer>
            )}
        </Box>
    );
};

export default AdminPage;
