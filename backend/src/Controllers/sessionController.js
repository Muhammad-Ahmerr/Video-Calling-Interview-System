import Session from "../models/Session.js"
import { chatClient, streamClient } from "../lib/stream.js"

export const createSession = async (req, res) => {
    try {
        const { problem, difficulty } = req.body
        const userID = req.user._id
        const clerkId = req.user.clerkId

        if (!problem || !difficulty) {
            return res.status(400).json({ message: "Problem and Difficulty are required" })
        }

        const callID = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        //create session in db
        const session = await Session.create({
            problem: problem,
            difficulty: difficulty,
            host: userID,
            callID: callID
        })

        //create a stream video call
        await streamClient.video.call("default", callID).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: { problem, difficulty, sessionId: session._id.toString() }
            }
        })

        //chat message
        const channel = chatClient.channel("messaging", callID, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId]
        })

        await channel.create()
        return res.status(201).json({
            session: session
        })
    } catch (error) {
        console.log('error in create session controller', error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


export const getActiveSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ status: "active" }).populate("host", "name profileImage email clerkId").sort({ createdAt: -1 }).limit(20)
        res.status(200).json({
            sessions
        })
    } catch (error) {
        console.log('error in getActive sessions controller', error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getMyRecentSessions = async (req, res) => {
    try {
        const userId = req.user._id
        const sessions = await Session.find({ status: "completed", $or: [{ host: userId }, { participant: userId }] }).sort({ createdAt: -1 }).limit(20)
        return res.status(200).json({
            sessions
        })
    } catch (error) {
        console.log('error ingetMyRecentSessions controller', error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getSessionById = async (req, res) => {
    try {
        const { id } = req.params
        const session = await Session.findById(id).populate("host", "name email profileImage clerkId").populate("participant", "name email profileImage clerkId")
        if (!session) {
            return res.status(404).json({ message: "session not found" })
        }
        return res.status(200).json({
            session
        })
    } catch (error) {
        console.log('error getSessionById controller', error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const joinSession = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id
        const clerkId = req.user.clerkId

        const session = await Session.findById(id)
        if (!session) {
            return res.status(404).json({ message: "Session not found" })
        }
        
        // if the session is not active then you can't join
        if(session.status!=="active"){
            return res.status(400).json({message:"Cannot join a completed Session"})
        }
        // host can't join as a participant
        if(session.host.toString()===userId.toString()){
          return res.status(400).json({message:"Host can't join as a participant"})
        }

        //  if any participant exist bcz i don't want to join more than 1
        if (session.participant) return res.status(409).json({ message: "Session is full" })
        session.participant = userId
        await session.save()

        const channel = chatClient.channel("messaging", session.callID)
        await channel.addMembers([clerkId])

        return res.status(200).json({ session })
    } catch (error) {
        console.log('error joinSession controller', error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export const endSession = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user._id

        const session = await Session.findById(id)
        if (!session) {
            return res.status(404).json({ message: "Session not found" })
        }
        //    check if the user is host or not bcz only the host can end the session
        if (session.host.toString() !== userId.toString()) {
            return res.status(403).json({ message: " only Host can end the session" })
        }

        if (session.status === "completed") {
            return res.status(404).json({ message: "session is already completed" })
        }        

        //delete stream video call that we created while session creation
        const call = streamClient.video.call("default", session.callID)
        await call.delete({ hard: true })

        //delete stream chat channel that we created while session creation
        const channel = chatClient.channel("messaging", session.callID)
        await channel.delete()

        session.status = "completed"
        await session.save()

        return res.status(200).json({
            session,
            message: "session ended successfully"
        })
    } catch (error) {
        console.log('error endSession controller', error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}