import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CandidateProfile from "../components/CandidateProfile";
import RecordingPage from "../components/RecordingPage";
import VideoRecording from "../components/VideoRecording";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CandidateProfile />} />
        <Route path="/recordingPage" element={<RecordingPage />} />
        <Route path="/videoRecording" element={<VideoRecording/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
