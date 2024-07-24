import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'; 
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async function(req,res){

    const {fullName,email,password} = req.body

    if([fullName,email,password].some((field) => field?.trim() === "")){
        throw new ApiError(401, "All fields are required")
    }

    const existedUser = await User.findOne({ email })

    if(existedUser){
        throw new ApiError(402, "User already registerd with this email.")
    }

    const user = await User.create(
        {
            fullName,
            email,
            password
        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(403, "Somethig wrong while registring the user.")
    }

    return res.status(200).json(
        new ApiResponse(200,createdUser,"User registerd successfully")
    )

    
})

const loginUser = asyncHandler(async function(req, res){
    const {email, password} = req.body

    if([email, password].some((field) => field?.trim === "")){
        throw new ApiError(401, "All fields are required.")
    }
    
    const user = await User.findOne({email}).select(
        "-password"
    )
    
    if(!user){
        throw new ApiError(402, "User not found please register first.") 
    }

    // const isPassCorrect = User.

    return res.status(201).json(
        new ApiResponse(200,user,"User logged in successfullly !")
    )



})

export {registerUser, loginUser}