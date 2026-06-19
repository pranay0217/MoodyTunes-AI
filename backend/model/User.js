import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: String,
  thumbnail: String,
  addedAt: { type: Date, default: Date.now }
});

const historySchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: String,
  thumbnail: String,
  watchedAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  favorites: [favoriteSchema],
  history: [historySchema]
});

export default mongoose.model("UserData", userSchema);
