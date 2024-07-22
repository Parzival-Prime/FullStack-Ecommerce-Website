import React, { useEffect, useState } from 'react'
import '../styles/cart.css'
import toast from 'react-hot-toast'
import { axiosInstance } from '../App';
import { Typography, Checkbox, ButtonGroup, Skeleton, Stack } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// const data = {
//   "success": true,
//   "message": "All Products fetched Successfully",
//   "fetchedProducts": [
//       {
//           "_id": "6698172f0a9a95ee22c8c977",
//           "name": "Herbal Shampoo",
//           "slug": "herbal-shampoo",
//           "description": "A nourishing shampoo with natural herbal extracts to strengthen and revitalize hair.",
//           "price": 15.99,
//           "category": "6697aeb41985a49661a6612f",
//           "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721243439/l8qqrbdw0j76coa3evby.avif",
//           "quantity": 120,
//           "rating": 0,
//           "createdAt": "2024-07-17T19:10:39.737Z",
//           "updatedAt": "2024-07-17T19:10:39.737Z",
//           "__v": 0
//       },
//       {
//           "_id": "6698ae34f7adb10563f682c4",
//           "name": "Silky Smooth Conditioner",
//           "slug": "silky-smooth-conditioner",
//           "description": "A conditioner that provides silky smooth texture and shine to your hair.",
//           "price": 12.99,
//           "category": "6697b6b1fa345a7e838684ea",
//           "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721282100/gmddlbjxwxu6kilatwum.avif",
//           "quantity": 80,
//           "rating": 0,
//           "createdAt": "2024-07-18T05:55:00.059Z",
//           "updatedAt": "2024-07-18T05:55:00.059Z",
//           "__v": 0
//       },
//       {
//           "_id": "6698b251f7adb10563f682cf",
//           "name": "Argon Oil Hair Serum",
//           "slug": "argon-oil-hair-serum",
//           "description": "A premium hair serum enriched with Argan oil for deep nourishment and shine.",
//           "price": 25.99,
//           "category": "6697b6c4fa345a7e838684f0",
//           "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721283154/hm8mpccbmakts0x1fx70.avif",
//           "quantity": 50,
//           "rating": 0,
//           "createdAt": "2024-07-18T06:12:33.538Z",
//           "updatedAt": "2024-07-18T06:12:33.538Z",
//           "__v": 0
//       },
//       {
//           "_id": "6698b336f7adb10563f682d4",
//           "name": "Volumizing Mousse",
//           "slug": "volumizing-mousse",
//           "description": "A lightweight mousse that adds volume and lift to your hair without weighing it down.",
//           "price": 18.99,
//           "category": "6697b7b6fa345a7e83868502",
//           "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721283382/cmcwuqtaojj57jtq5z28.avif",
//           "quantity": 90,
//           "rating": 0,
//           "createdAt": "2024-07-18T06:16:22.265Z",
//           "updatedAt": "2024-07-18T06:16:22.265Z",
//           "__v": 0
//       },
//       {
//           "_id": "6698b4d1f7adb10563f682dd",
//           "name": "Anti-Dandruff Shampoo",
//           "slug": "anti-dandruff-shampoo",
//           "description": "A powerful anti-dandruff shampoo that helps eliminate flakes and soothe the scalp.",
//           "price": 14.99,
//           "category": "6697aeb41985a49661a6612f",
//           "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721283794/tnyvsjbgfebf5gunrymn.avif",
//           "quantity": 110,
//           "rating": 0,
//           "createdAt": "2024-07-18T06:23:13.869Z",
//           "updatedAt": "2024-07-18T06:23:13.869Z",
//           "__v": 0
//       },
//       {
//           "_id": "6698c027f7adb10563f682f1",
//           "name": "Leave-In Conditioner",
//           "slug": "leave-in-conditioner",
//           "description": "A leave-in conditioner that provides all-day moisture and protection for your hair.",
//           "price": 13.99,
//           "category": "6697b6b1fa345a7e838684ea",
//           "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721286696/wkemzsgd0j4zn4fp0hlp.avif",
//           "quantity": 70,
//           "rating": 0,
//           "createdAt": "2024-07-18T07:11:35.845Z",
//           "updatedAt": "2024-07-18T07:11:35.845Z",
//           "__v": 0
//       },
//       {
//           "_id": "6698c310f7adb10563f68303",
//           "name": "Green Tea Cleanser",
//           "slug": "green-tea-cleanser",
//           "description": "A gentle green tea cleanser that removes impurities and refreshes the skin.",
//           "price": 11.75,
//           "category": "6697b839fa345a7e83868510",
//           "image": "http://res.cloudinary.com/dro8qbk8j/image/upload/v1721287441/f5ialjqzkvdsvljw0h0q.jpg",
//           "quantity": 130,
//           "rating": 0,
//           "createdAt": "2024-07-18T07:24:00.617Z",
//           "updatedAt": "2024-07-18T07:24:00.617Z",
//           "__v": 0
//       }
//   ]
// }

function Cart() {
  const [isLoading, setIsLoading] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [productIds, setProductIds] = useState([])
  const [products, setProducts] = useState([])

  const getCartItemsfromLocalStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setCartItems(user?.cart)
      const Ids = user?.cart.map(product => product.productId)
      setProductIds(Ids)
    } catch (error) {
      console.log(error)
      toast.error('something went wrong while getting cart Items from LocalStorage')
    }
  }

  const getCartItemsfromDB = async (productIds) => {
    try {
      setIsLoading(true)
      const { data } = await axiosInstance.post('/api/v1/product/get-cart-items', productIds)
      if (data?.success) {
        setIsLoading(false)
        setProducts(data.fetchedProducts)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong while getting cart items')
    }
  }

  const updateCart = async (ucart) => {
    try {
      console.log('in Update: ', ucart)
      await axiosInstance.post('/api/v1/auth/update-cart', ucart)

    } catch (error) {
      console.log('Error in UpdateCart: ', error)
    }
  }

  const deleteItemFromCart = (e) => {
    e.stopPropagation()
    const currentProductId = e.target.value

    const newProductIdsArray = productIds.filter((productId) => (productId !== currentProductId))
    setProductIds(newProductIdsArray)
    let user = JSON.parse(localStorage.getItem('user'))
    user.cart = cartFromLS.cart.filter((product) => (product.productId !== currentProductId))
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
    setCartItems(user.cart)
    updateCart(user.cart)
  }

  const displayQuantity = (Id) => {
    const product = cartItems.find(item => item.productId === Id)
    if (product) return product.quantity
  }

  const decrementProductQuantity = (e) => {
    e.stopPropagation()
    const currentProductId = e.currentTarget.value
    console.log(currentProductId)
    const newCartItemsArray = cartItems.map((item) => (
      (item.productId === currentProductId) ? { ...item, quantity: item.quantity - 1 } : item
    ))
    console.log(newCartItemsArray)
    setCartItems(newCartItemsArray)
    let user = JSON.parse(localStorage.getItem('user'))
    user.cart = newCartItemsArray
    console.log('user: ', user)
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
    updateCart(user.cart)
  }

  const incrementProductQuantity = (e) => {
    e.stopPropagation()
    const currentProductId = e.currentTarget.value
    console.log(currentProductId)
    const newCartItemsArray = cartItems.map((item) => (
      (item.productId === currentProductId) ? { ...item, quantity: item.quantity + 1 } : item
    ))
    console.log(newCartItemsArray)
    setCartItems(newCartItemsArray)
    let user = JSON.parse(localStorage.getItem('user'))
    user.cart = newCartItemsArray
    console.log('user: ', user)
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(user))
    updateCart(user.cart)
  }

  useEffect(() => {
    getCartItemsfromLocalStorage()
  }, [])

  useEffect(() => {
    if (productIds.length > 0) {
      getCartItemsfromDB(productIds)
    }
  }, [productIds])


  return (
    <>
      <div className="cart-container">
        <h1 className="cart-title">
          My Cart
        </h1>

        <div className="cart-list-section">
          {productIds.length > 0 ? (<><h5 className='cart-list-title'>My Cart List</h5>

            <div className="cart-list-container">
              {!isLoading ? (
                products.map((product) => (
                  <div className="cart-list-item" key={product._id}>
                    <Checkbox className='cart-list-item-checkbox' color="success" />
                    <div className="cart-item-left">
                      <img src={product.image} alt="Product Image" className='cart-item-image' />
                      <ButtonGroup className="cart-quantity-box" variant="contained" aria-label="Basic button group">
                        {displayQuantity(product._id) > 1 ? (<button className="cart-quantity-decrement" value={product._id} onClick={decrementProductQuantity}><RemoveIcon /></button>) : (<button className="cart-quantity-decrement" value={product._id} onClick={deleteItemFromCart} ><DeleteOutlineIcon /></button>)}
                        <button className="cart-quantity-value"><span>{displayQuantity(product._id)}</span></button>
                        <button className="cart-quantity-increment" value={product._id} onClick={incrementProductQuantity}><AddIcon /></button>
                      </ButtonGroup>
                    </div>

                    <div className="cart-item-right">
                      <Typography className='cart-item-title'>{product.name.substring(0, 20)}{product.name.length > 20 ? '...' : ''}</Typography>
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
            </div></>) : (<div className='empty-cart'>Your Cart Is Empty</div>)}
        </div>
      </div>
    </>
  )
}

export default Cart


