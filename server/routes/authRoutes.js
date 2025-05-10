// routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pgClient from '../db/pg.js';

const router = express.Router();

// Регистрация (уже есть)
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Missing fields" });

    const userExists = await pgClient.query("SELECT * FROM users WHERE username = $1", [username]);
    if (userExists.rows.length > 0) return res.status(400).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pgClient.query("INSERT INTO users (username, password) VALUES ($1, $2)", [username, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Вход
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Missing fields" });

    const user = await pgClient.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) return res.status(401).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.rows[0].id, username }, 'secret123', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
