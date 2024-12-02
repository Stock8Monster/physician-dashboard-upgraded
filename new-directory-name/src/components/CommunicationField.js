import React, { useState, useEffect } from 'react';
import { Box, FormField, TextInput, Button, Select, Text } from 'grommet';
import { Add, Edit, Trash } from 'grommet-icons';
import styled from "styled-components";
import {CustomSelect, StyledFormField} from "../styles/admin";

const communicationTypes = ['home', 'work', 'mobile', 'email', 'alternateEmail'];

const CommunicationField = ({ communication, onUpdate }) => {
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const initialEntries = Array.isArray(communication)
            ? communication
            : Object.entries(communication).map(([key, val]) => ({ type: key, value: val }));
        setEntries(initialEntries);
    }, [communication]);

    const handleAdd = () => {
        const newEntries = [...entries];
        if (editIndex !== null) {
            newEntries[editIndex] = { type, value };
            setEditIndex(null);
        } else {
            newEntries.push({ type, value });
        }
        setEntries(newEntries);
        setType('');
        setValue('');
        onUpdate(newEntries.reduce((acc, entry) => {
            acc[entry.type] = entry.value;
            return acc;
        }, {}));
    };

    const handleEdit = (index) => {
        setType(entries[index].type);
        setValue(entries[index].value);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setEntries(newEntries);
        onUpdate(newEntries.reduce((acc, entry) => {
            acc[entry.type] = entry.value;
            return acc;
        }, {}));
    };

    return (
        <Box>
            <Box direction="row" gap="small" align="center">
                <StyledFormField name="type" label="Communication Type">
                    <CustomSelect
                        plain
                        placeholder="Select Contact Type"
                        options={communicationTypes}
                        value={type}
                        onChange={({ option }) => setType(option)}
                    />
                </StyledFormField>
                <StyledFormField name="value" label="Value">
                    <TextInput
                        name="value"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                </StyledFormField>
                <Button icon={<Add />} onClick={handleAdd} />
            </Box>
            <Box margin={{ top: 'small' }}>
                {entries.map((comm, index) => (
                    <Box
                        key={index}
                        direction="row"
                        align="center"
                        justify="between"
                        gap="small"
                        pad={{ vertical: 'small' }}
                        border={{ side: 'bottom', color: 'light-4' }}
                    >
                        <Box flex={{ grow: 1 }}>
                            <Text weight="bold">{comm.type}</Text>
                            <Text>{comm.value}</Text>
                        </Box>
                        <Box direction="row" gap="small">
                            <Button icon={<Edit />} onClick={() => handleEdit(index)} />
                            <Button icon={<Trash />} onClick={() => handleDelete(index)} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CommunicationField;
