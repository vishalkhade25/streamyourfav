import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import movieRouter from "./routes/movieRoutes.js";
import userRouter from "./routes/userRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import streamRouter from "./routes/streamRoutes.js";
import dns from "dns";

// Set the DNS server to use
dns.setServers(['1.1.1.1',
    '8.8.8.8'
]);

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
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
});