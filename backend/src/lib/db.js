import mongoose from "mongoose"
import ENV from "./env.js"



const connectDB=async(req,res)=>{
    try {
        
      const conn=  await mongoose.connect(ENV.MONGO_URI)
      console.log('Connecting to DB',conn.connection.host);
      
    } catch (error) {
       console.log('DB Error');
        process.exit(1)
    }
}

export default connectDB