import React  from 'react';
import { useStore } from '../../stores/SearchFormStore';

const SearchForm = () => {
    const { startStation,  setStartStation,
            endStation,    setEndStation,
            departureTime, setDepartureTime,
                           setConnections } = useStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO moze to przeniesc gdzies
        try {
            const response = await fetch(`api/Connection?startStationId=${startStation}&endStationId=${endStation}&departureTime=${departureTime}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setConnections(data);
            // TODO navigate do strony ze znalezionymi ciopągami
          } catch (error) {
            
          }
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