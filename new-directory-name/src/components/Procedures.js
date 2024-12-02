import React, {useState} from 'react';
import {Box, FormField, TextInput, Button, DataTable, TextArea} from 'grommet';
import {Add, Edit, Trash, Save} from 'grommet-icons';
import {StyledDataTable} from "../styles/admin";
import styled from "styled-components";
import {StyledFormField} from "../styles/admin";

const Procedures = ({procedures, onUpdate}) => {

    const [newProcedure, setNewProcedure] = useState({procedure: '', date: '', reason: ''});
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingProcedure, setEditingProcedure] = useState({procedure: '', date: '', reason: ''});

    const handleAdd = () => {
        if (newProcedure.procedure.trim() === '' || newProcedure.date.trim() === '' || newProcedure.reason.trim() === '') return;
        onUpdate([...procedures, newProcedure]);
        setNewProcedure({procedure: '', date: '', reason: ''});
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingProcedure(procedures[index]);
    };

    const handleSaveEdit = (index) => {
        const updatedProcedures = [...procedures];
        updatedProcedures[index] = editingProcedure;
        onUpdate(updatedProcedures);
        setEditingIndex(null);
        setEditingProcedure({procedure: '', date: '', reason: ''});
    };

    const handleDelete = (index) => {
        const updatedProcedures = procedures.filter((_, i) => i !== index);
        onUpdate(updatedProcedures);
    };

    return (
        <Box height="large" overflow="auto">
            <Box direction="row" gap="small" align="center" pad={{vertical: 'large'}}>
                <StyledFormField>
                    <TextInput
                        placeholder="Procedure"
                        value={newProcedure.procedure}
                        onChange={(e) => setNewProcedure({...newProcedure, procedure: e.target.value})}
                    />
                </StyledFormField>
                <StyledFormField>
                    <TextInput
                        placeholder="Date"
                        value={newProcedure.date}
                        onChange={(e) => setNewProcedure({...newProcedure, date: e.target.value})}
                    />
                </StyledFormField>
                <StyledFormField>
                    <TextInput
                        placeholder="Reason"
                        value={newProcedure.reason}
                        onChange={(e) => setNewProcedure({...newProcedure, reason: e.target.value})}
                    />
                </StyledFormField>
                <Button icon={<Add/>} onClick={handleAdd}/>
            </Box>
            <StyledDataTable
                primaryKey="index"  // Specify a primary key that's not the first column
                columns={[
                    {
                        property: 'procedure',
                        header: 'Procedure',
                        primary: false,  // Explicitly set primary to false
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    value={editingProcedure.procedure}
                                    onChange={(e) => setEditingProcedure({
                                        ...editingProcedure,
                                        procedure: e.target.value
                                    })}
                                />
                            ) : (
                                data.procedure
                            ),
                    },
                    {
                        property: 'date',
                        header: 'Date',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    value={editingProcedure.date}
                                    onChange={(e) => setEditingProcedure({...editingProcedure, date: e.target.value})}
                                />
                            ) : (
                                data.date
                            ),
                    },
                    {
                        property: 'reason',
                        header: 'Reason',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    value={editingProcedure.reason}
                                    onChange={(e) => setEditingProcedure({...editingProcedure, reason: e.target.value})}
                                />
                            ) : (
                                data.reason
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
                data={procedures.map((procedure, index) => ({ ...procedure, index }))}
            />
        </Box>
    );
};

export default Procedures;
