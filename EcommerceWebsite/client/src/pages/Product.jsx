import React, { useEffect, useState } from 'react'
import '../styles/product.css'
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import { axiosInstance } from '../baseurl.js';
import { ButtonGroup, IconButton } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// const product = {
//     "_id": "6698ae34f7adb10563f682c4",
//     "name": "Silky Smooth Conditioner",
//     "slug": "silky-smooth-conditioner",
//     "description": "A conditioner that provides silky smooth texture and shine to your hair.",
//     "price": 12.99,
//     "category": "6697b6b1fa345a7e838684ea",
//     "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721282100/gmddlbjxwxu6kilatwum.avif",
//     "quantity": 80,
//     "rating": 0,
//     "createdAt": "2024-07-18T05:55:00.059Z",
//     "updatedAt": "2024-07-18T05:55:00.059Z",
//     "__v": 0
// }

function Product() {
    const location = useLocation()
    const [favroite, setFavroite] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState({})

    const getProduct = () => {
        setProduct(location.state)
    }

    function decrementProductQuantity(e) {
        e.stopPropagation()
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    function incrementProductQuantity(e) {
        e.stopPropagation()
        setQuantity(prev => prev + 1)
    }

    const addToCart = async (e) => {
        const productId = e.currentTarget.getAttribute('product-id')

        const { data } = await axiosInstance.post('/api/v1/auth/add-to-cart', { productId, quantity })
        
        if (data?.success) {
            console.log('Item added to cart')
            toast.success('Item added to Cart')
        }
    }

    useEffect(()=>{
        getProduct()
    }, [])

    return (
        <>
            <div className="product-container">
                <div className="product-top">
                    <div className="product-back-button"><IconButton><ArrowBackIosIcon sx={{ color: 'white' }} /></IconButton></div>
                    <div className="product-image-container">
                        <img src={product.image} alt="Product Image" className="product-image" />
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-title">{product.name}</div>
                    <div className="product-description">{product.description}</div>
                    {product.quantity > 0 ? (<div className="product-InStock">In Stock</div>) : (<div className='product-OutOfStock'>Out of Stock</div>)}
                    <div className="product-price">${product.price}</div>
                    <ButtonGroup className="product-quantity-box" variant="contained" aria-label="Basic button group">
                        <button className="product-quantity-decrement" onClick={decrementProductQuantity}><RemoveIcon sx={{ fontSize: '1.5rem' }} /></button>
                        <button className="product-quantity-value"><span>{quantity}</span></button>
                        <button className="product-quantity-increment" onClick={incrementProductQuantity}><AddIcon sx={{ fontSize: '1.5rem' }} /></button>
                    </ButtonGroup>
                    <div className="product-bottom-buttons">

                        <div className="product-wishlist-button" onClick={() => setFavroite(prev => !prev)}>{favroite ? (<FavoriteIcon sx={{ color: 'white', fontSize: '1.8rem' }} />) : (<FavoriteBorderIcon sx={{ color: 'white', fontSize: '1.8rem' }} />)}</div>

                        <div className="product-add-to-cart-button" product-id={product._id} onClick={addToCart}>
                            <span className="product-add-to-cart-button-text">Add To Cart</span>
                            <IconButton className='product-add-to-cart-button-icon'>
                                <LocalMallIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Product
