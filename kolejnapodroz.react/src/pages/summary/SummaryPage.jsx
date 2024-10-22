import React, { useState, useEffect } from 'react';
import {Box, Button, Typography} from "@mui/material";
import backgroundImage from '../../media/trainBlur.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
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

    const handleReservationButtonClick = () => {
        // TODO: Wpisac tu prawdziwe dane

        console.log(ticketDetails.ticketId);

        const userAuth0Id = isAuthenticated ? user.sub : "";
        const data = { ConnectionId: selectedConnection.id, UserAuth0Id: userAuth0Id, Price: selectedConnection.price, Wagon: 0, Seat: 0, TicketType: ticketDetails.ticketTypeIndex };
        console.log(data);

        const acceptTicketRequest = {
            TicketId: ticketDetails.ticketId,
            UserAuth0Id: isAuthenticated ? user.sub : "",
        };

        const url = new URL(`${baseUrl}/Ticket/AcceptTicket`);
        if (ticketDetails.userEmail) {
            url.searchParams.append('email', ticketDetails.userEmail);
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(acceptTicketRequest),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Wyst�pi� problem podczas przetwarzania ��dania.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.price);
                setTicketPrice(data.price)
                console.log('Poprawnie kupiono bilet', data);
                if (!isAuthenticated)
                    window.alert("You will receive e-mail with payment details!")
                navigate('/confirmation');
            })
            .catch(error => {
                console.error('Wyst�pi� b��d:', error);
                window.alert('Wystapil blad podczas kupowania biletu');
            });
    }

    return (
        <div style={{ display: 'flex',flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: `center`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <Typography variant="h3" sx={{
                    color: 'rgb(128, 61, 33)',
                    fontWeight: 'bold',
                }} gutterBottom>
                    Summary
                </Typography>            
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
                        {ticketDetails.ticketPrice}
                    </Typography>
                    <Button variant="contained"
                        style={{ marginTop: '10px', backgroundColor: 'rgb(128, 61, 33)', color: 'white' }}
                        onClick={handleReservationButtonClick}>
                        Make a reservation
                    </Button>
                </Box>
            </Box>
        </div>
    
    );
}

export default SummaryPage;