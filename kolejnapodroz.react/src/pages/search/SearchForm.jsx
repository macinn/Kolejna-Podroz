import React  from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, TextField, Container, Typography  } from '@mui/material';
import { useStore } from '../../stores/SearchFormStore';
import {Link, useNavigate} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import './SearchForm.css';

const SearchForm = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
  
    console.log(import.meta.env.API_URL);
    const navigate = useNavigate();

    const { startStation,  setStartStation,
            endStation,    setEndStation,
            departureTime, setDepartureTime,
                           setConnections } = useStore();

    const [stations, setStations] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await fetch(`${baseUrl}/station`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log(jsonData);
            setStations(jsonData);
    
            } catch (error) { /* empty */ }
        };
    
        fetchData();    
        }, []);
        

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(`${departureTime.toISOString()}`);
        fetch(`${baseUrl}/Connection?StartStationId=${startStation}&EndStationId=${endStation}&DepartureTime=${departureTime}`)
            .then((response) => response.json())
            .then((data) => {
                        setConnections(data);
            }).then(() => navigate("/connections"))
            .catch((error) => console.error("Error:", error));
    };

    return (
        <div className='container'>

            <Container className='form-container' maxWidth="sm">
                <form onSubmit={handleSubmit} >
                    <Typography variant="h3" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold' }} gutterBottom>
                        Your journey starts here!
                    </Typography>
                    <Box
                        my={4}
                        display="block"
                        alignItems="center"
                        gap={4}
                        p={2}

                    >
                        <div style={{ marginTop: '16px' }}>
                            <FormControl>
                                <InputLabel id="start-select-label">Start station</InputLabel>
                                <Select
                                    labelId="start-select-label"
                                    label="start-station"
                                    id="startStation"
                                    value={startStation}
                                    onChange={(e) => setStartStation(e.target.value)}
                                    sx={{ minWidth: '200px' }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {stations && stations.map((station) => (
                                        <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <FormControl>
                                <InputLabel id="end-select-label">End station</InputLabel>
                                <Select
                                    labelId="end-select-label"
                                    label="end-station"
                                    id="endStation"
                                    value={endStation}
                                    onChange={(e) => setEndStation(e.target.value)}
                                    sx={{ minWidth: '200px' }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {stations && stations.map((station) => (
                                        <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ marginTop: '16px' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TextField
                                    label="Departure Time"
                                    type="datetime-local"
                                    value={departureTime}
                                    onChange={(e) => setDepartureTime(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </LocalizationProvider>

                        </div>
                        <button type="submit" style={{ marginTop: '16px' }}>Search</button>
                        
                    </Box>

                </form>
            </Container>
        </div>
    );
};

export default SearchForm;