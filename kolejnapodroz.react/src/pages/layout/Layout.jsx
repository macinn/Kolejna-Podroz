import React, { Component } from 'react';
import NavMenu from './NavMenu';
import { Box, styled, Grid } from '@mui/material';

const StyledBox = styled(Box)({
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
                <Box tag="main" >
                    <Grid container style={{ backgroundColor: 'blue', height: '*' }}>
                        {this.props.children}
                    </Grid>
                </Box>
            </Box>
        );
    }
}
