import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'; 
import { User} from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";



const generateRefreshAndAccessToken = async (userID) => {
   try {
     const user = await User.findById(userID)
     const refreshToken = user.genrateRefreshToken()
     const accessToken = user.genrateAccessToken()
 
     user.refreshToken = refreshToken
     await user.save({validateBeforeSave: false})
 
     return {refreshToken, accessToken}

   } catch (error) {
        throw new ApiError(401, "tokens not generated.")
   }
}

const registerUser = asyncHandler(async function(req,res){
    // get data from body
    // check for empty fields
    // check for user already exist bu email, if exist throw err
    // create user
    // check user is created or not, if created remove password and refresh token 
    // and send response

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
    // get data from frontend{body}
    // check for every field is coming
    // find user by email, if not throw error
    // check for password is correct, if not throw error
    // genrate access & refresh token
    // send response 

    const {email, password} = req.body

    if([email, password].some((field) => field?.trim === "")){
        throw new ApiError(401, "All fields are required.")
    }
    
    const user = await User.findOne({email})
    
    if(!user){
        throw new ApiError(402, "User not found please register first.") 
    }

    const isPassCorrect = await user.isPasswordCorrect(password)
    

    if(!isPassCorrect){
        throw new ApiError(403, "Incorrect user password !")
    }

    const {refreshToken, accessToken} = await generateRefreshAndAccessToken(user._id)
    
   const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )

   const options = {httpOnly : true, secure: true}

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser,
                accessToken: accessToken,
                refreshToken: refreshToken
            }
            , "User logged in sussessfully")
    )

})

export {registerUser, loginUser}