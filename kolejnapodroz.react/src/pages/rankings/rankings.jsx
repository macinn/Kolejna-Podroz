import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from '@mui/material';

const StyledTableContainer = styled(TableContainer)({
    backgroundColor: '#FFF',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

const StyledTable = styled(Table)({
    minWidth: 650,
});

const StyledTableHead = styled(TableHead)({
    backgroundColor: '#8B4513',
});

const StyledTableCell = styled(TableCell)({
    fontSize: '1.2rem',
    color: '#FFF',
});

const StyledTableBodyCell = styled(TableCell)({
    fontSize: '1.2rem',
    backgroundColor: '#F5F5DC',
    color: '#000',
});

const Rankings = ({ data, sortField }) => {
    const sortedData = [...data].sort((a, b) => a[sortField] - b[sortField]);

    return (
        <StyledTableContainer component={Paper}>
            <StyledTable>
                <StyledTableHead>
                    <TableRow>
                        <StyledTableCell>Rank</StyledTableCell>
                        <StyledTableCell>User</StyledTableCell>
                        <StyledTableCell align="right">{sortField === 'ticketsRank' ? 'Tickets Bought' : 'Travel Time (hours)'}</StyledTableCell>
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {sortedData.map((user, index) => (
                        <TableRow key={index}>
                            <StyledTableBodyCell>{user[sortField === 'ticketsRank' ? 'ticketsRank' : 'travelRank']}</StyledTableBodyCell>
                            <StyledTableBodyCell>{user.name}</StyledTableBodyCell>
                            <StyledTableBodyCell align="right">{user[sortField === 'ticketsRank' ? 'ticketsBought' : 'travelTime']}</StyledTableBodyCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </StyledTableContainer>
    );
};

export default Rankings;
