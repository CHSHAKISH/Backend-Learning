import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Users } from "../models/users.model.js";


export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);
        console.log("Authorization:", req.header("Authorization"));

        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await Users.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user
        next()

        // req.user = user: This is a core Express pattern. 
        // It dynamically appends a new property named user 
        // directly onto the current request object. 
        // Now, whatever controller runs after this middleware 
        // can simply call req.user to instantly know which user is logged in.

        // next(): Tells Express, "Authentication is complete 
        // and successful! Move on to the actual route controller."

    } catch (error) {
        console.error(error)
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})