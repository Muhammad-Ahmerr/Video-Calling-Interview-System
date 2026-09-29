import express from "express"
import { getStreamToken } from "../Controllers/chatController.js"
import { protectedRoute } from "../middleware/protectedRoute.js"

const router=express.Router()
// /api/chat/token
router.get('token',protectedRoute,getStreamToken)

export default router