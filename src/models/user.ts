import { Schema, model, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

interface IUser extends Document {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy: Schema.Types.ObjectId,
    role: string;
    image: string;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true,
        trim: true,
        maxlength: [100, "Your email can not exceed 100 characters."],
        validate: [validator.isEmail, "Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        trim: true,
        minlength: [6, "Your password must be at least 6 characters."],
    },
    name: {
        type: String,
        required: [true, "Please enter your name."],
        trim: true,
        maxlength: [50, "Your name can not exceed 50 characters."]
    },
    createdAt: {
        type: Date,
        default: new Date(new Date().getTime() + 3 * 60 * 60 * 1000)
    },
    updatedAt: {
        type: Date,
        required: false
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    role: {
        type: String,
        required: false,
        trim: true,
        default: "user"
    },
    image: {
        type: String,
        required: false,
        default: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
    }
});

// Encript the password before saving the user to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    } else {
        this.password = await bcrypt.hash(this.password, 10)
    }
})

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default model<IUser>("User", userSchema);