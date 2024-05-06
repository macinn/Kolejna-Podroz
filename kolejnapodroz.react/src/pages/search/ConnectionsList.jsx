import React, { useEffect } from 'react';
import { useStore } from '../../stores/SearchFormStore';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";


const ConnectionsList = () => {
    const { startStation, setStartStation,
            endStation, setEndStation,
            departureTime, setDepartureTime,
            connections, setConnections,
            selectedConnection, setSelectedConnection } = useStore();
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        console.log(connections)
    }, []); 

    const handleSelectConnection = (connection) => {
        setSelectedConnection(connection);
        navigate('/details');
    };

    return (
        <div>
            <IconButton edge="start" aria-label="back" onClick={() => navigate(-1)} style={{ position: 'absolute', top: '60px', left: '10px' }}>
                <ArrowBackIcon style={{ color: 'rgb(128, 61, 33)' }} />
            </IconButton>
            <Typography variant="h5" sx={{
                color: 'rgb(128, 61, 33)',
                fontWeight: 'bold',
                marginBottom: '25px',
                marginTop: '110px',
            }}>
                Available connections
            </Typography>
            <List sx={{ display: 'flex', flexDirection: 'column' }}>
                {connections && connections.map((train) => (
                    <ListItem key={train.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ border: '2px solid maroon', borderRadius: '10px', width: '60%', margin: '20px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <ListItemText
                                sx={{ marginLeft: '100px' }}
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

        </div>
    );
};

export default ConnectionsList;
