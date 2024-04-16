import React from 'react';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function ProviderButton() {
    const navigate = useNavigate();

    return (
        <Button variant="contained" onClick={() => { navigate("/add-provider") }} sx={{ m: 1 }}>
            Add new provider
        </Button>
    );
}

export default ProviderButton;