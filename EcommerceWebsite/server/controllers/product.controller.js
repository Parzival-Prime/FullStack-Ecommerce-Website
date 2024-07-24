import slugify from 'slugify'
import ProductModel from '../models/product.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'


export const createProductController = async (req, res) => {
    try {

        const { name, description, price, category, quantity, rating } = req.body

        if ([name, description, price, category, quantity, rating].some((item) => (item?.trim() == "" ? true : false))) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const ImageLocalPath = req.file?.path
        console.log('ImageLocalPath : ', ImageLocalPath)

        const image = await uploadOnCloudinary(ImageLocalPath)

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
        const products = await ProductModel.find({})

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
        console.log(id)
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