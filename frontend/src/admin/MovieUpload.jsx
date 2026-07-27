import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MovieUpload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    releaseYear: "",
    duration: "",
    cast: ""
  });
  const [loading, setLoading] = useState(false);
  const [posterFile, setPosterFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePosterChange = (e) => {
    setPosterFile(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const posterData = new FormData();
      posterData.append("poster", posterFile);

      const posterResponse = await axiosInstance.post("/movie/uploadPoster", posterData);
      const posterUrl = posterResponse.data.posterUrl;

      const videoData = new FormData();
      videoData.append("video", videoFile);

      const videoResponse = await axiosInstance.post("/movie/uploadVideo", videoData);
      const videoUrl = videoResponse.data.videoUrl;

      const payload = {
        ...formData,
        genre: formData.genre.split(",").map((g) => g.trim()),
        cast: formData.cast.split(",").map((c) => c.trim()),
        posterUrl,
        videoUrl,
      };

      const response = await axiosInstance.post("/movie/add", payload);
      toast.success(response.data.message || "Movie added successfully");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-950 px-6 py-10 min-h-full">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Add New Movie</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-900/60 border border-neutral-800 rounded-xl p-6">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Title</label>
            <input type="text" name="title" placeholder="Movie title" value={formData.title} onChange={handleChange}
              className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
            <textarea name="description" rows={3} placeholder="Movie description" value={formData.description} onChange={handleChange}
              className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Genre (comma-separated)</label>
              <input type="text" name="genre" placeholder="Drama, Romance" value={formData.genre} onChange={handleChange}
                className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Release Year</label>
              <input type="number" name="releaseYear" placeholder="2024" value={formData.releaseYear} onChange={handleChange}
                className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Duration (seconds)</label>
              <input type="number" name="duration" placeholder="7800" value={formData.duration} onChange={handleChange}
                className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Cast (comma-separated)</label>
              <input type="text" name="cast" placeholder="Actor One, Actor Two" value={formData.cast} onChange={handleChange}
                className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Poster Image</label>
            <input type="file" accept="image/*" onChange={handlePosterChange}
              className="w-full text-neutral-300 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Video File</label>
            <input type="file" accept="video/*" onChange={handleVideoChange}
              className="w-full text-neutral-300 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-800 file:text-white hover:file:bg-neutral-700" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors mt-2">
            {loading ? "Uploading..." : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default MovieUpload;
