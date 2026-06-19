import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('Username', response.data.user.username);
        localStorage.setItem('Email', response.data.user.email);
        alert('Login successful');
        navigate(`/dashboard/${response.data.user.username}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Login failed. Please check credentials.');
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/send-otp`, { email });
      if (response.data.success) {
        setIsOtpSent(true);
        alert('OTP sent to your email');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Error sending OTP');
      console.error('OTP error:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/verify-otp`, {
        email,
        otp,
      });
      if (response.data.success) {
        alert('OTP verified! Redirecting...');
        // Proceed to password reset page or dashboard
        navigate('/reset-password', { state: { email } });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('OTP verification failed');
      console.error('OTP verification error:', error);
    }
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
      {/* Header */}
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
        MoodyTunes AI
      </div>

      {/* Login / OTP Form */}
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
          {showOtpForm ? '🔐 Forgot Password' : '🔐 Login'}
        </h2>

        {!showOtpForm ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input
              type="email"
              placeholder="📧 Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="🔒 Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
             <p className="text-center mt-3 mb-2">
            Don't have an account?&nbsp;
            <a href="/signup" className="text-decoration-none">
               Sign Up
            </a>
          </p>
            <button type="submit" style={buttonStyle}>
              🔓 Login
            </button>
            <button
              type="button"
              onClick={() => setShowOtpForm(true)}
              style={{ ...buttonStyle, background: '#444' }}
            >
              Forgot Password?
            </button>
          </form>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="email"
              placeholder="📧 Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <button onClick={handleSendOtp} style={buttonStyle}>
              Send OTP
            </button>
            {isOtpSent && (
              <>
                <input
                  type="text"
                  placeholder="🔑 Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={inputStyle}
                />
                <button onClick={handleVerifyOtp} style={buttonStyle}>
                  Verify OTP
                </button>
              </>
            )}
            <button onClick={() => setShowOtpForm(false)} style={{ ...buttonStyle, background: '#888' }}>
              Back to Login
            </button>
          </div>
        )}

        <div style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>or</div>

        <button
          onClick={handleGoogleLogin}
          style={{
            backgroundColor: '#fff',
            color: '#000',
            fontSize: '16px',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            width: '100%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <FaGoogle style={{ width: '24px', height: '24px' }} />
          Login with Google
        </button>
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
