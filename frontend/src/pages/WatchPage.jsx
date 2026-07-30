import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';

const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const lastSavedSecond = useRef(-1);

  const [movie, setMovie] = useState(null);
  const [resumeTime, setResumeTime] = useState(0);

  const getMovie = async () => {
    try {
      const response = await axiosInstance.get(`/movie/movie/${id}`);
      setMovie(response.data.movie);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  const getWatchProgress = async () => {
    try {
      const response = await axiosInstance.get("/user/watchHistory");
      const historyEntry = response.data.watchHistory?.find(item => item.movie._id === id);
      if (historyEntry) {
        setResumeTime(historyEntry.progressSeconds);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && resumeTime > 0) {
      videoRef.current.currentTime = resumeTime;
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTime = Math.floor(videoRef.current.currentTime);

    if (
      currentTime > 0 &&
      currentTime % 10 === 0 &&
      currentTime !== lastSavedSecond.current
    ) {
      lastSavedSecond.current = currentTime;

      axiosInstance.post(`/user/watchHistory/${id}`, {
        progressSeconds: currentTime,
      });
    }
  };

  useEffect(() => {
    getMovie();
    getWatchProgress();
  }, [id]);

  return (
    <div className="bg-neutral-950 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="text-neutral-400 hover:text-white text-sm mb-4"
        >
          ← Back
        </button>

        {!movie ? (
          <p className="text-neutral-400">Loading...</p>
        ) : (
          <>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-black">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                src={movie.videoUrl}
                ref={videoRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
            </div>
            <h1 className="text-white text-lg font-medium mt-4">{movie.title}</h1>
          </>
        )}
      </div>
    </div>
  )
}

export default WatchPage;
