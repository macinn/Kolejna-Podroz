import { AppBar, Toolbar, styled } from '@mui/material';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import AddButton from '../admin/AddButton';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "flex-end",
    background: '#2F1B12',
});

const Filler = styled('div')({
    marginLeft: 'auto',
    
});


const NavMenu = () => {
    return (
        <AppBar position="fixed">
            <StyledToolbar>
                <AddButton />
                <Filler/>
                <LoginButton />
                <LogoutButton />
            </StyledToolbar>
        </AppBar>
    );
};

export default NavMenu;
