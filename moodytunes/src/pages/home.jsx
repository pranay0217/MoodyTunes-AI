import { useNavigate } from 'react-router-dom';
import { Navbar1 } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import * as THREE from 'three';

export const Home = () => {
  const navigate = useNavigate();
  const [faqIndex, setFaqIndex] = useState(0);
  const threeRef = useRef(null);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLearn = () => {
    navigate('/learn');
  };

  const handleBecomeCreator = () => {
    navigate('/creator-signup');
  };

  sessionStorage.clear();
  localStorage.clear();

  useEffect(() => {
    if (!threeRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      threeRef.current.offsetWidth / threeRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      threeRef.current.offsetWidth,
      threeRef.current.offsetHeight
    );
    threeRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 1000; i++) {
      const x = THREE.MathUtils.randFloatSpread(10);
      const y = THREE.MathUtils.randFloatSpread(10);
      const z = THREE.MathUtils.randFloatSpread(10);
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const material = new THREE.PointsMaterial({ color: 0x00d8ff, size: 0.05 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.001;
      points.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!threeRef.current) return;
      camera.aspect =
        threeRef.current.offsetWidth / threeRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        threeRef.current.offsetWidth,
        threeRef.current.offsetHeight
      );
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeRef.current && renderer.domElement) {
        threeRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const features = [
    {
      title: 'Real-Time Mood Detection',
      description:
        'Turn on your webcam, and our AI detects your current mood instantly. Using advanced facial emotion recognition, the system understands whether you\'re happy, sad, excited, relaxed, or stressed — all in real-time.',
      image:
        'https://cdn.analyticsvidhya.com/wp-content/uploads/2021/11/Facial-Emotion-Detection-Using-CNN.webp',
    },
    {
      title: 'Personalized Music & Shows',
      description:
        'Based on your detected mood, get personalized suggestions for music playlists, YouTube videos, movies, and TV shows. Whether you\'re feeling low or joyful, there\'s something perfect for you.',
      image:
        'https://miro.medium.com/v2/resize:fit:854/1*p-k7hV_nGQMlP5Ka0oI0vw.png',
    },
    {
      title: 'Seamless Webcam Integration',
      description:
        'No downloads required! Use your device\'s webcam directly in the browser. Our system securely accesses your camera, processes emotions locally, and protects your privacy.',
      image:
        'https://cdn.prod.website-files.com/637dca553720a36083e71514/6597a519d7aec803cab0a0fb_Best%20AI%20Webcam%20%20Best%20Background%20%20Good%20Zoom%20Call%20Impression.webp',
    },
    {
      title: 'AI-Powered Recommendations',
      description:
        'Our AI doesn\'t just detect mood — it learns from your preferences. Get smarter and more accurate recommendations the more you use the platform.',
      image:
        'https://www.algolia.com/files/live/sites/algolia-assets/files/blogs/bannerimages/what-role-does-ai-play-in-recommendation.webp',
    },
    {
      title: 'Creator Platform',
      description:
        'Upload your own mood-based videos, songs, and podcasts. Connect emotionally with users based on how they feel. Let your content shine when people need it most.',
      image:
        'https://img.freepik.com/free-vector/flat-illustration-podcast-concept_23-2148882720.jpg',
    },
  ];

  const faqs = [
    {
      question: 'Is my webcam data stored or shared?',
      answer:
        'No. All webcam processing happens securely on your device or within encrypted sessions. We do not store, record, or share any video data.',
    },
    {
      question: 'How accurate is the mood detection?',
      answer:
        'Our AI is trained on diverse datasets for accurate detection of emotions like happiness, sadness, anger, surprise, and neutrality in real-time.',
    },
    {
      question: 'Can I become a creator?',
      answer:
        'Yes! Just sign up as a creator and start uploading videos categorized by moods. Your content gets recommended to users based on how they feel.',
    },
    {
      question: 'How are creator videos recommended?',
      answer:
        'When a user\'s mood is detected, we match it with creator videos labeled with the same emotion, giving your content the perfect spotlight.',
    },
    {
      question: 'What kind of content can creators upload?',
      answer:
        'Creators can upload music videos, motivational clips, calming visuals, or any mood-related content that helps users feel seen and heard.',
    },
    {
      question: 'What devices are supported?',
      answer:
        'MoodyTunes works on all modern browsers with webcam access, including Chrome, Edge, Firefox on desktop and laptop. Mobile browser support is coming soon.',
    },
    {
      question: 'Can I disable webcam access anytime?',
      answer:
        'Absolutely. You can disable the webcam anytime after detection or refresh the page to stop it. Your privacy is always in your hands.',
    },
  ];
  const handleFaqSelect = (selectedIndex) => {
    setFaqIndex(selectedIndex);
  };

  return (
    <>
      <div className="container-fluid px-3" style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <Navbar1 />

        {/* Hero Section with Three.js */}
        <div
          className="position-relative d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            width: '100%',
            minHeight: '90vh',
            overflow: 'hidden',
            color: 'white',
          }}
        >
          <div
            ref={threeRef}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ zIndex: 0 }}
          />
          <div style={{ zIndex: 1, padding: '0 20px' }}>
            <h1 className="fw-bold mb-4" style={{ fontSize: '3rem', lineHeight: '1.3' }}>
              Detect Your Mood <br />
              with <span style={{ color: 'gold', fontWeight: 'bold', fontFamily: 'cursive' }}>MoodyTunes AI</span>
            </h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '700px' }} className="mb-4 mx-auto">
              Our AI detects your emotion and brings you the right content.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <button className="btn btn-light" onClick={handleLearn}>Learn More</button>
              <button className="btn btn-outline-light" onClick={handleGetStarted}>Get Started</button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="container py-5">
          <h2 className="text-center mb-4" style={{ color: '#00d8ff', fontSize: '50px' }}>Features</h2>
          {features.map((feature, index) => (
            <div key={index} className={`row align-items-center my-5 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
              <div className="col-md-6 mb-4 mb-md-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
                />
              </div>
              <div className="col-md-6 text-white px-4">
                <h2 style={{ color: '#00d8ff' }}>{feature.title}</h2>
                <p style={{ fontSize: '1.1rem' }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Creator Call-to-Action */}
        <div className="text-center text-white py-5" style={{ background: '#111' }}>
          <h2 className="mb-3" style={{ color: '#FFD700' }}>Become a Creator on MoodyTunes</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Share your mood-based videos and music with the world.
          </p>
          <button className="btn btn-warning mt-4 px-4 py-2" onClick={handleBecomeCreator}>
            Join as Creator
          </button>
        </div>

        {/* FAQ */}
        <div id="faq-section" className="container text-white py-5">
          <h2 className="text-center mb-4" style={{ color: '#00d8ff' }}>FAQs</h2>
          <Carousel activeIndex={faqIndex} onSelect={handleFaqSelect} indicators={false} interval={null}>
            {faqs.map((faq, idx) => (
              <Carousel.Item key={idx}>
                <div className="bg-dark p-5 rounded shadow" style={{ minHeight: '250px' }}>
                  <h4 className="text-center" style={{ color: '#00d8ff' }}>{faq.question}</h4>
                  <p className="mt-3 text-center" style={{ fontSize: '1.1rem' }}>{faq.answer}</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Final CTA */}
        <div className="text-center text-white py-5">
          <h2>Why Choose MoodyTunes AI?</h2>
          <p className="mt-3" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Whether you're watching or uploading, MoodyTunes bridges emotions and entertainment.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
            <button className="btn btn-primary px-4 py-2" onClick={handleGetStarted}>
              Detect My Mood
            </button>
            <button className="btn btn-outline-light px-4 py-2" onClick={handleBecomeCreator}>
              Start Creating
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
