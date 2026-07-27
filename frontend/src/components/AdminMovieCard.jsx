import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminMovieCard = ({ movie, onDelete }) => {
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(`/admin/update/${movie._id}`);
    }
    return (
        <div className="flex items-center justify-between bg-neutral-900/60 border border-neutral-800 rounded-lg p-4">
            <div className="flex items-center gap-4">
                <img src={movie.posterUrl} className="w-12 h-16 object-cover rounded" />
                <div>
                    <p className="text-white font-medium">{movie.title}</p>
                    <p className="text-neutral-500 text-sm">{movie.releaseYear}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleUpdate}
                    className="bg-neutral-800 hover:bg-neutral-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
                >
                    Update
                </button>
                <button
                    onClick={() => onDelete(movie._id)}
                    className="bg-red-900/40 hover:bg-red-900/60 text-red-400 text-sm px-3 py-1.5 rounded-lg transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default AdminMovieCard;
