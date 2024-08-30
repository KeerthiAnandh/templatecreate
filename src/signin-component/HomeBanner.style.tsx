// HomeBanner.styled.tsx

import { Container as MuiContainer, Button as MuiButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import UiButton from 'genpixels_ui_components/src/ui-components/button/UiButton';
import FormInput from 'genpixels_ui_components/src/ui-components/forms/input';

export const Container = styled(MuiContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
`;

export const ButtonGroup = styled(Box)`
  display: flex;
  justify-content: space-around;
  gap: 16px;
  margin-top: 100px;
  margin-bottom: 100px;
`;

export const SignInButton = styled(UiButton)`
  background-color: #1976d2;
  color: white;
  &:hover {
    background-color: #1565c0;
  }
`;

export const SignUpButton = styled(MuiButton)`
  background-color: #43a047;
  color: white;
  &:hover {
    background-color: #388e3c;
  }
`;

export const BackButton = styled(MuiButton)`
  border-color: #1976d2;
  color: #1976d2;
  &:hover {
    border-color: #1565c0;
    background-color: rgba(25, 118, 210, 0.1);
  }
`;

export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px; /* Increased width for sign-in and sign-up forms */
  width: 100%;
`;

export const FormTextField = styled(FormInput)`
  width: 100%;
`;
