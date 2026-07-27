import express from "express";
import auth from "../middleware/auth.js";
import { addToWatchList, removeFromWatchlist, submitSearch, clearSearchHistory, getWatchHistory, updateWatchHistory, getWatchlist } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/watchlist",auth,getWatchlist);
userRouter.post("/watchlist/:movieId",auth,addToWatchList);
userRouter.delete("/watchlist/:movieId",auth,removeFromWatchlist);
userRouter.post("/watchHistory/:movieId",auth,updateWatchHistory);
userRouter.get("/watchHistory",auth,getWatchHistory);
userRouter.post("/search", auth, submitSearch);
userRouter.delete("/search/history", auth, clearSearchHistory);

export default userRouter;