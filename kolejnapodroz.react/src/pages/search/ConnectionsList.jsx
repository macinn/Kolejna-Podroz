import React, { useEffect } from 'react';
import { useStore } from '../../stores/SearchFormStore';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';
import { Button } from '@mui/material';


const ConnectionsList = () => {
    const { startStation, setStartStation,
            endStation, setEndStation,
            departureTime, setDepartureTime,
            connections, setConnections,
            selectedConnection, setSelectedConnection } = useStore();
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (selectedConnection) {
            console.log(selectedConnection);
            navigate('/details', { state: selectedConnection });
        }
    }, [selectedConnection, navigate]);

    const handleSelectConnection = (connection) => {
        setSelectedConnection(connection);
        console.log(selectedConnection);
        //navigate('/details');
    };

    return (
        <div>
            <h2>Available connections</h2>
            <List sx={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
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
