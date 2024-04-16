import React from 'react';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function ProviderButton() {
    const navigate = useNavigate();

    return (
        <Button variant="contained" onClick={() => { navigate("/add-provider") }} >
            Add new provider
        </Button>
    );
}

export default ProviderButton;