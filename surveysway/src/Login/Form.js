// Formexampl.js
import { useContext, useState } from 'react';
import { MainContext } from '../MainContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Formexampl() {
    const { SignAsGuest, SignIn } = useContext(MainContext);
    const [Password, setPassword] = useState("")
    const [UserName, setUserName] = useState("")
    const [errors, setErrors] = useState([])
    const Navigate=useNavigate()
    const check = (event) => {
        event.preventDefault();
        SignAsGuest();
        Navigate('/guest')

    };
    const GetUserName = (event) => {
        event.preventDefault()
        setUserName(event.target.value)
    }
    const GetPassworde = (event) => {
        event.preventDefault()
        setPassword(event.target.value)
    }
    const Submit = (event) => {
        if (Password && UserName) {
            const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

            const passCheck = regex.test(Password);
            if (passCheck) {
                SignIn({ user: { Password, UserName } }).then(() => {
                    Navigate('/UserHomePage'); // Assuming navigate is defined using useNavigate hook
                }).catch(error => {
                    console.error("SignIn failed:", error);
                });
            } else {
                console.log("Password format is incorrect");
            }
        } else {
            console.log("Password or UserName is missing");
        }
    };
    const SignUp=()=>{
        Navigate('/SignUp')
    }
    return (
        <div>
            <Form.Control onChange={GetUserName} size="lg" type="text" placeholder="User Name" />
            <br />
            <Form.Control onChange={GetPassworde} size="lg" type="text" placeholder="Password" />
            <a href="/" onClick={check}>Login as guest</a>
            <Button onClick={Submit} variant="warning">Submit</Button>
            <Button onClick={SignUp} variant="warning">Sign Up</Button>


        </div>
    );
}

export default Formexampl;
