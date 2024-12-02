import styled from 'styled-components';
import {Box, Button, TextInput, Text, TextArea} from 'grommet';

export const Container = styled(Box)`
  height: 96.9vh;
  margin: 0;
  overflow: hidden;
  background-color: #1c1c1c;
  color: black;
  font-family: Arial, sans-serif;
`;

export const LeftPanel = styled(Box)`
  background-color: #1c1c1c;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-bottom: 50px;
`;

export const MainPanel = styled(Box)`
  flex: 1;
  //padding: 20px;
  overflow-y: auto;
`;

export const StyledChatContainer = styled(Box)`
  min-height: fit-content;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 0px solid #333;
  color: white;
  background-color: #444;
  border-radius: 5px;

  /* Ensuring the chat container itself does not overflow */
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
`;


export const StyledButton = styled(Button)`
  margin-bottom: 10px;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 1em;
  border-radius: 5px;
  box-shadow: none;

  &:hover {
    background-color: #555;
  }
`;

export const ToggleButton = styled(Button)`
  margin-bottom: 2.5px;
  padding: 10px;
  border: none;
  cursor: pointer;
  background-color: #333;
  color: #fff;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 1em;
  border-radius: 5px;
  box-shadow: none;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #555;
  }

  .icon {
    margin-left: auto;
    margin-right: 0;
  }
`;

export const StyledCard = styled(Box)`
  background-color: #333;
  border: 0px solid #444;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
`;

export const InfoText = styled(Text)`
  color: #fff;


`;

export const StyledTextArea = styled.textarea`
  flex: 1;
  margin-right: 8px;
  border: none;
  padding: 6px 10px;  /* Minimal padding */
  background-color: #555;
  color: white;
  border-radius: 5px;
  resize: none; /* Prevent manual resizing */
  overflow: hidden; /* Hide overflow */
  line-height: 1.5; /* Line height */
  min-height: 10px; /* Set the minimum height to a single line */
  height: 30px; /* Set height to auto to adjust dynamically */
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &::placeholder {
    color: white;
    opacity: 1; /* This ensures the white color is fully visible */
  }
`;

export const StyledTextInput = styled(TextInput)`
  flex: 1;
  margin-right: 8px;
  border: none;
  padding: 10px;
  background-color: #444;
  color: white;
  border-radius: 5px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const ChartContainer = styled(Box)`
  //background-color: #333;
  width: 100%;
  margin-bottom: 15px;
  border: 0px solid #333;
  border-radius: 5px;
  min-height: 78vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Iframe = styled.iframe`
  width: 100%;
  border: none;
`;

export const SplitButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #333;
  border: 0px solid #444;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 2.5px; /* Adds consistent space between rows */

  @media screen and (max-width: 768px) {
    flex-direction: column;
    
    & > div {
      width: 100%;
      margin-bottom: 5px;
    }
  }
`;

export const SplitButtonSection = styled.div`
  flex: 1;
  padding: 6px; /* Adjusted for consistent size */
  color: white;
  text-align: center;
  cursor: pointer;
  border-right: 0px solid #444;
  box-sizing: border-box; /* Ensures padding is included in the width/height calculations */
  display: flex;
  align-items: center;
  justify-content: left;
  height: 45px; /* Set a consistent height for all buttons */
  gap: 5px;

  &:last-child {
    border-right: none; /* Remove border on the last item */
  }

  &:hover {
    background-color: #555;
  }
`;

export const StyledColorButton = styled(Button)`
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