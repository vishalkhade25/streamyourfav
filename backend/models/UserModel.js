import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    watchlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        }
    ],
    watchHistory: [
        {
            movie: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie"
            },
            progressSeconds: {
                type: Number,
                default: 0
            },
            lastWatchedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    searchHistory: [
        {
            query: { type: String },
            searchedAt: { type: Date, default: Date.now }
        }
    ]
}, {
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;