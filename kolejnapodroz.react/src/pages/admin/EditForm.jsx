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
import { Select, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { FormHelperText } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { InputLabel } from '@mui/material';

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

const stations = [
    { id: 1, name: 'Warszawa Zachodnia' },
    { id: 2, name: 'Radom G³ówny' },
    { id: 3, name: 'Kraków G³ówny' },
];

const exampleConnection = {
        "id": 1,
        "from": {
            "id": 1,
            "name": "Warszawa Centralna",
            "description": "Fajna stacja",
            "code": "1",
            "city": "Warszawa"
        },
        "destination": {
            "id": 2,
            "name": "Warszawa Zachodnia",
            "description": "Niez³a stacja",
            "code": "2",
            "city": "Warszawa"
        },
        "departureTime": "2024-04-16T12:00:00",
        "arrivalTime": "2024-04-16T12:00:00",
        "provider": null
}


function EditForm({ data, onSubmit }) {
    const [editedConnection, setEditedConnection] = useState({
        "Id": data != null ? data.Id : 0,
        "StartStationId": data != null ? data.StartStationId : 0,
        "EndStationId": data != null ? data.EndStationId : 0,
        "ProviderId": data != null ? data.ProviderId : 0,
        "DepartureTime": data != null ? data.DepartureTime : "0001-01-01T00:00:00",
        "TravelTime": data != null ? data.TravelTime : 0
    });

    const handleChange = (prop) => (event) => {
        setEditedConnection({ ...editedConnection, [prop]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(editedConnection);
    };

    return (
        <ThemeProvider theme={MuiTheme}>
        <Grid
            container
            spacing={3}
            theme={MuiTheme}
                margin="auto">
            {/*    <FormControl>*/}
            {/*        <InputLabel id="start-select-label">Start station</InputLabel>*/}
            {/*        <Select*/}
            {/*            labelId="start-select-label"*/}
            {/*            label="start-station"*/}
            {/*            id="startStation"*/}
            {/*            value={startStation}*/}
            {/*            onChange={(e) => setStartStation(e.target.value)}*/}
            {/*            sx={{ minWidth: '200px' }}*/}
            {/*        >*/}
            {/*            <MenuItem value="">None</MenuItem>*/}
            {/*            {stations.map((station) => (*/}
            {/*                <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>*/}
            {/*            ))}*/}
            {/*        </Select>*/}
            {/*    </FormControl>*/}
            {/*    <FormControl>*/}
            {/*        <InputLabel id="end-select-label">End station</InputLabel>*/}
            {/*        <Select*/}
            {/*            labelId="end-select-label"*/}
            {/*            label="end-station"*/}
            {/*            id="endStation"*/}
            {/*            value={endStation}*/}
            {/*            onChange={(e) => setEndStation(e.target.value)}*/}
            {/*            sx={{ minWidth: '200px' }}*/}
            {/*        >*/}
            {/*            <MenuItem value="">None</MenuItem>*/}
            {/*            {stations.map((station) => (*/}
            {/*                <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>*/}
            {/*            ))}*/}
            {/*        </Select>*/}
            {/*    </FormControl>*/}
            {/*<FormGrid item xs={12} md={6}>*/}
            {/*    <FormLabel htmlFor="first-name" required>*/}
            {/*        First name*/}
            {/*    </FormLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="first-name"*/}
            {/*        name="first-name"*/}
            {/*        type="name"*/}
            {/*        placeholder="John"*/}
            {/*        autoComplete="first name"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</FormGrid>*/}
            {/*<FormGrid item xs={12} md={6}>*/}
            {/*    <FormLabel htmlFor="last-name" required>*/}
            {/*        Last name*/}
            {/*    </FormLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="last-name"*/}
            {/*        name="last-name"*/}
            {/*        type="last-name"*/}
            {/*        placeholder="Snow"*/}
            {/*        autoComplete="last name"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</FormGrid>*/}
            {/*<FormGrid item xs={12}>*/}
            {/*    <FormLabel htmlFor="address1" required>*/}
            {/*        Address line 1*/}
            {/*    </FormLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="address1"*/}
            {/*        name="address1"*/}
            {/*        type="address1"*/}
            {/*        placeholder="Street name and number"*/}
            {/*        autoComplete="shipping address-line1"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</FormGrid>*/}
            {/*<FormGrid item xs={12}>*/}
            {/*    <FormLabel htmlFor="address2">Address line 2</FormLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="address2"*/}
            {/*        name="address2"*/}
            {/*        type="address2"*/}
            {/*        placeholder="Apartment, suite, unit, etc. (optional)"*/}
            {/*        autoComplete="shipping address-line2"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</FormGrid>*/}
            {/*<FormGrid item xs={6}>*/}
            {/*    <FormLabel htmlFor="city" required>*/}
            {/*        City*/}
            {/*    </FormLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="city"*/}
            {/*        name="city"*/}
            {/*        type="city"*/}
            {/*        placeholder="New York"*/}
            {/*        autoComplete="City"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</FormGrid>*/}
            {/*<FormGrid item xs={6}>*/}
            {/*    <FormLabel htmlFor="state" required>*/}
            {/*        State*/}
            {/*    </FormLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="state"*/}
            {/*        name="state"*/}
            {/*        type="state"*/}
            {/*        placeholder="NY"*/}
            {/*        autoComplete="State"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</FormGrid>*/}
            {/*<FormGrid item xs={6}>*/}
            {/*    <FormLabel htmlFor="zip" required>*/}
            {/*        Zip / Postal code*/}
            {/*    </FormLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="zip"*/}
            {/*        name="zip"*/}
            {/*        type="zip"*/}
            {/*        placeholder="12345"*/}
            {/*        autoComplete="shipping postal-code"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</FormGrid>*/}
            {/*<FormGrid item xs={6}>*/}
            {/*    <FormLabel htmlFor="country" required>*/}
            {/*        Country*/}
            {/*    </FormLabel>*/}
            {/*    <OutlinedInput*/}
            {/*        id="country"*/}
            {/*        name="country"*/}
            {/*        type="country"*/}
            {/*        placeholder="United States"*/}
            {/*        autoComplete="shipping country"*/}
            {/*        required*/}
            {/*    />*/}
            {/*</FormGrid>*/}
            
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