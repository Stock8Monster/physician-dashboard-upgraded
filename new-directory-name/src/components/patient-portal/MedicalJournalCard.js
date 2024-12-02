import React, { useState, useEffect } from 'react';
import patientService from '../../services/patientService';
import ProcessingOverlay from '../ProcessingOverlay';

const MedicalJournalCard = ({ selectedPatient }) => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const journalChannel = new BroadcastChannel('journal_channel');

    useEffect(() => {
        const fetchJournalEntries = async () => {
            setIsProcessing(true);
            try {
                const entries = await patientService.getJournalEntries(selectedPatient.Key);
                const formattedEntries = entries.map(entry => ({
                    journalDate: entry.Record.journalDate || '',
                    journalEntry: entry.Record.journalEntry || '',
                    journalEntryId: entry.Record.journalEntryId
                }));
                setJournalEntries(formattedEntries);
            } catch (error) {
                console.error('Error fetching journal entries:', error);
            } finally {
                setIsProcessing(false);
            }
        };

        if (selectedPatient) {
            fetchJournalEntries();
        }
    }, [selectedPatient]);

    const handleJournalFormSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const newJournalEntry = {
            journalDate: e.target.journalDate.value,
            journalEntry: e.target.journalEntry.value
        };

        try {
            const response = await patientService.createJournalEntry({ ...newJournalEntry, patientId: selectedPatient.Key });
            const updatedJournalEntries = [
                ...journalEntries,
                {
                    journalDate: response.result.journalDate || newJournalEntry.journalDate,
                    journalEntry: response.result.journalEntry || newJournalEntry.journalEntry,
                    journalEntryId: response.journalEntryId
                }
            ];
            setJournalEntries(updatedJournalEntries);
            journalChannel.postMessage('journal_updated');
            alert('Journal entry saved!');
        } catch (error) {
            console.error('Error creating journal entry:', error);
            alert('Failed to save journal entry');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteEntry = async (journalEntryId) => {
        setIsProcessing(true);
        try {
            await patientService.deleteJournalEntry({ journalEntryId });
            const updatedJournalEntries = journalEntries.filter(entry => entry.journalEntryId !== journalEntryId);
            setJournalEntries(updatedJournalEntries);
            journalChannel.postMessage('journal_updated');
            alert('Journal entry deleted!');
        } catch (error) {
            console.error('Error deleting journal entry:', error);
            alert('Failed to delete journal entry');
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="card">
            {isProcessing && <ProcessingOverlay />}
            <h2>
                Personal Medical Journal
                <button className="sync-btn">Sync & Update with my EMR</button>
            </h2>
            <p>Your Personal Medical Journal is your key to keeping your health and your provider up to date without the hassle of paperwork and time spent updating your provider in person. Allowing your physician to provide the most focused, targeted and quality care for you. Just press the Sync Button & the Agama AI will take care of the rest!</p>
            <form id="journalForm" onSubmit={handleJournalFormSubmit}>
                <div className="form-group" style={{ marginTop: '30px' }}>
                    <label htmlFor="journalDate">Entry Date</label>
                    <input type="date" id="journalDate" name="journalDate" required />
                </div>
                <div className="form-group">
                    <label htmlFor="journalEntry">Journal Entry</label>
                    <textarea id="journalEntry" name="journalEntry" rows="4" placeholder="Write your journal entry here" required></textarea>
                </div>
                <button type="submit" className="btn">Add Entry</button>
            </form>
            <button type="button" className="collapsible" onClick={toggleCollapse} style={{ marginTop: '20px' }}>
                Previous Journal Entries
            </button>
            <div className={`collapsible-content ${isCollapsed ? '' : 'expanded'}`} id="previousEntriesContainer">
                {journalEntries.map((entry, index) => (
                    <div key={index} className="form-group">
                        <label htmlFor={`previousEntry${index}`}>Entry on {entry.journalDate}</label>
                        <textarea id={`previousEntry${index}`} name={`previousEntry${index}`} rows="4" readOnly value={entry.journalEntry}></textarea>
                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteEntry(entry.journalEntryId)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MedicalJournalCard;
