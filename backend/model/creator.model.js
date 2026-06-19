import mongoose from 'mongoose';

const creatorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio:      { type: String },
  genre:    { type: String },  // e.g. music, comedy, motivation
  socialLinks: {
    youtube: { type: String },
    instagram: { type: String },
    twitter: { type: String }
  },
  profilePicture: { type: String },
}, { timestamps: true });

export default mongoose.model('Creator', creatorSchema);
