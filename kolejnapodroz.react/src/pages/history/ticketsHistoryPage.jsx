import React, { useEffect, useState } from 'react';
import {List, ListItem, ListItemText, IconButton, Typography, Grid, Box} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../media/trainBlur.jpg';
import ReturnButton from '../../utils/ReturnButton';

const TicketsHistoryPage = () => {

    const navigate = useNavigate();
    const [connections, setConnection] = useState([]);

    useEffect(() => {
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
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white',
            overflowY: 'scroll', }}>
            <ReturnButton/>

            <Grid container spacing={2} style={{ height: '100%'}}>

                <Grid item xs={12} md={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold', marginBottom: '30px'}} >
                        Welcome Magdalena!
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold'}} >
                        Your previously bought tickets:
                    </Typography>
                    <List sx={{ display: 'flex', flexDirection: 'column' }}>
                        {exampleConnections && exampleConnections.map((train) => (
                            <ListItem key={train.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <div style={{ border: '2px solid maroon', borderRadius: '10px', width: '80%', margin: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <ListItemText
                                        sx={{ marginLeft: '40px' }}
                                        primary={`From: ${train.from.name} - ${train.from.city}`}
                                        secondary={`Departure Time: ${new Date(train.departureTime).toLocaleString()}`}
                                    />
                                    <ListItemText
                                        
                                        primary={`To: ${train.destination.name} - ${train.destination.city}`}
                                        secondary={`Arrival Time: ${new Date(train.arrivalTime).toLocaleString()}`}
                                    />
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={12} md={4} sx={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '100px'
                }}>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            width: '65%',
                            marginBottom: '55px'
                        }}>
                        <Typography variant="h6" sx={{
                            color: 'rgb(128, 61, 33)',
                            fontWeight: 'bold',
                            margin: '20px',
                        }}>
                            Your loyalty points:
                        </Typography>
                        <Typography variant="h4" sx={{
                            color: 'black',
                            fontWeight: 'bold',
                            margin: '20px',
                        }}>
                            130
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '20px',
                            width: '65%',
                            color: 'black',
                        }}>
                        <Typography variant="h6" sx={{
                            color: 'rgb(128, 61, 33)',
                            fontWeight: 'bold',
                            margin: '20px',
                        }}>
                            Account details:
                        </Typography>
                        <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>
                            Name:
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            Surname:
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom:'20px' }}>
                            Email:
                        </Typography>
                    </Box>

                </Grid>
            </Grid>
        </div>
    );
}

export default TicketsHistoryPage;