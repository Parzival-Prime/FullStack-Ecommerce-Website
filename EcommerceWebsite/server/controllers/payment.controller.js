import { stripe } from '../app.js'
import { v4 as generateUUID } from 'uuid'
import { decreaseQuantityOfProduct } from './product.controller.js'
import { removeItemsFromUserCart } from './auth.controller.js'
import { InsertTransactionInOrder } from './auth.controller.js'

export const paymentController = async (req, res) => {
    try {
        const { selectedItems } = req.body
        // console.log('inside payment controller')
        const billID = generateUUID()

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['IN', 'CH', 'JP', 'NL', 'IT', 'US', 'RU', 'IE', 'FR', 'ID', 'VN', 'TW', 'KR', 'NO', 'ES', 'DE', 'CA', 'BR', 'SA', 'AE', 'PT', 'TH'], 
            },
            client_reference_id: billID,
            line_items: selectedItems.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.price * 100)
                },
                quantity: item.quantity
            })),

            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`
        })
        // console.log('below checkout session')
        console.log("session in payment controller", session)
        console.log("successURL: ", session.url)

        return res.status(200).send({
            success: true,
            sessionURL: session.url
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Something went wrong in payment Controller'
        })
    }
}



export const getPaymentDetails = async (req, res) => {
    try {
        const { sessionID } = req.body
        console.log('inside getpayment details')
        console.log("Session Id in getpayment details: ", sessionID)
        const session = await stripe.checkout.sessions.retrieve(sessionID)
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionID)


        const productsNameAndQuantity = lineItems.data.map((item) => (
            { name: item.description, quantity: item.quantity }
        ))
        const user = {
            email: session.customer_details.email,
            productsNameAndQuantity
        }

        
        const data = {
            status: session.status,
            totalAmount: session.amount_total,
            billID: session.client_reference_id,
            lineItems,
            paymentMethod: 'card',
            customerDetails: session.customer_details,
            currency: session.currency,
            transactionDate: new Date()
        }
        
        const resultOfDecrement = await decreaseQuantityOfProduct(productsNameAndQuantity)
        const resultOfRemoval = await removeItemsFromUserCart(user)
        const resultOfInsertion = await InsertTransactionInOrder(data)

        console.log('payment success page last')

        return res.status(200).send({
            success: true,
            paymentDetails: data,
            resultOfDecrement,
            resultOfRemoval,
            resultOfInsertion
        })
    } catch (error) {
        console.error('Something went wrong in getpaymentDetails Controller')

        return res.status(500).send({
            success: false,
            message: 'Something went wrong in getpaymentDetails Controller'
        })
    }
}