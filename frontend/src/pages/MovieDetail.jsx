import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from "react-toastify";
import ReviewCard from '../components/ReviewCard';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchList, setInWatchList] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [comments, setComments] = useState("");

  const getMovieDetail = async () => {
    try {
      const response = await axiosInstance.get(`/movie/movie/${id}`);
      setMovie(response.data.movie);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const getReviews = async () => {
    try {
      const response = await axiosInstance.get(`/reviews/${id}`);
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.log(error);
    }
  }

  const checkWatchList = async () => {
    try {
      const response = await axiosInstance.get("/user/watchlist");
      const isInList = response.data.watchList?.some(item => item._id === id);
      setInWatchList(isInList || false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleWatchListToggle = async () => {
    try {
      if (inWatchList) {
        await axiosInstance.delete(`/user/watchlist/${id}`);
        toast.info("Removed From Watchlist");
      } else {
        await axiosInstance.post(`/user/watchlist/${id}`);
        toast.info("Added to Watch List");
      }
      setInWatchList(!inWatchList);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const handlePlay = async () => {
    navigate(`/watch/${id}`);
  }

  const handleComment = async (e) => {
    if (ratings >= 1) {
      setComments(e.target.value);
    }
  }

  const handleReviewSubmit = async () => {
    try {
      if (ratings < 1) {
        toast.error("Please provide a rating before submitting a review.");
        return;
      }
      await axiosInstance.post(`/reviews/${id}`, {
        comment: comments,
        rating: ratings
      })
      toast.success("Review submitted successfully");
      setRatings(0);
      setComments("");
      getReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    getMovieDetail();
    getReviews();
    checkWatchList();
  }, [id]);

  const totalRatings =  reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRatings / reviews.length).toFixed(1) : "N/A";

  return (
    <div className="bg-neutral-950 px-6 py-10">
      {
        loading ?
          (
            <p className="text-neutral-400">Loading movies...</p>
          ) :
          (
            <>
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[2/3] bg-neutral-800">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg py-3">
                      <p className="text-white font-semibold">{movie.views}</p>
                      <p className="text-neutral-500 text-xs mt-1">Views</p>
                    </div>
                    <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg py-3">
                      <p className="text-white font-semibold">{reviews.length}</p>
                      <p className="text-neutral-500 text-xs mt-1">Comments</p>
                    </div>
                    <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg py-3">
                      <p className="text-white font-semibold">{averageRating} ★</p>
                      <p className="text-neutral-500 text-xs mt-1">Rating</p>
                    </div>
                  </div>
                </div>


                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
                  <p className="text-neutral-400 text-sm mt-2">
                    {movie.releaseYear} • {movie.genre?.join(", ")}
                  </p>
                  <p className="text-neutral-300 mt-4 leading-relaxed">{movie.description}</p>
                  <p className="text-neutral-400 text-sm mt-4">
                    <span className="text-neutral-500">Cast: </span>
                    {movie.cast?.join(", ")}
                  </p>

                  {/* Watchlist button — stage 3 */}
                  <button
                    onClick={handleWatchListToggle}
                    className="mt-4 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    {inWatchList ? "Remove from Watchlist" : "+ Add to Watchlist"}
                  </button>

                  {/* Play Button */}
                  <button
                    onClick={handlePlay}
                    className="mt-4 mr-3 ml-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    ▶ Play
                  </button>

                  <div className="mt-10 pt-8 border-t border-neutral-800">
                    <h2 className="text-xl font-semibold text-white mb-4">Reviews</h2>

                    {/* Submit review form */}
                    <div className="bg-neutral-900/60 border border-neutral-800 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-2xl cursor-pointer ${star <= ratings ? "text-red-500" : "text-neutral-600"} `}
                            onClick={() => setRatings(star)}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <textarea
                        placeholder={`${ratings >= 1 ? "Write a comment" : "Rate first then comments"}`}
                        rows={3}
                        value={comments}
                        onChange={handleComment}
                        className="w-full bg-neutral-800/60 border border-neutral-700 text-white placeholder-neutral-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-600 resize-none"
                      />
                      <button
                        onClick={handleReviewSubmit}
                        className="mt-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      >
                        Submit Review
                      </button>
                    </div>

                    {/* Reviews list */}
                    <div className="space-y-4">
                      {
                        reviews.map((review) => (
                          <ReviewCard key={review._id} review={review} />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}

export default MovieDetail;
