import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoRecording = () => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [permission, setPermission] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [error, setError] = useState("");

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Ask for camera permission
  const getCameraAccess = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(userStream);
      setPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }
    } catch (error) {
      alert("⚠️ Please allow camera and microphone access!");
      console.error(error);
    }
  };

  // ✅ Start recording
  const startRecording = () => {
    if (!stream) {
      alert("⚠️ Please start camera first!");
      return;
    }

    setError("");
    chunks.current = [];
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
    };

    mediaRecorder.start();
    setRecording(true);
    setTimeLeft(90);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          stopRecording();
          setError("⏰ Recording limit exceeded! (Max 90 seconds)");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ✅ Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // ✅ Navigate to ReviewCandidate page
  const handleSubmit = async () => {
  if (!videoURL && chunks.current.length === 0) {
    alert("⚠️ Please record your video first!");
    return;
  }

  // Convert chunks into blob
  const blob = new Blob(chunks.current, { type: "video/webm" });

  // Prepare FormData
  const formData = new FormData();
  formData.append("video", blob, "candidate-video.webm");

  try {
    const response = await fetch("http://localhost:5000/api/videos/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      alert("✅ Video uploaded successfully!");
      navigate("/reviewCandidate");
    } else {
      alert(`❌ Upload failed: ${data.message}`);
    }
  } catch (error) {
    console.error("Error uploading video:", error);
    alert("❌ Something went wrong while uploading!");
  }
};

  // ✅ Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stream]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h2 className="text-primary mb-3">🎥 Candidate Video Recording</h2>
      <p className="text-muted text-center mb-4">
        Please record your short introduction video (Max: 90 seconds)
      </p>

      {/* Video Preview */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="border border-secondary rounded shadow"
        width="480"
        height="360"
      ></video>

      {/* Timer Display */}
      {recording && (
        <h5 className="mt-3 text-danger fw-bold">
          ⏱ Time Left: {timeLeft}s
        </h5>
      )}

      {/* Buttons */}
      <div className="mt-4">
        {!permission && (
          <button className="btn btn-success mx-2" onClick={getCameraAccess}>
            🎬 Start Camera
          </button>
        )}

        {permission && !recording && (
          <button className="btn btn-primary mx-2" onClick={startRecording}>
            🔴 Start Recording
          </button>
        )}

        {recording && (
          <button className="btn btn-danger mx-2" onClick={stopRecording}>
            ⏹ Stop Recording
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-danger mt-3 fw-semibold">{error}</p>}

      {/* Submit Button (after recording) */}
      {videoURL && !recording && (
        <button
          className="btn btn-success mt-4 px-5 rounded-pill"
          onClick={handleSubmit}
        >
          ✅ Submit
        </button>
      )}
    </div>
  );
};

export default VideoRecording;
