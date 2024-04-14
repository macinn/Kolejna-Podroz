import { AppBar, Toolbar, styled } from '@mui/material';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "flex-end",
    background: '#2F1B12',
});


const NavMenu = () => {
    return (
        <AppBar position="fixed">
            <StyledToolbar>
                <LoginButton />
                <LogoutButton />
            </StyledToolbar>
        </AppBar>
    );
};

export default NavMenu;
