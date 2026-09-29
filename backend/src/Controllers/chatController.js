import { chatClient } from "../lib/stream.js"

export const getStreamToken=async(req,res)=>{
    try {
        const token=chatClient.createToken(req.user.clerkId)
        return res.status(200).json({
            token,
            userID:req.user.clerkId,
            userName:req.user.name,
            userImage:req.user.image
        })
    } catch (error) {
        console.error("failed to getStream Token")
        return res.status(500).json({message:"Server error"})
    }
}