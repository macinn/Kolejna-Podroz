import React from 'react';
import {Box, IconButton, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const TicketsHistoryPage = () => {

    const navigate = useNavigate();
    const tickets= [
        'Warszawa Centralna - Kraków Główny            |      2024-04-12       |     12:00 - 15:30        |  PKP Intercity    ',
        'Warszawa Służewiec - Pionki Zachodnie            |      2024-03-01       |     17:15 - 19:30     |  Koleje Mazowieckie    ',
        'Radom Główny -  Dobieszyn             |      2024-01-06       |     09:05 - 10:00     |  Koleje Mazowieckie    ',
        'Warszawa Centralna -  Gdańsk Główny             |      2023-08-11       |     07:22 - 10:02     |  PKP Intercity    ',];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white',
            overflowY: 'scroll', }}>
            <IconButton edge="start" aria-label="back" onClick={() => navigate(-1)} style={{ position: 'absolute', top: '60px', left: '10px'}}>
                <ArrowBackIcon style={{ color: 'rgb(128, 61, 33)' }}  />
            </IconButton>
            
            <Typography variant="h4" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold'}} gutterBottom>
                Your previously bought tickets:
            </Typography>
            <Box >
                {tickets.map((ticket, index) => (
                    <Typography key={index} variant="body1" style={{
                        width: '1000px',
                        backgroundColor: 'rgba(128, 61, 33, 0.5)',
                        borderRadius: '20px',
                        padding: '20px',
                        margin: '15px 0'
                    }}>
                        {ticket}
                    </Typography>
                ))}
            </Box>
        </div>
    );
}

export default TicketsHistoryPage;