import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import subscribeRoutes from "./routes/subscribe.routes.js";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Toolify backend running ✅");
});

app.use("/api/auth", authRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/contact", contactRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
