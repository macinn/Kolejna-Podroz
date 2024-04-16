import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import AdminTheme from './AdminTheme';

const baseUrl = "https://localhost:60016/";
function StationForm({ onSubmit }) {
    const [stationData, setStationData] = useState({
        name: '',
        description: '',
        code: '',
        city: '',
    });

    const handleChange = (prop) => (event) => {
        setStationData({ ...stationData, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(stationData);
        fetch(`${baseUrl}api/Station`,
            {
                method: "POST",
                body: JSON.stringify(stationData),
                headers: {
                    "Content-type": "application/json"
                }
            });
    };

    return (
        <ThemeProvider theme={AdminTheme}>
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5">Create Station</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={stationData.name}
                            onChange={handleChange('name')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Description"
                            fullWidth
                            value={stationData.description}
                            onChange={handleChange('description')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Code"
                            fullWidth
                            value={stationData.code}
                            onChange={handleChange('code')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            fullWidth
                            value={stationData.city}
                            onChange={handleChange('city')}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" sx={{ m: 2 }}>
                    Create Station
                </Button>
            </form>
            </Container>
           </ThemeProvider>
    );
}

export default StationForm;