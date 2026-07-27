const ReviewCard = ({ review }) => {
  return (
    <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
            <p className="text-white font-medium text-sm">{review.user?.username}</p>
            <p className="text-red-500 text-sm">{"★".repeat(review.rating)}</p>
        </div>
        <p className="text-neutral-300 text-sm mt-2">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;