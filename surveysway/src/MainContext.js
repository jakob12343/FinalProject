import { createContext, useEffect, useState } from "react";
import axios from 'axios';

const MainContext = createContext();

const MainProvider = ({ children }) => {
    const [usertoken, setusertoken] = useState("1234");
    const [UserMode, setUserMode] = useState("")
    const [UserData, setUserData] = useState({})
    const SignAsGuest = async () => {
        try {
            const url = 'http://localhost:3000/GetguestToken';
            const response = await axios.post(url, {});
            setusertoken(response.data.token); // Assuming the token is in response.data
            setUserMode(response.data.mode)

        } catch (error) {
            console.error("Error fetching guest token:", error);
        }
    };
    const SignIn = async (user) => {
        try {
            const url = 'http://localhost:3000/SignIn';
            const response = await axios.post(url, user);
            setusertoken(response.data.token); // Assuming the token is in response.data
            setUserMode(response.data.mode)

        } catch (error) {
            console.error("Error fetching user token:", error.response.data.message);
            if (error.response && error.response.status === 401) {
                return error.response.data.message
            }
        }

    }
   
    const Register = async (user) => {
        try {
            const url = 'http://localhost:3000/Register';
            const response = await axios.post(url, user);
            setusertoken(response.data.token); // Assuming the token is in response.data
            setUserMode(response.data.mode)
        } catch (error) {
            console.error("Error fetching user token:", error.response.data.message);
            if (error.response && error.response.status === 409) {
                return true
            }
          

        }
        if (usertoken !== "1234") {
            PullUserDetails()
        }
    }
    const PullUserDetails = async () => {
        try {
            const url = 'http://localhost:3000/PullUserDetails';
            const response = await axios.post(url, { usertoken: usertoken, mode: UserMode });
            setUserData(response)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    useEffect(() => {
    }, [usertoken, UserMode]);

    const SharedObject = { UserMode, SignAsGuest, SignIn, Register, PullUserDetails };

    return (
        <MainContext.Provider value={SharedObject}>
            {children}
        </MainContext.Provider>
    );
};

export { MainProvider, MainContext };
