import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import MovieCard from '../components/MovieCard';
import { toast } from 'react-toastify';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');

  const getAllMovies = async (genre) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/movie/allMovies", {
        params: genre ? { genre } : {}
      });
      if (response.data.movies.length === 0) {
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

  const handleGenre = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    getAllMovies(genre);
  }

  useEffect(() => {
    getAllMovies(selectedGenre);
  }, []);

  return (
    <div className="bg-neutral-950 px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-white">All Movies</h1>
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
      </div>
      {loading ? (
        <p className="text-neutral-400">Loading movies...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Home;