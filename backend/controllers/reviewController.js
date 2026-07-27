import ReviewModel from "../models/reviewModel.js";

const addReview = async (req,res) =>{
    try {
        const { movieId } = req.params;
        const { rating,comment } = req.body;

        if (!rating) {
            return res.status(400).json({ success: false, message: "Rating is required" });
        }

        const existingReview = await ReviewModel.findOne({
            movie : movieId,
            user : req.user.userId
        });

        if (existingReview) {
            return res.status(409).json({ success: false, message: "You have already reviewed this movie" });
        }

        const review = new ReviewModel({
            movie : movieId,
            user : req.user.userId,
            rating,
            comment
        });

        await review.save();
        return res.status(201).json({ success: true, message: "Review added successfully", review });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getReviewForMovie = async (req,res) =>{
    try {
        const { movieId } = req.params;
        const reviews = await ReviewModel.find({movie:movieId}).populate("user","username").sort({ createdAt: -1 });

        if(reviews.length === 0){
            return res.status(200).json({success:true,message:"No reviews yet", reviews: []});
        }

        return res.status(200).json({success:true, message:"Review fetched successfully",reviews});
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const deleteReview = async (req,res) => {
    try {
        const { reviewId } = req.params;

        const review = await ReviewModel.findById(reviewId);

        if(!review){
            return res.status(404).json({success:false,message:"review not found"})
        }

        if(review.user.toString() !== req.user.userId.toString()){
            return res.status(403).json({success:false,message:"Unauthorized user"});
        }

        await review.deleteOne();

        return res.status(200).json({success:true, message:"Review deleted successfully"});
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export { addReview, getReviewForMovie, deleteReview };