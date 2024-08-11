import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router';
import '../styles/cart.css'
import toast from 'react-hot-toast'
import { axiosInstance } from '../App';
import { Typography, Checkbox, ButtonGroup, Skeleton, Stack } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FlexCenter from '../components/FlexCenter';
import { useSelector } from 'react-redux';


function Cart() {
  const isLoggedIn = useSelector((state) => state.counter.isLoggedIn)
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  const getCartItemsfromDB = async () => {
    try {
      setIsLoading(true)
      const { data } = await axiosInstance.get('/api/v1/auth/get-cart')
      if (data?.success) {
        if (data.cart.length > 0) {
          const productIdsArray = data.cart.map((item) => (item.productId))
          const res = await axiosInstance.post('/api/v1/product/get-cart-items', productIdsArray)
          if (res?.data?.success) {
            setCartItems(data.cart)
            setSelectedItems(data.cart)
            setProducts(res.data.fetchedProducts)
            setIsLoading(false)
          }
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong while getting cart items')
    }
  }

  const updateCart = async (ucart) => {
    try {
      await axiosInstance.post('/api/v1/auth/update-cart', ucart)

    } catch (error) {
      toast.error('Something went wrong in updating cart')
      console.log('Error in UpdateCart: ', error)
    }
  }

  const deleteItemFromCart = (e) => {
    e.stopPropagation()
    const currentProductId = e.currentTarget.value
    const updatedCart = cartItems.filter((product) => (product.productId !== currentProductId))
    const updatedProductsState = products.filter((product) => (product._id !== currentProductId))
    setCartItems(updatedCart)
    setProducts(updatedProductsState)
    setSelectedItems(updatedCart)
    updateCart(updatedCart)
  }

  const displayQuantity = (Id) => {
    const product = cartItems.find(item => item.productId === Id)
    if (product) return product.quantity
  }

  const decrementProductQuantity = useCallback((e) => {
    e.stopPropagation()
    const currentProductId = e.currentTarget.value
    const updatedCart = cartItems.map((item) => (
      (item.productId === currentProductId) ? { ...item, quantity: item.quantity - 1 } : item
    ))
    if (selectedItems.some((item) => item.productId === currentProductId)) {
      const newArray = selectedItems.map((item) => (item.productId === currentProductId) ? { ...item, quantity: item.quantity - 1 } : item)
      setSelectedItems(newArray)
    }
    setCartItems(updatedCart)
    updateCart(updatedCart)
  }, [cartItems])

  const incrementProductQuantity = useCallback((e) => {
    e.stopPropagation()
    const currentProductId = e.currentTarget.value
    const updatedCart = cartItems.map((item) => (
      (item.productId === currentProductId) ? { ...item, quantity: item.quantity + 1 } : item
    ))
    if (selectedItems.some((item) => item.productId === currentProductId)) {
      const newArray = selectedItems.map((item) => (item.productId === currentProductId) ? { ...item, quantity: item.quantity + 1 } : item)
      setSelectedItems(newArray)
    }
    setCartItems(updatedCart)
    updateCart(updatedCart)
  }, [cartItems])

  const openProductPage = async (e) => {
    e.stopPropagation()
    const productid = e.currentTarget.getAttribute('productid')

    const { data } = await axiosInstance.post(`/api/v1/product/get-product/${productid}`)
    if (data?.success) {
      toast.success('Product Fetched Successfully')
      navigate('/product', { state: data.productDetails })
    }
  }

  const handleSelect = useCallback((e) => {
    const checkedProductId = e.target.value

    const isItemPresent = selectedItems.find((item) => (item.productId === checkedProductId))

    if (isItemPresent) {
      const filteredArray = selectedItems.filter((item) => (item.productId !== checkedProductId))
      setSelectedItems(filteredArray)
      return
    }

    const checkedItem = cartItems.filter((item) => (item.productId === checkedProductId))
    setSelectedItems((prev) => prev.concat(checkedItem))
  }, [selectedItems])

  const calcTotal = () => {
    let total = 0;
    selectedItems.forEach((item) => {
      total += (item.price * item.quantity)
    })
    setSubtotal(total.toFixed(2))
  }

  const handleCheckout = async () => {
    try {
      // console.log(selectedItems)
      const { data } = await axiosInstance.post(`/api/v1/payment/create-checkout-session`, { selectedItems, subtotal })

      if (data?.success) {
        console.log("data.sessionURL: ", data.sessionURL)
        window.location = data.sessionURL
      }
    } catch (error) {
      console.log(error)
      console.log('Something went wrong in handle Checkout')
    }
  }

  useEffect(() => {
    getCartItemsfromDB()
    if (!isLoggedIn) {
      return navigate('/login', { state: { from: location.pathname } })
    }
  }, [])

  useEffect(() => {
    calcTotal()
  }, [selectedItems])

  useEffect(() => {
    if (!isLoggedIn) {
      return navigate('/login', { state: { from: location.pathname } })
    }
  }, [isLoggedIn])

  return (
    <>
      <div className="cart-container">
        <h1 className="cart-title">
          My Cart
        </h1>

        <div className="cart-list-section">
          {cartItems.length > 0 ? (<><h5 className='cart-list-title'>My Cart List</h5>

            <div className="cart-list-container">
              {!isLoading ? (
                products.map((product) => (
                  <div className="cart-list-item" key={product._id} >
                    <Checkbox className='cart-list-item-checkbox' defaultChecked onChange={handleSelect} value={product._id} color="success" />
                    <div className="cart-item-left" productid={product._id} onClick={openProductPage}>
                      <img src={product.image} alt="Product Image" className='cart-item-image' />
                      <ButtonGroup className="cart-quantity-box" variant="contained" aria-label="Basic button group">
                        {displayQuantity(product._id) > 1 ? (
                          <button className="cart-quantity-decrement" value={product._id} onClick={decrementProductQuantity}>
                            <RemoveIcon />
                          </button>
                        ) : (
                          <button className="cart-quantity-decrement" value={product._id} onClick={deleteItemFromCart} >
                            <DeleteOutlineIcon />
                          </button>
                        )}
                        <button className="cart-quantity-value"><span>{displayQuantity(product._id)}</span></button>
                        <button className="cart-quantity-increment" value={product._id} onClick={incrementProductQuantity}>
                          <AddIcon />
                        </button>
                      </ButtonGroup>
                    </div>

                    <div className="cart-item-right" productid={product._id} onClick={openProductPage}>
                      <Typography className='cart-item-title'>{product.name.substring(0, 18)}{product.name.length > 18 ? '...' : ''}</Typography>
                      <Typography className='cart-item-description'>{product.description.substring(0, 90)}{product.description.length > 90 ? '...' : ''}</Typography>
                      <Typography className='cart-item-price'>${product.price}</Typography>
                      {(product.quantity > 0) && (<Typography className='cart-item-quantity-check'>In stock</Typography>)}
                      <Typography className='cart-item-replacement'>7 Days Replacement</Typography>
                      <div className="cart-item-right-buttons">
                        <button className="cart-button-delete" value={product._id} onClick={deleteItemFromCart}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (<Stack spacing={1}>
                <Skeleton variant="rounded" animation='wave' className='cart-skeleton' />
                <Skeleton variant="rounded" animation='wave' className='cart-skeleton' />
                <Skeleton variant="rounded" animation='wave' className='cart-skeleton' />
                {/* <Skeleton variant="rounded" animation='wave' className='cart-skeleton' />
                <Skeleton variant="rounded" animation='wave' className='cart-skeleton' />
                <Skeleton variant="rounded" animation='wave' className='cart-skeleton' />
                <Skeleton variant="rounded" animation='wave' className='cart-skeleton' />
                <Skeleton variant="rounded" animation='wave' className='cart-skeleton' /> */}
              </Stack>)}
            </div>
            <FlexCenter className="proceed-button-container">
              <div className="cart-Subtotal">Subtotal &nbsp;<span>${subtotal}</span></div>
              <button className="proceed-button" onClick={handleCheckout}>Proceed to Buy ({selectedItems.length} items)</button>
            </FlexCenter>
          </>) : (<div className='empty-cart'>Your Cart Is Empty</div>)}
        </div>
      </div>
    </>
  )
}

export default Cart


