import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const records = [];

router.post('/pg', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  const record = { id: records.length + 1, title, content, created_at: new Date() };
  records.push(record);
  res.json(record);
});

export default router;
