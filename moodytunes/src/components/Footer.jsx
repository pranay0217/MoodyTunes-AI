import { Container, Row, Col } from 'react-bootstrap';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaEnvelope,
} from 'react-icons/fa';

export function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(90deg, #141E30, #243B55)',
        color: '#f1f1f1',
        paddingTop: '50px',
        paddingBottom: '30px',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <Container>
        <Row className="text-center text-md-start">
          <Col xs={12} md={4} className="mb-4">
            <h4 className="text-white">MoodyTunes AI</h4>
            <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
              Instantly detect your mood through your webcam and get personalized
              music, shows, and video recommendations. Smart, private, and
              effortless entertainment tailored to how you feel.
            </p>
          </Col>

          <Col xs={12} md={4} className="mb-4">
            <h5 className="text-white">Contact</h5>
            <p style={{ fontSize: '14px' }}>
              <FaEnvelope style={{ marginRight: '10px' }} />
              support@MoodyTunes.ai
            </p>
            <p style={{ fontSize: '14px' }}>Phone: +1 (987) 654-3210</p>
          </Col>

          <Col xs={12} md={4}>
            <h5 className="text-white">Connect With Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start mt-3 flex-wrap gap-2">
              {[
                { icon: <FaFacebookF />, link: 'https://facebook.com/MoodyTunes' },
                { icon: <FaTwitter />, link: 'https://twitter.com/MoodyTunes' },
                { icon: <FaLinkedinIn />, link: 'https://linkedin.com/company/MoodyTunes' },
                { icon: <FaInstagram />, link: 'https://instagram.com/MoodyTunes' },
                { icon: <FaGithub />, link: 'https://github.com/MoodyTunes' },
              ].map(({ icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-1"
                  style={{
                    backgroundColor: '#ffffff22',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: '#f1f1f1',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#00d8ff';
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff22';
                    e.currentTarget.style.color = '#f1f1f1';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>

        <hr style={{ backgroundColor: '#ffffff22' }} />

        <Row className="text-center mt-3">
          <Col>
            <p style={{ fontSize: '13px', marginBottom: '0' }}>
              © {new Date().getFullYear()} MoodyTunes AI. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
