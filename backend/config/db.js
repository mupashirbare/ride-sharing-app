import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // ✅ good for direct test runs


// Load environment variables (if this file is ever run directly)
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;