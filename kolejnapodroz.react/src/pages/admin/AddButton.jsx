import React from 'react';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

function AddButton() {
    const navigate = useNavigate();

    return (
        <Button variant="contained" onClick={() => { navigate("/add") } } >
            Add new connection
        </Button>
  );
}

export default AddButton;