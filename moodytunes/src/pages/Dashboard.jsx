import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { login_nav as LoginNav } from "../components/login_navbar";
import axios from "axios";

export const Dashboard = () => {
  const { username } = useParams();
  const [currentTab, setCurrentTab] = useState("movies");
  const [searchQuery, setSearchQuery] = useState("");
  const [effectiveQuery, setEffectiveQuery] = useState("");

  // Video & Music states
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [music, setMusic] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);

  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("India");
  const [mood, setMood] = useState("happy");

  // Favorites (combined videos + music)
  const [favorites, setFavorites] = useState([]);

  const YOUTUBE_API_KEY = "AIzaSyBK2xkjPwy-I8aC0uL-pIzZzK53YmKQODk";

  const playerRef = useRef(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }, []);

  // Fetch user favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/dash/profile/${encodeURIComponent(username)}`
        );
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };
    fetchFavorites();
  }, [username]);

  // Tab changes
  useEffect(() => {
    if (currentTab === "videos") setEffectiveQuery(mood);
    else if (currentTab === "music") setEffectiveQuery(`${mood} ${country} music`);
    else setEffectiveQuery("");

    setSelectedVideo(null);
    setSelectedMusic(null);
  }, [currentTab, mood, country]);

  // Fetch videos/music
  useEffect(() => {
    if (!effectiveQuery) return;
    if (currentTab === "videos") fetchVideos(effectiveQuery);
    else if (currentTab === "music") fetchMusic(effectiveQuery);
  }, [effectiveQuery]);

// Mapping emotions to videos and music
// Mapping emotions to videos (non-music)
const emotionToVideoMood = {
  angry: "calm relaxing videos",
  disgust: "soothing peaceful videos",
  fear: "comforting relaxing videos",
  happy: "fun energetic videos",
  neutral: "pleasant interesting videos",
  sad: "uplifting cheerful videos",
  surprise: "fun exciting videos"
};

// Mapping emotions to music
const emotionToMusicMood = {
  angry: "calm relaxing music",
  disgust: "soothing peaceful music",
  fear: "relaxing comforting music",
  happy: "happy energetic music",
  neutral: "pleasant background music",
  sad: "uplifting cheerful music",
  surprise: "fun upbeat music"
};

// Fetch non-music videos based on emotion
const fetchVideos = async (query) => {
  setLoading(true);
  try {
    const emotions = JSON.parse(localStorage.getItem("Emotion") || "[]");
    const emotion = emotions.length > 0 ? emotions[0] : "neutral";

    const moodQuery = `${query} ${emotionToVideoMood[emotion] || "interesting videos"}`;

    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 50,
        q: moodQuery,
        type: "video", // only videos
        key: YOUTUBE_API_KEY
      }
    });

    setVideos(response.data.items);
  } catch (error) {
    console.error("Error fetching videos:", error);
  } finally {
    setLoading(false);
  }
};

// Fetch music videos based on emotion
const fetchMusic = async (query) => {
  setLoading(true);
  try {
    const emotions = JSON.parse(localStorage.getItem("Emotion") || "[]");
    const emotion = emotions.length > 0 ? emotions[0] : "neutral";

    const moodQuery = `${query} ${emotionToMusicMood[emotion] || "pleasant music"}`;

    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 50,
        q: moodQuery,
        type: "video",
        videoCategoryId: "10", // Music category
        key: YOUTUBE_API_KEY
      }
    });

    setMusic(response.data.items);
  } catch (error) {
    console.error("Error fetching music:", error);
  } finally {
    setLoading(false);
  }
};

const saveHistory = async (item) => {
  try {
    await axios.post(`http://localhost:3001/dash/history/${encodeURIComponent(username)}`, {
      username,
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      tab: currentTab,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Error saving history:", err);
  }
};


  useEffect(() => {
    if (!selectedMusic) return;
    const videoId = selectedMusic.id.videoId;
    saveHistory(selectedMusic);

    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId);
      playerRef.current.playVideo();
      setIsPlaying(true);
    } else if (window.YT) {
      playerRef.current = new window.YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId,
        playerVars: { autoplay: 1 },
        events: {
          onReady: () => {
            setAudioDuration(playerRef.current.getDuration());
            playerRef.current.playVideo();
            setIsPlaying(true);
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            else setIsPlaying(false);
          },
        },
      });
    }
  }, [selectedMusic]);

  useEffect(() => {
    let interval;
    if (selectedMusic && playerRef.current) {
      interval = setInterval(() => setAudioProgress(playerRef.current.getCurrentTime()), 500);
    }
    return () => clearInterval(interval);
  }, [selectedMusic]);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (playerRef.current) {
      playerRef.current.seekTo(time, true);
      setAudioProgress(time);
    }
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    if (state === window.YT.PlayerState.PLAYING) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
    setIsPlaying(!isPlaying);
  };

  // ✅ Save all favorites at once
  const saveAllFavorites = async () => {
    try {
      await axios.post(
        `http://localhost:3001/dash/favorite/${encodeURIComponent(username)}`,
        { favorites }
      );
      alert("faviorites Saved!!");
      console.log("All favorites saved!");
    } catch (err) {
      console.error("Error saving favorites:", err);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) setEffectiveQuery(searchQuery.trim());
  };

  const renderGrid = (items, onSelect, showFavorite = true) => (
    <div style={gridStyle}>
      {items.map((item) => {
        const isFav = favorites.some((f) => f.videoId === item.id.videoId);
        return (
          <div key={item.id.videoId} style={videoCardStyle}>
            <div
              style={thumbnailWrapper}
              onClick={() => {
                onSelect(item);
                saveHistory(item);
              }}
            >
              <img
                src={item.snippet.thumbnails.high.url}
                alt={item.snippet.title}
                style={thumbnailStyle}
              />
              <div style={hoverOverlay}>▶ Play</div>
            </div>
            <p style={videoTitle}>{item.snippet.title}</p>
            {showFavorite && (
              <button
                style={favoriteBtn}
                onClick={() => {
                  if (!isFav) setFavorites([...favorites, {
                    videoId: item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.high.url
                  }]);
                  else setFavorites(favorites.filter(f => f.videoId !== item.id.videoId));
                }}
              >
                {isFav ? "★ Favorited" : "☆ Mark Favorite"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderSelectedVideo = () => (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setSelectedVideo(null)} style={backButton}>← Back</button>
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
        title={selectedVideo.snippet.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: "12px" }}
      />
      <h3 style={{ color: "#fff" }}>{selectedVideo.snippet.title}</h3>
      <p style={{ color: "#ccc" }}>{selectedVideo.snippet.description}</p>
    </div>
  );

  const renderMusicPlayer = () => (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => setSelectedMusic(null)} style={backButton}>← Back</button>
      <h3 style={{ color: "#fff", marginTop: "15px", fontSize: "1.5rem" }}>
        {selectedMusic.snippet.title}
      </h3>
      <div id="yt-player"></div>
      <button
        onClick={togglePlayPause}
        style={{ ...favoriteBtn, marginTop: "10px", backgroundColor: isPlaying ? "#ff416c" : "#00d2ff" }}
      >
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
      <input
        type="range"
        min="0"
        max={audioDuration}
        value={audioProgress}
        onChange={handleSeek}
        style={{ width: "100%", marginTop: "10px" }}
      />
    </div>
  );

  const renderContent = () => {
    switch (currentTab) {
      case "movies": return <div style={placeholderTab}>🎬 Movie content coming soon...</div>;
      case "videos": return loading ? <p style={loadingStyle}>Loading videos...</p> : selectedVideo ? renderSelectedVideo() : renderGrid(videos, setSelectedVideo);
      case "music": return loading ? <p style={loadingStyle}>Loading music...</p> : selectedMusic ? renderMusicPlayer() : renderGrid(music, setSelectedMusic);
      default: return null;
    }
  };

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <LoginNav username={username} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <form onSubmit={handleSearchSubmit} style={{ padding: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={searchQuery}
          placeholder={`Search ${currentTab}...`}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "none" }}
        />
        <button type="submit" style={{ padding: "10px 20px", borderRadius: "6px", border: "none", background: "#ff416c", color: "#fff" }}>Search</button>
      </form>
      <button onClick={saveAllFavorites} style={{ ...favoriteBtn, backgroundColor: "#28a745", margin: "10px 20px" }}>
        💾 Save All Favorites
      </button>
      {renderContent()}
    </div>
  );
};

// ---------- Styles ----------
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" };
const videoCardStyle = { cursor: "pointer", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.4)", backgroundColor: "#1e1e1e", position: "relative", transition: "transform 0.2s, box-shadow 0.2s" };
const thumbnailWrapper = { position: "relative", width: "100%", height: "0", paddingBottom: "56.25%", overflow: "hidden" };
const thumbnailStyle = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" };
const hoverOverlay = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", color: "#fff", fontWeight: "bold", fontSize: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" };
const videoTitle = { color: "#fff", marginTop: "8px", fontSize: "0.95rem", fontWeight: "500" };
const backButton = { marginBottom: "20px", padding: "10px 15px", borderRadius: "6px", border: "none", cursor: "pointer", background: "linear-gradient(to right, #ff7e5f, #feb47b)", color: "#fff", fontWeight: "bold" };
const placeholderTab = { padding: "50px", textAlign: "center", fontSize: "1.2rem", color: "#ccc" };
const loadingStyle = { padding: "20px", color: "#fff", textAlign: "center" };
const favoriteBtn = { marginTop: "6px", padding: "6px 10px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "#444", color: "#fff", fontWeight: "bold" };
