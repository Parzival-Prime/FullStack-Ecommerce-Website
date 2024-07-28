import React from 'react'
import { axiosInstance } from '../../App'
import '../../styles/payment.css'

function Payment() {

    const item = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 4 },
        { id: 3, quantity: 1 },
    ]

    const handleCheckout = async () => {
        try {
            const { data } = await axiosInstance.post(`/api/v1/payment/create-checkout-session`, item)

            if (data?.success) {
                console.log(data)
                console.log(data.url)
                window.location = data.url
            }
        } catch (error) {
            console.log(error)
            console.log('Something went wrong in handle Checkout')
        }
    }
    return (
        <div className='payment'>
            <button className='payment-checkout-button' onClick={handleCheckout}>checkout</button>
        </div>
    )
}

export default Payment
