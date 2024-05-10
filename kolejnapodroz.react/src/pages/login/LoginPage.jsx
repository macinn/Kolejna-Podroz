import LoginButton from './LoginButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from 'react'
import { Box, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const selectedConnection = location.state?.selectedConnection;
    const { isAuthenticated } = useAuth0();

    const handleContinueWithoutLogin = () => {
        console.log(location.state);
        navigate("/details", { state: { selectedConnection: selectedConnection } });
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/details", { state: { selectedConnection: selectedConnection } })
            }
    }, [isAuthenticated])

    const handleReturn = () => {
        navigate(-1);
    }
    // TOOD: jak komus sie chce to niech to upiekszy, pdw
    return (
        <Box>
            <IconButton edge="start" aria-label="back" onClick={handleReturn}
                style={{ position: 'absolute', top: '10px', left: '20px' }}>
                <ArrowBackIcon style={{ color: 'rgb(128, 61, 33)' }} />
            </IconButton>
            <h1>Nie jestes zalogowany.</h1>
            <h1>Czy chcesz sie zalogowac?</h1>
            <LoginButton />
            <p>
                <Button onClick={handleContinueWithoutLogin}>
                    Kontynuuj bez logowania
                </Button>
            </p>
        </Box>
    );
};

export default LoginPage;
