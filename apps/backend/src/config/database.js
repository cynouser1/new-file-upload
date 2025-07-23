import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fileupload';

    const conn = await mongoose.connect(mongoURI,
      // {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true
      // }
    );

    console.log('MongoDB connected : ', conn.connection.host);
    console.log("connection successfully");
    // return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;