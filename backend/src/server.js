import app from "./app.js"
import ENV from "./lib/env.js"
import connectDB from "./lib/db.js"
import dns from "dns"
dns.setServers(["8.8.8.8"])

const startServer=async()=>{
    try {
        await connectDB()
        console.log('DB connected successfully');

        app.listen(ENV.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
        
    } catch (error) {
        console.error('Error starting the server',error);
    
        
    }
}

startServer()