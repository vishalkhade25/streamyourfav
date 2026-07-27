import express from "express";
import streamVideo from "../controllers/streamController.js";

const streamRouter = express.Router();
streamRouter.get("/:filename", streamVideo);

export default streamRouter;