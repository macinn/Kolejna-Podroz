import LoginButton from './LoginButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from 'react'
import { Box, Button } from "@mui/material";
import ReturnButton from '../../utils/ReturnButton';

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

    // TOOD: jak komus sie chce to niech to upiekszy, pdw
    return (
        <Box>
            <ReturnButton/>
            <h1>You are not logged in.</h1>
            <h1>Do you want to log in?</h1>
            <LoginButton />
            <p>
                <Button onClick={handleContinueWithoutLogin} variant="contained" style={{backgroundColor: 'maroon'}}>
                    Continue without logging in
                </Button>
            </p>
        </Box>
    );
};

export default LoginPage;
