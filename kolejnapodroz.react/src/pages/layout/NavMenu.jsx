import { AppBar, Toolbar, styled, Avatar } from '@mui/material';
import LoginButton from '../login/LoginButton';
import LogoutButton from '../login/LogoutButton';
import AddButton from '../admin/AddButton';
import ShowIfAdmin from '../../utils/ShowIfAdmin';
import ProviderButton from '../admin/ProviderButton';
import StationButton from '../admin/StationButton';
import { Link } from 'react-router-dom';
import trainIcon from '../../assets/train_icon.jpg';

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "flex-end",
    background: '#2F1B12',
    height: 60
});

const Filler = styled('div')({
    marginLeft: 'auto',
});

const StyledAvatar = styled(Avatar)({
    width: '55px',
    height: '50px',
    marginRight: '10px',
});


const NavMenu = () => {
    return (
        <AppBar position="fixed">
            <StyledToolbar>
                <Link to="/">
                    <StyledAvatar alt="Courier Logo" src={trainIcon} variant="square"/>
                </Link>
                <Filler />
                <ShowIfAdmin>
                    <AddButton />
                    <ProviderButton />
                    <StationButton />
                </ShowIfAdmin>
                <Filler/>
                <LoginButton />
                <LogoutButton />
            </StyledToolbar>
        </AppBar>
    );
};

export default NavMenu;
