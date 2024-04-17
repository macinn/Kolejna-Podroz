import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from 'react'
import { Button } from '@mui/material'

function LogoutButton() {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button variant="contained"
                sx={{ backgroundColor: 'maroon', '&:hover': { backgroundColor: 'red' } }}
                onClick={() => logout()}>
                Sign out
            </Button>
        )
    )
}
export default LogoutButton