import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const RecordingPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); // go back to form if needed
  };

  const handleGotIt = () => {
    // Navigate to video recording page
    navigate("/videoRecording");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light px-3">
      <div
        className="card shadow-lg p-4 rounded-4 w-100"
        style={{ maxWidth: "40rem" }}
      >
        <h3 className="text-center mb-3 text-primary fw-bold">
          🎥 Video Recording Instructions
        </h3>
        <p className="text-center text-muted mb-4">
          Please record a short video (90 Seconds) following these guidelines.
        </p>
        <hr />

        <ul className="list-group list-group-flush mb-4">
          <li className="list-group-item">
            <strong>1️⃣ Introduction:</strong> Start with your name, current role, and background.
          </li>
          <li className="list-group-item">
            <strong>2️⃣ Why this position?</strong> Explain why you’re interested in this job and company.
          </li>
          <li className="list-group-item">
            <strong>3️⃣ Relevant Experience:</strong> Highlight your most relevant skills or past projects.
          </li>
          <li className="list-group-item">
            <strong>4️⃣ Career Goals:</strong> Talk about your long-term professional goals.
          </li>
        </ul>

        <div className="alert alert-info text-center fw-semibold">
          💡 Tip: Record in a quiet, well-lit place using your phone or webcam.
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-secondary me-3 rounded-pill px-4"
            onClick={handleBack}
          >
            ← Go Back
          </button>
          <button
            className="btn btn-success rounded-pill px-4"
            onClick={handleGotIt}
          >
            Got It ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordingPage;
