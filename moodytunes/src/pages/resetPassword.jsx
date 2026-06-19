import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/reset-password`, {
        email,
        newPassword,
      });

      if (response.data.success) {
        alert('Password reset successful. Please log in.');
        navigate('/login');
      } else {
        alert(response.data.message || 'Reset failed');
      }
    } catch (error) {
      alert('Error resetting password');
      console.error('Reset error:', error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://media.giphy.com/media/3o6ZsYgD7G7vml4WsQ/giphy.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(20, 20, 30, 0.9)',
          padding: '40px',
          borderRadius: '15px',
          maxWidth: '400px',
          width: '100%',
          color: '#fff',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🔁 Reset Password</h2>
        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="📧 Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="🆕 New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>✅ Reset Password</button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  backgroundColor: '#f9f9f9',
  color: '#000',
};

const buttonStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: 'none',
  background: 'linear-gradient(to right, #00d2ff, #8e2de2)',
  color: '#fff',
  fontSize: '16px',
  cursor: 'pointer',
};
