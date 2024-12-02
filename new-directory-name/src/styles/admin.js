import styled from 'styled-components';
import {DataTable, FormField, Select} from 'grommet';
import {FormDown} from "grommet-icons";

export const StyledDataTable = styled(DataTable)`
  background-color: #333; /* Table background */

  th {
    background-color: #444;
    color: #fff; /* Header text color */
    font-weight: bold;
  }

  td {
    background-color: #555; /* Data cell background */
    color: #f0f0f0; /* Data cell text color */
    font-weight: normal; /* Ensure normal weight for data cells */
    border-bottom: 1px solid #444444;
  }
`;

export const StyledFormField = styled(FormField)`
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

  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
    
    input, select, textarea {
      font-size: 16px; // Prevents zoom on iOS
    }
  }
`;

export const CustomIcon = styled(FormDown)`
  fill: #ffffff !important;
`;

export const CustomSelect = (props) => (
    <Select
        {...props}
        icon={<CustomIcon />} // Override the default icon with a custom-styled icon
    />
);

