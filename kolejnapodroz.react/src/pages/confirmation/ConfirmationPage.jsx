import React from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import backgroundImage from '../../media/trainBlur.jpg';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const ConfirmationPage = () => {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex',flexDirection: 'column' ,justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: '100%',
                height: '245px',
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <Typography variant="h3" sx={{
                    color: 'rgb(128, 61, 33)',
                    fontWeight: 'bold',
                    marginBottom: '50px',
                }} gutterBottom>
                    Your reservation has been confirmed!
                </Typography>
                <IconButton edge="start" aria-label="back" onClick={() => navigate(-1)} style={{ position: 'absolute', top: '60px', left: '10px'}}>
                    <ArrowBackIcon style={{ color: 'rgb(128, 61, 33)' }}  />
                </IconButton>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(128, 61, 33, 0.5)',
                color: 'white',
                p: 2,
                textAlign: 'left',
                borderRadius: '20px',
                width: '350px',
                paddingLeft: '70px',
                paddingRight: '20px',
                paddingTop: '20px',
                paddingBottom: '20px',
                marginTop: '60px',
            }}>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Connection:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    From starting station 
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '40px', fontStyle: 'italic' }}>
                    Stacja 1
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    To end station
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '40px', fontStyle: 'italic'  }}>
                    Stacja 2
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Time of departure:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    14:00
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Time of arrival:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    15:30
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Departure date:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    15.04.2023
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Provider:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    PKP Intercity
                </Typography>
            </Box>
            
            <Button variant="contained" 
                    style={{ marginTop: '50px', backgroundColor: 'rgb(128, 61, 33)', color: 'white' }}
                    onClick={() => navigate('/history')}>
                View your tickets
            </Button>
        </div>
    
    );
}

export default ConfirmationPage;