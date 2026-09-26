import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, "Please enter you Name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    },
    profileImage: {
        type: String,
        default: "",
        trim: true
    },
    clerkID:{
        type:String,
        required:true,
        unique:true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User