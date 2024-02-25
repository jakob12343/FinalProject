// Formexampl.js
import { useContext, useState } from 'react';
import { MainContext } from '../MainContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './cssfiles/Form.css'

function Formexampl() {
    const { SignAsGuest, SignIn } = useContext(MainContext);
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")
    const [passError, setError] = useState("")
    const [userError, setUserError] = useState("")
    const Navigate = useNavigate()
    const check = (event) => {
        event.preventDefault();
        SignAsGuest();
        Navigate('/guest')

    };
    const ResetPasword = (event) => {
        event.preventDefault();
        Navigate('/ResetPasword')
    }
    const GetUserName = (event) => {
        event.preventDefault()
        setUserName(event.target.value)
    }
    const GetPassworde = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }
    const Submit = async (event) => {
        event.preventDefault()
        if (password && username) {
            const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

            const passCheck = regex.test(password);
            if (passCheck) {
                const inSucsses = await SignIn({ user: { password, username } })
                if (inSucsses) {
                    if (inSucsses === "incurrect password") {
                        setError(inSucsses)

                    }
                    else setUserError(inSucsses)
                }
                else {
                    Navigate('/UserHomePage');

                }

            } else {
                console.log("Password format is incorrect");
            }
        } else {
            console.log("Password or UserName is missing");
        }
    };
    const SignUp = () => {
        Navigate('/SignUp')
    }
    return (
        <div className='form-wrapper form-group'>
            <Form.Control isInvalid={!!userError} // Highlight input if there's an error
                className='form-input' onChange={GetUserName} size="lg" type="text" placeholder="User Name" />
            {userError && (
                <Form.Control.Feedback className='error-message' type="invalid">
                    {userError}
                </Form.Control.Feedback>
            )}
            <br />
            <Form.Control isInvalid={!!passError} className='form-input' onChange={GetPassworde} size="lg" type="password" placeholder="Password" />
            {passError && (
                <Form.Control.Feedback className='error-message' type="invalid">
                    {passError}
                </Form.Control.Feedback>
            )}
            <a className='mr-1' href="/" onClick={check}>Login as guest</a>
            <a href="/" onClick={ResetPasword}>Forgot Password ? </a>


            <Button className='form-button mb-20' onClick={Submit} >Submit</Button>
            <Button className='form-button' onClick={SignUp} >Sign Up</Button>


        </div>
    );
}

export default Formexampl;
