import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Navigator.css'
import img from '../logo.png'
const Navigator = () => {
  const [offsetY, setOffsetY] = useState(0); // Tracks scroll position

  useEffect(() => {
    const handleScroll = () => {
      // Alternative method to get scroll position
      const scrollPosition = document.documentElement.scrollTop;
      setOffsetY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Adjust background size and position based on scroll position
  const backgroundSize = 200 + offsetY * 0.5 + '%'; // Increase background size as you scroll
  const backgroundPosition = offsetY * 0.5 + 'px'; // Shift background position as you scroll

  return (
    <Navbar
      className='navbar scrolled'
      bg="light"
      expand="lg"
      as={motion.nav}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      style={{
        background: `linear-gradient(to right, #ffffff, #0077b5)`,
        backgroundSize: backgroundSize,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `-${backgroundPosition} 0` // Shifts the gradient to the left as you scroll
      }}
    >
      <Image className='image' src={img} roundedCircle />
      <Container>

        <Navbar.Brand className='navbar-brand' as={Link} to="/">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <motion.div whileHover={{ scale: 1.5 }}
            >
              <Nav.Link className='nav-link' as={Link} to="/UserHomePage">Home</Nav.Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Nav.Link className='nav-link' as={Link} to="/about">About</Nav.Link>
            </motion.div>
            {/* Add more Nav.Link items here */}
          </Nav>
        </Navbar.Collapse>
      </Container>     </Navbar>
  );
};

export default Navigator;

