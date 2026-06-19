import bcrypt from 'bcryptjs';
import Creator from '../model/creator.model.js';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import dotenv from 'dotenv';

dotenv.config();

const otpStore = new Map();

// Cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ========== Register Creator ==========

export const registerCreator = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      bio,
      genre,
      youtube,
      instagram,
      twitter,
    } = req.body;

    const existing = await Creator.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    let profilePictureUrl = '';
    if (req.file) {
      const bufferStream = Readable.from(req.file.buffer);

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'moodytunes/creators',
            public_id: username.toLowerCase().replace(/\s+/g, '_'), // e.g., john_doe
            overwrite: true, // Optional: overwrite if username already exists
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferStream.pipe(uploadStream);
      });

      profilePictureUrl = result.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCreator = new Creator({
      username,
      email,
      password: hashedPassword,
      bio,
      genre,
      socialLinks: { youtube, instagram, twitter },
      profilePicture: profilePictureUrl,
    });

    await newCreator.save();

    res.status(201).json({
      success: true,
      creator: {
        id: newCreator._id,
        username,
        email,
        socialLinks: newCreator.socialLinks,
        profilePicture: profilePictureUrl,
        bio,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Error registering creator' });
  }
};


// ========== OTP / Password Reset / Login - Same as before ==========
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const creator = await Creator.findOne({ email });
    if (!creator) return res.status(404).json({ success: false, message: 'Creator not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);
    setTimeout(() => otpStore.delete(email), 5 * 60 * 1000);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'MoodyTunes OTP for Password Reset',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore.get(email);

  if (!storedOtp || storedOtp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  otpStore.delete(email);
  res.json({ success: true, message: 'OTP verified' });
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const creator = await Creator.findOne({ email });
    if (!creator) return res.status(404).json({ success: false, message: 'Creator not found' });

    creator.password = await bcrypt.hash(newPassword, 10);
    await creator.save();

    res.json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to reset password' });
  }
};

export const loginCreator = async (req, res) => {
  const { email, password } = req.body;
  try {
    const creator = await Creator.findOne({ email });
    if (!creator) return res.status(404).json({ success: false, message: 'Creator not found' });

    const isMatch = await bcrypt.compare(password, creator.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid password' });

    res.json({
      success: true,
      creator: {
        id: creator._id,
        username: creator.username,
        email: creator.email,
        genre: creator.genre,
        bio: creator.bio,
        profilePicture: creator.profilePicture,
        socialLinks: creator.socialLinks,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
};
