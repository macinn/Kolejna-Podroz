import React from 'react';
import { Container } from '@mui/material';
import { FormControl } from '@mui/base/FormControl';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';

const MuiTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
            secondary: {
                main: '#f48fb1',
            },
            background: {
                default: '#121212',
                paper: '#1e1e1e',
            },
            text: {
                primary: '#ffffff',
                secondary: '#bdbdbd',
            },
        },
        typography: {
            fontFamily: 'Roboto, Arial, sans-serif',
        }
    }
});

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));



    

function EditForm({ props }) {
    const [editedConnection, setEditedConnection] = useState(null);

    const handleChange = (prop) => (event) => {
        setEditedConnection({ ...editedConnection, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // onSubmit(editedConnection);
    };

    return (
        <ThemeProvider theme={MuiTheme}>
        <Grid
            container
            spacing={3}
            theme={MuiTheme}
            margin="auto">
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>
                <OutlinedInput
                    id="first-name"
                    name="first-name"
                    type="name"
                    placeholder="John"
                    autoComplete="first name"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last-name" required>
                    Last name
                </FormLabel>
                <OutlinedInput
                    id="last-name"
                    name="last-name"
                    type="last-name"
                    placeholder="Snow"
                    autoComplete="last name"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="address1" required>
                    Address line 1
                </FormLabel>
                <OutlinedInput
                    id="address1"
                    name="address1"
                    type="address1"
                    placeholder="Street name and number"
                    autoComplete="shipping address-line1"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12}>
                <FormLabel htmlFor="address2">Address line 2</FormLabel>
                <OutlinedInput
                    id="address2"
                    name="address2"
                    type="address2"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    autoComplete="shipping address-line2"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="city" required>
                    City
                </FormLabel>
                <OutlinedInput
                    id="city"
                    name="city"
                    type="city"
                    placeholder="New York"
                    autoComplete="City"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="state" required>
                    State
                </FormLabel>
                <OutlinedInput
                    id="state"
                    name="state"
                    type="state"
                    placeholder="NY"
                    autoComplete="State"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="zip" required>
                    Zip / Postal code
                </FormLabel>
                <OutlinedInput
                    id="zip"
                    name="zip"
                    type="zip"
                    placeholder="12345"
                    autoComplete="shipping postal-code"
                    required
                />
            </FormGrid>
            <FormGrid item xs={6}>
                <FormLabel htmlFor="country" required>
                    Country
                </FormLabel>
                <OutlinedInput
                    id="country"
                    name="country"
                    type="country"
                    placeholder="United States"
                    autoComplete="shipping country"
                    required
                />
            </FormGrid>
            
            </Grid>
        </ThemeProvider>
  );
}

export default EditForm;


//<FormGrid item xs={12}>
//    <FormControlLabel
//        control={<Checkbox name="saveAddress" value="yes" />}
//        label="Use this address for payment details"
//    />
//</FormGrid>