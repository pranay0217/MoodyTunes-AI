import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreatorLogin = () => {
  const [mode, setMode] = useState('login'); // login | forgot | verify
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/creator/login`, { email, password });
      if (res.data.success) {
        alert('Login successful');
        navigate(`/studio/${response.data.creator.username}`);
        localStorage.setItem("CreatorID", res.data.creator.id);
        localStorage.setItem("Social Links", res.data.creator.socialLinks);
        localStorage.setItem("Channel Name", res.data.creator.username);
        localStorage.setItem("Profile Picture", res.data.creator.profilePicture);
        localStorage.setItem("Bio", res.data.creator.bio)
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  const sendOtp = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/creator/send-otp`, { email });
      if (res.data.success) {
        alert('OTP sent to your email');
        setMode('verify');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('Error sending OTP');
      console.error(err);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/creator/verify-otp`, { email, otp });
      if (res.data.success) {
        alert('OTP verified! Redirecting to reset page...');
        navigate('/creator/reset-password', { state: { email } });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert('OTP verification failed');
      console.error(err);
    }
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

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: 'url(https://media.giphy.com/media/3o6ZsYgD7G7vml4WsQ/giphy.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          textAlign: 'center',
          padding: '30px 0',
          fontFamily: "'Pacifico', cursive",
          fontSize: '2.5rem',
          color: 'gold',
          zIndex: 1,
        }}
      >
        MoodyTunes AI Creator
      </div>

      <div
        style={{
          zIndex: 2,
          backgroundColor: 'rgba(20, 20, 30, 0.85)',
          padding: '40px',
          borderRadius: '15px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
          color: '#fff',
          fontFamily: 'Poppins, sans-serif',
          marginTop: '120px',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>
          {mode === 'login'
            ? '🔐 Creator Login'
            : mode === 'forgot'
            ? '📧 Forgot Password'
            : '🔑 Verify OTP'}
        </h2>

        {mode === 'login' && (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              type="email"
              placeholder="📧 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="🔒 Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              🔓 Login
            </button>
            <button
              type="button"
              onClick={() => setMode('forgot')}
              style={{ ...buttonStyle, background: '#444' }}
            >
              Forgot Password?
            </button>
          </form>
        )}

        {mode === 'forgot' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              type="email"
              placeholder="📧 Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <button onClick={sendOtp} style={buttonStyle}>
              📤 Send OTP
            </button>
            <button onClick={() => setMode('login')} style={{ ...buttonStyle, background: '#888' }}>
              🔙 Back to Login
            </button>
          </div>
        )}

        {mode === 'verify' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              type="text"
              placeholder="🔑 Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={inputStyle}
              required
            />
            <button onClick={verifyOtp} style={buttonStyle}>
              ✅ Verify OTP
            </button>
            <button onClick={() => setMode('login')} style={{ ...buttonStyle, background: '#888' }}>
              🔙 Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
