import express from "express"
const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
res.status(200).send({
    message:"success from api",
    port:`${process.env.PORT}`
})
})


export default app