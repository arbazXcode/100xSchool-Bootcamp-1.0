import User from "../models/User.models.js"

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        //validations
        if (!firstName || !email || !password) {
            return res.status(409).json({
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
        if (!newUser) {
            return res.status(401).json({
                success: false,
                message: "Error while creating user."
            })
        }

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