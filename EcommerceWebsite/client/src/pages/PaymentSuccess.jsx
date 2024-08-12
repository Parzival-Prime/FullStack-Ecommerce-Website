import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { axiosInstance } from '../App'
import '../styles/payment-success.css'

const getQueryParams = () => {

    const params = new URLSearchParams(window.location.search)
    return { sessionID: params.get('session_id') }
}



// const paymentDetails = {
//     "status": "complete",
//     "totalAmount": 16300,
//     "billID": "5032b45e-8a31-43e6-8a5e-dbf975d8e85d",
//     "lineItems": {
//         "object": "list",
//         "data": [
//             {
//                 "id": "li_1PmXEfRtcqBN7ORDp0WYqS5c",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 1300,
//                 "amount_tax": 0,
//                 "amount_total": 1300,
//                 "currency": "usd",
//                 "description": "Rose Petal Eye Serum",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORDwobUfjlk",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGZi8haPuGjZc",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 1300,
//                     "unit_amount_decimal": "1300"
//                 },
//                 "quantity": 1
//             },
//             {
//                 "id": "li_1PmXEfRtcqBN7ORDLcocXpcr",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 1100,
//                 "amount_tax": 0,
//                 "amount_total": 1100,
//                 "currency": "usd",
//                 "description": "Ocean Breeze Face Mist",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORDakcyZy9N",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGcV7rE7FDgQt",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 1100,
//                     "unit_amount_decimal": "1100"
//                 },
//                 "quantity": 1
//             },
//             {
//                 "id": "li_1PmXEfRtcqBN7ORDUz3iW5sZ",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 2400,
//                 "amount_tax": 0,
//                 "amount_total": 2400,
//                 "currency": "usd",
//                 "description": "Midnight Radiance Night Cream",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORDxwkC0r4g",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGcLfu121FBv7",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 2400,
//                     "unit_amount_decimal": "2400"
//                 },
//                 "quantity": 1
//             },
//             {
//                 "id": "li_1PmXEfRtcqBN7ORDdWyBdeAl",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 1800,
//                 "amount_tax": 0,
//                 "amount_total": 1800,
//                 "currency": "usd",
//                 "description": "Golden Glow Body Lotion",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORDRGboGNla",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGcBslISphZP2",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 1800,
//                     "unit_amount_decimal": "1800"
//                 },
//                 "quantity": 1
//             },
//             {
//                 "id": "li_1PmXEfRtcqBN7ORDPDtid2bV",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 500,
//                 "amount_tax": 0,
//                 "amount_total": 500,
//                 "currency": "usd",
//                 "description": "Lavender Blossom Floral Soap",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORDyI4y0kiy",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGceGeu5vgbVp",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 500,
//                     "unit_amount_decimal": "500"
//                 },
//                 "quantity": 1
//             },
//             {
//                 "id": "li_1PmXEfRtcqBN7ORDOCCvZDcf",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 1000,
//                 "amount_tax": 0,
//                 "amount_total": 1000,
//                 "currency": "usd",
//                 "description": "Sunshine Bloom Shampoo",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORDGtCUQb7z",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGcZnjlO3dfof",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 1000,
//                     "unit_amount_decimal": "1000"
//                 },
//                 "quantity": 1
//             },
//             {
//                 "id": "li_1PmXEfRtcqBN7ORDWouzn225",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 900,
//                 "amount_tax": 0,
//                 "amount_total": 900,
//                 "currency": "usd",
//                 "description": "Lavender Dream Body Wash",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORDgAVwwyiH",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGcqpcYt6OOL1",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 900,
//                     "unit_amount_decimal": "900"
//                 },
//                 "quantity": 1
//             },
//             {
//                 "id": "li_1PmXEfRtcqBN7ORD9ZzaroMD",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 5800,
//                 "amount_tax": 0,
//                 "amount_total": 5800,
//                 "currency": "usd",
//                 "description": "Golden Elixer Anti-Aging Serum",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORD8ZDpZMGH",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGcbFEW6pCI4m",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 2900,
//                     "unit_amount_decimal": "2900"
//                 },
//                 "quantity": 2
//             },
//             {
//                 "id": "li_1PmXEfRtcqBN7ORD3qdUhCdt",
//                 "object": "item",
//                 "amount_discount": 0,
//                 "amount_subtotal": 1500,
//                 "amount_tax": 0,
//                 "amount_total": 1500,
//                 "currency": "usd",
//                 "description": "Aqua Bliss Hair Mask",
//                 "price": {
//                     "id": "price_1PmXEfRtcqBN7ORDUUx7j7OM",
//                     "object": "price",
//                     "active": false,
//                     "billing_scheme": "per_unit",
//                     "created": 1723365285,
//                     "currency": "usd",
//                     "custom_unit_amount": null,
//                     "livemode": false,
//                     "lookup_key": null,
//                     "metadata": {},
//                     "nickname": null,
//                     "product": "prod_QbGcfKQ1RVlgSE",
//                     "recurring": null,
//                     "tax_behavior": "unspecified",
//                     "tiers_mode": null,
//                     "transform_quantity": null,
//                     "type": "one_time",
//                     "unit_amount": 1500,
//                     "unit_amount_decimal": "1500"
//                 },
//                 "quantity": 1
//             }
//         ],
//         "has_more": false,
//         "url": "/v1/checkout/sessions/cs_test_b1zFLKRWSls1j4SkQEuhUpCQYBCncdTNo5tz63L2JDef5bXexjTtjIeDQZ/line_items"
//     },
//     "paymentMethod": "card",
//     "customerDetails": {
//         "address": {
//             "city": "Kanpur",
//             "country": "IN",
//             "line1": "Kanpur, Uttar Pradesh",
//             "line2": "Kanpur, Uttar Pradesh",
//             "postal_code": "208017",
//             "state": "UP"
//         },
//         "email": "thor@thor.com",
//         "name": "ParzivalPrime",
//         "phone": null,
//         "tax_exempt": "none",
//         "tax_ids": []
//     },
//     "currency": "usd",
//     "transactionDate": "2024-08-11T08:35:48.335Z"
// }




function PaymentSuccess() {
    const [paymentDetails, setPaymentDetails] = useState({})
    const navigate = useNavigate()

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
                                    <div className="payment-success-upper-subtext-date"> Date: {((paymentDetails.transactionDate).split('T'))[0]}</div>
                                    <div className="payment-success-upper-subtext-billId">Bill ID: &nbsp;
                                        {(paymentDetails.billID).substring(0, 16)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-success-mid">
                        <h3 className="payment-success-mid-title">Payment Details</h3>

                        {paymentDetails?.lineItems?.data.map((item) => (
                            <div className="payment-success-mid-product" key={item.id}>
                                <h4 className="payment-success-mid-product-title">{item.description}{' '}({item.quantity})</h4>
                                <span className="payment-success-mid-product-price">${parseFloat(item.price.unit_amount / 100).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="payment-success-mid-detail">

                            <div className="payment-success-mid-detail-amount-paid">
                                <h3>Total</h3>
                                <span>${' '}
                                    {parseFloat(paymentDetails.totalAmount / 100).toFixed(2)}</span>
                            </div>
                            <div className="payment-success-mid-detail-payment-method">
                                <h3>Payment Method</h3>
                                <span>{paymentDetails.paymentMethod}</span>

                            </div>
                        </div>
                    </div>
                    <div className="payment-success-lower">
                        <button className="payment-success-lower-goback" onClick={()=>navigate('/cart')}>Goback</button>
                        <button className="payment-success-lower-shopmore" onClick={()=>navigate('/products')}>Shop More</button>
                    </div>
                </>
            )}
        </div>

    )
}

export default PaymentSuccess
