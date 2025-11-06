import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const CandidateProfile = () => {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    positionApplied: "",
    currentPosition: "",
    experience: "",
  });
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle file change
  const handleFileChange = (e) => setResume(e.target.files[0]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.positionApplied ||
      !formData.currentPosition ||
      !formData.experience ||
      !resume
    ) {
      setMessage("❌ Please fill all fields and upload your resume.");
      return;
    }

    if (resume.type !== "application/pdf") {
      setMessage("❌ Only PDF files are allowed.");
      return;
    }

    if (resume.size > 5 * 1024 * 1024) {
      setMessage("❌ Resume size must be ≤ 5 MB.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // Create FormData to send file + text fields
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      data.append("resume", resume);

      // Backend API call using fetch()
      const res = await fetch("http://localhost:5000/api/candidates", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("✅ Candidate details submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          positionApplied: "",
          currentPosition: "",
          experience: "",
        });
        setResume(null);

        setTimeout(() => {
          navigate("/recordingPage");
        }, 1000);

      } else {
        setMessage(`❌ ${result.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5">
      <div className="card shadow-lg p-4 rounded-4 w-100" style={{ maxWidth: "35rem" }}>
        <h3 className="text-center mb-3 text-primary fw-bold">
          💼 Candidate Information Form
        </h3>
        <p className="text-center text-muted mb-3">
          Let’s start your journey with us!
        </p>
        <hr />

        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">First Name *</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Last Name *</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>

          {/* Position Applied */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Position Applied For *</label>
            <select
              name="positionApplied"
              className="form-select"
              value={formData.positionApplied}
              onChange={handleChange}
            >
              <option value="">Select Position</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Software Engineer">Software Engineer</option>
            </select>
          </div>

          {/* Current Position */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Current Position *</label>
            <input
              type="text"
              name="currentPosition"
              className="form-control"
              value={formData.currentPosition}
              onChange={handleChange}
              placeholder="Your current job title"
            />
          </div>

          {/* Experience */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Experience (in Years) *</label>
            <input
              type="number"
              name="experience"
              className="form-control"
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g. 2"
            />
          </div>

          {/* Resume */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Upload Resume (PDF ≤ 5MB) *</label>
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary px-5 rounded-pill"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Next ➜"}
            </button>
          </div>
        </form>

        {/* Status Message */}
        {message && (
          <div
            className={`mt-4 text-center fw-semibold ${
              message.includes("✅") ? "text-success" : "text-danger"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
