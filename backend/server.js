import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import userRouter from "./routes/userRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import streamRouter from "./routes/streamRoutes.js";

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
dotenv.config();
app.use(express.json());
await connectDB();
app.use("/api/auth", authRouter);
app.use("/api/movie", movieRouter);
app.use("/api/user", userRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/stream", streamRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App running on port number ${port}`);
})