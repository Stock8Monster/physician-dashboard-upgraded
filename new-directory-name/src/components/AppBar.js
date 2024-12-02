import React from "react";
import { Header, Box, Button, Text } from "grommet";
import { Logout } from "grommet-icons";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import styled from "styled-components";

// Styled header with the appropriate background color
const StyledHeader = styled(Header)`
  background-color: #1c1c1c; // Dark top menu background color
  border-bottom: none;
  padding: 0 2rem;
  box-shadow: none;
`;

// App name styled text
const AppName = styled(Text)`
  font-weight: normal;
  color: #ffffff; // Default white text color
  letter-spacing: 1.2px;
`;

// Logout button with transparent background and hover effect
const LogoutButton = styled(Button)`
  border-radius: 50px;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #ffffff; // White text
  font-weight: normal;
  border: none;
  transition: none;
  box-shadow: none;
  &:hover {
    background-color: #444444; // Slight dark background on hover
    box-shadow: none;
  }
`;

// Navigation button with transparent background and similar hover effect
const NavButton = styled(Button)`
  border-radius: 50px;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #ffffff; // White text color for nav buttons
  font-weight: normal;
  border: none;
  transition: none;
  box-shadow: none;
  &:hover {
    background-color: #444444; // Slight dark background on hover
    box-shadow: none;
  }
`;

const AppBar = ({ setAuth }) => {
  const isMobile = window.innerWidth <= 768;
  
  return (
    <StyledHeader justify="between">
      <Box direction={isMobile ? 'column' : 'row'} gap="small">
        {/* Adjust layout for mobile */}
      </Box>
    </StyledHeader>
  );
};

export default AppBar;
