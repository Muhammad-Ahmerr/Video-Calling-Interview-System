import dotenv from "dotenv"
dotenv.config({quiet:true})

const ENV={
    PORT:process.env.PORT||3000,
    NODE_ENV:process.env.NODE_ENV||"development",
    MONGO_URI:process.env.MONGO_URI
}


export default ENV