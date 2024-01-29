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
            console.error("Error fetching user token:", error);
        }

    }
    const CheckUserName = async (username) => {
        const url = 'http://localhost:3000/CheckUserName';
        try {
            const response = await axios.get(url, username);
            return response.data
        } catch (error) {
            console.error("Error fetching username", error);
        }
    }
    const Register = async (user) => {
        try {
            const url = 'http://localhost:3000/Register';
            const response = await axios.post(url, user);
            setusertoken(response.data.token); // Assuming the token is in response.data
            setUserMode(response.data.mode)
        } catch (error) {
            console.error("Error fetching user token:", error);
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

    const SharedObject = { UserMode, SignAsGuest, SignIn, Register, PullUserDetails,CheckUserName };

    return (
        <MainContext.Provider value={SharedObject}>
            {children}
        </MainContext.Provider>
    );
};

export { MainProvider, MainContext };
