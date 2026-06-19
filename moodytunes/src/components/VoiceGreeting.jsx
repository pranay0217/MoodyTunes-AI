import React, { useEffect, useState } from 'react';
import { FaVolumeUp, FaFemale, FaMale, FaRobot } from 'react-icons/fa';

export const VoiceGreeting = () => {
  const [voices, setVoices] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const speak = (type) => {
    const utterance = new SpeechSynthesisUtterance(
      'Welcome to MoodyTunes AI! Your personalized mood-based entertainment.Can join as creator as well'
    );

    let selectedVoice;

    if (type === 'female') {
      selectedVoice =
        voices.find(
          (v) =>
            v.name.toLowerCase().includes('zira') ||
            v.name.toLowerCase().includes('samantha') ||
            v.name.toLowerCase().includes('female')
        ) || voices[0];
    } else if (type === 'male') {
      selectedVoice =
        voices.find(
          (v) =>
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('daniel') ||
            v.name.toLowerCase().includes('male')
        ) || voices[0];
    } else if (type === 'robot') {
      selectedVoice =
        voices.find(
          (v) => v.name.toLowerCase().includes('fred') || v.name.toLowerCase().includes('robot')
        ) || voices[0];
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      {/* Floating Speaker Button */}
      <div
        onClick={() => setShowOptions(!showOptions)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: 'linear-gradient(to right, #00d2ff, #8e2de2)',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          zIndex: 9999,
        }}
      >
        <FaVolumeUp color="white" size={28} />
      </div>

      {/* Voice Options */}
      {showOptions && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 9999,
          }}
        >
          <button
            onClick={() => speak('female')}
            style={buttonStyle}
          >
            <FaFemale style={{ marginRight: '8px' }} />
            Female
          </button>

          <button
            onClick={() => speak('male')}
            style={buttonStyle}
          >
            <FaMale style={{ marginRight: '8px' }} />
            Male
          </button>

          <button
            onClick={() => speak('robot')}
            style={buttonStyle}
          >
            <FaRobot style={{ marginRight: '8px' }} />
            Robot
          </button>
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  background: '#1f1f2f',
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  padding: '8px 14px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 2px 10px rgba(26, 23, 23, 0.5)',
  transition: 'transform 0.2s',
};

