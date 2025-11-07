import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

const router = express.Router();

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/candidateDB";
const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once("open", () => {
  gfs = new GridFSBucket(conn.db, { bucketName: "videos" });
  console.log("✅ GridFSBucket ready for videos");
});

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📤 Upload route
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const readableVideoStream = new Readable();
    readableVideoStream.push(req.file.buffer);
    readableVideoStream.push(null);

    const uploadStream = gfs.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    readableVideoStream.pipe(uploadStream);

    uploadStream.on("finish", () => {
      console.log("✅ Uploaded to GridFS:", uploadStream.filename);
      res.status(201).json({
        message: "Video uploaded successfully",
        fileId: uploadStream.id,
        filename: uploadStream.filename,
      });
    });

    uploadStream.on("error", (err) => {
      console.error("❌ Error uploading file:", err);
      res.status(500).json({ error: "Upload failed" });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 📥 Stream video by filename
router.get("/stream/:filename", async (req, res) => {
  try {
    const files = await conn.db.collection("videos.files").findOne({ filename: req.params.filename });

    if (!files) {
      return res.status(404).json({ error: "File not found" });
    }

    res.set("Content-Type", files.contentType);
    const downloadStream = gfs.openDownloadStreamByName(req.params.filename);
    downloadStream.pipe(res);
  } catch (err) {
    console.error("❌ Stream error:", err);
    res.status(500).json({ error: "Stream failed" });
  }
});

export default router;
