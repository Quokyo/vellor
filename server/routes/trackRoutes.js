// server/routes/trackRoutes.js
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Схема и модель MongoDB
const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Track = mongoose.models.Track || mongoose.model('Track', trackSchema);

// POST /tracks — добавить трек
router.post('/', async (req, res) => {
  try {
    const { title, artist } = req.body;

    if (!title || !artist) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const newTrack = new Track({ title, artist });
    await newTrack.save();

    res.status(201).json(newTrack);
  } catch (err) {
    console.error('❌ Error creating track:', err);
    res.status(500).json({ error: 'Track creation failed' });
  }
});

// GET /tracks — получить все треки
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.status(200).json(tracks);
  } catch (err) {
    console.error('❌ Error fetching tracks:', err);
    res.status(500).json({ error: 'Failed to get tracks' });
  }
});

export default router;
