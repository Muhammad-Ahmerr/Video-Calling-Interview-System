import express from "express"
import path from "path"
import ENV from "./lib/env.js"
import cors from "cors"
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js"

const app = express()

app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true // server allows browser to include cookies on request
}))

app.use(express.json())
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/health', (req, res) => {
    res.status(200).send({
        message: "success from api",
        port: `${ENV.PORT}`
    })
})



const dirname = path.resolve()

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(dirname, "../frontend/dist")))
    // app.use(cors({ origin: ENV.CLIENT_PRODUCTION_URL, credentials: true }))
    app.get('/{*any}', (req, res) => {
        res.sendFile(path.join(dirname, "../frontend/dist/index.html"))
    })
}

export default app