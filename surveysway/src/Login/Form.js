import { useContext, useState } from 'react';
import { MainContext } from '../MainContext';
import { useNavigate } from 'react-router-dom';
import img from '../sign_in_img.jpeg'
import './cssfiles/Form.css'
import { Button, IconButton, Snackbar, TextField } from '@mui/material';

function Formexampl() {
    const { SignAsGuest, SignIn } = useContext(MainContext);
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [passError, setError] = useState("");
    const [userError, setUserError] = useState("");
    const Navigate = useNavigate();
    const check = (event) => {
        event.preventDefault();
        SignAsGuest();
        Navigate('/guest');
    };
    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <>
            <Button color="primary" size="small" onClick={handleClose}>
                Close
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
            </IconButton>
        </>
    );
    const ResetPasword = (event) => {
        event.preventDefault();
        Navigate('/ResetPasword')
    }
    const GetUserName = (event) => {
        event.preventDefault();
        setUserName(event.target.value);
    }
    const GetPassworde = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }
    const Submit = async (event) => {
        event.preventDefault();
        if (password && username) {
            const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const passCheck = regex.test(password);
            if (passCheck) {
                const inSucsses = await SignIn({ password, username })
                if (inSucsses) {
                    if (inSucsses === "incurrect password") {
                        await setError(inSucsses)
                        handleClick()
                    }
                    else {
                        await setUserError(inSucsses)
                        handleClick()
                    }
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
        <div className='container-form'>
            <div className='form-wrapper  '>
                <TextField
                    id="standard-basic"
                    label="User Name"
                    variant="standard"
                    isInvalid={!!userError} // Highlight input if there's an error
                    className='form-input'
                    onChange={GetUserName}
                    type="text" />
                {userError && (
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={userError}
                        action={action}
                    />
                )}
                <TextField
                    id="standard-basic 1"
                    label="Password"
                    variant="standard"
                    isInvalid={!!passError}
                    className='form-input'
                    onChange={GetPassworde}
                    type="password"
                />
                {passError && (
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={passError}
                        action={action}
                    />
                )}
                <div className='buttons'>
                    <button className='form-button btn-1' onClick={Submit} >Submit</button>
                    <button className='form-button' onClick={SignUp} >Sign Up</button>
                </div>
                <a id='check' className='mr-1' href="/" onClick={check}>Login as guest</a>
                <a href="/" onClick={ResetPasword}>Forgot Password ? </a>



            </div>
            <img src={img} alt="" className='Image-Sing' />

        </div>
    );
}

export default Formexampl;
