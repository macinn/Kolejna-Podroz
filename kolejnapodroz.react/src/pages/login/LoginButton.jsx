import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from 'react'
import { Button } from '@mui/material'

const LoginButton = () => {
    const { user, isAuthenticated, loginWithPopup } = useAuth0();
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (isAuthenticated) {
            const getUserFromToken = () => {
                const data = { name: user.name, family_name: user.family_name, sub: user.sub, given_name: user.given_name, email: user.email, phone_number: user.phone_number, role: user.role[0] }

                fetch(`${baseUrl}/login`, {
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
            <Button variant="contained" onClick={() => loginWithPopup()} style={{backgroundColor: 'maroon'}}>
                Log in
            </Button>
        )
    )
}

export default LoginButton