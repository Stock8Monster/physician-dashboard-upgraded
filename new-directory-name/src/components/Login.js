// src/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Box, Button, Form, FormField, TextInput, Text, Tabs, Heading} from 'grommet';
import {
    StyledFormContainer,
    StyledForm,
    StyledButton
} from '../styles/StyledComponents';
import styled from "styled-components";

const StyledFormField = styled(FormField)`
  label {
    //color: #fff; // Default text color
  }
  input,
  select {
    background-color: #444; // Center panel background
    box-shadow: none !important; // Remove box-shadow from input and select
    border-color: transparent !important;
  }
  input:focus,
  select:focus {
    outline: none;
    box-shadow: none !important; // Ensure no box-shadow on focus
    border-color: transparent !important;
  }

  /* Remove box-shadow from Grommet drop containers or styled dropdown components */
  div[class*="StyledDrop"],
  div[class*="StyledBox"],
  .grommetux-drop,
  .grommetux-drop__container {
    box-shadow: none !important; /* Forcefully remove box-shadow */
    border-color: transparent !important;
  }
`;

const StyledLoginButton = styled(Button)`
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

const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            setAuth(true);
            navigate('/');
        }
    }, [setAuth, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate a login request
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Check for admin credentials
            if (username === 'andrew-admin' && password === 'andrew-admin') {  // Add your desired admin credentials
                setAuth(true);
                localStorage.setItem('isLoggedIn', 'true'); // Save auth state to local storage
                localStorage.setItem('userRole', 'admin'); // Save user role as 'admin'
                navigate('/'); // Redirect to the main page
            }
            // Check for the regular VC user
            else if (username === 'agama-poc' && password === 'agama-poc') {
                setAuth(true);
                localStorage.setItem('isLoggedIn', 'true'); // Save auth state to local storage
                localStorage.setItem('userRole', 'vc-user'); // Save user role as 'VC user'
                navigate('/'); // Redirect to the main page
            }
            // Handle invalid credentials
            else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }
        setLoading(false);
    };


    return (
        <Box fill align="center" justify="center" background="#1c1c1c"> {/* Darker background */}
            <Heading level={3} margin={{ right: 'small', vertical: 'large' }} style={{width: "175px"}} color="white">Agama Health</Heading>
            <StyledFormContainer>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledFormField plain label="Username" name="username" required>
                        <TextInput
                            plain
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </StyledFormField>
                    <StyledFormField plain label="Password" name="password" required>
                        <TextInput
                            plain
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </StyledFormField>
                    {error && (
                        <Box pad={{vertical: 'small'}}>
                            <Text color="status-critical">{error}</Text>
                        </Box>
                    )}
                    <Box direction="row" gap="medium" pad={{top: 'medium'}}>
                        <StyledLoginButton
                            type="submit"
                            primary
                            label={loading ? 'Logging in...' : 'Login'}
                            disabled={loading}
                        />
                    </Box>
                </StyledForm>
            </StyledFormContainer>
        </Box>
    );
}
export default Login;
