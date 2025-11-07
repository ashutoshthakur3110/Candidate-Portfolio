import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import candidateRoutes from "./routes/candidateRoutes.js";
import videoRoutes from "./routes/videoRoutes.js"; // ✅ ADD THIS

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error(err));

// ✅ Routes
app.use("/api/candidates", candidateRoutes);
app.use("/api/videos", videoRoutes); // ✅ ADD THIS

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
