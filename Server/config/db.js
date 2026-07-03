import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // process.env.MONGO_URI pulls the connection string from your .env file
    const conn = await mongoose.connect(process.env.DBURL);
    
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1); // Stop the entire server if the DB connection fails
  }
};

export default connectDB;