import React, { useEffect, useState } from 'react'
import '../styles/cart.css'
import toast from 'react-hot-toast'
import { axiosInstance } from '../App';
import { Typography, Checkbox, ButtonGroup } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const data = {
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
  ]
}

function Cart() {

  const [cartItems, setCartItems] = useState([])
  const [productIds, setProductIds] = useState([])
  const [products, setProducts] = useState([])

  const getCartItemsfromLocalStorage = async()=>{
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      await user.cart.forEach((product)=>{setProductIds([...productIds, product.productId])})
    } catch (error) {
      console.log(error)
      toast.error('something went wrong while getting cart Items from LocalStorage')
    }
  }

  const getCartItems = async()=>{
    try {
      const { data } = await axiosInstance.post('/api/v1/product/get-cart-items', cartItems)
      if(data.success){
        console.log('products fetched successfully!')
        setProducts(data)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong while getting cart items')
    }
  }

  useEffect(() => {
    getCartItemsfromLocalStorage()
    
  }, [])


  return (
    <>
      <div className="cart-container">
        <h1 className="cart-title">
          My Cart
        </h1>

        <div className="cart-list-section">
          <h5 className='cart-list-title'>My Cart List</h5>

          <div className="cart-list-container">
            {cartItems.map((product) => (
              <div className="cart-list-item" key={product._id}>
                <Checkbox className='cart-list-item-checkbox' color="success" />
                <div className="cart-item-left">
                  <img src={product.image} alt="Product Image" className='cart-item-image' />
                  <ButtonGroup className="cart-quantity-box" variant="contained" aria-label="Basic button group">
                    <button className="cart-quantity-decrement">{product.quantity > 1 ? (<RemoveIcon />) : (<DeleteOutlineIcon />)}</button>
                    <button className="cart-quantity-value"><span>{'5'}</span></button>
                    <button className="cart-quantity-increment"><AddIcon /></button>
                  </ButtonGroup>
                </div>

                <div className="cart-item-right">
                  <Typography className='cart-item-title'>{product.name}</Typography>
                  <Typography className='cart-item-description'>{product.description}...</Typography>
                  <Typography className='cart-item-price'>${product.price}</Typography>
                  {(product.quantity > 0) && (<Typography className='cart-item-quantity-check'>In stock</Typography>)}
                  <Typography className='cart-item-replacement'>7 Days Replacement</Typography>
                  <div className="cart-item-right-buttons">
                    <button className="cart-button-delete">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart


