import React, { useState, useEffect } from 'react';
import {
    Box,
    FormField,
    TextInput,
    Select,
    CardHeader,
    Card,
    CardBody,
} from 'grommet';
import styled from 'styled-components';
import CommunicationField from './CommunicationField';
import AliasField from './AliasField';
import {CustomSelect, StyledFormField} from "../styles/admin";

const monthOptions = [
    { label: 'Jan.', value: '01' },
    { label: 'Feb.', value: '02' },
    { label: 'Mar.', value: '03' },
    { label: 'Apr.', value: '04' },
    { label: 'May.', value: '05' },
    { label: 'Jun.', value: '06' },
    { label: 'Jul.', value: '07' },
    { label: 'Aug.', value: '08' },
    { label: 'Sep.', value: '09' },
    { label: 'Oct.', value: '10' },
    { label: 'Nov.', value: '11' },
    { label: 'Dec.', value: '12' },
];

// Styled components for the card to match the dark theme
const StyledCard = styled(Card)`
  //background-color: #333; // Left panel background
  //border-radius: 8px;
`;

const StyledCardHeader = styled(CardHeader)`
  //color: #fff; // Neon cyan for headings
  //font-weight: bold;
  //background-color: #333333; // Top menu background
  //padding: 1rem;
  //margin: 0; // Remove default margins
  //flex: 0 0 auto; // Prevent flex items from growing or shrinking
`;

const PatientDemographics = ({ demographics, onUpdate }) => {
    const [addressParts, setAddressParts] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
    });

    const [birthdateParts, setBirthdateParts] = useState({
        month: '',
        day: '',
        year: '',
    });

    useEffect(() => {
        if (demographics.address) {
            const addressRegex = /^(.*?),\s*(.*?),\s*([A-Z]{2})\s*(\d{5}(?:-\d{4})?)$/;
            const match = demographics.address.match(addressRegex);
            if (match) {
                setAddressParts({
                    street: match[1] || '',
                    city: match[2] || '',
                    state: match[3] || '',
                    zip: match[4] || '',
                });
            }
        }

        if (demographics.birthDate) {
            const [month, day, year] = demographics.birthDate.split(' ');
            setBirthdateParts({
                month:
                    monthOptions.find((option) => option.label === month)?.value || '',
                day: day.replace(',', ''),
                year,
            });
        }
    }, [demographics]);

    const handleAddressChange = (field, value) => {
        const updatedAddressParts = { ...addressParts, [field]: value };
        setAddressParts(updatedAddressParts);
        const combinedAddress = `${updatedAddressParts.street}, ${updatedAddressParts.city}, ${updatedAddressParts.state}, ${updatedAddressParts.zip}`;
        onUpdate({ address: combinedAddress });
    };

    const handleBirthdateChange = (field, value) => {
        const updatedBirthdateParts = { ...birthdateParts, [field]: value };
        setBirthdateParts(updatedBirthdateParts);
        const monthLabel = monthOptions.find(
            (option) => option.value === updatedBirthdateParts.month
        )?.label;
        const combinedBirthdate = `${monthLabel} ${updatedBirthdateParts.day}, ${updatedBirthdateParts.year}`;
        onUpdate({ birthDate: combinedBirthdate });
    };

    const handleChange = (field, value) => {
        onUpdate({ [field]: value });
    };

    const handleCommunicationUpdate = (updatedCommunication) => {
        onUpdate({ communication: updatedCommunication });
    };

    const handleAliasesUpdate = (updatedAliases) => {
        onUpdate({ aliases: updatedAliases });
    };

    return (
        <Box
            gap="medium"
            width="100%" // Full width
            background="#1c1c1c"
            pad="medium"
            flex={false}
            style={{ overflow: 'hidden', position: 'relative' }}
        >
            <StyledCard width="full" style={{ border: 'none !important', boxShadow: 'none' }}>
                {/* Single container for both sections */}
                <Box direction="column" flex>
                    <StyledCardHeader>
                        <b>Basic Information</b>
                    </StyledCardHeader>
                    {/* Scrollable content */}
                    <Box flex overflow={{ vertical: 'auto' }} style={{ minHeight: 0 }}>
                        <CardBody pad="medium">
                            <StyledFormField name="name" label="Patient Name">
                                <TextInput
                                    plain
                                    name="name"
                                    placeholder="Enter full name"
                                    value={demographics.name || ''}
                                    onChange={(event) =>
                                        handleChange('name', event.target.value)
                                    }
                                />
                            </StyledFormField>
                            <Box direction="row" gap="medium">
                                <StyledFormField name="month" label="Birth Month">
                                    <CustomSelect
                                        plain // Removes Grommet default styling
                                        options={monthOptions.map((option) => option.label)}
                                        placeholder="Select birth month"
                                        value={
                                            monthOptions.find(
                                                (option) =>
                                                    option.value === birthdateParts.month
                                            )?.label || ''
                                        }
                                        onChange={({ option }) =>
                                            handleBirthdateChange(
                                                'month',
                                                monthOptions.find(
                                                    (opt) => opt.label === option
                                                ).value
                                            )
                                        }
                                    />
                                </StyledFormField>
                                <StyledFormField name="day" label="Birth Day">
                                    <TextInput
                                        plain // Removes Grommet default styling
                                        placeholder="Enter birth day"
                                        name="day"
                                        value={birthdateParts.day || ''}
                                        onChange={(event) =>
                                            handleBirthdateChange('day', event.target.value)
                                        }
                                    />
                                </StyledFormField>
                                <StyledFormField name="year" label="Birth Year">
                                    <TextInput
                                        plain // Removes Grommet default styling
                                        placeholder="Enter birth year"
                                        name="year"
                                        value={birthdateParts.year || ''}
                                        onChange={(event) =>
                                            handleBirthdateChange('year', event.target.value)
                                        }
                                    />
                                </StyledFormField>
                                <StyledFormField name="gender" label="Gender">
                                    <CustomSelect
                                        plain // Removes Grommet default styling
                                        options={['Male', 'Female']}
                                        placeholder="Select gender"
                                        value={demographics.gender || ''}
                                        onChange={({ option }) => handleChange('gender', option)}
                                    />
                                </StyledFormField>
                            </Box>

                            <Box direction="row" gap="medium">
                                <StyledFormField name="language" label="Language">
                                    <TextInput
                                        plain // Removes Grommet default styling
                                        placeholder="Enter preferred language"
                                        name="language"
                                        value={demographics.language || ''}
                                        onChange={(event) =>
                                            handleChange('language', event.target.value)
                                        }
                                    />
                                </StyledFormField>
                                <StyledFormField name="raceEthnicity" label="Race / Ethnicity">
                                    <TextInput
                                        plain // Removes Grommet default styling
                                        placeholder="Enter race or ethnicity"
                                        name="raceEthnicity"
                                        value={demographics.raceEthnicity || ''}
                                        onChange={(event) =>
                                            handleChange('raceEthnicity', event.target.value)
                                        }
                                    />
                                </StyledFormField>
                                <StyledFormField name="maritalStatus" label="Marital Status">
                                    <TextInput
                                        plain // Removes Grommet default styling
                                        placeholder="Enter marital status"
                                        name="maritalStatus"
                                        value={demographics.maritalStatus || ''}
                                        onChange={(event) =>
                                            handleChange('maritalStatus', event.target.value)
                                        }
                                    />
                                </StyledFormField>
                            </Box>
                            <AliasField
                                aliases={demographics.aliases || []}
                                onUpdate={handleAliasesUpdate}
                            />
                        </CardBody>

                        {/* Divider or spacing between sections */}
                        <StyledCardHeader>
                            <b>Address Information</b>
                        </StyledCardHeader>
                        <CardBody pad="medium">
                            <StyledFormField name="street" label="Street Address">
                                <TextInput
                                    plain // Removes Grommet default styling
                                    placeholder="Enter street address"
                                    name="street"
                                    value={addressParts.street || ''}
                                    onChange={(event) =>
                                        handleAddressChange('street', event.target.value)
                                    }
                                />
                            </StyledFormField>
                            <Box direction="row" gap="medium">
                                <StyledFormField name="city" label="City">
                                    <TextInput
                                        plain // Removes Grommet default styling
                                        placeholder="Enter city"
                                        name="city"
                                        value={addressParts.city || ''}
                                        onChange={(event) =>
                                            handleAddressChange('city', event.target.value)
                                        }
                                    />
                                </StyledFormField>
                                <StyledFormField name="state" label="State">
                                    <TextInput
                                        plain // Removes Grommet default styling
                                        placeholder="Enter state"
                                        name="state"
                                        value={addressParts.state || ''}
                                        onChange={(event) =>
                                            handleAddressChange('state', event.target.value)
                                        }
                                    />
                                </StyledFormField>
                                <StyledFormField name="zip" label="Zip Code">
                                    <TextInput
                                        plain // Removes Grommet default styling
                                        placeholder="Enter zip code"
                                        name="zip"
                                        value={addressParts.zip || ''}
                                        onChange={(event) =>
                                            handleAddressChange('zip', event.target.value)
                                        }
                                    />
                                </StyledFormField>
                            </Box>
                            <CommunicationField
                                communication={demographics.communication}
                                onUpdate={handleCommunicationUpdate}
                            />
                        </CardBody>
                    </Box>
                </Box>
            </StyledCard>
        </Box>
    );
}

    export default PatientDemographics;
