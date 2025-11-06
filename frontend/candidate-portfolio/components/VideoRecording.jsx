import React, { useEffect, useRef, useState } from "react";

const VideoRecording = () => {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [permission, setPermission] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  // ✅ Ask for camera & microphone permission
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

  // ✅ Start recording video
  const startRecording = () => {
    if (!stream) {
      alert("⚠️ Please start camera first!");
      return;
    }

    chunks.current = [];
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      const videoURL = URL.createObjectURL(blob);
      setVideoURL(videoURL);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  // ✅ Stop recording video
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // ✅ Stop stream on unmount (cleanup)
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <h2 className="text-primary mb-3">🎥 Candidate Video Recording</h2>
      <p className="text-muted text-center mb-4">
        Please record your short introduction video using the camera below.
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

      {/* Video Preview after Recording */}
      {videoURL && (
        <div className="mt-4 text-center">
          <h5 className="text-success mb-3">✅ Recording Completed!</h5>
          <video
            src={videoURL}
            controls
            width="480"
            height="360"
            className="border rounded"
          ></video>
          <div className="mt-3">
            <a
              href={videoURL}
              download="candidate-recording.webm"
              className="btn btn-outline-success"
            >
              ⬇️ Download Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRecording;
