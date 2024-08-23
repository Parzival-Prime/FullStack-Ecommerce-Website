import slugify from 'slugify'
import ProductModel from '../models/product.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ObjectId } from 'mongodb'

export const createProductController = async (req, res) => {
    try {

        const { name, description, price, category, quantity, rating } = req.body

        if ([name, description, price, category, quantity, rating].some((item) => (item?.trim() == "" ? true : false))) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        console.log('Product Controller reach1')
        const ImageLocalPath = req.file?.path
        console.log('ImageLocalPath : ', ImageLocalPath)
        console.log('Product Controller reach2')
        const image = await uploadOnCloudinary(ImageLocalPath)
        console.log('Product Controller reach3')

        const createdProduct = await ProductModel.create({ name, slug: slugify(name), description, price, image: image?.url, category, quantity, rating })

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            createdProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'Something went wrong in create Product Controller'
        })
    }
}



export const getAllProductsController = async (req, res) => {
    try {
        const products = await ProductModel.find({}).sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            message: 'All products fetch successfully!',
            products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in getAllProducts Controller'
        })
    }
}


export const getCartItems = async (req, res) => {
    try {
        const productIds = req.body

        if (productIds.length === 0) return res.status(404).send({ success: false, message: 'No Id found in req.body' })

        const fetchedProducts = await ProductModel.find({ _id: { $in: productIds } })

        if (!fetchedProducts || fetchedProducts.length === 0) return res.status(500).send({ success: false, message: 'Something went wrong in fetching Products' })

        return res.status(200).send({
            success: true,
            message: 'All Products fetched Successfully',
            fetchedProducts
        })

    } catch (error) {
        console.log(error)
        return res.send(400).send({
            success: false,
            message: 'Something went wrong in getCartItems Controller'
        })
    }
}


export const getProductController = async (req, res) => {
    try {
        const { id } = req.params
        const productDetails = await ProductModel.findOne({ _id: id })

        if (!productDetails) return res.status(500).send({ success: false, message: 'Something went wrong while getting product from db' })

        return res.status(200).send({
            success: true,
            message: 'Product fetched successfully!',
            productDetails
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: 'Something went wrong in getProdcut Controller'
        })
    }
}


// export const getPopularProducts = async (req, res) => {
//     try {
//         const products = await ProductModel.aggregate([
//             {
//                 $match: {
//                     name: {
//                         $in: [
//                             'Charcoal Detox Clay Mask',
//                             'Golden Elixer Anti-Aging Serum',
//                             'Lavender Blossom Floral Soap',
//                             'Midnight Radiance Night Cream',
//                             'Ocean Breeze Face Mist',
//                             'Rose Petal Eye Serum',
//                             'Daisy Hair Oil',
//                             'Aqua Bliss Hair Mask'
//                         ]
//                     }
//                 }
//             }
//         ])

//         if (!products) return res.status(500).send({ success: false, message: 'Something went wront in querying db in getProductsController' })

//         return res.status(200).send({
//             success: true,
//             message: 'Popular Products fetched Successfully',
//             products
//         })
//     } catch (error) {
//         console.log(error)
//         return res.status(500).send({
//             success: false,
//             message: 'Something went wrong in getPopular Products Controller'
//         })
//     }
// }


export const decreaseQuantityOfProduct = async (productsIdAndQuantity) => {
    try {

        const bulkOperation = productsIdAndQuantity.map((item) => (
            {
                updateOne: {
                    filter: { name: item.name },
                    update: {
                        $inc: { quantity: -item.quantity }
                    }
                }
            }
        ))

        const result = await ProductModel.bulkWrite(bulkOperation)

        return {
            success: true,
            message: 'Products Quantity decreased ',
            result
        }

    } catch (error) {
        console.log(error)
        return {
            success: true,
            message: 'Something went wrong in decrease Product Quantity'
        }
    }
}



