import React, { useState, useEffect } from 'react';
import { Box, Heading, Text } from 'grommet';
import ReactMarkdown from 'react-markdown';
import patientService from '../../services/patientService';

const AISuggestions = ({ selectedPatient }) => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [aiInsights, setAIInsights] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchJournalEntries = async (patientId) => {
        setLoading(true);
        try {
            const entries = await patientService.getJournalEntries(patientId);
            const formattedEntries = entries.map(entry => ({
                journalDate: entry.Record.journalDate || '',
                journalEntry: entry.Record.journalEntry || '',
                journalEntryId: entry.Record.journalEntryId
            }));
            setJournalEntries(formattedEntries);

            const allEntries = formattedEntries.map(entry => entry.journalEntry).join('\n');
            const response = await fetch('https://qft.agamanetworks.com/analyze-journal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'mYetb4Ue52UqZfKFQxhG!',
                },
                body: JSON.stringify({ journalEntries: allEntries }),
            });

            if (response.ok) {
                const data = await response.json();
                setAIInsights(data.insights);
            } else {
                console.error('Error analyzing journal entries:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching journal entries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedPatient) {
            fetchJournalEntries(selectedPatient.id);
        }
    }, [selectedPatient]);

    return (
        <Box style={{ color: 'white' }}>
            <Heading level={3}>Journal Summary</Heading>
            {loading ? (
                <Text>Loading AI insights...</Text>
            ) : (
                aiInsights ? (
                    <ReactMarkdown>{aiInsights}</ReactMarkdown>
                ) : (
                    <Text>No journal entries available.</Text>
                )
            )}
        </Box>
    );
};

export default AISuggestions;
