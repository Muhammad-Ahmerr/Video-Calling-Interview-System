import app from "./app.js"
import ENV from "./lib/env.js"

app.listen(ENV.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))