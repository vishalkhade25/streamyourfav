import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () =>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected")
    })
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
        console.error(err.message);
        process.exit(1); 
    }
}

export default connectDB;