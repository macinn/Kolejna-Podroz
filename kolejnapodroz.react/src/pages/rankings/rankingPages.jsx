import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, styled } from '@mui/material';
import Rankings from './rankings';

const PageContainer = styled(Box)({
    backgroundColor: '#F5F5DC',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const StyledTabs = styled(Tabs)({
    marginBottom: '20px',
    '& .MuiTabs-indicator': {
        backgroundColor: '#8B4513',
    }
});

const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    fontSize: '1.2rem',
    fontWeight: 'bold',
    '&.Mui-selected': {
        color: '#8B4513',
    },
    '&:hover': {
        color: '#8B4513',
    },
}));

const RankingsPage = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [usersRanking, setUsersRanking] = useState([]);
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl}/ranking`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setUsersRanking(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };

    return (
        <PageContainer>
            <StyledTabs value={tabIndex} onChange={handleChange} aria-label="rankings tabs" centered>
                <StyledTab label="Tickets Bought" />
                <StyledTab label="Travel Time" />
            </StyledTabs>
            <Rankings data={usersRanking} sortField={tabIndex === 0 ? 'ticketsRank' : 'travelRank'} />
        </PageContainer>
    );
};

export default RankingsPage;
