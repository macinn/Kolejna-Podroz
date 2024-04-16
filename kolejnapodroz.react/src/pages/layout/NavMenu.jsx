import { AppBar, Toolbar, styled } from '@mui/material';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import AddButton from '../admin/AddButton';
import ShowIfAdmin from '../../utils/ShowIfAdmin';
import ProviderButton from '../admin/ProviderButton';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "flex-end",
    background: '#2F1B12',
    height: 60
});

const Filler = styled('div')({
    marginLeft: 'auto',
});


const NavMenu = () => {
    return (
        <AppBar position="fixed">
            <StyledToolbar>
                <ShowIfAdmin>
                    <AddButton />
                    <ProviderButton />
                </ShowIfAdmin>
                <Filler/>
                <LoginButton />
                <LogoutButton />
            </StyledToolbar>
        </AppBar>
    );
};

export default NavMenu;
