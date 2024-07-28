import { stripe } from '../app.js'

const storeItems = new Map([
    [1, { priceInCents: 10000, name: 'product1' }],
    [2, { priceInCents: 10000, name: 'product2' }],
    [3, { priceInCents: 10000, name: 'product3' }]
])


export const paymentController = async (req, res) => {
    try {
        const items = req.body
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: items.map(item =>{
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.priceInCents
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.CLIENT_URL}/payment-success` ,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`
        })

        return res.status(200).send({
            success: true,
            message: 'Session Creation Successful',
            url: session.url
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'Something went wrong in payment Controller'
        })
    }
}
