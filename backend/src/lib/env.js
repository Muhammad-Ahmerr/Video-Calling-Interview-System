import dotenv from "dotenv"
dotenv.config({ quiet: true })

const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI,
    INNGEST_EVENT_KEY:process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY:process.env.INNGEST_SIGNING_KEY,
    STREAM_API_KEY:process.env.STREAM_API_KEY,
    STREAM_API_SECRET:process.env.STREAM_API_SECRET,
    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,
    CLIENT_URL:process.env.CLIENT_URL,
    // CLIENT_PRODUCTION_URL:process.env.CLIENT_PRODUCTION_URL
    

}
if (!ENV.MONGO_URI) {
    throw new Error("MONGO_URI is not present in ENV")
}
if (!ENV.CLERK_SECRET_KEY) {
    throw new Error("CLERK_SECRET_KEY is not present in ENV")
}
if (!ENV.INNGEST_EVENT_KEY) {
    throw new Error("INNGEST_EVENT_KEY is not present in ENV")
}
if (!ENV.INNGEST_SIGNING_KEY) {
    throw new Error("INNGEST_SIGNING_KEY is not present in ENV")
}
if (!ENV.STREAM_API_KEY) {
    throw new Error("STREAM_API_KEY is not present in ENV")
}
if (!ENV.CLERK_PUBLISHABLE_KEY) {
    throw new Error("CLERK_PUBLISHABLE_KEY is not present in ENV")
}
if (!ENV.CLERK_SECRET_KEY) {
    throw new Error("CLERK_SECRET_KEY is not present in ENV")
}
if (!ENV.CLIENT_URL) {
    throw new Error("CLIENT_URL is not present in ENV")
}


export default ENV