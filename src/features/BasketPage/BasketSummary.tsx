import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import React from 'react'
import { useStoreContext } from '../../context/StoreContext'
import currencyFormatter from '../../Helpers/currencyFormatter'

const BasketSummary = () => {
  const { basket } = useStoreContext()
  const subtotal = basket?.items.reduce((sum, item) => sum += (item.quantity * item.price), 0) ?? 0
  const deliveryFee = subtotal > 1000000 ? 0 : 50000;
  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                قیمت
              </TableCell>
              <TableCell align='center'>{currencyFormatter(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                هزینه ارسال
              </TableCell>
              <TableCell align='center'>{currencyFormatter(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                قیمت کل
              </TableCell>
              <TableCell align='center'>{currencyFormatter(deliveryFee + subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                پست رایگان برای خرید های بالای ۱ میلیون تومان
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BasketSummary