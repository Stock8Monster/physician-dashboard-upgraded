import React, { useState, useEffect } from 'react';
import { Box, DataTable, Button, Layer, Text, Heading } from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import styled from 'styled-components';
import patientService from "../services/patientService";

// Styled Button to remove outlines and add hover styles
const StyledButton = styled(Button)`
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    background-color: #555555; /* Hover background */
    border-color: #555555; /* Ensure no border on hover */
    box-shadow: none; /* Remove any box-shadow on hover */
  }

  & svg {
    stroke: #ffffff; /* White icon color */
  }
`;

// Container styles
const StyledContainer = styled(Box)`
  background-color: #333; /* Center panel background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// Heading styles for neon cyan
const StyledHeading = styled(Heading)`
  color: #fff; /* Neon Cyan color for heading */
  margin-bottom: 10px;
`;

// Styled DataTable for dark mode
const StyledDataTable = styled(DataTable)`
  background-color: #333; /* Background for left panel */
  
  th {
    background-color: #444;
    color: #f0f0f0; /* Default text color */
    border-bottom: 1px solid #444444; /* Borders between rows */
  }

  th {
    background-color: #444; /* Header background */
    font-weight: bold;
  }

  td {
    background-color: #555; /* Header background */
  }

  tr:nth-child(even) {
    background-color: #555; /* Alternating row background */
  }
  
  tr:hover {
    background-color: #444444; /* Hover row background */
  }
`;

// Styled Layer for delete confirmation
const StyledLayer = styled(Layer)`
  background-color: #292929; /* Background for the modal */
  color: #f0f0f0; /* Text color inside modal */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const PatientDataTable = ({ onSelect, onEdit }) => {
    const [patients, setPatients] = useState([]);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
            setIsAdmin(true);
        }
    }, []);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientData = await patientService.listPatientsWithCharts();
                const mappedPatients = patientData.map(patient => ({
                    key: patient.Key,
                    name: patient.Record.name,
                    birthDate: patient.Record.birthDate,
                    gender: patient.Record.gender,
                    address: patient.Record.address,
                    ...patient.Record
                }));
                setPatients(mappedPatients);
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        };
        fetchPatients();
    }, []);

    const handleDelete = async () => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            return; // Exit function if user is not an admin
        }
        if (patientToDelete) {
            try {
                await patientService.deletePatient(patientToDelete.key);
                setPatients(patients.filter(patient => patient.key !== patientToDelete.key));
                setShowConfirmDelete(false);
                setPatientToDelete(null);
            } catch (error) {
                console.error('Failed to delete patient:', error);
            }
        }
    };

    return (
        <StyledContainer round="small">
            <Box direction="row" justify="between" align="center">
                <StyledHeading level="3">Patient List</StyledHeading>
            </Box>
            <StyledDataTable
                primaryKey="index"
                columns={[
                    {
                        property: 'name',
                        header: 'Name',
                    },
                    {
                        property: 'birthDate',
                        header: 'Birth Date'
                    },
                    {
                        property: 'gender',
                        header: 'Gender'
                    },
                    {
                        property: 'address',
                        header: 'Address',
                        size: 'medium'
                    },
                    {
                        property: 'edit',
                        header: '',
                        render: datum => (
                            <Box direction="row" gap="small">
                                <StyledButton icon={<Edit />} onClick={() => onEdit(datum)} />
                                <StyledButton disabled={!isAdmin} icon={<Trash />} onClick={() => {
                                    setPatientToDelete(datum);
                                    setShowConfirmDelete(true);
                                }} />
                            </Box>
                        ),
                        sortable: false
                    }
                ]}
                data={patients}
                onClickRow={({ datum }) => onSelect(datum)}
                pad="small"
            />
            {showConfirmDelete && (
                <StyledLayer
                    position="center"
                    onClickOutside={() => setShowConfirmDelete(false)}
                    onEsc={() => setShowConfirmDelete(false)}
                >
                    <Box pad="medium" gap="small">
                        <Text>Are you sure you want to delete this patient?</Text>
                        <Box direction="row" gap="medium" justify="center">
                            <Button label="Yes" onClick={handleDelete} disabled={!isAdmin}/>
                            <Button label="No" onClick={() => setShowConfirmDelete(false)} />
                        </Box>
                    </Box>
                </StyledLayer>
            )}
        </StyledContainer>
    );
};

export default PatientDataTable;
