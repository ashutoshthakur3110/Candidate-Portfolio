import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidateProfile from "../components/CandidateProfile";
import RecordingPage from "../components/RecordingPage";
import VideoRecording from "../components/VideoRecording";
import ReviewCandiate from "../components/ReviewCandidate"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateProfile />} />
        <Route path="/recordingPage" element={<RecordingPage />} />
        <Route path="/videoRecording" element={<VideoRecording/>}></Route>
        <Route path="/reviewCandidate" element={<ReviewCandiate/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
