// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pgClient from './db/pg.js';
import connectMongo from './db/mongo.js';
import authRoutes from './routes/authRoutes.js';
import trackRoutes from './routes/trackRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tracks', trackRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);

  // PostgreSQL
  try {
    await pgClient.connect();
    console.log('✅ Connected to PostgreSQL');
  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err);
  }

  // MongoDB
  try {
    await connectMongo();
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
});
