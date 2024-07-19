import { Schema, Document, model } from "mongoose";

interface IPost extends Document {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: Schema.Types.ObjectId;
}

const postSchema = new Schema<IPost>({
    title: {
        type: String,
        required: [true, "Please enter your title."],
        trim: true,
        maxlength: [100, "Your title can not exceed 100 characters."]
    },
    content: {
        type: String,
        required: [true, "Please enter your content."],
        trim: true
    },
    createdAt: {
        type: Date,
        default: new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
    },
    updatedAt: {
        type: Date,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please enter the user ID."]
    }
})

export default model<IPost>("Post", postSchema);