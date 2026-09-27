import { StreamChat } from "stream-chat";
import ENV from "./env.js";

const apiKey = ENV.STREAM_API_KEY
const apiKeySecrect = ENV.STREAM_API_SECRET

export const chatClient = StreamChat.getInstance(
    apiKey, apiKeySecrect
);

export const upsertStreamUser =async(userData)=>{
try {
    await chatClient.upsertUser(userData)
    console.log('user upSerted Successfully',userData);
    
} catch (error) {
    console.error("error in upsertStreamUser",error)
}
}

export const deleteStreamUser=async(userID)=>{
    try {
        await chatClient.deleteUser(userID)
        console.log("user Deleted in Stream Successfully",userID);
        
    } catch (error) {
        console.error("error in deleteStreamUser",error)
    }
}