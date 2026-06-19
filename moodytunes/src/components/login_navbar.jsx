import { Navbar, Nav, Container, ButtonGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaSmile, FaMicrophone, FaVideo } from "react-icons/fa";

export const login_nav = ({ username = "Creator123", currentTab, setCurrentTab }) => {
  const navigate = useNavigate();
  const firstLetter = username.charAt(0).toUpperCase();

  // ----- Mood Detection States -----
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [stream, setStream] = useState(null);
  const [webcamOn, setWebcamOn] = useState(false);
  const [microphoneOn, setMicrophoneOn] = useState(false);
  const [detectedEmotions, setDetectedEmotions] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Backend URL from .env (⚠️ make sure to use VITE_API_URL in vite projects)
  const API_URL = import.meta.env.VITE_APP_URL;

  // ----- Open Mood Dialog -----
  const openMoodDialog = async () => {
    setShowMoodDialog(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setPermissionsGranted(true);
      setWebcamOn(true);
      setMicrophoneOn(true);
    } catch (err) {
      console.error("Permission denied or error:", err);
      setPermissionsGranted(false);
      setWebcamOn(false);
      setMicrophoneOn(false);
    }
  };

  // ----- Toggle Webcam -----
  const toggleWebcam = () => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setWebcamOn(videoTrack.enabled);
    }
  };

  // ----- Toggle Microphone -----
  const toggleMicrophone = () => {
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicrophoneOn(audioTrack.enabled);
    }
  };

  // ----- Close Mood Dialog -----
  const closeMoodDialog = () => {
    setShowMoodDialog(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setStream(null);
    setWebcamOn(false);
    setMicrophoneOn(false);
    setDetectedEmotions([]);
  };

  // ----- Cleanup on Unmount -----
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  // ----- Capture and Send Frame -----
  const detectMood = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frameData = canvas.toDataURL("image/jpeg");

    try {
      const response = await fetch(`${API_URL}/detect_emotion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: frameData }),
      });

      const result = await response.json();
      if (result.faces) {
        result.faces.forEach((face, index) => {
          alert(`Face ${index + 1}: ${face.emotion} (${(face.confidence * 100).toFixed(1)}%)`);
        });    
        localStorage.setItem("Emotion", JSON.stringify(result.faces.map(face => face.emotion)));
        console.log(result.faces)
        setDetectedEmotions(result.faces);
      } else {
        setDetectedEmotions([]);
      }
    } catch (err) {
      console.error("Error detecting mood:", err);
    }
  };

  // ----- Draw boxes when emotions update -----
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detectedEmotions.forEach((face) => {
      const { x, y, w, h } = face.box;
      ctx.strokeStyle = "lime";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);

      ctx.fillStyle = "lime";
      ctx.font = "16px Arial";
      ctx.fillText(
        `${face.emotion} (${(face.confidence * 100).toFixed(1)}%)`,
        x,
        y - 5
      );
    });
  }, [detectedEmotions]);

  return (
    <>
      {/* Navbar */}
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        style={{ position: "sticky", marginTop: "5px", zIndex: 1000 }}
      >
        <Container fluid>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{
              fontFamily: "cursive",
              fontWeight: "bold",
              fontSize: "28px",
              color: "gold",
              cursor: "pointer",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            MoodyTunes
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
          >
            <Nav className="mx-auto my-2 my-md-0">
              <ButtonGroup size="md">
                <Button
                  variant={
                    currentTab === "movies" ? "warning" : "outline-warning"
                  }
                  onClick={() => setCurrentTab("movies")}
                >
                  Movies
                </Button>
                <Button
                  variant={
                    currentTab === "music" ? "warning" : "outline-warning"
                  }
                  onClick={() => setCurrentTab("music")}
                >
                  Music
                </Button>
                <Button
                  variant={
                    currentTab === "videos" ? "warning" : "outline-warning"
                  }
                  onClick={() => setCurrentTab("videos")}
                >
                  Videos
                </Button>
              </ButtonGroup>
            </Nav>

            <Nav className="ms-auto d-flex align-items-center">
              <div
                onClick={() => navigate("/profile")}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  backgroundColor: "#ffc107",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                title={`Logged in as ${username}`}
              >
                {firstLetter}
              </div>
              <Navbar.Text
                className="text-light me-3"
                onClick={() => navigate("/profile")}
                style={{ cursor: "pointer" }}
              >
                {username}
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Floating Mood Button */}
      <div
        onClick={openMoodDialog}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          zIndex: 9999,
        }}
      >
        <FaSmile color="white" size={28} />
      </div>

      {/* Mood Detection Dialog */}
      {showMoodDialog && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "340px",
            background: "#1f1f2f",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
            zIndex: 9999,
            color: "#fff",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Detect Your Mood</h3>

          {!permissionsGranted && (
            <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
              Please allow access to your webcam and microphone.
            </p>
          )}

          {/* Video + Canvas Overlay */}
          <div style={{ position: "relative", width: "100%", height: "180px" }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{
                width: "100%",
                height: "180px",
                borderRadius: "10px",
                background: "#000",
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "180px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            <Button
              onClick={detectMood}
              style={{
                padding: "8px 12px",
                background: "#00d2ff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaMicrophone style={{ marginRight: "6px" }} />
              Detect Mood
            </Button>

            <Button
              onClick={toggleWebcam}
              style={{
                padding: "8px 12px",
                background: webcamOn ? "#ff416c" : "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
              }}
            >
              <FaVideo style={{ marginRight: "6px" }} />
              {webcamOn ? "Webcam Off" : "Webcam On"}
            </Button>

            <Button
              onClick={toggleMicrophone}
              style={{
                padding: "8px 12px",
                background: microphoneOn ? "#4caf50" : "#6c757d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
              }}
            >
              <FaMicrophone style={{ marginRight: "6px" }} />
              {microphoneOn ? "Mic On" : "Mic Off"}
            </Button>

            <Button
              onClick={closeMoodDialog}
              style={{
                padding: "8px 12px",
                background: "#343a40",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
