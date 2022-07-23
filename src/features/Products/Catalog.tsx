import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import IProduct from '../../app/models/product';
import ProductCard from './ProductCard';
import agent from '../../app/api/agent';
import { toast } from 'react-toastify';
import LoadingComponents from '../../app/layouts/LoadingComponents';
const Catalog = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        agent.Product.allProducts().then(products => setProducts(products))
            .catch(error => toast.error(error))
            .finally(() => setLoading(false))
    }, []);
    if (loading) return <LoadingComponents message='درحال بارگذاری محصولات...' />
    return (
        <Grid container spacing={2} my={3}>
            {products && products.map((item, index) =>
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <ProductCard productItem={item} />
                </Grid>)}
        </Grid>
    )
}

export default Catalog
