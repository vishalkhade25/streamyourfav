import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const MovieUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    title: "",
    description: "",
    genre: "",
    releaseYear: "",
    duration: "",
    cast: ""
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    })
  };

  const getDetails = async () => {
    try {
      const response = await axiosInstance.get(`/movie/movie/${id}`);
      setDetails({
        ...details,
        title: response.data.movie.title,
        description: response.data.movie.description,
        genre: response.data.movie.genre.join(", "),
        releaseYear: response.data.movie.releaseYear,
        duration: response.data.movie.duration,
        cast: response.data.movie.cast.join(", ")
      })
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch movie details");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...details,
        genre: details.genre.split(",").map((g) => g.trim()),
        cast: details.cast.split(",").map((c) => c.trim()),
      };
      const response = await axiosInstance.put(`/movie/update/${id}`, payload);
      toast.success(response.data?.message || "Updated");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update movie details");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, [id]);
  return (
    <div className="bg-neutral-950 px-6 py-10 min-h-full">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Update Movie</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Title</label>
            <input type="text" name="title" value={details.title} onChange={handleChange} className="w-full bg-neutral-800/60 border border-neutral-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
            <textarea name="description" value={details.description} onChange={handleChange} rows={3} className="w-full bg-neutral-800/60 border border-neutral-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Genre (comma-separated)</label>
              <input type="text" name="genre" value={details.genre} onChange={handleChange} className="w-full bg-neutral-800/60 border border-neutral-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Release Year</label>
              <input type="number" name="releaseYear" value={details.releaseYear} onChange={handleChange} className="w-full bg-neutral-800/60 border border-neutral-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Duration (seconds)</label>
              <input type="number" name="duration" value={details.duration} onChange={handleChange} className="w-full bg-neutral-800/60 border border-neutral-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Cast (comma-separated)</label>
              <input type="text" name="cast" value={details.cast} onChange={handleChange} className="w-full bg-neutral-800/60 border border-neutral-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors mt-2">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default MovieUpdate;
