import express from "express";
import multer from "multer";
import Candidate from "../models/Candidate.js";

const router = express.Router();

// File upload setup (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed."));
  },
});

// POST → Save Candidate
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { firstName, lastName, positionApplied, currentPosition, experience } = req.body;

    if (!req.file) return res.status(400).json({ message: "Resume file is required." });

    const newCandidate = new Candidate({
      firstName,
      lastName,
      positionApplied,
      currentPosition,
      experience,
      resume: req.file.path,
    });

    await newCandidate.save();
    res.status(201).json({ message: "Candidate details saved successfully!" });
  } catch (error) {
    console.error("Error saving candidate:", error);
    res.status(500).json({ message: "Server error while saving candidate data." });
  }
});

export default router;
