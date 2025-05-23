import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";
import readingChallengeRoutes from './routes/readingChallenge.js';


dotenv.config();
const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",                  // local dev
  "https://readhive-1.onrender.com"        // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.error(" MongoDB Connection Error:", err));

// Test API Route
app.get("/", (req, res) => {
  res.send("ReadHive API is Running...");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use('/api/readingChallenge', readingChallengeRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
