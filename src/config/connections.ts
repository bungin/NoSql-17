import mongoose from "mongoose";

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/smDB");
            console.log("Connected to the database");
            return mongoose.connection;
        } catch (err) {
            console.error("Error connecting to the database", err);
            throw new Error('DB connect failed');
        }
}

export default db;