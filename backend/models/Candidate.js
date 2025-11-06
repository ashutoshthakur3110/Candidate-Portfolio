import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  positionApplied: { type: String, required: true },
  currentPosition: { type: String, required: true },
  experience: { type: Number, required: true },
  resume: { type: String, required: true }, // file path
});

export default mongoose.model("Candidate", candidateSchema);
