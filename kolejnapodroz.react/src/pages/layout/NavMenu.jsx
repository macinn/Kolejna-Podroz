import React from 'react';
import { AppBar, Toolbar, styled, Avatar, Button } from '@mui/material';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import AddButton from '../admin/AddButton';
import ShowIfAdmin from '../../utils/ShowIfAdmin';
import ProviderButton from '../admin/ProviderButton';
import StationButton from '../admin/StationButton';
import { Link, useNavigate } from 'react-router-dom';
import trainIcon from '../../assets/train_icon.jpg';
import { useState } from 'react';
import ShowIfLoggedIn from '../../utils/ShowIfLoggedIn';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    background: '#2F1B12',
    height: 60
});

const LeftContainer = styled('div')({
    display: "flex",
    alignItems: "center"
});

const StyledAvatar = styled(Avatar)({
    width: '55px',
    height: '50px',
    marginRight: '10px',
});

const RightContainer = styled('div')({
    display: "flex",
    alignItems: "center"
});

const StyledButton = styled(Button)({
    color: "#FAF3EB",
    '&.MuiButton-root': {
        textTransform: 'none',
        fontSize: '18px',
        marginLeft: '15px'
    },
    '&.MuiButton-text': {
        '&:hover': {
            color: '#feedca',
        }
    },
});

const AdminContainer = styled('div')({
    display: "flex",
    alignItems: "center",
    marginRight: '30px'
});


const NavMenu = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed">
            <StyledToolbar>
                <LeftContainer>
                    <Link to="/">
                        <StyledAvatar alt="Courier Logo" src={trainIcon} variant="square" />
                    </Link>
                    <StyledButton onClick={() => navigate('/')}>Home</StyledButton>
                    <StyledButton onClick={() => navigate('/rankings')}>Rankings</StyledButton>
                    <ShowIfLoggedIn>
                        <StyledButton onClick={() => navigate('/history')}>Profile</StyledButton>
                        <StyledButton onClick={() => navigate('/credits')}>Buy credits</StyledButton>
                    </ShowIfLoggedIn>
                </LeftContainer>
                <RightContainer>
                    <AdminContainer>
                        <ShowIfAdmin>
                            <AddButton />
                            <ProviderButton />
                            <StationButton />
                        </ShowIfAdmin>
                    </AdminContainer>
                    <LoginButton />
                    <LogoutButton />
                </RightContainer>
            </StyledToolbar>
        </AppBar>
    );
};

export default NavMenu;
