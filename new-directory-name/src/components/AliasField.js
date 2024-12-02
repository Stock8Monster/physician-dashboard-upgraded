import React, { useState } from 'react';
import { Box, Button, FormField, TextInput, List } from 'grommet';
import { Add, Edit, Trash } from 'grommet-icons';
import styled from "styled-components";
import {StyledFormField} from "../styles/admin";

const AliasField = ({ aliases, onUpdate }) => {
    const [newAlias, setNewAlias] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddAlias = () => {
        if (newAlias) {
            let updatedAliases;
            if (editingIndex !== null) {
                updatedAliases = [...aliases];
                updatedAliases[editingIndex] = newAlias;
                setEditingIndex(null);
            } else {
                updatedAliases = [...aliases, newAlias];
            }
            setNewAlias('');
            onUpdate(updatedAliases);
        }
    };

    const handleEditAlias = (index) => {
        setNewAlias(aliases[index]);
        setEditingIndex(index);
    };

    const handleDeleteAlias = (index) => {
        const updatedAliases = aliases.filter((_, i) => i !== index);
        onUpdate(updatedAliases);
    };

    return (
        <Box>
            <Box direction="row" gap="small" align="center">
                <StyledFormField label="Former / Aliases">
                    <TextInput
                        placeholder="Enter Alias"
                        value={newAlias}
                        onChange={(event) => setNewAlias(event.target.value)}
                    />
                </StyledFormField>
                <Button icon={<Add />} onClick={handleAddAlias} />
            </Box>
            <List
                primaryKey="alias"
                data={aliases.map((alias, index) => ({ alias, index }))}
                action={(item) => (
                    <Box direction="row" gap="small">
                        <Button icon={<Edit />} onClick={() => handleEditAlias(item.index)} />
                        <Button icon={<Trash />} onClick={() => handleDeleteAlias(item.index)} />
                    </Box>
                )}
            />
        </Box>
    );
};

export default AliasField;
