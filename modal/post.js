import mongoose, { now } from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    name: {
        type: String,

    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dueDate: {
        type: String,
        // required: true,
    },
    status: {
        type: String,
         default:"pending",
    },
    assignUser:{
      type: String,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const post = mongoose.model("post", postSchema)

export default post