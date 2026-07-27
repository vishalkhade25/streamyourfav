import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MovieCard = ({movie}) => {
    const navigate = useNavigate();

    const handleClick = async (id) =>{
        try {
            navigate(`/movie/${id}`)
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        }
    }
  return (
    <div
        onClick={()=>{handleClick(movie._id)}}
        className="group cursor-pointer"
    >
        <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-neutral-800">
            <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-sm font-medium line-clamp-2">
                    {movie.title}
                </p>
            </div>
        </div>
        <p className="text-neutral-300 text-sm mt-2 truncate">
            {movie.title}
        </p>
    </div>
)
}

export default MovieCard;