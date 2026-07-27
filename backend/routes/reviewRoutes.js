import express from "express";
import { addReview, deleteReview, getReviewForMovie } from "../controllers/reviewController.js";
import auth from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.get("/:movieId", getReviewForMovie);
reviewRouter.post("/:movieId",auth, addReview);
reviewRouter.delete("/:reviewId",auth,deleteReview);

export default reviewRouter;