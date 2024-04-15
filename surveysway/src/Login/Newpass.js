import React, { useContext, useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../MainContext';
import './cssfiles/Newpass.css'
const Newpass = () => {
    const [paas1, setPaas1] = useState('');
    const [pass2, setPaas2] = useState('');
    const [error, setError] = useState("");
    const [isSUcsses, setIsSUcsses] = useState(false);
    const { EditPasword } = useContext(MainContext)
    const Navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (paas1 !== pass2) {
            setError("passwords do not match")
        } else {
            const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const passCheck = regex.test(paas1);
            if (passCheck) {

                setIsSUcsses(true); // Show spinner and message
                await EditPasword(paas1);
                // Wait for 3-4 seconds before navigating
                setTimeout(() => {
                    Navigate('/');
                }, 2000); // Adjust time as needed (3500ms is 3.5 seconds)
            }
            else setError('password must contain least 8 characters and one capital one number')
        }
    };

    return (
        <div className='reset'>
        <div className='reset-form'>
            {isSUcsses && (
                <div className='z-index'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <h3>Password changed. You will soon navigate to the login page.</h3>
                </div>
            )}
            <Form className='reset-wrapper' onSubmit={handleSubmit}>
                <h2 className='reset-title'>Enter Your New Password</h2>
                {error && <div className="error-message">{error}</div>}
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>New Paswword</Form.Label>
                    <input
                        className='reset-input'
                        type="text"
                        placeholder="New Paswword"
                        value={paas1}
                        onChange={(e) => setPaas1(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneNumber">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                        className='reset-input'
                        type="text"
                        placeholder="Confirm Password"
                        value={pass2}
                        onChange={(e) => setPaas2(e.target.value)}
                        required
                    />
                </Form.Group>
                <button variant="primary" type="submit" className='form-button'>
                    Submit
                </button>
            </Form>
        </div>
        </div>)
}

export default Newpass