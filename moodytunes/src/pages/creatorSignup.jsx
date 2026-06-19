import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const CreatorSignup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    bio: '',
    genre: '',
    socialLinks: { youtube: '', instagram: '', twitter: '' },
    profilePicture: null
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['youtube', 'instagram', 'twitter'].includes(name)) {
      setForm(prev => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setForm(prev => ({ ...prev, profilePicture: e.target.files[0] }));
    setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('username', form.username);
      data.append('email', form.email);
      data.append('password', form.password);
      data.append('bio', form.bio);
      data.append('genre', form.genre);
      data.append('youtube', form.socialLinks.youtube);
      data.append('instagram', form.socialLinks.instagram);
      data.append('twitter', form.socialLinks.twitter);
      if (form.profilePicture) data.append('profilePicture', form.profilePicture);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/creator/signup`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      if (res.data.success) {
        alert('Creator signup successful!');
        localStorage.setItem('CreatorID', res.data.creator.id);
        localStorage.setItem('SocialLinks', JSON.stringify(res.data.creator.socialLinks));
        localStorage.setItem('ChannelName', res.data.creator.username);
        localStorage.setItem('ProfilePicture', res.data.creator.profilePicture);
        localStorage.setItem('Bio', res.data.creator.bio);
        navigate(`/studio/${response.data.creator.username}`);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Signup error. Please try again.');
    }
  };

  return (
    <div style={pageStyle}>
      <Header title="Creator Signup" subtitle="🚀 Join as a creator" />
      <form onSubmit={handleSubmit} style={formStyle} encType="multipart/form-data">
        <input type="text" name="username" placeholder="👤 Username" required value={form.username} onChange={handleChange} style={inputStyle} />
        <input type="email" name="email" placeholder="📧 Email" required value={form.email} onChange={handleChange} style={inputStyle} />
        <input type="password" name="password" placeholder="🔒 Password" required value={form.password} onChange={handleChange} style={inputStyle} />
        <textarea name="bio" placeholder="📝 Short Bio" required value={form.bio} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'none' }} />
        <input type="text" name="genre" placeholder="🎵 Genre (e.g. Music, Comedy)" required value={form.genre} onChange={handleChange} style={inputStyle} />

        {/* Social Links */}
        <input type="url" name="youtube" placeholder="🔗 YouTube Link" value={form.socialLinks.youtube} onChange={handleChange} style={inputStyle} />
        <input type="url" name="instagram" placeholder="📸 Instagram Link" value={form.socialLinks.instagram} onChange={handleChange} style={inputStyle} />
        <input type="url" name="twitter" placeholder="🐦 Twitter Link" value={form.socialLinks.twitter} onChange={handleChange} style={inputStyle} />

        {/* Profile Picture Upload */}
        <label
          htmlFor="profilePicture"
          style={{
            display: 'inline-block',
            padding: '12px 20px',
            borderRadius: '8px',
            backgroundColor: '#444',
            color: '#fff',
            cursor: 'pointer',
            textAlign: 'center',
            fontSize: '16px',
          }}
        >
          {form.profilePicture ? form.profilePicture.name : 'Profile Picture'}
        </label>
        <input
          id="profilePicture"
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {form.profilePicture && (
          <div style={{ marginTop: '10px', width: '100%', height: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
            <div style={{
              width: `${uploadProgress}%`,
              height: '100%',
              backgroundColor: '#00d2ff',
              borderRadius: '5px',
              transition: 'width 0.2s'
            }} />
            <p style={{ color: '#fff', textAlign: 'center', margin: '5px 0 0' }}>{uploadProgress}%</p>
          </div>
        )}

        <button type="submit" style={submitStyle}>✨ Sign Up</button>
      </form>
      <p style={linkLine}>
        Already have an account? <Link to="/creator/login" style={linkStyle}>Log in</Link>
      </p>
    </div>
  );
};

const Header = ({ title, subtitle }) => (
  <div style={{ textAlign: 'center', color: 'gold', fontFamily: "'Pacifico', cursive", marginBottom: '20px' }}>
    <h1>{title}</h1>
    <p style={{ color: '#fff' }}>{subtitle}</p>
  </div>
);

// Styles
export const pageStyle = {
  minHeight: '100vh',
  background: 'url(https://media.giphy.com/media/3o6ZsYgD7G7vml4WsQ/giphy.gif) center/cover',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '20px'
};

export const formStyle = {
  background: 'rgba(20,20,30,0.85)',
  padding: '30px',
  borderRadius: '12px',
  maxWidth: '450px',
  width: '100%',
  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

export const inputStyle = {
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  background: '#f9f9f9',
  color: '#000'
};

export const submitStyle = {
  padding: '12px',
  border: 'none',
  borderRadius: '8px',
  background: 'linear-gradient(to right, #00d2ff, #8e2de2)',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '16px'
};

export const linkLine = { marginTop: '15px', color: '#e0e0e0' };
export const linkStyle = { color: '#00d2ff', textDecoration: 'none' };
