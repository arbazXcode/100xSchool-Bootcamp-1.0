import User from "../models/User.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        //validations
        if (!firstName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        const newUser = await User.create({
            firstName,
            lastName,
            password,
            email
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: newUser._id,
                firstName,
                email
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password is required."
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials."
            })
        }
        //compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            })
        }
        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        //set a token in cookie
        res.cookie('accessToken', token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 //24 hours
            }
        )

        return res.status(200).json({
            success: true,
            message: "User loggedIn successfully",
            data: {
                _id: user._id,
                email: user.email
            }
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const logoutUser = async (req, res) => {
    res.clearCookie("accessToken",
        {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        }
    )
    return res.status(200).json({
        success: true,
        message: "User logged out successfully."
    })
}