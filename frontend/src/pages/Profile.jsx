import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import MovieCard from '../components/MovieCard';

const Profile = () => {
  const { user } = useAuth();
  const [watchList, setWatchList] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);

  const getWatchList = async () => {
    try {
      const response = await axiosInstance.get("/user/watchlist");
      setWatchList(response.data.watchList);
    } catch (error) {
      console.log(error);
    }
  }

  const getWatchHistory = async () => {
    try {
      const response = await axiosInstance.get("/user/watchHistory");
      setWatchHistory(response.data.watchHistory);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getWatchList();
    getWatchHistory();
  },[]);
  return (
    <div className="bg-neutral-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">My Profile</h1>

        <div className="flex items-center gap-4 mb-10 bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-2xl font-bold text-white">
            {user.username[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{user.username}</h1>
            <p className="text-neutral-400 text-sm">{user.email}</p>
          </div>
        </div>

        {/* Continue Watching */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">Continue Watching</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchHistory && watchHistory.length > 0 ? (
              watchHistory.map((movie) => movie.movie ?  (
                <MovieCard key={movie.movie._id} movie={movie.movie} />
              ) : null)
            ) : (
              <p className="text-neutral-400">You haven't started watching any movies yet.</p>
            )}
          </div>
        </section>

        {/* My Watchlist */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">My Watchlist</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {watchList && watchList.length > 0 ? (
              watchList.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))
            ) : (
              <p className="text-neutral-400">Your watchlist is empty.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Profile;
