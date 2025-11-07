**Candidate Video Submission & Review Platform**

**Project Overview**
This project is a Candidate Video Submission & Review Platform, designed to streamline the process of collecting candidate information, resumes, and video introductions in one place. Candidates can fill out their profiles, upload resumes, and record a short introduction video directly in the browser. Recruiters or hiring managers can then review the candidate details and videos efficiently.

The platform is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and offers features like real-time candidate submission, video recording, and resume upload.

**Key Features**

**Candidate Registration Form**
Candidates provide personal and professional details:
First Name
Last Name
Position Applied
Current Position
Experience (in years)
Upload resume as a PDF file (maximum 5 MB)
Basic validation for required fields and file size/type.

**Video Recording**
Candidates can record a short introduction video (up to 90 seconds) directly in the browser.
Automatic camera and microphone access request.
Video preview before submission.
Browser-based recording without any external software.

**Data Storage in MongoDB**
Candidate details, resume, and video metadata are stored in MongoDB.
The Candidates collection contains all text fields along with filenames for resume and video files.
Resume and video files are stored in the uploads/ folder on the server.

**Review Candidate Page**
Recruiters can view candidate details including:
  **Personal info**
  **Position applied**
  **Experience**
  **Resume download link**
  **Embedded video player to watch introduction videos**
Provides a clean and organized view for candidate evaluation.

**Seamless Navigation**
After submitting the candidate form, the user is automatically redirected to the video recording page.
Once the video is submitted, the user is redirected to the review page.
Candidate ID is stored in localStorage as a fallback to maintain state across pages.

**Technology Stack**
Layer	        Technology
Frontend	    React.js, Bootstrap, HTML5, CSS3, JavaScript
Backend	      Node.js, Express.js
Database	    MongoDB, Mongoose
File Upload	  Multer (for resumes and videos)
Routing	      React Router DOM

**Folder Structure**

├── backend/
│   ├── models/
│   │   └── Candidate.js
│   ├── routes/
│   │   ├── candidateRoutes.js
│   │   └── videoRoutes.js
│   ├── uploads/           # Stored resume & video files
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CandidateProfile.jsx
│   │   │   ├── VideoRecording.jsx
│   │   │   ├── ReviewCandidate.jsx
│   │   │   └── RecordingPage.jsx
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
│
└── README.md

**Backend Details**
**Express Server (server.js)**
Node.js Express server runs at http://localhost:5000.
API Routes:
**POST /api/candidates → Save candidate details along with resume.
GET /api/candidates/:id → Fetch candidate details for review.
POST /api/videos/upload → Upload candidate video and associate with candidate ID.**

**Frontend Details**
**1. Candidate Profile Form (CandidateProfile.jsx)**
Form fields with validation:
Required fields: firstName, lastName, positionApplied, currentPosition, experience, resume.
Resume PDF file type and size validation (≤ 5MB).
Submits data to backend and receives candidateId.
Stores candidateId in localStorage for video recording and review pages.
Redirects user to /recordingPage with candidate ID.

**2. Video Recording Page (VideoRecording.jsx)**
Browser-based recording using MediaRecorder API.
Maximum recording time: 90 seconds.
Shows a live timer while recording.
Allows stopping and previewing the video.
Submits video along with candidateId to backend.
Redirects to /reviewCandidate/:id upon successful upload.

**3. Review Candidate Page (ReviewCandidate.jsx)**
Fetches candidate data from backend using candidateId in URL.
Displays all candidate details:
First Name, Last Name, Position, Current Job, Experience
Resume download link
Embedded video player
Handles errors like missing candidate or server issues.

**Running the Project
Backend Setup

Navigate to backend folder:
cd backend

Install dependencies:
npm install

Create uploads/ folder in backend root.
Start the server:
npm start**

**Frontend Setup
Navigate to frontend folder:
cd frontend

Install dependencies:
npm install

Start React app:
npm start
**

**API Endpoints
Candidate APIs**
Method	        Endpoint	            Description
POST	          /api/candidates	      Save candidate details + resume
GET	            /api/candidates/:id	  Fetch candidate details by ID

**Video APIs**
Method	        Endpoint	            Description
POST	          /api/videos/upload	  Upload candidate video

**Features in Detail**
**Resume Upload**
Uses Multer for file handling.
Only accepts PDF files.
Maximum file size: 5 MB.
Stores filename in MongoDB and actual file in uploads/ folder.

**Video Recording**
Uses MediaRecorder API for video capture.
Video format: webm.
Maximum 90 seconds duration.
Allows preview before submission.
Automatically sends candidateId along with video to backend.

**Candidate Review**
Fetches candidate details via /api/candidates/:id.
Builds absolute URLs for resume and video for frontend use.
Handles missing candidate or server errors gracefully.

**State Management**
Candidate ID is passed between pages using React Router state.
Fallback to localStorage ensures data persistence if page reload occurs.
Prevents “Candidate ID missing” errors.

**Notes and Recommendations**
Ensure backend server is running on http://localhost:5000.
Ensure uploads/ folder exists in backend root with proper write permissions.
Test on modern browsers for full MediaRecorder support (Chrome, Firefox, Edge).
Use correct candidate flow:
Fill Candidate Profile Form
Record and submit Video
Review candidate on Review Page
Keep resume and video file sizes within limits to prevent server errors.

**Conclusion**
This MERN-based Candidate Video Submission & Review Platform provides a seamless workflow for candidates and recruiters. Candidates can easily submit all required details and record their introduction videos in-browser. Recruiters can review submissions with resume downloads and video previews. The application demonstrates a full-stack solution integrating React frontend, Node.js backend, MongoDB storage, and file handling using Multer, while maintaining proper routing and state management.
