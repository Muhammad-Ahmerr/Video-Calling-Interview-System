import express from "express"
import path from "path"
import ENV from "./lib/env.js"
import cors from "cors"
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js"
import { clerkMiddleware } from '@clerk/express'
import chatRouter from "./Routes/chatRoute.js"
import sessionRouter from "./Routes/sessionRoute.js"

const app = express()

app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true // server allows browser to include cookies on request
}))

app.use(clerkMiddleware()) //this add auth field for request like req.auth()
app.use(express.json())
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat",chatRouter)
app.use("/api/session",sessionRouter)

app.get('/health', (req, res) => {
    res.status(200).send({
        message: "success from api",
        port: `${ENV.PORT}`
    })
})



const dirname = path.resolve()

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(dirname, "../frontend/dist")))
    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(dirname, "../frontend/dist/index.html"))
    })
}

export default app