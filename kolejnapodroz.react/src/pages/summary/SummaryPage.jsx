import React, { useState, useEffect } from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import backgroundImage from '../../media/trainBlur.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useStore } from '../../stores/SearchFormStore';
import { useAuth0 } from "@auth0/auth0-react";

const baseUrl = import.meta.env.VITE_API_URL;

const SummaryPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth0();
    const { selectedConnection } = useStore();
    const location = useLocation();
    const ticketDetails = location.state;

    const departureTime = new Date(selectedConnection.departureTime);
    const departure_date = departureTime.toLocaleDateString();
    const departure_hour = departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const arrivalTime = new Date(selectedConnection.arrivalTime);
    const arrival_hour = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [ticketPrice, setTicketPrice] = useState()

    console.log(ticketDetails);

    useEffect(() => {
        fetch(`${baseUrl}/Ticket/GetTicketPrice/${ticketDetails.ticketId}`)
            .then(response => response.json())
            .then(data => setTicketPrice(data))
    }, []);

    const handleReservationButtonClick = () => {
        // TODO: Wpisac tu prawdziwe dane

        console.log(ticketDetails.ticketId);

        const userAuth0Id = isAuthenticated ? user.sub : "";
        const data = { ConnectionId: selectedConnection.id, UserAuth0Id: userAuth0Id, Price: 10.00, Wagon: 0, Seat: 0, TicketType: ticketDetails.ticketTypeIndex };
        console.log(data);
        fetch(`${baseUrl}/Ticket/AcceptTicket/${ticketDetails.ticketId}`, {
            method: "POST",
            body: JSON.stringify({ ticketId: ticketDetails.ticketId }),
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
                navigate('/confirmation');
            })
            .catch(error => {
                console.error('Wyst¹pi³ b³¹d:', error);
                window.alert('Wystapil blad podczas kupowania biletu');
            });
    }

    return (
        <div style={{ display: 'flex',flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: '100%',
                height: '245px',
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <Typography variant="h3" sx={{
                    color: 'rgb(128, 61, 33)',
                    fontWeight: 'bold',
                    marginBottom: '50px',
                }} gutterBottom>
                    Summary
                </Typography>
                <IconButton edge="start" aria-label="back" onClick={() => navigate(-1)} style={{ position: 'absolute', top: '60px', left: '10px'}}>
                    <ArrowBackIcon style={{ color: 'rgb(128, 61, 33)' }}  />
                </IconButton>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(128, 61, 33, 0.5)',
                color: 'white',
                p: 2,
                textAlign: 'left',
                borderRadius: '20px',
                width: '350px',
                paddingLeft: '70px',
                paddingRight: '20px',
                paddingTop: '20px',
                paddingBottom: '20px',
                marginTop: '60px',
            }}>
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
                    Departure date:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    {departure_date}
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Provider:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    {selectedConnection.provider.name}
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgb(128, 61, 33)' }}>
                    Ticket type:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    {ticketDetails.ticketType}
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgb(128, 61, 33)' }}>
                    Price:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    {ticketPrice}
                </Typography>
                <Button variant="contained"
                    style={{ marginTop: '50px', backgroundColor: 'rgb(128, 61, 33)', color: 'white' }}
                    onClick={handleReservationButtonClick}>
                    Make a reservation
                </Button>
            </Box>
            

        </div>
    
    );
}

export default SummaryPage;