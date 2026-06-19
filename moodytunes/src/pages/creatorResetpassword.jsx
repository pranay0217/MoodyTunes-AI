import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const CreatorResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = async () => {
    if (!email) return alert('No email provided. Please go through OTP flow.');

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/creator/reset-password`, {
        email,
        newPassword,
      });

      if (res.data.success) {
        alert('Password reset successful');
        navigate('/creator/login');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error('Reset error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-800 to-purple-900 text-white">
      <div className="bg-gray-900 p-10 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">🔐 Reset Password</h2>
        <p className="text-sm mb-4 text-center">Resetting password for: <b>{email}</b></p>

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded text-black"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 p-2 rounded text-black"
        />

        <button
          onClick={handleReset}
          className="bg-blue-600 w-full py-2 rounded hover:bg-blue-700 transition"
        >
          ✅ Reset Password
        </button>
      </div>
    </div>
  );
};
