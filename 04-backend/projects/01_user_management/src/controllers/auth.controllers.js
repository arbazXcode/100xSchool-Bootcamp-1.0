import User from "../models/User.models.js"

export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        //validations
        if (!firstName || !lastName || !email || !password) {
            return res.status(401).json({
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
    } catch (error) {
        throw new Error("Internal server error: ", error)
    }
}