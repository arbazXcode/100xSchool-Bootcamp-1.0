import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter first name."],
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter email id."],
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
    }
})

userSchema.pre("save", async function (next) {
    if (!isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model("User", userSchema)
export default User