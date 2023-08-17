import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        

    },
    name: {
        type: String,

    },
    title: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const post = mongoose.model("post", postSchema)

export default post