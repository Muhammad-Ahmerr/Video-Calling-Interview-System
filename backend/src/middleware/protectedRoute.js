import User  from "../models/User.js";
import { clerkMiddleware, clerkClient, getAuth } from '@clerk/express'


export const protectedRoute=async(req,res,next)=>{
    try {
        
        const {isAuthenticated,userId}=getAuth(req)
        if(!isAuthenticated){
           return res.status(401).json({message:"unAuthrized User"})
        }

      const user=  await User.findOne(userId)
      if(!user){
        return res.status(404).json({message:"User not found"})
      }

      req.user=user
      next()
    } catch (error) {
        console.error("Error in protected middleware",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}