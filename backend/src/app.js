import express from "express"
import path from "path"
import ENV from "./lib/env.js"

const app=express()


app.use(express.json())

app.get('/health',(req,res)=>{
res.status(200).send({
    message:"success from api",
    port:`${ENV.PORT}`
})
})

const dirname=path.resolve()

if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(dirname,"../frontend/dist")))
    app.get('/{*any}',(req,res)=>{
        res.sendFile(path.join(dirname,"../frontend/dist/index.html"))
    })
}

export default app