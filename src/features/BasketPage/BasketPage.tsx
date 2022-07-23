import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import agent from '../../app/api/agent';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useStoreContext } from '../../context/StoreContext'
import { LoadingButton } from '@mui/lab';
import currencyFormatter from '../../Helpers/currencyFormatter';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';
const BasketPage = () => {
    const [status, setStatus] = useState<{
        loading: boolean,
        name: string
    }>({
        loading: false,
        name: ''
    });
    const { basket, setBasket, removeItem } = useStoreContext()
    const handleRemoveItemFromBasket = (productId: number, quantity = 1, name = '') => {
        setStatus({ loading: true, name })
        agent.basket.removeItemFromBasket(productId, quantity)
            .then(() => removeItem(productId, quantity))
            .catch(error => console.log(error))
            .finally(() => setStatus({
                loading: false, name: ''
            }))
    }
    const handleAddItemToBasket = (productId: number, name = '') => {
        setStatus({ loading: true, name })
        agent.basket.addItemToBasket(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({ loading: false, name: '' }))
    }
    if (!basket) return <Typography variant="h3">سبد خرید شما خالی است</Typography>
    return (
        <>
            <TableContainer component={Paper} sx={{ margin: "23px 0" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>محصول</TableCell>
                            <TableCell align="center">قیمت واحد</TableCell>
                            <TableCell align="center">تعداد</TableCell>
                            <TableCell align="center">قیمت کل</TableCell>
                            <TableCell align="center">عملیات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                    <Box display="flex" alignItems="center">
                                        <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginLeft: 16 }} />
                                        {item.name}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{currencyFormatter(item.price)}</TableCell>
                                <TableCell align="center">
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <LoadingButton
                                            loading={status.loading && status.name === `rem${item.productId}`}
                                            onClick={() => handleRemoveItemFromBasket(item.productId, 1, `rem${item.productId}`)}>
                                            <Remove color="primary" />
                                        </LoadingButton>
                                        <span>{item.quantity}</span>
                                        <LoadingButton loading={status.loading && status.name === `add${item.productId}`}
                                            onClick={() => handleAddItemToBasket(item.productId, `add${item.productId}`)}>
                                            <Add color="secondary" />
                                        </LoadingButton>
                                    </Box>
                                </TableCell>
                                <TableCell align="center">{currencyFormatter(item.price * item.quantity)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton loading={status.loading && status.name === `remAll${item.productId}`}
                                        onClick={() => handleRemoveItemFromBasket(item.productId, item.quantity, `remAll${item.productId}`)}>
                                        <Delete color='error' />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container mt={3}>
                <Grid item xs={0} sm={6} md={8}></Grid>
                <Grid item xs={12} sm={6} md={4}><BasketSummary />
                    <Button component={Link} to="/checkout">پرداخت نهایی</Button></Grid>
            </Grid>
        </>)
};

export default BasketPage;
