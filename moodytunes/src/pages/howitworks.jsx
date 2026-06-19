import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { FaCamera, FaBrain, FaHeadphones, FaSmile, FaMagic, FaLock, FaCloudUploadAlt } from 'react-icons/fa';
import { Navbar1 } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const HowItWorks = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [faqActive, setFaqActive] = useState(null);

  const handleAccordionToggle = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <>
      <div style={{
        background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        color: '#fff',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <Navbar1 />

        <Container className="px-3 px-md-0 py-5">
          {/* Header */}
          <Row className="text-center mb-4">
            <Col>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}>How MoodyTunes AI Works</h2>
              <p style={{ fontSize: '16px', color: '#d0d0d0' }}>
                Experience a revolutionary way to enjoy music, movies, and shows based on how you feel. 
                MoodyTunes AI reads your mood and curates the perfect entertainment.
              </p>
            </Col>
          </Row>

          {/* Core Steps */}
          <Row className="mt-4 text-center">
            {[
              {
                id: 1,
                icon: <FaCamera size={50} style={{ color: '#00d2ff' }} />,
                title: '📷 Capture Mood',
                desc: 'Allow access to your webcam for real-time emotion detection.',
                detail: 'Using advanced models, we detect expressions like happiness, sadness, anger, and calmness.'
              },
              {
                id: 2,
                icon: <FaBrain size={50} style={{ color: '#00d2ff' }} />,
                title: '🧠 AI Mood Analysis',
                desc: 'Our neural network processes your emotions and categorizes your mood instantly.',
                detail: 'MoodyTunes uses CNN-based AI to map facial cues to moods like Chill, Happy, Energetic, or Calm.'
              },
              {
                id: 3,
                icon: <FaMagic size={50} style={{ color: '#00d2ff' }} />,
                title: '🎶 Curated Playlist',
                desc: 'Fetches mood-matching songs, videos, and shows for your current state.',
                detail: 'We pull from YouTube, Spotify, Netflix, and creator uploads tailored to your mood.'
              },
              {
                id: 4,
                icon: <FaHeadphones size={50} style={{ color: '#00d2ff' }} />,
                title: '▶️ Play Instantly',
                desc: 'Stream content directly within the app — no app-switching needed.',
                detail: 'Watch mood-aligned music, podcasts, or videos without leaving MoodyTunes.'
              },
            ].map(({ id, icon, title, desc, detail }) => (
              <Col xs={12} md={6} lg={3} key={id} className="mb-4">
                <Card className="shadow-lg border-0 h-100" style={{
                  background: 'rgba(20,20,30,0.85)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(5px)'
                }}>
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    {icon}
                    <Card.Title className="mt-3" style={{ color: 'gold' }}>{title}</Card.Title>
                    <Card.Text style={{ color: '#d0d0d0' }}>{desc}</Card.Text>
                    <Button
                      variant="outline-light"
                      className="mt-auto w-100"
                      style={{ borderColor: '#00d2ff', color: '#00d2ff' }}
                      onClick={() => handleAccordionToggle(id)}
                    >
                      Learn More
                    </Button>
                    <Accordion activeKey={activeAccordion === id ? `${id}` : null} className="mt-2 w-100">
                      <Accordion.Item eventKey={`${id}`}>
                        <Accordion.Header>Details</Accordion.Header>
                        <Accordion.Body style={{ backgroundColor: '#14141e', color: '#d0d0d0' }}>
                          {detail}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Key Features */}
          <Row className="mt-5 text-center">
            <Col>
              <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>✨ Key Features</h3>
              <p style={{ color: '#d0d0d0' }}>
                MoodyTunes AI is more than just mood detection. Here's what makes it shine:
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            {[
              {
                icon: <FaSmile size={50} style={{ color: '#00d2ff' }} />,
                title: '🎯 Accurate Detection',
                desc: 'Millions of expressions trained for precision.',
              },
              {
                icon: <FaBrain size={50} style={{ color: '#00d2ff' }} />,
                title: '🤖 Smart Recommendations',
                desc: 'Content gets more tailored over time with usage.',
              },
              {
                icon: <FaLock size={50} style={{ color: '#00d2ff' }} />,
                title: '🔒 Privacy First',
                desc: 'All data processed securely with no storage.',
              },
            ].map((f, i) => (
              <Col xs={12} md={4} key={i} className="mb-4">
                <Card className="shadow-lg border-0 h-100" style={{
                  background: 'rgba(30,30,45,0.9)',
                  borderRadius: '15px',
                  backdropFilter: 'blur(6px)'
                }}>
                  <Card.Body className="text-center">
                    {f.icon}
                    <Card.Title className="mt-3" style={{ color: 'yellow' }}>{f.title}</Card.Title>
                    <Card.Text style={{ color: '#d0d0d0' }}>{f.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Creator Section */}
          <Row className="mt-5 align-items-center">
            <Col md={6}>
              <Card className="shadow-lg border-0" style={{
                background: 'rgba(20,20,30,0.85)',
                borderRadius: '15px',
                backdropFilter: 'blur(5px)'
              }}>
                <Card.Body className="text-center">
                  <FaCloudUploadAlt size={60} style={{ color: '#8e2de2' }} />
                  <h3 className="mt-3" style={{ color: '#d0d0d0' }}>📤 Creator Platform</h3>
                  <p style={{ color: '#d0d0d0' }}>
                    Upload mood-tagged videos: music, motivational clips, calm ambience — connect your content to users feeling a matching emotion.
                  </p>
                  <Button size="lg" style={{
                    background: 'linear-gradient(to right, #8e2de2, #00d2ff)',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '10px 30px',
                    marginTop: '15px',
                  }} href="/upload">
                    Become a Creator
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <img
                src="https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif"
                alt="Creator Upload"
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px', marginLeft: '50px' }}
              />
            </Col>
          </Row>

          {/* FAQs */}
          <Row className="mt-5">
            <Col>
              <h3 className="text-center mb-4">📚 FAQs</h3>
              <Accordion activeKey={faqActive} onSelect={(e) => setFaqActive(faqActive === e ? null : e)}>
                {[
                  {
                    id: 1,
                    q: 'Can I become a creator?',
                    a: '✅ Yes! Any registered user can become a creator. Simply sign up or log in, then visit the 📤 Upload section to start contributing videos, audio, or visual content tagged by mood (like 😊 happy, 😌 calm, ⚡ energetic, etc.).',
                  },
                  {
                    id: 2,
                    q: 'How is my upload recommended?',
                    a: '🎯 Your uploaded content is tagged with mood labels (e.g., 😢 sad, 💪 motivated, 🌌 peaceful). When a user’s mood is detected, the AI matches it with relevant creator content. It’s automated and mood-driven — the right vibe reaches the right viewer.',
                  },
                  {
                    id: 3,
                    q: 'What content is allowed?',
                    a: '🎵 You can upload:\n- Music or instrumental tracks\n- 🎬 Short films or motivational clips\n- 🌌 Ambient/relaxing visuals\n- 🎙️ Guided meditations or podcasts\n\nAll content must be original, non-offensive, and follow our community guidelines.',
                  },
                  {
                    id: 4,
                    q: 'How secure is my data?',
                    a: '🔐 All content you upload is stored securely in encrypted storage. No one else can access or use it without your permission. Mood detection happens locally in-browser or via secure cloud. We never sell or share your data.',
                  },
                ].map(({ id, q, a }) => (
                  <Accordion.Item key={id} eventKey={`${id}`}>
                    <Accordion.Header>{q}</Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: '#14141e', color: '#d0d0d0', whiteSpace: 'pre-line' }}>
                      {a}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>

          {/* Final CTA */}
          <Row className="mt-5 text-center">
            <Col>
              <h3>🌈 Ready to explore or create?</h3>
              <p style={{ color: '#d0d0d0' }}>
                Whether you're here to enjoy or inspire, MoodyTunes has you covered.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button variant="outline-light" size="lg" onClick={() => window.location.assign('/signup')}>
                  🎧 For Listeners
                </Button>
                <Button style={{
                  background: 'linear-gradient(to right, #8e2de2, #00d2ff)',
                  border: 'none'
                }} size="lg" onClick={() => window.location.assign('/creator-signup')}>
                  ✨ For Creators
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Footer />
    </>
  );
};
