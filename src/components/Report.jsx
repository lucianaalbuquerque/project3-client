import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Report(props) {
  const {productList, commission} = props 

  let rows = productList.map((product) => {
    let salePrice = (product.price - (product.price*(100 - commission))/100).toFixed(2)
    return ({ name: product.name, ref: product.ref, salePrice: salePrice, commission, price: product.price })
  })

  console.log(rows)

  return (
    <TableContainer component={Paper} sx={{maxWidth: 650}}>
      <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Ref</TableCell>
            <TableCell align="right">Sale Price&nbsp;€</TableCell>
            <TableCell align="right">Commission&nbsp;%</TableCell>
            <TableCell align="right">Retail Price&nbsp;€</TableCell>
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
              <TableCell align="right">{row.salePrice}</TableCell>
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