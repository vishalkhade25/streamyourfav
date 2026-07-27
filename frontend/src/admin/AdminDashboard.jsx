import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import AdminMovieCard from '../components/AdminMovieCard';

const AdminDashboard = () => {

    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllMovies = async () => {
        try {
            const response = await axiosInstance.get("/movie/allMovies");
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
            setMovies((prevMovies)=>(
                prevMovies.filter((movie)=> movie._id != id)
            ));
            toast.success("Movie deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete movie");
        }
    };

    useEffect(() => {
        getAllMovies();
    }, []);

    return (
        <div className="bg-neutral-950 px-6 py-10 min-h-full">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                    <button
                        onClick={handleUpload}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                        + Add Movie
                    </button>
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
