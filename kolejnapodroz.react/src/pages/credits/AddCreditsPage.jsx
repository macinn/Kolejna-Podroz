import React, { useState } from 'react';
import { Box, Button, TextField, Container, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import '../search/SearchForm.css';


const AddCreditsPage = () => {
    const [credits, setCredits] = useState();
    const navigate = useNavigate();
    const handleSubmit = () => {
        // TODO: Marcin prosze cie podlacz to jakos do backendu bo juz mam dosc tego javascripta

        navigate("/history");
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
                                type="text"
                                fullWidth
                                value={credits}
                                onChange={(e) => setCredits(e.target.value)}
                                inputProps={{ pattern: '[0-9]*' }} // Dodanie tego atrybutu
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
