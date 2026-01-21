import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";


import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js"
import courseRoutes from "./routes/courseRoutes.js"


dotenv.config();

const app = express()

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));



app.use("/api/auth", authRoutes)
app.use("/api/course", courseRoutes)

connectDB()
app.listen(5000, ()=> { console.log(`Server is running at http://localhost:5000 `)});