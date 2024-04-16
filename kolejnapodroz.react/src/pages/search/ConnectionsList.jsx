import React, { useEffect } from 'react';
import { useStore } from '../../stores/SearchFormStore';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

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
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}api/connections?StartStationId=${startStation}&EndStationId=${endStation}&DepartureTime=${departureTime}`); // Wstaw odpowiedni endpoint
                if (!response.ok) {
                    
                }
                const data = await response.json();
                setConnections(data); 
            } catch (error) {
                
            }
        };

        fetchData(); 
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
                {connections && connections.map((connection, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={connection.name} />
                        <Button variant="contained" onClick={() => handleSelectConnection(connection)}>Select</Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ConnectionsList;
