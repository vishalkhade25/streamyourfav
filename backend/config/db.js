import mongoose from "mongoose";

const connectDB = async () =>{
    mongoose.connection.on('connected',()=>{
        console.log("DB Connected")
    })
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (err) {
        console.error("DB connection failed:", err.message);
        process.exit(1); 
    }
}

export default connectDB;