import React, { useState } from 'react';
import {Box, TextInput, Button, DataTable, FormField} from 'grommet';
import { Add, Edit, Trash, Save } from 'grommet-icons';
import styled from "styled-components";
import {StyledFormField} from "../styles/admin";

const Allergies = ({ allergies, onUpdate }) => {
    const [newAllergy, setNewAllergy] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingAllergy, setEditingAllergy] = useState('');


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

    const handleAdd = () => {
        if (newAllergy.trim() === '') return;
        onUpdate([...allergies, newAllergy]);
        setNewAllergy('');
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingAllergy(allergies[index].allergy);
    };

    const handleSaveEdit = (index) => {
        const updatedAllergies = [...allergies];
        updatedAllergies[index].allergy = editingAllergy;
        onUpdate(updatedAllergies);
        setEditingIndex(null);
        setEditingAllergy('');
    };

    const handleDelete = (index) => {
        const updatedAllergies = allergies.filter((_, i) => i !== index);
        onUpdate(updatedAllergies);
    };

    return (
        <Box height="large" overflow="auto">
            <Box direction="row" gap="small" align="center" pad={{ vertical: 'large' }}>
                <StyledFormField>
                    <TextInput
                        placeholder="Add new allergy"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                    />
                </StyledFormField>
                <Button icon={<Add />} onClick={handleAdd} />
            </Box>
            <StyledDataTable
                primaryKey="index"
                columns={[
                    {
                        property: 'allergy',
                        header: 'Allergy',
                        primary: false,
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    value={editingAllergy}
                                    onChange={(e) => setEditingAllergy(e.target.value)}
                                />
                            ) : (
                                <span>
                                    {typeof data.allergy === 'object'
                                        ? `${data.allergy.name} (Reaction: ${data.allergy.reaction}, Criticality: ${data.allergy.criticality})`
                                        : data.allergy}
                                </span>
                            ),
                    },
                    {
                        property: 'actions',
                        header: 'Actions',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <Button icon={<Save />} onClick={() => handleSaveEdit(data.index)} />
                            ) : (
                                <Box direction="row" gap="small">
                                    <Button icon={<Edit />} onClick={() => handleEdit(data.index)} />
                                    <Button icon={<Trash />} onClick={() => handleDelete(data.index)} />
                                </Box>
                            ),
                    },
                ]}
                data={allergies.map((allergy, index) => ({ allergy, index }))}
            />
        </Box>
    );
};

export default Allergies;
