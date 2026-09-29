import { StreamChat } from "stream-chat";
import {StreamClient} from "@stream-io/node-sdk"
import ENV from "./env.js";

const apiKey = ENV.STREAM_API_KEY
const apiKeySecret = ENV.STREAM_API_SECRET


export const streamClient=new StreamClient(apiKey,apiKeySecret)

export const chatClient = StreamChat.getInstance(
    apiKey, apiKeySecret
);

export const upsertStreamUser =async(userData)=>{
try {
   const response = await chatClient.upsertUser(userData);

   console.log("UPSERT RESPONSE:", response);
   return response

} catch (error) {
    console.error("error in upsertStreamUser",error)
    throw error  
} 
}

export const deleteStreamUser=async(userID)=>{
    try {
      const response=  await chatClient.deleteUser(userID)
        console.log("user Deleted in Stream Successfully",response);
        return response  
    } catch (error) {
        console.error("error in deleteStreamUser",error)
        throw error
    }
}