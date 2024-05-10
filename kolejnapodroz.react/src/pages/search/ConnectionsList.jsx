import React, { useEffect } from 'react';
import { useStore } from '../../stores/SearchFormStore';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import { useAuth0 } from "@auth0/auth0-react";
import backgroundImage from '../../media/trainBlur.jpg';


const ConnectionsList = () => {
    const { StartStationId, setStartStation,
            EndStationId, setEndStation,
            DepartureTime, setDepartureTime,
            connections, setConnections,
            selectedConnection, setSelectedConnection } = useStore();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    const baseUrl = import.meta.env.VITE_API_URL;

    const handleSelectConnection = (connection) => {
        setSelectedConnection(connection);
        console.log(selectedConnection);
        if (isAuthenticated)
            navigate('/details');
        else
            navigate('/login-page');
    };

    return (
        <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: `center`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
            <IconButton edge="start" aria-label="back" onClick={navigate("/")}
                style={{ position: 'absolute', top: '10px', left: '20px' }}>
                <ArrowBackIcon style={{ color: 'rgb(128, 61, 33)' }} />
            </IconButton>
            <Typography variant="h4" sx={{
                color: 'rgb(128, 61, 33)',
                fontWeight: 'bold',
                marginBottom: '25px',
                marginTop: '25px',
            }}>
                Available connections
            </Typography>
            
            <List sx={{ display: 'flex', flexDirection: 'column' }}>
                {connections && connections.map((train) => (
                    <ListItem key={train.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ border: '2px solid maroon', borderRadius: '10px', width: '70%', margin: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <ListItemText
                            sx={{ marginLeft: '70px' }} 
                            primary={`From: ${train.from.name} - ${train.from.city}`}
                            secondary={`Departure Time: ${new Date(train.departureTime).toLocaleString()}`}
                        />
                        <ListItemText
                            primary={`To: ${train.destination.name} - ${train.destination.city}`}
                            secondary={`Arrival Time: ${new Date(train.arrivalTime).toLocaleString()}`}
                        />
                        <Button
                            variant="contained"
                            onClick={() => handleSelectConnection(train)}
                            sx={{backgroundColor: 'rgb(128, 61, 33)', marginRight: '70px' }}
                        >
                            Select
                            </Button>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ConnectionsList;
