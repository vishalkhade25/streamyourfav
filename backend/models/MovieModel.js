import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    genre:[{
        type:String
    }],
    releaseYear:{
        type:Number
    },
    duration:{
        type:Number
    },
    posterUrl:{
        type:String
    },
    videoUrl:{
        type:String
    },
    cast:[
        {
            type:String
        }
    ],
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    views:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

const MovieModel = mongoose.model("Movie",movieSchema);
export default MovieModel;