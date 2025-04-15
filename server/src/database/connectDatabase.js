import mongoose from "mongoose";
import dotenv from "dotenv";
import {apiError} from "../utils/apiError.js";
dotenv.config({path: "./.env"});

const connectDB = async () => {
    try {
        const connectionString = process.env.DATABASE_URL;  // Ensure you get the connection string from environment variables
        // console.log("MongoDB connection string: " + connectionString);
        if (!connectionString) {
            throw new apiError(500, {}, "Could not connect to database");
        }
        console.log("Connecting to database...");
        await mongoose.connect(connectionString);
        console.log('***Connected to MongoDB***');
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

export default connectDB;
