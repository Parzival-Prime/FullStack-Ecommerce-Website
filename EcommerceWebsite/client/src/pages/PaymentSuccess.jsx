import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../App'

const getQueryParams = () => {

    const params = new URLSearchParams(window.location.search)
    return { sessionID: params.get('session_id') }
}

function PaymentSuccess() {
    const [paymentDetails, setPaymentDetails] = useState({})

    const fetchPaymentDetails = async (sessionID) => {
        try {
            const { data } = await axiosInstance.post(`/api/v1/payment/get-payment-details`, { sessionID })
            console.log("response: ", data)
            return data?.paymentDetails
        } catch (error) {
            console.error('Error fetching payment Details: ', error)
        }
    }

    const displayPaymentDetails = async () => {
        const { sessionID } = getQueryParams()
        if (sessionID) {
            const paymentDetails = await fetchPaymentDetails(sessionID)
            if (paymentDetails) {
                console.log('Payment Details: ', paymentDetails)
                setPaymentDetails(paymentDetails)
            } else {
                console.error('No payment Details Found')
            }
        } else {
            console.log('No sessionID found')
        }
    }

    useEffect(() => {
        displayPaymentDetails()
    }, [])

    return (
        <div style={{ paddingTop: '6rem', minHeight: '90svh' }}>
            {paymentDetails && (
                <>
                    <div className="payment-success-upper">
                        <div className="payment-success-image-container">
                            <img src="/paymentSuccess/paymentSuccess.svg" alt="Success Image" className="payment-success-image" />
                        </div>
                        <div className="payment-success-upper-text-container">
                            <h2 className="payment-success-title">Payment Success</h2>
                            <div className="payment-success-upper-subtext-container">
                                <span>Amount</span>
                                <h3 className="payment-success-upper-subtext-bill-amount">
                                    ${' '}{parseFloat(paymentDetails.totalAmount / 100).toFixed(2)}
                                </h3>
                                <div>
                                    <div className="payment-success-upper-subtext-date"></div>
                                    <div className="payment-success-upper-subtext-billId">Bill ID &nbsp;
                                        {paymentDetails.billID}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-success-mid">
                        <h3 className="payment-success-mid-title">Payment Details</h3>
                    </div>
                    {paymentDetails?.lineItems?.data.map((item) => (
                        <div className="payment-success-mid-product" key={item.id}>
                            <h4 className="payment-success-mid-product-title">{item.description}({item.quantity})</h4>
                            <h4 className="payment-success-mid-product-price">${parseFloat(item.price.unit_amount / 100).toFixed(2)}</h4>
                        </div>
                    ))}
                    <div className="payment-success-mid-detail">
                        <div className="payment-success-mid-detail-amount-paid">${' '}
                            {parseFloat(paymentDetails.totalAmount / 100).toFixed(2)}
                        </div>
                        <div className="payment-success-mid-detail-payment-method">
                            {paymentDetails.paymentMethod}
                        </div>
                    </div>
                    <div className="payment-success-lower">
                        <button className="payment-success-lower-goback">Goback</button>
                        <button className="payment-success-lower-shopmore">Shop More</button>
                    </div>
                </>
            )}
        </div>

    )
}

export default PaymentSuccess
