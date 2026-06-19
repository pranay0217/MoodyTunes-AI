import express from 'express';
import User from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'

const otpStore = new Map(); // Temporary in-memory OTP store

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_EMAIL,      // your email (set in .env)
    pass: process.env.OTP_PASSWORD    // your app password
  }
});

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({success: false, message: "user not found"});
        }
        return res.status(200).json({success: true, message: 'user found', user: {username: user.username, email: user.email}});
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const signupUser = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({success: false, message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({success: true, message: 'User created successfully', user: {username: newUser.username, email: newUser.email}});
    } catch (error) {
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);

    await transporter.sendMail({
      from: `"MoodyTunes AI" <${process.env.OTP_EMAIL}>`,
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`
    });

    setTimeout(() => otpStore.delete(email), 5 * 60 * 1000); // Auto-expire OTP in 5 min

    return res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

export const verifyOTP = async(req, res) =>{
    const { email, otp } = req.body;
    const storedOtp = otpStore.get(email);

    if (storedOtp && storedOtp === otp) {
        return res.status(200).json({ success: true, message: 'OTP verified' });
    } else {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }
}

export const resetPassword = async(req,res) =>{
    const { email, newPassword} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        return res.status(200).json({ success: true, message: 'Password reset successfully' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to reset password, Try again Later !' });
        }
}