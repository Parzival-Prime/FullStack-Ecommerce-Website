import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../App'
import toast from 'react-hot-toast'
import { Box, Typography } from '@mui/material'

function Products() {
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

    // useEffect(() => {
    //     getAllProducts()
    // }, [])

    return (
        <Box>
            <Typography variant='h1' sx={{fontSize: '2.5rem', marginTop: '2.5rem', textAlign: 'center', fontWeight: '500'}}>All Products</Typography>
            <Box>
                
            </Box>
        </Box>
    )
}

export default Products
