import React, { useState, useEffect } from 'react';
import { Box, Button, Form, Tabs, Tab, FileInput, Layer, Text, Spinner } from 'grommet';
import { Notification, StatusGood } from 'grommet-icons';
import styled from 'styled-components';
import patientService from '../services/patientService';
import PatientDemographics from './PatientDemographics';
import AllergiesMedications from './AllergiesMedications';
import ProblemsProcedures from './ProblemsProcedures';
import SocialHistoryVitalSigns from './SocialHistoryVitalSigns';
import PatientCharts from './PatientCharts';
import { defaultPatientData } from '../data/staticData';
import { formatToJsonString } from '../utils/chartUtils';

// Styled component for tabs with dark theme and highlight
const StyledTabs = styled(Tabs)`
  div[role='tablist'] > div > button {
    color: #f0f0f0 !important; // Default text color
    font-weight: normal;
    border-bottom: none !important; // Remove underline or bottom border
    background: transparent;
    box-shadow: none;
    padding: 0;
    margin-right: 10px;

    &:focus {
      outline: none;
    }

    &[aria-selected='true'] {
      color: #FFFFFF !important; // Text color for selected tab
      font-weight: bold;
      border-bottom: none !important; // Remove underline or bottom border on selected tab
    }

    &:hover {
      color: #555555 !important; // Hover background for tabs
    }

    span {
      color: inherit !important;
      text-decoration: none !important; // Remove any underline on the text itself
    }
  }

  div[class*="StyledTab"] {
    border-bottom: none !important; // Ensure no border-bottom is applied to tab container
  }

  div.bnhxvU {
    border-bottom: none !important; // Explicitly target the div with border-bottom and override it
  }
`;

const StyledButton = styled(Button)`
  background-color: #444444; /* Default button background */
  color: #FFFFFF; /* Button text color */
  border: 1px solid #444444; /* Button border color */
  border-radius: 5px; /* Border radius as per color scheme */

  &:hover {
    background-color: #555555; /* Hover background color */
    border: 1px solid #555555 !important; /* Ensure no border on hover */
    box-shadow: none !important; /* Remove any box-shadow on hover */
  }

  &:focus {
    outline: none !important; /* Remove focus outline */
    box-shadow: none !important; /* Remove focus box-shadow */
  }

  &:active {
    background-color: #666666; /* Optional: active background color */
  }
`;

const EditPatient = ({ patient = defaultPatientData, onClose }) => {
    const initialFormValues = {
        gender: '',
        birthDate: '',
        address: '',
        name: '',
        aliases: [],
        communication: [],
        language: '',
        raceEthnicity: '',
        maritalStatus: '',
        allergies: [],
        medications: [],
        problems: [],
        procedures: [],
        socialHistory: {
            smokingTobacco: '',
            smokelessTobacco: '',
            tobaccoCessation: '',
            sexAssignedAtBirth: '',
            genderIdentity: '',
            sexualOrientation: '',
        },
        vitals: {
            bloodPressure: '',
            pulse: '',
            temperature: '',
            respiratoryRate: '',
            oxygenSaturation: '',
            inhaledOxygenConcentration: '',
            weight: '',
            height: '',
            bmi: '',
            comments: ''
        },
        charts: []
    };

    const [formValues, setFormValues] = useState(initialFormValues);
    const [activeTab, setActiveTab] = useState(0);
    const [showUpload, setShowUpload] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'admin') {
            setIsAdmin(true);
        }
    }, []);

    useEffect(() => {
        const isEmptyObject = Object.keys(patient).length === 0;
        const data = isEmptyObject ? defaultPatientData : { ...defaultPatientData, ...patient };

        setFormValues({
            id: patient.key || null,
            gender: data.gender || '',
            birthDate: data.birthDate || '',
            address: data.address || '',
            name: data.name || '',
            aliases: Array.isArray(data.aliases) ? data.aliases : data.aliases ? [data.aliases] : [],
            communication: data.communication || [],
            language: data.language || '',
            raceEthnicity: data.raceEthnicity || '',
            maritalStatus: data.maritalStatus || '',
            allergies: data.allergies || [],
            medications: data.medications || [],
            problems: data.problems || [],
            procedures: data.procedures || [],
            socialHistory: data.socialHistory || {
                smokingTobacco: '',
                smokelessTobacco: '',
                tobaccoCessation: '',
                sexAssignedAtBirth: '',
                genderIdentity: '',
                sexualOrientation: '',
            },
            vitals: data.vitals || {
                bloodPressure: '',
                pulse: '',
                temperature: '',
                respiratoryRate: '',
                oxygenSaturation: '',
                inhaledOxygenConcentration: '',
                weight: '',
                height: '',
                bmi: '',
                comments: ''
            },
            charts: data.charts || []
        });
    }, [patient]);

    const handleUpdate = (updatedValues) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            ...updatedValues,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'admin') {
            return; // Exit function if user is not an admin
        }
        setIsLoading(true);

        const communicationArray = Array.isArray(formValues.communication)
            ? formValues.communication
            : Object.entries(formValues.communication || {}).map(([type, value]) => ({ type, value }));

        const updatedFormValues = {
            ...formValues,
            communication: communicationArray.reduce((acc, { type, value }) => {
                acc[type] = value;
                return acc;
            }, {}),
        };

        try {
            let patientId;

            const sanitizedFormValues = { ...updatedFormValues };
            delete sanitizedFormValues.charts;

            if (patient?.key) {
                await patientService.updatePatient(patient.key, sanitizedFormValues);
                patientId = patient.key;
            } else {
                const newPatient = await patientService.createPatient(sanitizedFormValues);
                patientId = newPatient.patientId;
            }

            setFormValues((prevValues) => ({
                ...prevValues,
                id: patientId,
            }));

            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);
    };

    const handleUpload = async () => {
        if (!uploadedFile) return;

        const formData = new FormData();
        formData.append('file', uploadedFile);

        try {
            const response = await fetch('https://qft.agamanetworks.com/process-file', {
                method: 'POST',
                headers: {
                    'Authorization': 'mYetb4Ue52UqZfKFQxhG!',
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                let patientDataString = data.patientData;

                if (patientDataString.endsWith(';')) {
                    patientDataString = patientDataString.slice(0, -1);
                }

                patientDataString = formatToJsonString(patientDataString);

                const patientData = eval(`(${patientDataString})`);

                setFormValues((prevValues) => ({
                    ...prevValues,
                    ...patientData,
                }));

                setNotificationMessage(`${patientData.name} has been uploaded and parsed successfully!`);
                setShowNotification(true);
                setShowUpload(false);
            } else {
                console.error('Upload failed');
                setNotificationMessage('Upload failed');
                setShowNotification(true);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setNotificationMessage('Error uploading file');
            setShowNotification(true);
        }
    };

    return (
        <Box pad="medium" width="80vw" background="#1c1c1c">
            {isLoading && (
                <Layer>
                    <Box pad="large" align="center" gap="small" background="#333">
                        <Spinner />
                        <Text color="#f0f0f0">Processing...</Text>
                    </Box>
                </Layer>
            )}
            <Box align="center" margin={{ bottom: 'medium' }}>
                <Button
                    label="Upload Document"
                    onClick={() => setShowUpload(true)}
                    color="#FFFFFF"
                    plain
                />
            </Box>

            {showUpload && (
                <Layer
                    onEsc={() => setShowUpload(false)}
                    onClickOutside={() => setShowUpload(false)}
                    background="#333"
                >
                    <Box pad="medium" gap="small">
                        <FileInput
                            name="file"
                            onChange={handleFileChange}
                        />
                        <Button
                            label="Upload"
                            onClick={handleUpload}
                            color="#FFFFFF"
                            style={{ backgroundColor: '#444444' }}
                            hoverIndicator={{ background: '#555555' }}
                        />
                    </Box>
                </Layer>
            )}

            {showNotification && (
                <Layer
                    position="top"
                    modal={false}
                    margin={{ vertical: 'medium', horizontal: 'small' }}
                    onEsc={() => setShowNotification(false)}
                    responsive={false}
                    plain
                >
                    <Box
                        align="center"
                        direction="row"
                        gap="small"
                        justify="between"
                        round="small"
                        elevation="medium"
                        pad={{ vertical: 'xsmall', horizontal: 'small' }}
                        background="status-ok"
                    >
                        <Box align="center" direction="row" gap="xsmall">
                            <StatusGood />
                            <Text>{notificationMessage}</Text>
                        </Box>
                        <Button
                            icon={<Notification />}
                            onClick={() => setShowNotification(false)}
                            plain
                        />
                    </Box>
                </Layer>
            )}

            <Form onSubmit={handleSubmit}>
                <StyledTabs activeIndex={activeTab} onActive={(index) => setActiveTab(index)}>
                    <Tab title="Demographics">
                        <Box
                            pad={{ vertical: 'large' }}
                            style={{
                                height: '60vh', // Full viewport height
                                overflowY: 'auto', // Enable vertical scrolling on the parent
                                overflowX: 'hidden', // Avoid horizontal scrolling
                            }}
                        >
                            <PatientDemographics demographics={formValues} onUpdate={handleUpdate} />
                        </Box>
                    </Tab>
                    <Tab title="Allergies & Medications">
                        <Box
                            pad={{ vertical: 'large' }}
                            style={{
                                height: '60vh', // Full viewport height
                                overflowY: 'auto', // Enable vertical scrolling on the parent
                                overflowX: 'hidden', // Avoid horizontal scrolling
                            }}
                        >
                            <AllergiesMedications
                                allergies={formValues.allergies}
                                medications={formValues.medications}
                                onAllergiesUpdate={(updatedAllergies) => handleUpdate({ allergies: updatedAllergies })}
                                onMedicationsUpdate={(updatedMedications) => handleUpdate({ medications: updatedMedications })}
                            />
                        </Box>
                    </Tab>
                    <Tab title="Problems & Procedures">
                        <Box
                            pad={{ vertical: 'large' }}
                            style={{
                                height: '60vh', // Full viewport height
                                overflowY: 'auto', // Enable vertical scrolling on the parent
                                overflowX: 'hidden', // Avoid horizontal scrolling
                            }}
                        >
                            <ProblemsProcedures
                                problems={formValues.problems}
                                procedures={formValues.procedures}
                                onProblemsUpdate={(updatedProblems) => handleUpdate({ problems: updatedProblems })}
                                onProceduresUpdate={(updatedProcedures) => handleUpdate({ procedures: updatedProcedures })}
                            />
                        </Box>
                    </Tab>
                    <Tab title="Social History & Vital Signs">
                        <Box
                            pad={{ vertical: 'large' }}
                            style={{
                                height: '60vh', // Full viewport height
                                overflowY: 'auto', // Enable vertical scrolling on the parent
                                overflowX: 'hidden', // Avoid horizontal scrolling
                            }}
                        >
                            <SocialHistoryVitalSigns
                                socialHistory={formValues.socialHistory}
                                vitalSigns={formValues.vitals}
                                onSocialHistoryUpdate={(updatedSocialHistory) => handleUpdate({ socialHistory: updatedSocialHistory })}
                                onVitalSignsUpdate={(updatedVitalSigns) => handleUpdate({ vitals: updatedVitalSigns })}
                            />
                        </Box>
                    </Tab>
                    <Tab title="Patient Charts" disabled={!formValues.id}>
                        <Box
                            pad={{ vertical: 'large' }}
                            style={{
                                height: '60vh', // Full viewport height
                                overflowY: 'auto', // Enable vertical scrolling on the parent
                                overflowX: 'hidden', // Avoid horizontal scrolling
                            }}
                        >
                            <PatientCharts
                                patientId={formValues.id}
                                charts={formValues.charts}
                                onChartsUpdate={(updatedCharts) => handleUpdate({ charts: updatedCharts })}
                            />
                        </Box>
                    </Tab>
                </StyledTabs>
                <Box direction="row" gap="medium" margin={{ top: 'medium' }}>
                    <StyledButton
                        type="submit"
                        label="Save"
                        primary
                        disabled={!isAdmin}
                        style={{ backgroundColor: '#444444', color: '#FFFFFF' }}
                    />
                    <StyledButton
                        type="button"
                        label="Cancel"
                        onClick={onClose}
                        style={{ backgroundColor: '#555555', color: '#FFFFFF' }}
                    />
                </Box>
            </Form>
        </Box>
    );
};

export default EditPatient;
