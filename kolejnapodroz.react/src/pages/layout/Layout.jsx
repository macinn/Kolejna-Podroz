import React, { Component } from 'react';
import NavMenu from './NavMenu';
import { Box, styled } from '@mui/material';

const StyledBox = styled(Box)({
    position: 'fixed', // Ustawienie pozycji na fixed
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
});
export class Layout extends Component {
    render() {
        return (
            <Box>
                <NavMenu />
                <StyledBox tag="main" >
                    {this.props.children}
                </StyledBox>
            </Box>
        );
    }
}
