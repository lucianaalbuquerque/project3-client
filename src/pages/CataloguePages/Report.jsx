import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, ref,  costPrice, commission, price) {
  return { name, ref, costPrice, commission, price };
}

const rows = [
  createData('Anel', 159, 6.0, 24, 4.0),
  createData('Brinco', 237, 9.0, 37, 4.3),
  createData('Colar', 262, 16.0, 24, 6.0),
  createData('Bracelete', 305, 3.7, 67, 4.3),
  createData('Anel2', 356, 16.0, 49, 3.9),
];

function Report(props) {
  return (
    <TableContainer component={Paper} sx={{maxWidth: 650}}>
      <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Ref</TableCell>
            <TableCell align="right">Cost Price&nbsp;€</TableCell>
            <TableCell align="right">Commission&nbsp;%</TableCell>
            <TableCell align="right">Price&nbsp;€</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.ref}</TableCell>
              <TableCell align="right">{row.costPrice}</TableCell>
              <TableCell align="right">{row.commission}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Report