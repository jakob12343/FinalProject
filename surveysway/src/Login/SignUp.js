import React, { useContext, useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { MainContext } from '../MainContext';
import { useNavigate } from 'react-router-dom';
import './cssfiles/SignUp.css'
const SignUp = () => {
    const { Register } = useContext(MainContext);
    const Navigate = useNavigate();
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('')

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        birthDate: '',
        phone: '',
        gender: '',
        religion: '',
        address: '',
        maritalStatus: '',
        countryOfOrigin: '',
    });
    const Genders = ["Male", "Woman", "Undefined"]
    const PersonalStatus = ["Singel", "Married", "Divorced", "Widow", "Undefined"]
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Reset username error when user starts typing again
        if (name === 'username') setUsernameError('');
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const passCheck = regex.test(formData.password);
        if (passCheck) {
          const user={username: formData.username, password: formData.password }
            const isSucsses = await Register(formData,user );
            if (isSucsses) {
                // Assuming isSucsses being false means username exists
                setUsernameError("Username already exists. Please choose another one.");
            } else {
                Navigate('/UserHomePage');
            }
        }
        else setPasswordError('password must contain least 8 characters and one capital one number')
    };

    return (
        <Container className='signup-container'>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className='signup-title'>Sign Up</h1>
                    <Form className='signup-form' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 form-field" controlId="formBasicUsername">
                            <Form.Label className='form-label'>Username</Form.Label>
                            <Form.Control
                                className='form-input'
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                isInvalid={!!usernameError} // Highlight input if there's an error
                                required
                            />
                            {/* Display username error if it exists */}
                            {usernameError && (
                                <Form.Control.Feedback className='error-message' type="invalid">
                                    {usernameError}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className='form-input '

                                type="text"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!passwordError} // Highlight input if there's an error

                                required
                            />
                            {passwordError && (
                                <Form.Control.Feedback className='error-message' type="invalid">
                                    {passwordError}
                                </Form.Control.Feedback>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                className='form-input'

                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicBirthDate">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control

                                className='form-input '

                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                className='form-input'

                                type="tel"
                                placeholder="Phone number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                                value={formData.gender}
                                onChange={handleChange}
                                name="gender"

                            >
                                <option value="">Select category</option>
                                {Genders.map((el) => (
                                    <option key={el} value={el}>
                                        {el}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicReligion">
                            <Form.Label>Religion</Form.Label>
                            <Form.Control
                                className='form-input'

                                type="text"
                                placeholder="Religion"
                                name="religion"
                                value={formData.religion}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                className='form-input'

                                type="text"
                                placeholder="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicMaritalStatus">
                            <Form.Label>Marital Status</Form.Label>
                            
                              <Form.Select
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                name="maritalStatus"

                            >
                                <option value="">Select category</option>
                                {PersonalStatus.map((el) => (
                                    <option key={el} value={el}>
                                        {el}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCountryOfOrigin">
                            <Form.Label>Country of Origin</Form.Label>
                            <Form.Control
                                className='form-input'

                                type="text"
                                placeholder="Country of Origin"
                                name="countryOfOrigin"
                                value={formData.countryOfOrigin}
                                onChange={handleChange}
                            />
                        </Form.Group>


                        <Button className='signup-button' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;