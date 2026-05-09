import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    await db.query("INSERT INTO subscribers (email) VALUES (?)", [email]);
    res.json({ message: "Subscribed successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.json({ message: "Already subscribed" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
