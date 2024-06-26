import React, { useState, useContext } from 'react';
import { MainContext } from '../MainContext';
import { useNavigate } from 'react-router-dom';
import { Form} from 'react-bootstrap';
import './cssfiles/Newpass.css'; // Ensure the CSS file path matches your project structure

const ResetPasswordForm = () => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState("");
  const { ForgotPassword } = useContext(MainContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await ForgotPassword({ user: username, phoneNumber }); // Assuming ForgotPassword returns a promise
      if (result === 200) {
        navigate('/CreateNewPassword');
      } else {
        if (result === 409)
          setError("Username and phone number are incorrect or do not match.");

      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className='reset' >
    <div className='reset-form'>
      <Form className='form-wrapper' onSubmit={handleSubmit}>
        <h2 className='form-title'>Reset Password</h2>
        {error && <div className="error-message">{error}</div>}
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <br />
          <input
            className='reset-input'
            type="text"
            placeholder="Enter  username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <br />
          <input
            className='reset-input'
            type="tel"
            placeholder="Enter  phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>
        <button variant="primary" type="submit" className='form-button'>
          Submit
        </button>
      </Form>
    </div>
    </div>
  );
};

export default ResetPasswordForm;
