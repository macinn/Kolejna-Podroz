import React  from 'react';
import { useStore } from '../../stores/SearchFormStore';
import { useNavigate } from 'react-router-dom';

const ConnectionsList = () => {
    const { startStation,  setStartStation,
            endStation,    setEndStation,
            departureTime, setDepartureTime,
            connections,   setConnections } = useStore();

    const navigate = useNavigate();

    return(
        <p>Tu bedzie lista</p>
        <p>{connections}</p>
    );
    
};

export default ConnectionsList;