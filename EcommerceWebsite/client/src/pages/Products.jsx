import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../App'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast'
import {
    CardActionArea,
    CardActions,
    CardMedia,
    CardContent,
    Card,
    Box,
    IconButton,
    Typography
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Grid from '@mui/material/Unstable_Grid2';
import Skeleton from '@mui/material/Skeleton';



function Products() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axiosInstance.get('/api/v1/product/get-all-products')

            if (data?.success) {
                setProducts(data.products)
                toast.success('All Products fetched successfully!')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting All Products')
        }
    }

    const addItemToCart = async (e) => {
        e.stopPropagation()
        const currentItem = JSON.parse(e.currentTarget.value)
        let user = JSON.parse(localStorage.getItem('user'))

        let quantity;
        if (user?.value?.cart?.length !== 0) {
            const cartItemIndex = user.value.cart.findIndex(item => item.productId === currentItem._id)
            if (cartItemIndex !== -1) {
                quantity = user.value.cart[cartItemIndex].quantity += 1
            }
        }
        try {
            const { data } = await axiosInstance.post('/api/v1/auth/add-to-cart', { productId: currentItem._id, quantity, price: currentItem.price, name: currentItem.name })

            if (data?.success) {
                toast.success('Item Added to cart successfully!')
                localStorage.removeItem('user')
                user.value = data.result 
                localStorage.setItem('user', JSON.stringify(user))
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong in addToCartItem function')
        }
    }

    const openProductPage = async (e) => {
        e.stopPropagation()
        const productid = e.currentTarget.getAttribute('productid')

        const { data } = await axiosInstance.post(`/api/v1/product/get-product/${productid}`)
        if (data?.success) {
            toast.success('Product Fetched Successfully')
            navigate('/product', { state: data.productDetails })
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <Box sx={{paddingTop: '3rem'}}>
            <Typography variant='h1' sx={{ fontSize: '2.5rem', paddingTop: '3rem', textAlign: 'center', fontWeight: '500' }}>All Products</Typography>
            <Box sx={{ flexGrow: 1, padding: '1rem' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {products.map((product) => (
                        <Grid xs={2} sm={4} md={4}
                            key={product?._id}
                        >
                            {product ? (<Card sx={{ maxWidth: 345, height: 330, position: 'relative' }} productid={product._id} onClick={openProductPage}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image}
                                        alt="Product Image"
                                    />
                                    <CardContent sx={{ height: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography gutterBottom variant="h5" sx={{ fontSize: '1rem', fontWeight: '500' }}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description.substring(0, 50)} ....
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ display: 'flex', justifyContent: 'end', position: 'sticky', bottom: '0' }}>
                                    <Typography sx={{ marginRight: '.5rem' }}>
                                        ${product.price}
                                    </Typography>
                                    <IconButton onClick={addItemToCart} sx={{ backgroundColor: 'greenyellow'}} value={JSON.stringify(product)} >
                                        <ShoppingCartIcon sx={{ fontSize: '1.3rem', position: 'sticky', bottom: '0' }} />
                                    </IconButton>
                                    <IconButton sx={{
                                        backgroundColor: 'greenyellow'
                                    }} value={product._id} >
                                        <FavoriteBorderIcon sx={{ fontSize: '1.3rem', position: 'sticky', bottom: '0' }} />
                                    </IconButton>
                                </CardActions>
                            </Card>) : (<Skeleton animation='wave' variant="rectangular" width={190} height={300} sx={{
                                borderRadius: '.5rem'
                            }} />)}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default Products