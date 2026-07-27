import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async () => {
        try {
            const response = await axiosInstance.get(`/movie/suggestions?query=${query}`);
            setSuggestions(response.data.suggestions);
        } catch (error) {
            console.log(error);
        }
    }

    const SearchChange = (e) => {
        setQuery(e.target.value);
    }

    useEffect(() => {
        if (query.trim() === "") {
            setSuggestions([]);
            return;
        }

        const timer = setTimeout(() => {
            fetchSuggestions();
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    const handleSuggestionOnClick = (movieId) => {
        navigate(`/movie/${movieId}`);
        setQuery("");
        setSuggestions([]);
    }

    if(location.pathname === "/login" || location.pathname === "/signup"){
        return null;
    }
    return (
        <div className="relative w-full max-w-xs">
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={SearchChange}
                className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 text-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-red-600"
            />

            {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-xl z-50">
                    {suggestions.map((movie) => (
                        <div key={movie._id} onClick={() => handleSuggestionOnClick(movie._id)} className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-800 cursor-pointer transition-colors">
                            <img src={movie.posterUrl} className="w-8 h-11 object-cover rounded" />
                            <div>
                                <p className="text-white text-sm">{movie.title}</p>
                                <p className="text-neutral-500 text-xs">{movie.releaseYear}</p>
                            </div>
                        </div>
                    ))}
                </div>)}
        </div>
    )
}

export default SearchBar;
