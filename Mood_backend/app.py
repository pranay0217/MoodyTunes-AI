from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from keras.models import model_from_json
import numpy as np
import cv2
import base64
from io import BytesIO
from PIL import Image
import uvicorn

# -------------------------
# Load Emotion Model
# -------------------------
with open("emotiondetector.json", "r") as json_file:
    model_json = json_file.read()

model = model_from_json(model_json)
model.load_weights("emotiondetector.h5")
print("✅ Model loaded successfully")

LABELS = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

# Haar Cascade for face detection
face_detector = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# -------------------------
# FastAPI Setup
# -------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Helper: Detect Emotions
# -------------------------
def detect_emotion_from_frame(frame):
    results = []

    # Flip horizontally (like webcam mirror)
    frame = cv2.flip(frame, 1)

    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_detector.detectMultiScale(
        gray_frame, scaleFactor=1.1, minNeighbors=3, minSize=(30, 30)
    )
    print(f"🔍 Detected {len(faces)} face(s)")

    for (x, y, w, h) in faces:
        roi_gray = gray_frame[y:y+h, x:x+w]
        roi_gray = cv2.resize(roi_gray, (48, 48))
        roi_gray = np.expand_dims(np.expand_dims(roi_gray, -1), 0) / 255.0

        prediction = model.predict(roi_gray)
        max_index = int(np.argmax(prediction))
        emotion_label = LABELS[max_index]
        confidence = float(np.max(prediction))

        # Draw rectangle and label on frame
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(frame, f"{emotion_label} ({confidence*100:.1f}%)", (x, y-10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
        print(f"{emotion_label} : {confidence}")
        results.append({
            "box": {"x": int(x), "y": int(y), "w": int(w), "h": int(h)},
            "emotion": emotion_label,
            "confidence": confidence
        })

    return results, frame

# -------------------------
# API Route
# -------------------------
@app.post("/detect_emotion")
async def detect_emotion(request: Request):
    try:
        print("\n📥 Incoming request...")
        data = await request.json()
        print(f"📦 Keys in request: {list(data.keys())}")

        if "image" not in data:
            return {"error": "No image field in request"}

        # Remove base64 header if present
        image_data = data["image"].split(",")[-1]
        img_bytes = base64.b64decode(image_data)
        img = np.array(Image.open(BytesIO(img_bytes)))
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

        print(f"🔄 Image shape: {img.shape}, dtype: {img.dtype}")

        # Detect emotions and draw on frame
        detected_faces, annotated_frame = detect_emotion_from_frame(img)
        print(f"📤 Returning {len(detected_faces)} face(s)")

        # Convert annotated frame back to base64 for frontend display
        _, buffer = cv2.imencode(".jpg", annotated_frame)
        encoded_frame = base64.b64encode(buffer).decode("utf-8")
        annotated_image = f"data:image/jpeg;base64,{encoded_frame}"

        return {
            "faces": detected_faces,
            "count": len(detected_faces),
            "annotated_image": annotated_image
        }

    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return {"error": str(e)}

# -------------------------
# Run server (for local dev)
# -------------------------
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)
