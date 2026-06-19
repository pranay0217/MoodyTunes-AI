import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Navbar1 } from '../components/Navbar';
import { Footer } from '../components/Footer';
import * as THREE from 'three';

export const ContactUs = () => {
  const threeRef = useRef(null);

  useEffect(() => {
    if (!threeRef.current) return;

    const width = threeRef.current.offsetWidth;
    const height = threeRef.current.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    threeRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const particles = 1000;
    const positions = [];

    for (let i = 0; i < particles; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      positions.push(x, y, z);
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.6,
      transparent: true,
      opacity: 0.5,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.0008;
      points.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = threeRef.current.offsetWidth;
      const h = threeRef.current.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current && renderer.domElement) {
        threeRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* Full screen layout using flex column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'linear-gradient(to right, rgb(205, 211, 21), rgb(37, 77, 122))',
          fontFamily: "'Poppins', sans-serif",
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Navbar1 />

        {/* Three.js Canvas Background (separate layer) */}
        <div
          ref={threeRef}
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 0, pointerEvents: 'none' }}
        />

        {/* Main content grows to fill height */}
        <div className="flex-grow-1 position-relative" style={{ zIndex: 1 }}>
          <Container className="py-5">
            <Row className="justify-content-center">
              <Col lg={8} md={10}>
                <Card
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <Card.Body>
                    <h2 className="text-center mb-4" style={{ color: '#ffffff' }}>
                      Contact Us
                    </h2>
                    <p className="text-center" style={{ color: '#e0e0e0' }}>
                      Have questions, suggestions, or feedback? We’d love to hear from you.
                    </p>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your name"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: 'none',
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter your email"
                              style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'white',
                                border: 'none',
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3" controlId="formSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter subject"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            border: 'none',
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-4" controlId="formMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Write your message here"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            border: 'none',
                          }}
                        />
                      </Form.Group>
                      <div className="text-center">
                        <Button
                          variant="light"
                          size="lg"
                          style={{
                            background: 'linear-gradient(to right, #00d2ff, #8e2de2)',
                            border: 'none',
                            borderRadius: '30px',
                            padding: '10px 40px',
                            color: '#fff',
                            fontWeight: '600',
                          }}
                        >
                          Send Message
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Footer (always sticks at bottom of page) */}
        <div style={{ zIndex: 1 }}>
          <Footer />
        </div>
      </div>
    </>
  );
};
