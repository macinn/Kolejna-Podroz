import React, { useEffect, useState } from 'react';
import {List, ListItem, ListItemText, IconButton, Typography, Grid, Box} from '@mui/material';
import backgroundImage from '../../media/trainBlur.jpg';
import ReturnButton from '../../utils/ReturnButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Avatar } from '@mui/material';



const TicketsHistoryPage = () => {
    const { user } = useAuth0();
    const [tickets, setTickets] = useState([]);
    const [userData, setUserData] = useState(0);
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        
        fetch(`${baseUrl}/User?auth0Id=${user.sub}`)
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error:', error));

        fetch(`${baseUrl}/Ticket?auth0Id=${user.sub}`)
            .then(response => response.json())
            .then(data => setTickets(data))
            .catch(error => console.error('Error:', error));      
    }, []);


    const exampleConnections = [
        {
            id: 1,
            from: { name: 'Warszawa Centralna', city: 'Warszawa' },
            destination: { name: 'Kraków Główny', city: 'Kraków' },
            departureTime: new Date().toISOString(), 
            arrivalTime: new Date().toISOString(), 
        },
        {
            id: 2,
            from: { name: 'Kraków Główny', city: 'Kraków' },
            destination: { name: 'Warszawa Centralna', city: 'Warszawa' },
            departureTime: new Date().toISOString(), 
            arrivalTime: new Date().toISOString(), 
        },
        {
            id: 1,
            from: { name: 'Warszawa Centralna', city: 'Warszawa' },
            destination: { name: 'Kraków Główny', city: 'Kraków' },
            departureTime: new Date().toISOString(),
            arrivalTime: new Date().toISOString(),
        },
        {
            id: 2,
            from: { name: 'Kraków Główny', city: 'Kraków' },
            destination: { name: 'Warszawa Centralna', city: 'Warszawa' },
            departureTime: new Date().toISOString(),
            arrivalTime: new Date().toISOString(),
        }
    ];

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
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '100px'
                }}>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '1em',
                            width: '65%',
                            marginBottom: '3.5em'
                        }}>
                        <Typography variant="h6" sx={{
                            color: 'rgb(128, 61, 33)',
                            fontWeight: 'bold',
                            margin: '1em',
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