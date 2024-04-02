import React  from 'react';
import { Select, MenuItem, FormControl, InputLabel, Box, TextField, Container, Typography  } from '@mui/material';
import { useStore } from '../../stores/SearchFormStore';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, DatePicker } from '@mui/x-date-pickers';
import './SearchForm.css';

const SearchForm = () => {
    
    const baseUrl = "https://kolejna-podroz-test.azurewebsites.net/";
    const navigate = useNavigate();

    const { startStation,  setStartStation,
            endStation,    setEndStation,
            departureTime, setDepartureTime,
                           setConnections } = useStore();

    // TODO: Pobrac dane z serwera GET
    const stations = [
        { id: 1, name: 'Warszawa Zachodnia' },
        { id: 2, name: 'Radom Główny' },
        { id: 3, name: 'Kraków Główny' },
      ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO moze to przeniesc gdzies
        console.log(`${departureTime.toISOString()}`);
        try {
            const response = await fetch(`${baseUrl}api/Connection?startStationId=${startStation}&endStationId=${endStation}&departureTime=${departureTime.toISOString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setConnections(data);
            navigate("/connections");
          } catch (error) {
            
          }
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
                                {stations.map((station) => (
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
                                {stations.map((station) => (
                                <MenuItem key={station.id} value={station.id}>{station.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker 
                        label="Departure details"
                        value={departureTime}           
                        onChange={(newDate) => setDepartureTime(newDate)}
                        renderInput={(params) => <TextField {...params} /> }/>
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