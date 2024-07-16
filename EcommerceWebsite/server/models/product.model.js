import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel