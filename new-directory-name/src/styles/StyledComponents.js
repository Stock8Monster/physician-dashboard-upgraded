// styles/StyledComponents.js
import styled from 'styled-components';
import {Box, Button, Form, FormField, TextInput} from 'grommet';

export const FullHeightIframeWrapper = styled(Box)`
    position: relative;
    width: 100%;
    height: 80%;
    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 120%;
        border: 0;
    }
`;

export const StyledHeader = styled(Box)`
    background: #1a1a1a;
    padding: 16px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledButton = styled(Button)`
    background-color: #0072ff;
    color: white;
    border-radius: 5px;
    padding: 8px 16px;
    &:hover {
        background-color: #005bb5;
    }
`;

export const StyledFormContainer = styled(Box)`
    background-color: #1a1a1a;  /* Match background */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add some shadow */
    width: 100%;
    max-width: 400px; /* Limit form width */
    margin: 0 auto; /* Center horizontally */
`;

export const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StyledFormField = styled(FormField)`
    label {
        color: white; /* White text for labels */
    }
`;

export const StyledTextInput = styled(TextInput)`
    border-radius: 5px;
    padding: 10px;
    background-color: #333; /* Dark input background */
    color: white; /* White text for input */
    border: 1px solid #555; /* Border for input */
    &:focus {
        outline: none;
        border-color: #0072ff; /* Blue border on focus */
    }
`;

