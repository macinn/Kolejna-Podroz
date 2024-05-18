import React from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ReturnButton() {
    const navigate = useNavigate();

    return (
        <IconButton edge="start" aria-label="back" onClick={() => navigate(-1)}
            style={{ position: 'absolute', top: '10px', left: '20px' }}>
            <ArrowBackIcon style={{ color: 'rgb(128, 61, 33)' }} />
        </IconButton>
    );
}

export default ReturnButton;