import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // googleId: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //   },
    
    name:{
        type:String,
        // required:true,
        trim:true,
    },
    email:{
        type:String,
        // required:true,
        trim:true,
    },
    password:{
        type:String,
        // required:true,
        trim:true,
    },
    cpassword:{
        type:String,
        // required:true,
        trim:true,
    },
    // access:{
    //     type:String,
    //     default:"registerForm"
    // },
    // role:{
    //     type:String,
    //     enum:["admin","role"],
    //     default:"role",
    // }
})

const user = mongoose.model("User",userSchema)

export default user