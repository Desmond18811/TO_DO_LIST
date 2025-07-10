import mongoose from "mongoose";
import  {DB_URI, NODE_ENV} from "./config/env.js";
import 'dotenv/config';

if (!DB_URI) {
    throw new Error("Please define DB_URI in .env.development.local");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5 seconds
            socketTimeoutMS: 30000, // 30 seconds
            maxPoolSize: 10,
        });
        console.log(`🟢 MongoDB connected in ${NODE_ENV} mode`);
        return true;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        throw error;
    }
};

// Connection event handlers
mongoose.connection.on('connected', () => {
    console.log('🟢 Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('🔴 Mongoose disconnected');
});

export default connectToDatabase;