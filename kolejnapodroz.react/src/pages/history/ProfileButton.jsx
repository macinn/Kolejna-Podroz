import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProfileButton() {
    const navigate = useNavigate();

    return (
        <IconButton onClick={() => navigate('/history')} >
            <AccountCircleIcon />
        </IconButton>
  );
}

export default ProfileButton;