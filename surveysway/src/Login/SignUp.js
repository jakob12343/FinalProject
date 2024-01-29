import React, { useContext, useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { MainContext } from '../MainContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const {Register,CheckUserName } = useContext(MainContext);
    const Navigate=useNavigate()

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const passCheck = regex.test(formData.password);
        if (passCheck)
         {
           const checkUserName=await CheckUserName(formData.username)
            console.log(checkUserName);
            if (checkUserName.check) {
                Register(formData).then(()=>{Navigate('/UserHomePage')})
               }
      
           
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Sign Up</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
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
                            <Form.Control
                                type="text"
                                placeholder="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicReligion">
                            <Form.Label>Religion</Form.Label>
                            <Form.Control
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
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicMaritalStatus">
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Marital Status"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCountryOfOrigin">
                            <Form.Label>Country of Origin</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Country of Origin"
                                name="countryOfOrigin"
                                value={formData.countryOfOrigin}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
