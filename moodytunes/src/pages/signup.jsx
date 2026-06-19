import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username.trim() || !email.trim() || !password) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      if (response.data.success) {
        // Save user info from backend response
        const { user } = response.data;
        localStorage.setItem('Username', user.username);
        localStorage.setItem('Email', user.email);

        alert('Signup successful!');
        navigate(`/dashboard/${user.username}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Error signing up. Please try again.';
      alert(msg);
      console.error('Signup error:', error);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
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

      {/* Signup Form */}
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
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>🚀 Sign Up</h2>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input
            type="text"
            placeholder="🧑 Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
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
            placeholder="🔒 Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <p className="text-center mt-3 mb-2">
            Already have an account? <Link to="/login" className="text-decoration-none text-warning">Log in</Link>
          </p>

          <button type="submit" style={buttonStyle}>✨ Sign Up</button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0', fontWeight: 'bold' }}>or</div>

        <button onClick={handleGoogleSignup} style={googleButtonStyle}>
          <FaGoogle style={{ width: '24px', height: '24px' }} />
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

// Common styles
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

const googleButtonStyle = {
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
};
