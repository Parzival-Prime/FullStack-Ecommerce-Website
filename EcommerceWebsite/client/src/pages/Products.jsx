import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../App'
import toast from 'react-hot-toast'
import {
    Button,
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

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));


const data = {
    "success": true,
    "message": "All products fetch successfully!",
    "products": [
        {
            "_id": "6698172f0a9a95ee22c8c977",
            "name": "Herbal Shampoo",
            "slug": "herbal-shampoo",
            "description": "A nourishing shampoo with natural herbal extracts to strengthen and revitalize hair.",
            "price": 15.99,
            "category": "6697aeb41985a49661a6612f",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721243439/l8qqrbdw0j76coa3evby.avif",
            "quantity": 120,
            "rating": 0,
            "createdAt": "2024-07-17T19:10:39.737Z",
            "updatedAt": "2024-07-17T19:10:39.737Z",
            "__v": 0
        },
        {
            "_id": "6698ae34f7adb10563f682c4",
            "name": "Silky Smooth Conditioner",
            "slug": "silky-smooth-conditioner",
            "description": "A conditioner that provides silky smooth texture and shine to your hair.",
            "price": 12.99,
            "category": "6697b6b1fa345a7e838684ea",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721282100/gmddlbjxwxu6kilatwum.avif",
            "quantity": 80,
            "rating": 0,
            "createdAt": "2024-07-18T05:55:00.059Z",
            "updatedAt": "2024-07-18T05:55:00.059Z",
            "__v": 0
        },
        {
            "_id": "6698b251f7adb10563f682cf",
            "name": "Argon Oil Hair Serum",
            "slug": "argon-oil-hair-serum",
            "description": "A premium hair serum enriched with Argan oil for deep nourishment and shine.",
            "price": 25.99,
            "category": "6697b6c4fa345a7e838684f0",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721283154/hm8mpccbmakts0x1fx70.avif",
            "quantity": 50,
            "rating": 0,
            "createdAt": "2024-07-18T06:12:33.538Z",
            "updatedAt": "2024-07-18T06:12:33.538Z",
            "__v": 0
        },
        {
            "_id": "6698b336f7adb10563f682d4",
            "name": "Volumizing Mousse",
            "slug": "volumizing-mousse",
            "description": "A lightweight mousse that adds volume and lift to your hair without weighing it down.",
            "price": 18.99,
            "category": "6697b7b6fa345a7e83868502",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721283382/cmcwuqtaojj57jtq5z28.avif",
            "quantity": 90,
            "rating": 0,
            "createdAt": "2024-07-18T06:16:22.265Z",
            "updatedAt": "2024-07-18T06:16:22.265Z",
            "__v": 0
        },
        {
            "_id": "6698b4d1f7adb10563f682dd",
            "name": "Anti-Dandruff Shampoo",
            "slug": "anti-dandruff-shampoo",
            "description": "A powerful anti-dandruff shampoo that helps eliminate flakes and soothe the scalp.",
            "price": 14.99,
            "category": "6697aeb41985a49661a6612f",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721283794/tnyvsjbgfebf5gunrymn.avif",
            "quantity": 110,
            "rating": 0,
            "createdAt": "2024-07-18T06:23:13.869Z",
            "updatedAt": "2024-07-18T06:23:13.869Z",
            "__v": 0
        },
        {
            "_id": "6698c027f7adb10563f682f1",
            "name": "Leave-In Conditioner",
            "slug": "leave-in-conditioner",
            "description": "A leave-in conditioner that provides all-day moisture and protection for your hair.",
            "price": 13.99,
            "category": "6697b6b1fa345a7e838684ea",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721286696/wkemzsgd0j4zn4fp0hlp.avif",
            "quantity": 70,
            "rating": 0,
            "createdAt": "2024-07-18T07:11:35.845Z",
            "updatedAt": "2024-07-18T07:11:35.845Z",
            "__v": 0
        },
        {
            "_id": "6698c0aef7adb10563f682f4",
            "name": "Frizz Control Hair Spray",
            "slug": "frizz-control-hair-spray",
            "description": "A hair spray that tames frizz and keeps your hair smooth and manageable.",
            "price": 16.99,
            "category": "6697b7b6fa345a7e83868502",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721286830/wfsrddktd2ol52xyb1nv.avif",
            "quantity": 60,
            "rating": 0,
            "createdAt": "2024-07-18T07:13:50.116Z",
            "updatedAt": "2024-07-18T07:13:50.116Z",
            "__v": 0
        },
        {
            "_id": "6698c12df7adb10563f682f7",
            "name": "Hair Growth Oil",
            "slug": "hair-growth-oil",
            "description": "A potent hair oil that promotes hair growth and strengthens roots.",
            "price": 29.99,
            "category": "6697b6c4fa345a7e838684f0",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721286958/fpnwub1x9pwdqt47ye1z.avif",
            "quantity": 40,
            "rating": 0,
            "createdAt": "2024-07-18T07:15:57.503Z",
            "updatedAt": "2024-07-18T07:15:57.503Z",
            "__v": 0
        },
        {
            "_id": "6698c26bf7adb10563f68300",
            "name": "Aloe Vera Gel",
            "slug": "aloe-vera-gel",
            "description": "An antioxidant-rich serum that brightens and firms the skin.",
            "price": 18.75,
            "category": "6698c17df7adb10563f682fb",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721287276/kjhpdefmp5yenbfxzfwo.avif",
            "quantity": 150,
            "rating": 0,
            "createdAt": "2024-07-18T07:21:15.566Z",
            "updatedAt": "2024-07-18T07:21:15.566Z",
            "__v": 0
        },
        {
            "_id": "6698c310f7adb10563f68303",
            "name": "Green Tea Cleanser",
            "slug": "green-tea-cleanser",
            "description": "A gentle green tea cleanser that removes impurities and refreshes the skin.",
            "price": 11.75,
            "category": "6697b839fa345a7e83868510",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721287441/f5ialjqzkvdsvljw0h0q.jpg",
            "quantity": 130,
            "rating": 0,
            "createdAt": "2024-07-18T07:24:00.617Z",
            "updatedAt": "2024-07-18T07:24:00.617Z",
            "__v": 0
        },
        {
            "_id": "6698c375f7adb10563f68306",
            "name": "Tea Tree Oil Conditioner",
            "slug": "tea-tree-oil-conditioner",
            "description": "A refreshing conditioner with tea tree oil to invigorate the scalp.",
            "price": 11.99,
            "category": "6697b6b1fa345a7e838684ea",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721287542/iull52ugoiwq82mxdclz.avif",
            "quantity": 70,
            "rating": 0,
            "createdAt": "2024-07-18T07:25:41.770Z",
            "updatedAt": "2024-07-18T07:25:41.770Z",
            "__v": 0
        },
        {
            "_id": "6698c3c0f7adb10563f68309",
            "name": "Rose Water Toner",
            "slug": "rose-water-toner",
            "description": "A refreshing rose water toner that soothes and hydrates the skin.",
            "price": 9.99,
            "category": "6697b844fa345a7e83868516",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721287617/fl3a9mbqcygsurns2y3o.avif",
            "quantity": 140,
            "rating": 0,
            "createdAt": "2024-07-18T07:26:56.921Z",
            "updatedAt": "2024-07-18T07:26:56.921Z",
            "__v": 0
        },
        {
            "_id": "6698c471f7adb10563f6830c",
            "name": "Avocado Hair Mask",
            "slug": "avocado-hair-mask",
            "description": "A nourishing hair mask with avocado to repair and strengthen hair.+",
            "price": 17.99,
            "category": "6697b75cfa345a7e838684f6",
            "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721287794/btbwwfkeb583wycymlrs.avif",
            "quantity": 50,
            "rating": 0,
            "createdAt": "2024-07-18T07:29:53.536Z",
            "updatedAt": "2024-07-18T07:29:53.536Z",
            "__v": 0
        }
    ]
}




function Products() {
    // const [products, setProducts] = useState([])
    const loading = true

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
            <Typography variant='h1' sx={{ fontSize: '2.5rem', marginTop: '2.5rem', textAlign: 'center', fontWeight: '500' }}>All Products</Typography>
            <Box sx={{ flexGrow: 1, padding: '1rem' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {(!loading ? products : data.products).map((product) => (
                        <Grid xs={2} sm={4} md={4}
                            key={product?._id}
                            value={product?._id}
                        >
                            {product ? (<Card sx={{ maxWidth: 345, height: 330, position: 'relative' }} value={product._id}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={product.image}
                                        alt="Product Image"
                                    />
                                    <CardContent sx={{ height: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Typography gutterBottom variant="h5" sx={{ fontSize: '1rem', fontWeight: '500'}}>
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description.substring(0, 50)} ....
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ display: 'flex', justifyContent: 'end', position: 'sticky', bottom: '0' }}>
                                        <Typography sx={{marginRight: '.5rem'}}>
                                            ${product.price}
                                        </Typography>
                                    <IconButton sx={{
                                        backgroundColor: 'greenyellow'
                                    }} value={product._id} >
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




{ data.products }