import React, { useEffect } from 'react';
import { useStore } from '../../stores/SearchFormStore';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import { useAuth0 } from "@auth0/auth0-react";


const ConnectionsList = () => {
    const { StartStationId, setStartStation,
            EndStationId, setEndStation,
            DepartureTime, setDepartureTime,
            connections, setConnections,
            selectedConnection, setSelectedConnection } = useStore();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (selectedConnection) {
            console.log(selectedConnection);
            if (isAuthenticated) {
                navigate('/details', { state: { selectedConnection: selectedConnection} });
            }
            else {
                navigate('/login-page', { state: { selectedConnection: selectedConnection } });
            }
        }
    }, [selectedConnection, navigate]);

    const handleSelectConnection = (connection) => {
        setSelectedConnection(connection);
        console.log(selectedConnection);
        //navigate('/details');
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
                    <ListItem key={train.id} sx={{ border: '1px solid #eee', borderRadius: '5px', margin: '5px 0' }}>
                        <ListItemText
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
                        >
                            Select
                        </Button>
                    </ListItem>
                ))}
            </List>

        </div>
    );
};

export default ConnectionsList;
