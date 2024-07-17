import CategoryModel from '../models/category.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import slugify from 'slugify'


export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({ message: 'Name is required!' })
        }

        const categoryExists = await CategoryModel.findOne({ name })

        if (categoryExists) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists!'
            })
        }

        const category = await CategoryModel.create({ name, slug: slugify(name) })

        return res.status(201).json({
            success: true,
            message: 'Category created successfully!',
            category
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'Something went wrong in createCategoryController'
        })
    }
}


export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await CategoryModel.find({}).sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            message: 'All categories fetched successfully',
            categories
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'Something went wrong in getAllCategoriesController'
        })
    }
}