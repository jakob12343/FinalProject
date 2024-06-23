import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login/cssfiles/Footer.css'; // Import custom CSS for further styling if needed

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5>About Us</h5>
            <p>Learn more about SurveySway and our mission to provide efficient and reliable survey solutions.</p>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: support@surveysway.com</li>
              <li>Phone: +123-456-7890</li>
              <li>Address: 123 Survey Lane, Sway City</li>
            </ul>
          </Col>
          <Col xs={12} md={4}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} className="text-center">
            <p>&copy; {new Date().getFullYear()} SurveySway. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
