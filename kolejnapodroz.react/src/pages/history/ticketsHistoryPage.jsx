import React, { useEffect, useState } from 'react';
import {List, ListItem, ListItemText, IconButton, Typography, Grid, Box, TextField} from '@mui/material';
import backgroundImage from '../../media/trainBlur.jpg';
import ReturnButton from '../../utils/ReturnButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '@mui/material';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const TicketsHistoryPage = () => {
    const { user } = useAuth0();
    const [tickets, setTickets] = useState([]);
    const [activeTickets, setActiveTickets] = useState([]);
    const [userData, setUserData] = useState(0);
    const [credits, setCredits] = useState();
    const [balance, setBalance] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);

    const baseUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        getUserData()
        getTickets()
        getActiveTickets()
        getUserBalance()
        getExchangeRate()
    }, []);

    const getTickets = () => {
        fetch(`${baseUrl}/Ticket?auth0Id=${user.sub}`)
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error:', error));  
    }

    const getActiveTickets = () => {
        fetch(`${baseUrl}/Ticket/GetActiveTickets?auth0Id=${user.sub}`)
            .then(response => response.json())
            .then(data => setActiveTickets(data))
            .catch(error => console.error('Error:', error));  
    }

    const getUserData = () => {
        fetch(`${baseUrl}/User?auth0Id=${user.sub}`)
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error:', error));
    }

    const getUserBalance = () => {
        fetch(`${baseUrl}/User/GetUserBalance?auth0Id=${user.sub}`)
            .then(response => response.json())
            .then(data => setBalance(data))
            .catch(error => console.error('Error:', error));
    }

    const getExchangeRate = () => {
        fetch(`${baseUrl}/User/LoyaltyPointsExchangeRate`)
            .then(response => response.json())
            .then(data => setExchangeRate(data))
            .catch(error => console.error('Error:', error));
    }

    const resign = (id) => {

        const dataPut = { ticketId: id };
        fetch(`${baseUrl}/Ticket/CancelTicket`, {
            method: "PUT",
            body: JSON.stringify(dataPut),
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
                getActiveTickets();
                getUserData();
                console.log('Poprawnie zrezygnowano z biletu:', data);
            })
            .catch(error => {
                console.error('Wyst�pi� b��d:', error);
            });
    }

    const handleAddPoints = (e) => {
        e.preventDefault();
        const data = { auth0Id: user.sub, loyaltyPoints: credits };
        fetch(`${baseUrl}/User/ExchangeLoyaltyPoints`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Wystąpił problem podczas przetwarzania żądania.');
                }
                return response.json();
            })
            .then(data => {
                getUserData();
                getUserBalance();
                setCredits(0);
                console.log('Poprawnie przelano punkty:', data);
            })
            .catch(error => {
                console.error('Wystpąił błąd:', error);
            });
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white',
            overflowY: 'scroll', backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'}}>
            <ReturnButton/>
                <Grid container spacing={2} style={{ height: '100%'}}>
                <Grid item xs={12} md={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Avatar alt={user.nickname} src={user.picture} sx={{ height: '6em', width: '6em', marginBottom: '1em' }} />
                    <Typography variant="h4" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold', marginBottom: '2em'}} >
                        Welcome {user.nickname}!
                    </Typography>

                    <Typography variant="h5" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold' }} >
                        Your active tickets:
                    </Typography>
                    <List sx={{ display: 'flex', flexDirection: 'column' }}>
                        {activeTickets && activeTickets.map((activeTicket) => (
                            <ListItem key={activeTicket.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ border: '0.1em solid maroon', borderRadius: '10px', width: '80%', margin: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <ListItemText
                                        sx={{ marginLeft: '3em' }}
                                        primary={`From: ${activeTicket.connection.from.name} - ${activeTicket.connection.from.city}`}
                                        secondary={`Departure Time: ${new Date(activeTicket.connection.departureTime).toLocaleString()}`}
                                    />
                                    <ListItemText

                                        primary={`To: ${activeTicket.connection.destination.name} - ${activeTicket.connection.destination.city}`}
                                        secondary={`Arrival Time: ${new Date(activeTicket.connection.arrivalTime).toLocaleString()}`}
                                    />
                                    <Button variant="contained"
                                        sx={{marginRight: '1em', padding: '5px', backgroundColor: 'brown', '&:hover': { backgroundColor: 'red' } }}
                                        onClick={() => { resign(activeTicket.id) }}>
                                        Resign
                                    </Button>
                                </div>
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="h5" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold'}} >
                        Your previously bought tickets:
                    </Typography>
                    <List sx={{ display: 'flex', flexDirection: 'column' }}>
                        {tickets && tickets.map((ticket) => (
                            <ListItem key={ticket.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ border: '0.1em solid maroon', borderRadius: '10px', width: '80%', margin: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <ListItemText
                                        sx={{ marginLeft: '3em' }}
                                        primary={`From: ${ticket.connection.from.name} - ${ticket.connection.from.city}`}
                                        secondary={`Departure Time: ${new Date(ticket.connection.departureTime).toLocaleString()}`}
                                    />
                                    <ListItemText
                                        
                                        primary={`To: ${ticket.connection.destination.name} - ${ticket.connection.destination.city}`}
                                        secondary={`Arrival Time: ${new Date(ticket.connection.arrivalTime).toLocaleString()}`}
                                    />
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} md={4} sx={{
                    
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginBottom: '100px'
                }}>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '1em',
                            width: '65%',
                            color: 'black',
                            margin: '1em'
                        }}>
                        <Typography variant="h6" sx={{
                            color: 'rgb(128, 61, 33)',
                            fontWeight: 'bold',
                            margin: '1em',
                        }}>
                            Account balance:
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1em' }}>
                            {balance} PLN
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '1em',
                            width: '65%',
                            marginBottom: '20px'
                        }}>
                        <Typography variant="h6" sx={{
                            color: 'rgb(128, 61, 33)',
                            fontWeight: 'bold',
                            marginTop: '1em',
                        }}>
                            Your loyalty points:
                        </Typography>
                        
                        <Typography variant="h4" sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            margin: '20px',
                        }}>
                            {userData.loyaltyPoints }
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '1em',
                            width: '65%',
                            marginBottom: '20px'
                        }}>
                        <form onSubmit={handleAddPoints} >
                            <Typography variant="h6" sx={{
                                color: 'rgb(128, 61, 33)',
                                fontWeight: 'bold',
                                marginTop: '1em',
                            }}>
                                Transfer loyalty points to account balance
                            </Typography>
                            <Typography variant="subtitle2" sx={{
                                color: 'rgb(128, 61, 33)',
                                fontWeight: 'bold',
                            }}>
                                Exchange rate: {1 / exchangeRate} Points = 1 PLN
                            </Typography>
                            <TextField
                                margin="dense"
                                label="Credits"
                                type="number"
                                fullWidth
                                value={credits}
                                defaultValue={0}
                                onChange={(e) => setCredits(e.target.value)}
                                sx={{ width: '80%', marginBottom: '1em' }} 
                            />
                        <button type="submit" style={{ marginBottom: '16px' }} disabled={!credits}>Transfer</button>  
                    </form>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '1em',
                            width: '65%',
                            color: 'black',
                        }}>
                        <Typography variant="h6" sx={{
                            color: 'rgb(128, 61, 33)',
                            fontWeight: 'bold',
                            margin: '1em',
                        }}>
                            Account details:
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Name: {user.nickname}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom:'1em' }}>
                            Email: {user.email}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default TicketsHistoryPage;