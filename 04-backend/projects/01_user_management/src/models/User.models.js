import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter first name."],
        trim: true,
        unique: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter email id."],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        trim: true
    }
})

userSchema.pre("save", async (next) => {
    if (this.password(!isModified)) return next()

    const hashedPassword = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model("User", userSchema)
export default User