import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="header">
        <h1>About Us</h1>
      </div>
      <div className="content">
        <p>
          Welcome to our Final Project, an innovative survey management platform designed to streamline data collection and analysis. Our tool ensures ease of use, robust security, and real-time analytics for insightful decision-making.
        </p>
        <h2>Our Vision</h2>
        <p>
          To provide a seamless tool for conducting surveys, enabling organizations to gain valuable insights and make informed decisions based on real-time data.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>User-friendly Interface</li>
          <li>Comprehensive Survey Management</li>
          <li>Real-time Data Analysis</li>
          <li>Secure and Reliable</li>
          <li>Customizable and Scalable</li>
        </ul>
        <h2>Our Technology Stack</h2>
        <p>
          Our platform leverages React for the frontend, Node.js and Express.js for the backend, and MongoDB for data storage, ensuring a robust and scalable solution.
        </p>
        <h2>Contact Us</h2>
        <p>
          For more information or support, reach out to us at <a href="mailto:contact@example.com">contact@example.com</a>.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
