import React from 'react';
import {createTheme} from '@mui/material/styles';

const AdminTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9",
            secondary: {
                main: "#f48fb1",
            },
            background: {
                default: "#121212",
                paper: "#1e1e1e",
            },
            text: {
                primary: "#ffffff",
                secondary: "#bdbdbd",
            },
        },
        typography: {
            fontFamily: "Roboto, Arial, sans-serif",
        },
    },
});
export default AdminTheme;