import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../api/axiosInstance';
import MovieCard from '../components/MovieCard';
import { toast } from 'react-toastify';

const Home = () => {
  const { user } = useAuth();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllMovies = async () =>{
    try {
      const response = await axiosInstance.get("/movie/allMovies");
      setMovies(response.data.movies);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load movies")
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getAllMovies();
  },[]);
  return (
    <div className="bg-neutral-950 px-6 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">All Movies</h1>
      {loading ? (
        <p className="text-neutral-400">Loading movies...</p>
      ):(
        <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie)=>(
          <MovieCard key={movie._id} movie={movie}/>
        ))}
      </div>
        </>
      )}
    </div>
  )
}

export default Home;