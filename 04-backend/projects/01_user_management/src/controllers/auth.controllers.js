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
        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json({
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

        //access token - short lived
        const accessToken = jwt.sign({ userId: user._id },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: '15m' }
        )

        //refresh token - long lived - stored in db- to create access token
        const refreshToken = jwt.sign({ userId: user._id },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: '10d' }
        )

        //save refresh token in db
        user.refreshToken = refreshToken;
        await user.save()


        //set a token in cookie
        res.cookie("accessToken", accessToken,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 15 // 15 min.
            }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 10 //10d
        })

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

export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)

        const user = await User.findById(decode.userId)

        if (!user || user.refreshToken != token) {
            return res.status(403).json({ message: "Forbidden." })
        }

        //rotate tokensss
        const newAccessToken = jwt.sign({ userId: user._id },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: '15m' }
        )

        const newRefreshToken = jwt.sign({ userId: user._id },
            process.env.JWT_REFRESH_TOKEN,
            { expiresIn: '10d' }
        )

        user.refreshToken = newRefreshToken
        await user.save();

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 15 // 15 mins.
        })

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 10 //10day
        })

        return res.status(200).json({ success: true })

    } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token" })
    }
}

export const logoutUser = async (req, res) => {
    const token = req.cookies.refreshToken

    if (token) {
        const user = await User.findOne({ refreshToken: token })
        if (user) {
            user.refreshToken = null;
            await user.save()
        }
    }
    res.clearCookie("accessToken",
        {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        }
    )
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    })
    return res.status(200).json({
        success: true,
        message: "User logged out successfully."
    })
}