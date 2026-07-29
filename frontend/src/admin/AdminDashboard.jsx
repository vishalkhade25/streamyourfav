import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import AdminMovieCard from '../components/AdminMovieCard';

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState('');

    const getAllMovies = async (genre) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/movie/allMovies",{
                params : genre ? {genre} : {}
            });
            if(response.data.movies.length === 0){
                setMovies([]);
                return toast.info("No movies found for the selected genre");
            }
            setMovies(response.data.movies);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load movies")
        } finally {
            setLoading(false);
        }
    }

    const handleUpload = () => {
        navigate("/admin/upload");
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;
        try {
            await axiosInstance.delete(`/movie/delete/${id}`);
            setMovies((prevMovies) => (
                prevMovies.filter((movie) => movie._id != id)
            ));
            toast.success("Movie deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete movie");
        }
    };

    const handleGenre = (e) => {
        const genre = e.target.value;
        setSelectedGenre(genre);
        getAllMovies(genre);
    }

    useEffect(() => {
        getAllMovies(selectedGenre);
    }, []);

    return (
        <div className="bg-neutral-950 px-6 py-10 min-h-full">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <select value={selectedGenre} onChange={handleGenre} className="bg-neutral-900 text-white border border-neutral-700 rounded-lg px-3 py-2">
                            <option value="">All Genres</option>
                            <option value="Action">Action</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Drama">Drama</option>
                            <option value="Romance">Romance</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Horror">Horror</option>
                        </select>
                        <button
                            onClick={handleUpload}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                            + Add Movie
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    {
                        movies.map((movie) => (
                            <AdminMovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;
