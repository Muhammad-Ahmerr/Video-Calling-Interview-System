import express from "express"
import { protectedRoute } from "../middleware/protectedRoute.js"
import { createSession,getActiveSessions,getMyRecentSessions,getSessionById,joinSession,endSession } from "../Controllers/sessionController.js"

const router=express.Router()
// /api/session
router.post("/",protectedRoute,createSession)
router.get("/active",protectedRoute,getActiveSessions)
router.get("/my-recent",protectedRoute,getMyRecentSessions)
router.get("/:id",protectedRoute,getSessionById)
router.post("/:id/join",protectedRoute,joinSession)
router.post("/:id/end",protectedRoute,endSession)

export default router