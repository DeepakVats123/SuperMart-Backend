import {Product} from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addProductsToDB = asyncHandler(async (req, res) => {
        const productData =  req.body
        const {title,desc,image,price,category} = productData

        const product = await Product.create(
            {
                title,
                desc,
                image,
                price,
                category 
            }
        )

        const createdProduct = await Product.findById(product._id)

        if(!createdProduct){
            throw new ApiError(401, "something went wrong while creating product")
        }
        
        return res
        .status(200)
        .json(
            new ApiResponse(201, createdProduct, "Product added successfully")
        )
})

const addProductsList = asyncHandler(async (req, res) => {
    const productData =  req.body

    if(!productData){
        throw new ApiError(401, "Data is not coming from body")
    }
   

    const updatedProductsList = await Product.insertMany(productData)

   const allProducts = await Product.find({})
    
    return res
    .status(200)
    .json(
        new ApiResponse(201, allProducts, "Products List added successfully")
    )
})

const getAllProducts = asyncHandler(async (req, res) => {
    const allProducts = await Product.find({})

    if(!allProducts){
        throw new ApiError(401, "something went wrong while fetching products")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(201, allProducts,"All products fetched successfully!")
    )
})


export {
    addProductsToDB,
    addProductsList,
    getAllProducts
}