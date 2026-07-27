import express from "express";
import auth from "../middleware/auth.js";
import { addMovies, getAllMovies, getMovieById, updateMovies, deleteMovie, uploadMovie, uploadPoster,searchSuggestions } from "../controllers/movieController.js";
import upload from "../middleware/upload.js";

const movieRouter = express.Router();

movieRouter.get("/allMovies", getAllMovies);
movieRouter.post("/add", auth, addMovies);
movieRouter.post("/uploadVideo", auth, upload.single("video"), uploadMovie);
movieRouter.post("/uploadPoster", auth, upload.single("poster"), uploadPoster);
movieRouter.get("/suggestions", searchSuggestions);
movieRouter.get("/movie/:id", getMovieById);
movieRouter.put("/update/:id", auth, updateMovies);
movieRouter.delete("/delete/:id", auth, deleteMovie);

export default movieRouter;