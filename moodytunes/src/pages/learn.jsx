import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Navbar1 } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FaUser, FaVideo, FaBrain, FaSmile, FaRocket } from 'react-icons/fa';

export const LearnMore = () => {
  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to right, #5b8292ff, #203a43, #2c5364)',
          minHeight: '100vh',
          color: '#fff',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Navbar1 />

        <Container className="py-5">
          <Row className="text-center mb-5">
            <Col>
              <h1 style={{ fontWeight: '700' }}>Learn More About MoodyTunes AI</h1>
              <p style={{ color: '#ccc', maxWidth: '700px', margin: 'auto' }}>
                Explore how MoodyTunes AI creates mood-based entertainment experiences.
                Whether you're a creator or a visitor, dive into how our platform works.
              </p>
            </Col>
          </Row>

          {/* Roles Section */}
          <Row className="g-4 mb-5">
            <Col md={6}>
              <Card
                className="h-100"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
              >
                <Card.Body className="text-center">
                  <FaUser size={50} color="#00d2ff" />
                  <h3 className="mt-3">Visitors</h3>
                  <p style={{ color: '#ccc' }}>
                    Visitors can explore mood-based content. Just allow mood detection through your camera or manually select your mood, and we’ll recommend the perfect songs, videos, or movies.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card
                className="h-100"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
              >
                <Card.Body className="text-center">
                  <FaVideo size={50} color="#8e2de2" />
                  <h3 className="mt-3">Creators</h3>
                  <p style={{ color: '#ccc' }}>
                    Creators can upload content like songs, mood-based vlogs, motivational videos, or podcasts.
                    Your content becomes part of the recommendation system based on users’ emotions.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* How It Works */}
          <Row className="text-center mb-5">
            <Col>
              <h2>How It Works</h2>
              <p style={{ color: '#ccc', maxWidth: '700px', margin: 'auto' }}>
                MoodyTunes combines AI-based emotion detection with content recommendation and creator contributions.
              </p>
            </Col>
          </Row>

          <Row className="g-4 mb-5">
            <Col md={4}>
              <Card
                className="h-100"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
              >
                <Card.Body className="text-center">
                  <FaBrain size={50} color="#00d2ff" />
                  <h4 className="mt-3">AI Mood Detection</h4>
                  <p style={{ color: '#ccc' }}>
                    Users can use live camera-based emotion detection or select mood manually.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card
                className="h-100"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
              >
                <Card.Body className="text-center">
                  <FaRocket size={50} color="#8e2de2" />
                  <h4 className="mt-3">Personalized Recommendations</h4>
                  <p style={{ color: '#ccc' }}>
                    Based on your mood, the system recommends the best-fit music, podcasts, or videos from both creators and the database.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card
                className="h-100"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                }}
              >
                <Card.Body className="text-center">
                  <FaSmile size={50} color="#00d2ff" />
                  <h4 className="mt-3">Creator Collaboration</h4>
                  <p style={{ color: '#ccc' }}>
                    Creators help build a diverse mood-based library by uploading videos, soundtracks, vlogs, and more.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* CTA */}
          <Row className="text-center mb-4">
            <Col>
              <h3>Ready to Explore or Create?</h3>
              <p style={{ color: '#ccc' }}>
                Join MoodyTunes AI today — whether you're here to enjoy or inspire others.
              </p>
              <Button
                variant="light"
                href="/signup"
                style={{
                  background: 'linear-gradient(to right, #00d2ff, #8e2de2)',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 30px',
                  borderRadius: '30px',
                  fontWeight: '600',
                }}
              >
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>

        <Footer />
      </div>
    </>
  );
};
