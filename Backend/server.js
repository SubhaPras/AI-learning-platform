import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./configs/db.js";

dotenv.config();

const app = express()
app.use(express.json());
app.use(cors());

connectDB()
app.listen(5000, ()=> { console.log(`Server is running at http://localhost:5000 `)});