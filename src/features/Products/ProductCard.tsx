import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import IProduct from '../../app/models/product'
import { Link } from 'react-router-dom'
import agent from '../../app/api/agent'
import { LoadingButton } from '@mui/lab'
import { useStoreContext } from '../../context/StoreContext'
interface IProps {
    productItem: IProduct
}
const ProductCard = ({ productItem }: IProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setBasket } = useStoreContext()
    const handleAddItemToBasket = (productId: number) => {
        setLoading(true);
        agent.basket.addItemToBasket(productId).then(basket =>
            setBasket(basket))
            .catch(error =>
                console.log(error))
            .finally(() => setLoading(false));
    }
    return (
        <Card sx={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: "space-between" }}>
            <CardMedia
                component="img"
                // height="200"
                image={productItem.pictureURL}
                alt={productItem.productName} />
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {productItem.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    برند: {productItem.brand}
                </Typography>
            </CardContent>
            <CardActions dir='ltr'>
                <LoadingButton loading={loading} onClick={() => {
                    handleAddItemToBasket(productItem.id)
                }} size="small">اضافه کردن به سبد خرید</LoadingButton>
                <Button component={Link} to={`/product/${productItem.id}`} size="small">مشاهده محصول</Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard
