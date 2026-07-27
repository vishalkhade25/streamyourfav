import UserModel from "../models/UserModel.js";
import MovieModel from "../models/MovieModel.js";

const addToWatchList = async (req, res) => {
    try {
        const { movieId } = req.params;

        const user = await UserModel.findById(req.user.userId);

        if (user.watchlist.includes(movieId)) {
            return res.status(409).json({ success: false, message: "Movie already in watchlist" });
        }

        user.watchlist.push(movieId);
        await user.save();

        return res.status(200).json({ success: true, message: "Added to watchlist", watchlist: user.watchlist });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getWatchlist = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId).populate("watchlist")

        if (user.watchlist.length === 0) {
            return res.status(200).json({ success: true, message: "You haven't added anything in watchlist yet!" });
        }

        return res.status(200).json({ success: true, message: "WatchList Fetched successfully", watchList : user.watchlist });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const removeFromWatchlist = async (req, res) => {
    try {
        const { movieId } = req.params;

        const user = await UserModel.findById(req.user.userId);

        if (!user.watchlist.includes(movieId)) {
            return res.status(409).json({ success: false, message: "Movie is not present in watchlist" });
        }

        user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
        await user.save();

        return res.status(200).json({ success: true, message: "Removed from watchlist", watchlist: user.watchlist });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const submitSearch = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }

        const movies = await MovieModel.find({ title: { $regex: query, $options: "i" } }).sort({ createdAt: -1 });

        const user = await UserModel.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.searchHistory.unshift({ query, searchedAt: new Date() });

        if (user.searchHistory.length > 10) {
            user.searchHistory.pop();
        }

        await user.save()

        if (movies.length === 0) {
            return res.status(200).json({ success: false, message: "There is no movies to show" })
        }

        return res.status(200).json({
            success: true,
            message: "Search completed",
            movies,
            searchHistory: user.searchHistory
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const clearSearchHistory = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.searchHistory = [];
        await user.save();

        return res.status(200).json({ success: true, message: "Search history cleared" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const updateWatchHistory = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { progressSeconds } = req.body;

        const user = await UserModel.findById(req.user.userId);

        const existingEntry = user.watchHistory.find(
            entry => entry.movie.toString() === movieId
        );

        if (existingEntry) {
            existingEntry.progressSeconds = progressSeconds;
            existingEntry.lastWatchedAt = new Date();
        } else {
            user.watchHistory.push({
                movie: movieId,
                progressSeconds,
                lastWatchedAt: new Date()
            })
        }

        await user.save();

        return res.status(200).json({ success: true, message: "History got saved" });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server Error", error: error.message });
    }
}

const getWatchHistory = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId).populate("watchHistory.movie");

        if (user.watchHistory.length === 0) {
            return res.status(200).json({ success: true, message: "You haven't watched anything yet", watchHistory: [] });
        }

        return res.status(200).json({ success: true, message: "History fetched successfully", watchHistory: user.watchHistory });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export { addToWatchList, getWatchlist, removeFromWatchlist, updateWatchHistory, getWatchHistory, submitSearch, clearSearchHistory };