import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../baseurl.js';
import '../styles/payment-success.css';
import Loader from '../components/Loader'

const getQueryParams = () => {
    const params = new URLSearchParams(window.location.search);
    return { sessionID: params.get('session_id') };
};

function PaymentSuccess() {
    const [paymentDetails, setPaymentDetails] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const fetchPaymentDetails = useCallback(async (sessionID) => {
        try {
            const { data } = await axiosInstance.post(`/api/v1/payment/get-payment-details`, { sessionID });
            return data?.paymentDetails;
        } catch (error) {
            console.error('Error fetching payment Details: ', error);
            return null;
        }
    }, []);

    const displayPaymentDetails = useCallback(async () => {
        const { sessionID } = getQueryParams();
        if (sessionID) {
            setIsLoading(true)
            const paymentDetails = await fetchPaymentDetails(sessionID);
            if (paymentDetails) {
                setPaymentDetails(paymentDetails);
                setIsLoading(false)
                const { data } = await axiosInstance.get('/api/v1/auth/get-cart');
                if (data?.success) {
                    const user = JSON.parse(localStorage.getItem('user'));
                    user.value.cart = data.cart;
                    localStorage.setItem('user', JSON.stringify(user));
                }
            } else {
                console.error('No payment Details Found');
            }
        } else {
            console.error('No sessionID found');
        }
    }, [fetchPaymentDetails]);

    useEffect(() => {
        displayPaymentDetails();
    }, [displayPaymentDetails]);

    return (
        <div className='payment-success'>
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
                                ${parseFloat(paymentDetails.totalAmount / 100).toFixed(2)}
                            </h3>
                            <div>
                                <div className="payment-success-upper-subtext-date">
                                    Date: {paymentDetails.transactionDate}
                                </div>
                                <div className="payment-success-upper-subtext-billId">
                                    Bill ID: {paymentDetails.billID}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="payment-success-mid">
                    <h3 className="payment-success-mid-title">Payment Details</h3>
                    {paymentDetails?.lineItems?.data.map((item) => (
                        <div className="payment-success-mid-product" key={item.id}>
                            <h4 className="payment-success-mid-product-title">
                                {item.description} ({item.quantity})
                            </h4>
                            <span className="payment-success-mid-product-price">
                                ${parseFloat(item.price.unit_amount / 100).toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <div className="payment-success-mid-detail">
                        <div className="payment-success-mid-detail-amount-paid">
                            <h3>Total</h3>
                            <span>
                                ${parseFloat(paymentDetails.totalAmount / 100).toFixed(2)}
                            </span>
                        </div>
                        <div className="payment-success-mid-detail-payment-method">
                            <h3>Payment Method</h3>
                            <span>{paymentDetails.paymentMethod}</span>
                        </div>
                    </div>
                </div>

                <div className="payment-success-lower">
                    <button
                        className="payment-success-lower-goback"
                        onClick={() => navigate('/cart')}
                    >
                        Go Back
                    </button>
                    <button
                        className="payment-success-lower-shopmore"
                        onClick={() => navigate('/products')}
                    >
                        Shop More
                    </button>
                </div>
            </>
            {isLoading && <Loader />}
        </div>
    );
}

export default PaymentSuccess;
