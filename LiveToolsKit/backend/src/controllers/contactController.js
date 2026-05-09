import { db } from "../db.js";

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await db.query(
      "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)",
      [name.trim(), email.trim(), message.trim()],
    );

    return res.json({ message: "Message sent successfully ✅" });
  } catch (err) {
    console.log("CONTACT SAVE ERROR:", err);
    return res.status(500).json({
      message: err?.sqlMessage || err?.message || "Server error",
    });
  }
};
