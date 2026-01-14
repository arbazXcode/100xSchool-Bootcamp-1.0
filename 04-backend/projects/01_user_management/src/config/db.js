import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const mongo_uri = process.env.MONGODB_URI
        if (!mongo_uri) {
            throw new Error("DB URL is missing.")
        }
        await mongoose.connect(mongo_uri)
        console.log("Database connection done.")
    } catch (error) {
        console.error("DB connection error: ", error)
        throw error
    }
}