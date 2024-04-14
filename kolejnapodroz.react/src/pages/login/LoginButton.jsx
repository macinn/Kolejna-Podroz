import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from 'react'
import { Button } from '@mui/material'

const LoginButton = () => {
    const { isAuthenticated, loginWithPopup } = useAuth0();

    return (
        !isAuthenticated && (
            <Button variant="contained" onClick={() => loginWithPopup()} >
                Log in
            </Button>
        )
    )
}

export default LoginButton