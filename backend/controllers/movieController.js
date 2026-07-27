import MovieModel from "../models/MovieModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const addMovies = async (req, res) => {
    try {
        const { title, description, genre, releaseYear, duration, posterUrl, videoUrl, cast } = req.body;
        if (!title || !duration || !posterUrl || !videoUrl) {
            return res.status(400).json({ success: false, message: "Please fill all the required fields!" })
        }

        if (req.user.role !== "Admin") {
            return res.status(403).json({ success: false, message: "You are not allowed to add movies! Only admins are allowed" });
        }

        const exist = await MovieModel.findOne({ title });

        if (exist) {
            return res.status(409).json({ success: false, message: "Movie already exists" });
        }

        const movie = new MovieModel({
            title,
            description,
            genre,
            releaseYear,
            duration,
            posterUrl,
            videoUrl,
            cast,
            uploadedBy: req.user.userId
        })
        await movie.save();
        return res.status(201).json({ success: true, message: "Movie added successfully", movie });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server Error", error: error.message });
    }
};

const uploadMovie = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No video file uploaded" });
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type : "video",
            folder: "movie-streaming"
        });
        fs.unlinkSync(req.file.path);
        return res.status(200).json({
            success: true,
            message: "Video uploaded successfully",
            videoUrl: result.secure_url
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const uploadPoster = async (req,res) =>{
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file uploaded" });
        }

        const result = await cloudinary.uploader.upload(req.file.path,{
            resource_type : "image",
            folder : "movie-posters"
        });

        fs.unlinkSync(req.file.path);
        return res.status(200).json({
            success: true,
            message: "Poster uploaded successfully",
            posterUrl: result.secure_url
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getAllMovies = async (req, res) => {
    try {
        const filter = {};
        if (req.query.genre) {
            filter.genre = req.query.genre;
        }
        if (req.query.releaseYear) {
            filter.releaseYear = req.query.releaseYear;
        }
        if (req.query.cast) {
            filter.cast = req.query.cast;
        }
        const movies = await MovieModel.find(filter).sort({ createdAt: -1 })
        if (movies.length === 0) {
            return res.status(200).json({ success: false, message: "There is no movies to show" })
        }
        return res.status(200).json({ success: true, message: "Movies fetched successfully", movies });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server Error", error: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Bad Request" })
        }

        const movie = await MovieModel.findById(id);

        if (!movie) {
            return res.status(404).json({ success: false, message: "Sorry, we have not found any details" })
        }

        await MovieModel.findByIdAndUpdate(id, { $inc: { views: 1 } });

        return res.status(200).json({ success: true, message: "movie details found", movie });

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server Error", error: error.message });
    }
};

const updateMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, genre, releaseYear, duration, posterUrl, videoUrl, cast } = req.body;

        if (req.user.role !== "Admin") {
            return res.status(403).json({ success: false, message: "You are not allowed to update movies! Only admins are allowed" });
        }

        const movie = await MovieModel.findById(id);

        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        movie.title = title || movie.title;
        movie.description = description || movie.description;
        movie.genre = genre || movie.genre;
        movie.releaseYear = releaseYear || movie.releaseYear;
        movie.duration = duration || movie.duration;
        movie.posterUrl = posterUrl || movie.posterUrl;
        movie.videoUrl = videoUrl || movie.videoUrl;
        movie.cast = cast || movie.cast;

        await movie.save();

        return res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            movie
        });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server Error", error: error.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.role !== "Admin") {
            return res.status(403).json({ success: false, message: "You are not allowed to update movies! Only admins are allowed" });
        }
        const movie = await MovieModel.findById(id);
        if (!movie) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }

        await movie.deleteOne();
        return res
            .status(200)
            .json({ message: "Movie deleted successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server Error", error: error.message });
    }
};

const searchSuggestions = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(200).json({ success: true, suggestions: [] });
        }
        const suggestions = await MovieModel.find(
            { title: { $regex: query, $options: "i" } },
            "title posterUrl releaseYear"
        ).limit(5);

        return res.status(200).json({ success: true, suggestions });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export { addMovies, getAllMovies, getMovieById, updateMovies, deleteMovie, uploadMovie, uploadPoster, searchSuggestions };