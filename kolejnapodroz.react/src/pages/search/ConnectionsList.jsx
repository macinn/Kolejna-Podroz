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

    //const baseUrl = "https://kolejna-podroz-test.azurewebsites.net/";
    const baseUrl = "https://localhost:60016/";

    useEffect(() => {
        console.log(connections)
    }, []); 

    const handleSelectConnection = (connection) => {
        setSelectedConnection(connection);
        // TODO
        // navigate(/strona_ze_szczegolami);
    };

    return (
        <div>
            <h2>Available connections</h2>
            <List>
                {connections && connections.map((train) => (
                    <ListItem key={train.id}>
                        <ListItemText
                            primary={`From: ${train.from.name} - ${train.from.city}`}
                            secondary={`Departure Time: ${new Date(train.departureTime).toLocaleString()}`}
                        />
                        <ListItemText
                            primary={`To: ${train.destination.name} - ${train.destination.city}`}
                            secondary={`Arrival Time: ${new Date(train.arrivalTime).toLocaleString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ConnectionsList;
