import { Inngest } from "inngest";
import User from "../models/User.js"
import connectDB from "./db.js"
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

// this allow us to communicate with Inngest
export const inngest = new Inngest({
    id: "video-calling-interview"
})


const syncUser = inngest.createFunction(
    { id: 'sync-user', triggers: { event: "clerk/user.created" } },

    async ({ event }) => {
        const { id, first_name, last_name, image_url, email_addresses, } = event.data
      
     const newUser=   await User.create(
            {
                clerkID: id,
                name: `${first_name || ""} ${last_name || ""}`,
                email: email_addresses[0]?.email_address,
                profileImage: image_url
            })
            
         await upsertStreamUser({
            id:newUser.clerkID.toString(),
            name:newUser.name,
            email:newUser.email,
            profileImage:newUser.profileImage
         })  
    }

)



const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-db", triggers: { event: "clerk/user.deleted" } },
    async ({ event }) => {
        const { id } = event.data
        await User.deleteOne({ clerkID: id })
        await deleteStreamUser(id.toString())
    }

)

export const functions = [syncUser, deleteUserFromDB];