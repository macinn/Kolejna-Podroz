import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AdminTheme from './AdminTheme';
import styled from '@mui/material/styles/styled';

function ProviderForm() {
    const [providerData, setProviderData] = useState({
        Name: '',
        Description: '',
        Website: '',
        PhoneNumber: '',
        City: '',
        Address: '',
    });

    const handleChange = (prop) => (event) => {
        setProviderData({ ...providerData, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Add provider to database
    };

    return (
        <ThemeProvider theme={AdminTheme}>
            <Container sx={{ mt: 4 }}>
            <Typography variant="h5" >Create Provider</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={providerData.Name}
                            onChange={handleChange('Name')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Description"
                            fullWidth
                            value={providerData.Description}
                            onChange={handleChange('Description')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Website"
                            fullWidth
                            value={providerData.Website}
                            onChange={handleChange('Website')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone Number"
                            fullWidth
                            value={providerData.PhoneNumber}
                            onChange={handleChange('PhoneNumber')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            fullWidth
                            value={providerData.City}
                            onChange={handleChange('City')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address"
                            fullWidth
                            value={providerData.Address}
                            onChange={handleChange('Address')}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" sx={{ m: 2 }}>
                    Create Provider
                </Button>
            </form>
            </Container>
        </ThemeProvider>
    );
}

export default ProviderForm;
