
import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({ message: "Unauthorize" })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}