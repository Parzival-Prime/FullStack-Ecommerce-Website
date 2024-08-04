import { stripe } from '../app.js'



export const paymentController = async (req, res) => {
    try {
        const { selectedItems, subtotal } = req.body

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: selectedItems.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: parseInt(item.price) * 100
                },
                quantity: item.quantity
            })),

            success_url: `${process.env.CLIENT_URL}/payment-success`,
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
