import React  from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, TextField, Container, Typography  } from '@mui/material';
import { useStore } from '../../stores/SearchFormStore';
import {Link, useNavigate} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import './SearchForm.css';

const SearchForm = (props) => {
    const baseUrl = props.url;
    const navigate = useNavigate();

    const { StartStationId,  setStartStation,
            EndStationId,    setEndStation,
            DepartureTime, setDepartureTime,
            setConnections,
            stations, setStations,
            setSelectedConnection } = useStore();

    const [stationsState, setStationsState] = useState(stations);

    useEffect(() => {
        setSelectedConnection(null);
        const fetchData = async () => {
            try {
                
            const response = await fetch(`${baseUrl}/station`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
                setStations(jsonData);
                setStationsState(jsonData);
            } catch (error) { alert("Sorry! No stations found!"); }
        };

        if (!stations || stations.length == 0)
            fetchData();
        else
            setStationsState(stations)
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`${baseUrl}/Connection?`
            + new URLSearchParams({ StartStationId, EndStationId, DepartureTime }).toString())
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('No connections fetched');
                }
            })
            .then((data) => {
                setConnections(data);
                navigate("/connections");
            })
            .catch((error) => { alert("Sorry! No connections found!");});
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
                                    value={StartStationId}
                                    onChange={(e) => setStartStation(e.target.value)}
                                    sx={{ minWidth: '200px' }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {stationsState && stationsState.map((station) => (
                                        station.id != EndStationId && 
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
                                    value={EndStationId}
                                    onChange={(e) => setEndStation(e.target.value)}
                                    sx={{ minWidth: '200px' }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {stationsState && stationsState.map((station) => (
                                        station.id != StartStationId && 
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
                                    value={DepartureTime}
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