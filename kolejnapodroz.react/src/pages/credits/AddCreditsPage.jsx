import React, { useState } from 'react';
import { Box, Button, TextField, Container, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const AddCreditsPage = () => {
    const [credits, setCredits] = useState();
    const { user } = useAuth0();
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_URL;
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { auth0Id: user.sub, amount: credits }
        fetch(`${baseUrl}/User/TopUpBalance`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Wystąpił problem podczas przetwarzania żądania.');
                }
                return response.json();
            })
            .then(data => {
                navigate("/history");
            })
            .catch(error => {
                window.alert('Wystapil blad podczas dodawania środków!');
            });
        
    };

    return (
        <div className='container'>
            <Container className='form-container' maxWidth="sm">
                <form onSubmit={handleSubmit} >
                    <Typography variant="h3" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold' }} gutterBottom>
                        Buy credits
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgb(128, 61, 33)', fontWeight: 'bold' }} gutterBottom>
                        Details about payment in e-mail
                    </Typography>
                    <Box
                        my={4}
                        display="block"
                        alignItems="center"
                        gap={4}
                        p={2}

                    >
                        <div style={{ marginTop: '16px' }}>
                            <TextField
                                margin="dense"
                                label="credits"
                                type="number"
                                fullWidth
                                value={credits}
                                onChange={(e) => setCredits(e.target.value)}
                            />
                        </div>
                        <button type="submit" style={{ marginTop: '16px' }} disabled={!credits}>Buy credits</button>            
                    </Box>
                </form>
            </Container>
        </div>
    );
};

export default AddCreditsPage;
