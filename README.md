# 🎵 MoodyTunes AI

MoodyTunes AI is an intelligent emotion-aware entertainment recommendation platform that detects a user's facial emotion in real time and recommends personalized music, movies, and YouTube content based on the detected mood.

The system combines Computer Vision, Deep Learning, and Web Technologies to create a seamless and interactive user experience. Using a webcam feed, the application analyzes facial expressions, predicts the user's emotional state, and dynamically curates relevant content recommendations.

---

## 🚀 Features

- 🎭 Real-time facial emotion detection using webcam input
- 🧠 Deep Learning-based emotion classification using TensorFlow
- 👁️ Face detection and image preprocessing using OpenCV
- 🎵 Personalized music recommendations based on detected mood
- 🎬 Movie recommendations tailored to emotional state
- 📺 Dynamic YouTube video recommendations using YouTube Data API v3
- ⚡ Low-latency inference pipeline for real-time user interaction
- 🌐 Full-stack web application with modern React frontend and Node.js backend

---

## 🏗️ System Architecture

```text
Webcam Feed
      │
      ▼
OpenCV Face Detection
      │
      ▼
TensorFlow Emotion Recognition Model
      │
      ▼
Predicted Emotion
(Happy, Sad, Angry, Neutral, Surprise, etc.)
      │
      ▼
Recommendation Engine
      │
 ┌────┼────┐
 ▼    ▼    ▼
Songs Movies YouTube Videos
```

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Machine Learning & Computer Vision
- TensorFlow
- OpenCV
- Scikit-Learn
- NumPy
- Pandas

### APIs
- YouTube Data API v3

---

## 🧠 Emotion Detection Pipeline

1. Capture live video stream from the user's webcam.
2. Detect faces using OpenCV.
3. Preprocess facial images for model inference.
4. Feed images into the trained TensorFlow CNN model.
5. Predict the user's emotion in real time.
6. Send the detected emotion to the recommendation engine.
7. Fetch and display relevant songs, movies, and YouTube videos.

---

## 📊 Supported Emotions

The model can recognize emotions such as:

- Happy 😊
- Sad 😔
- Angry 😠
- Neutral 😐
- Surprise 😲
- Fear 😨
- Disgust 🤢

---

## 🎯 Recommendation Engine

Based on the detected emotion, MoodyTunes AI generates personalized content recommendations:

| Emotion | Recommendations |
|----------|----------------|
| Happy | Upbeat songs, comedy movies, motivational videos |
| Sad | Relaxing music, uplifting content, feel-good movies |
| Angry | Calming playlists, meditation videos, inspirational content |
| Neutral | Trending songs, popular movies, recommended videos |
| Surprise | Adventure content, exciting music, engaging videos |

---

## 📂 Project Structure

```text
MoodyTunes-AI/
│
├── backend/
│   ├── controller/
│   ├── model/
│   ├── router/
│   └── index.js
│
├── Mood_backend/
│   ├── app.py
│   ├── emotiondetector.py
│   └── emotiondetector.json
│
├── moodytunes/
│   ├── public/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/MoodyTunes-AI.git
cd MoodyTunes-AI
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd moodytunes
npm install
npm run dev
```

### Python Emotion Detection Service

```bash
cd Mood_backend

pip install -r requirements.txt

python app.py
```

---

## 🔑 Environment Variables

Create a `.env` file and configure:

```env
YOUTUBE_API_KEY=your_youtube_api_key
MONGO_URI=your_database_url
PORT=5000
```

---

## 📈 Future Improvements

- Spotify API integration
- User authentication and personalized playlists
- Advanced recommendation system using collaborative filtering
- Mobile application support
- Multi-language emotion recognition
- Voice-based mood detection

---

## 💡 Learning Outcomes

This project demonstrates practical experience in:

- Computer Vision with OpenCV
- Deep Learning using TensorFlow
- Real-time ML inference pipelines
- API Integration
- Full-Stack Web Development
- Recommendation Systems
- Frontend-Backend Communication
