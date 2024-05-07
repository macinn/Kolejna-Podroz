import React from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import backgroundImage from '../../media/trainBlur.jpg';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useStore} from '../../stores/SearchFormStore';
const ConfirmationPage = () => {
    const navigate = useNavigate();
    const {selectedConnection} = useStore();
    const departureTime = new Date(selectedConnection.departureTime);
    const departure_date = departureTime.toLocaleDateString();
    const departure_hour = departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const arrivalTime = new Date(selectedConnection.arrivalTime);
    const arrival_hour = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100vh', backgroundColor: 'white' }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                width: '100%',
                height: '145px',
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                <Typography variant="h4" sx={{
                    color: 'rgb(128, 61, 33)',
                    fontWeight: 'bold',
                    marginBottom: '50px',
                }} gutterBottom>
                    Your reservation has been confirmed!
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid maroon',
                color: 'black',
                p: 2,
                textAlign: 'left',
                borderRadius: '20px',
                width: '350px',
                paddingLeft: '70px',
                paddingRight: '20px',
                paddingTop: '20px',
                paddingBottom: '20px',
                marginTop: '50px',
            }}>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Connection:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    From starting station 
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '40px', fontStyle: 'italic' }}>
                    {selectedConnection.from.Name}
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    To end station
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '40px', fontStyle: 'italic'  }}>
                    {selectedConnection.destination.Name}
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Time of departure:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    {departure_hour}
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Time of arrival:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    {arrival_hour}
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Departure date:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    {departure_date}
                </Typography>
                <Typography variant="h6" sx={{color: 'rgb(128, 61, 33)'}}>
                    Provider:
                </Typography>
                <Typography variant="body1" style={{ marginLeft: '20px' }}>
                    {selectedConnection.provider.name}
                </Typography>
                <Button variant="contained"
                    style={{ marginTop: '50px', backgroundColor: 'rgb(128, 61, 33)', color: 'white' }}
                    onClick={() => navigate('/history')}>
                View your tickets
            </Button>
            </Box>
            

        </div>
    
    );
}

export default ConfirmationPage;