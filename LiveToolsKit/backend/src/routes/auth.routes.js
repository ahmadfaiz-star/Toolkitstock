import express from "express";
import bcrypt from "bcrypt";
import { db } from "../db.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const [existing] = await db.query("SELECT id FROM users WHERE email=?", [
      email,
    ]);

    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?,?,?)",
      [name, email, hash],
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
