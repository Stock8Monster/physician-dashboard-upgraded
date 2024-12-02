import React, { useState } from 'react';
import { Box, FormField, TextInput, Button, DataTable } from 'grommet';
import { Add, Edit, Trash, Save } from 'grommet-icons';
import { StyledDataTable } from "../styles/admin";
import styled from "styled-components";
import {StyledFormField} from "../styles/admin";

const ActiveProblems = ({ problems, onUpdate }) => {



    const [newProblem, setNewProblem] = useState({ problem: '', notedDate: '', diagnosedDate: '' });
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingProblem, setEditingProblem] = useState({ problem: '', notedDate: '', diagnosedDate: '' });

    const handleAdd = () => {
        if (newProblem.problem.trim() === '' || newProblem.notedDate.trim() === '' || newProblem.diagnosedDate.trim() === '') return;
        onUpdate([...problems, newProblem]);
        setNewProblem({ problem: '', notedDate: '', diagnosedDate: '' });
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditingProblem(problems[index]);
    };

    const handleSaveEdit = (index) => {
        const updatedProblems = [...problems];
        updatedProblems[index] = editingProblem;
        onUpdate(updatedProblems);
        setEditingIndex(null);
        setEditingProblem({ problem: '', notedDate: '', diagnosedDate: '' });
    };

    const handleDelete = (index) => {
        const updatedProblems = problems.filter((_, i) => i !== index);
        onUpdate(updatedProblems);
    };

    return (
        <Box height="large" overflow="auto">
            <Box direction="row" gap="small" align="center" pad={{ vertical: 'large' }}>
                <StyledFormField>
                    <TextInput
                        placeholder="Add new problem"
                        value={newProblem.problem}
                        onChange={(e) => setNewProblem({ ...newProblem, problem: e.target.value })}
                    />
                </StyledFormField>
                <StyledFormField>
                <TextInput
                    placeholder="Noted Date"
                    value={newProblem.notedDate}
                    onChange={(e) => setNewProblem({ ...newProblem, notedDate: e.target.value })}
                />
                </StyledFormField>
                <StyledFormField>
                <TextInput
                    placeholder="Diagnosed Date"
                    value={newProblem.diagnosedDate}
                    onChange={(e) => setNewProblem({ ...newProblem, diagnosedDate: e.target.value })}
                />
                </StyledFormField>
                <Button icon={<Add />} onClick={handleAdd} />
            </Box>
            <StyledDataTable
                primaryKey="index"
                columns={[
                    {
                        property: 'problem',
                        header: 'Problem',
                        primary: false,
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    value={editingProblem.problem}
                                    onChange={(e) => setEditingProblem({ ...editingProblem, problem: e.target.value })}
                                />
                            ) : (
                                data.problem
                            ),
                    },
                    {
                        property: 'notedDate',
                        header: 'Noted Date',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    value={editingProblem.notedDate}
                                    onChange={(e) => setEditingProblem({ ...editingProblem, notedDate: e.target.value })}
                                />
                            ) : (
                                data.notedDate
                            ),
                    },
                    {
                        property: 'diagnosedDate',
                        header: 'Diagnosed Date',
                        render: (data) =>
                            editingIndex === data.index ? (
                                <TextInput
                                    value={editingProblem.diagnosedDate}
                                    onChange={(e) => setEditingProblem({ ...editingProblem, diagnosedDate: e.target.value })}
                                />
                            ) : (
                                data.diagnosedDate
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
                data={problems.map((problem, index) => ({ ...problem, index }))}
            />
        </Box>
    );
};

export default ActiveProblems;
