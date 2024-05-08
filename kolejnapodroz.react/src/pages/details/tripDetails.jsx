import React, { useState} from 'react';
import {Box, Button, FormControlLabel, IconButton, MenuItem, Radio, Select, Typography} from "@mui/material";
import backgroundImage from '../../media/trainBlur.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useStore } from '../../stores/SearchFormStore';

const baseUrl = import.meta.env.VITE_API_URL;

const TripDetailsPage = () => {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const { selectedConnection, setSelectedConnection } = useStore();
    const seating = ['Window', 'Aisle'];
    const [selectedSeating, setSelectedSeating] = useState('Window'); // Domyœlna wartoœæ 'Window'
    const departureTime = new Date(selectedConnection.departureTime);
    const departure_date = departureTime.toLocaleDateString();
    const departure_hour = departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const arrivalTime = new Date(selectedConnection.arrivalTime);
    const arrival_hour = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const ticketTypes = ['Normal', 'Student', 'Senior'];
  
    const [selectedTicketType, setselectedTicketType] = useState('Normal'); 
    

    const handleSeatingChange = (event) => {
        setSelectedSeating(event.target.value);
    };

    const handleTicketTypeChange = (event) => {
        setselectedTicketType(event.target.value);
    };

    const handleBack = () => {
        setSelectedConnection(null);
        navigate("/");
    };

    const handleReservationButtonClick = () => {
        // TODO: Wpisac tu prawdziwe dane
        const data = {
            ConnectionId: selectedConnection.id,
            UserAuth0Id: isAuthenticated ? user.sub : "",
            Price: selectedConnection.price,
            Wagon: 0,
            Seat: 0,
            TicketType: ticketTypes.findIndex(type => type === selectedTicketType)
        };
        console.log(data);
        fetch(`${baseUrl}/Ticket`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Wyst¹pi³ problem podczas przetwarzania ¿¹dania.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Poprawnie kupiono bilet', data);
                navigate('/summary', { state: { ticketType: selectedTicketType, ticketTypeIndex: ticketTypes.findIndex(type => type === selectedTicketType), ticketId: data.id, ticketPrice: data.price} });
            })
            .catch(error => {
                console.error('Wystąpił błąd:', error);
                window.alert('Wystapil blad podczas kupowania biletu');
            });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',}}>
                
                <Typography variant="h4" sx={{
                    color: 'rgb(128, 61, 33)',
                    fontWeight: 'bold',
                    marginBottom: '50px',
                }} gutterBottom>
                    Choose your trip details:
                </Typography>
                
                <IconButton edge="start" aria-label="back" onClick={handleBack}
                    style={{ position: 'absolute', top: '10px', left: '20px' }}>
                    <ArrowBackIcon style={{ color: 'rgb(128, 61, 33)' }}  />
                </IconButton>
            
            
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                border: '2px solid maroon',
                color: 'black',
                p: 2,
                textAlign: 'left',
                borderRadius: '20px',
                width: '650px',
                paddingLeft: '70px',
                paddingRight: '20px',
                paddingTop: '30px',
                paddingBottom: '30px',
                marginTop: '50px',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'}}>
                    <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                        Connection:
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: '20px' }}>
                        From starting station
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: '40px', fontStyle: 'italic' }}>
                        {selectedConnection.from.name}
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: '20px' }}>
                        To end station
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: '40px', fontStyle: 'italic'  }}>
                        {selectedConnection.destination.name}
                    </Typography>
                    <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                        Departure date:
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: '20px' }}>
                        {departure_date}
                    </Typography>
                    <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                        Time of departure:
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: '20px' }}>
                        {departure_hour}
                    </Typography>
                    <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                        Time of arrival:
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: '20px' }}>
                        {arrival_hour}
                    </Typography>
                    <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                        Provider:
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft: '20px' }}>
                        {selectedConnection.provider.name}
                    </Typography>
                </Box>

                <Box sx={{ width: '300px',  display: 'flex', flexDirection: 'column', marginLeft: '55px' }}>
                    <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                        Choose your seating preference:
                    </Typography>
                    <Select
                        value={selectedSeating}
                        sx={{ color: 'black', marginBottom: '30px' }}
                        onChange={handleSeatingChange}>
                        {seating.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography variant="h6" sx={{ color: 'rgb(128, 61, 33)' }}>
                        Ticket type:
                    </Typography>

                    <Select
                        value={selectedTicketType}
                        sx={{ color: 'white', marginBottom: '30px' }}
                        onChange={handleTicketTypeChange}>
                        {ticketTypes.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                    
                    <FormControlLabel
                        control={<Radio /*checked={hasTable} onChange={(e) => setHasTable(e.target.checked)}*/ />}
                        label="Seat with table"
                        color={'white'}
                        marginTop={'30px'}
                    />
                    <Button
                        variant="contained"
                        style={{ marginTop: '50px', backgroundColor: 'rgb(128, 61, 33)', color: 'white' }}
                        onClick={handleReservationButtonClick}
                    >
                        Go to trip summary
                    </Button>
                </Box>

            </Box>
            </Box>

        </div>

    );
}

export default TripDetailsPage;