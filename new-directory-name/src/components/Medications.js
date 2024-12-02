import React, {useState} from 'react';
import {Box, TextInput, Button, DataTable, FormField} from 'grommet';
import {Add, Edit, Trash, Save} from 'grommet-icons';
import {StyledDataTable} from "../styles/admin";
import styled from "styled-components";
import {StyledFormField} from "../styles/admin";

const Medications = ({medications, onUpdate}) => {

    const initialMedication = {name: '', dosage: '', indication: '', startDate: ''};
    const [newMedication, setNewMedication] = useState(initialMedication);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingMedication, setEditingMedication] = useState(initialMedication);

    const handleAdd = () => {
        if (newMedication.name.trim() === '') return;
        onUpdate([...medications, newMedication]);
        setNewMedication(initialMedication);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingMedication(medications[index]);
    };

    const handleSaveEdit = (index) => {
        const updatedMedications = [...medications];
        updatedMedications[index] = editingMedication;
        onUpdate(updatedMedications);
        setEditingIndex(null);
        setEditingMedication(initialMedication);
    };

    const handleDelete = (index) => {
        const updatedMedications = medications.filter((_, i) => i !== index);
        onUpdate(updatedMedications);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewMedication((prev) => ({...prev, [name]: value}));
    };

    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setEditingMedication((prev) => ({...prev, [name]: value}));
    };

    return (
        <Box height="large" overflow="auto">
            <Box direction="" gap="small" align="center" pad={{vertical: 'large'}}>
                <StyledFormField>
                    <TextInput
                        placeholder="Name"
                        name="name"
                        value={newMedication.name}
                        onChange={handleChange}
                    />
                </StyledFormField>
                <StyledFormField>
                    <TextInput
                        placeholder="Dosage"
                        name="dosage"
                        value={newMedication.dosage}
                        onChange={handleChange}
                    />
                </StyledFormField>
                <StyledFormField>
                    <TextInput
                        placeholder="Indication"
                        name="indication"
                        value={newMedication.indication}
                        onChange={handleChange}
                    />
                </StyledFormField>
                <StyledFormField>
                    <TextInput
                        placeholder="Start Date"
                        name="startDate"
                        value={newMedication.startDate}
                        onChange={handleChange}
                    />
                </StyledFormField>
                <Button icon={<Add/>} onClick={handleAdd}/>
            </Box>
            <StyledDataTable
                primaryKey="index"
                columns={[
                    {
                        property: 'name',
                        header: 'Name',
                        primary: false,
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    name="name"
                                    value={editingMedication.name}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                data.name
                            ),
                    },
                    {
                        property: 'dosage',
                        header: 'Dosage',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    name="dosage"
                                    value={editingMedication.dosage}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                data.dosage
                            ),
                    },
                    {
                        property: 'indication',
                        header: 'Indication',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    name="indication"
                                    value={editingMedication.indication}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                data.indication
                            ),
                    },
                    {
                        property: 'startDate',
                        header: 'Start Date',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    name="startDate"
                                    value={editingMedication.startDate}
                                    onChange={handleEditChange}
                                />
                            ) : (
                                data.startDate
                            ),
                    },
                    {
                        property: 'actions',
                        header: 'Actions',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <Button icon={<Save/>} onClick={() => handleSaveEdit(data.index)}/>
                            ) : (
                                <Box direction="row" gap="small">
                                    <Button icon={<Edit/>} onClick={() => handleEdit(data.index)}/>
                                    <Button icon={<Trash/>} onClick={() => handleDelete(data.index)}/>
                                </Box>
                            ),
                    },
                ]}
                data={medications.map((medication, index) => ({...medication, index}))}
            />
        </Box>
    );
};

export default Medications;
