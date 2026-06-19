import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { VoiceGreeting } from './VoiceGreeting';

export const Navbar1 = () => {
  const navigate = useNavigate();

  const handleScrollToFaq = () => {
    navigate('/');  // Navigate to Home
    setTimeout(() => {
      const faqSection = document.getElementById('faq-section');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure the page has rendered
  };
   const handleScrollToFeatures = () => {
    navigate('/');  // Navigate to Home
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure the page has rendered
  };

  return (
    <>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        style={{ position: 'sticky', marginTop: '5px', zIndex: 1000 }}
      >
        <Container>
          {/* Left: Brand */}
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{
              fontFamily: 'cursive',
              fontWeight: 'bold',
              fontSize: '28px',
              color: 'gold',
              marginRight: '120px',
              cursor: 'pointer',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            MoodyTunes
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Center: Nav Links */}
            <Nav className="mx-auto">
              <Nav.Link onClick={() => navigate("/howitworks")} style={{ color: 'silver', margin: '0 10px' }}>How It Works</Nav.Link>
              <Nav.Link onClick={handleScrollToFeatures} style={{ color: 'silver', margin: '0 10px' }}>Features</Nav.Link>
              <Nav.Link onClick={handleScrollToFaq} style={{ color: 'silver', margin: '0 10px' }}>FAQs</Nav.Link>
              <Nav.Link onClick={() => navigate("/contact")} style={{ color: 'silver', margin: '0 10px' }}>Contact Us</Nav.Link>
            </Nav>

            {/* Right: Buttons */}
            <div className="d-flex gap-2 ms-auto">
              <Button variant="outline-success" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="outline-success" onClick={() => navigate("/signup")}>
                Get Started
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <VoiceGreeting />
    </>
  );
};
