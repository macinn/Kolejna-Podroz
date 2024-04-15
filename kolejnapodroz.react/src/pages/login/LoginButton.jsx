import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from 'react'
import { Button } from '@mui/material'

const LoginButton = () => {
    const { user, isAuthenticated, loginWithPopup } = useAuth0();
    const baseUrl = "https://localhost:60016/";

    useEffect(() => {
        if (isAuthenticated) {
            const getUserFromToken = () => {
                const data = { name: user.name, family_name: user.family_name, sub: user.sub, given_name: user.given_name, email: user.email, phone_number: user.phone_number, role: user.role[0] }

                fetch(`${baseUrl}api/login`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            getUserFromToken();
        }
    }, [isAuthenticated])

    return (
        !isAuthenticated && (
            <Button variant="contained" onClick={() => loginWithPopup()} >
                Log in
            </Button>
        )
    )
}

export default LoginButton