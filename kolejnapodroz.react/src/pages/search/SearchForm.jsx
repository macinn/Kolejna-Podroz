import React, { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
    const [startStation, setStartStation] = useState('');
    const [endStation, setEndStation] = useState('');
    const [departureTime, setDepartureTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ startStation, endStation, departureTime });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="startStation">Start Station:</label>
                <input
                    type="text"
                    id="startStation"
                    value={startStation}
                    onChange={(e) => setStartStation(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="endStation">End Station:</label>
                <input
                    type="text"
                    id="endStation"
                    value={endStation}
                    onChange={(e) => setEndStation(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="departureTime">Departure Time:</label>
                <input
                    type="time"
                    id="departureTime"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                />
            </div>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
