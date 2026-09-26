import { Inngest } from "inngest";
import User from "../models/User.js"
import connectDB from "./db.js"

// this allow us to communicate with Inngest
export const inngest = new Inngest({
    id: "video-calling-interview"
})



const synUser = inngest.createFunction(
    { id: 'sync-user' },
    { event: "clerk/user.created" },
    async ({ event }) => {
        const { id, first_name, last_name, image_url, email_addresses, } = event.data
        await connectDB()
        await User.create(
            {
                clerkID: id,
                name: `${first_name || ""} ${last_name || ""}`,
                email: email_addresses[0]?.email_addresses,
                profileImage: image_url
            })
    }

)


const deleteUserFromDB=inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        const {id} =event.data
        await User.deleteOne({clerkID:id})
    }


)

export const functions = [synUser,deleteUserFromDB];