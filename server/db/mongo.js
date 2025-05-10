// db/mongo.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // Можно вывести лог здесь, но не обязательно
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

export default connectMongo;
