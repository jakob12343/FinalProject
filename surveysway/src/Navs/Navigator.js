import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navigator = () => {
  return (
    <Navbar bg="light" expand="lg" as={motion.nav} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: 'spring', stiffness: 120 }}>
      <Container>
        <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <motion.div whileHover={{ scale: 1.5 }}
            >
              <Nav.Link as={Link} to="/UserHomePage">Home</Nav.Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </motion.div>
            {/* Add more Nav.Link items here */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigator;
