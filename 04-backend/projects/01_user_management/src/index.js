import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import userRoutes from "./routes/auth.routes.js"

dotenv.config({ path: "../.env" })

const app = express()
const port = process.env.PORT || 4001

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

//user routes for auth.
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})