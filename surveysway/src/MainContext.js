import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { ValidateToken } from "./Validations/ValidateToken";
const MainContext = createContext();

const MainProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [usertoken, setusertoken] = useState("1234");
    const [UserMode, setUserMode] = useState("")
    const [UserData, setUserData] = useState({})
    const [Username, setUsername] = useState("")
    const [Alldetails, setAlldetails]=useState({})
    const [exp, setExp] = useState()
    const SignAsGuest = async () => {
        try {
            const url = `${apiUrl}/GetguestToken`;
            const response = await axios.post(url, {});
            setusertoken(response.data.token); // Assuming the token is in response.data
            setUserMode(response.data.mode)
            setExp(response.data.exp)

        } catch (error) {
            console.error("Error fetching guest token:", error);
        }
    };
   
    const ForgotPassword = async (user) => {
        const url = `${apiUrl}/ForgotPassword?username=${user.user}&phone=${user.phoneNumber}`;
        let status
        try {
            await axios.get(url)
            status = 200
            setUsername(user.user)
        } catch (error) {
            status = 409
        }
        return status
    }
    const EditPasword = async (newPassword) => {
        const url = `${apiUrl}/EditPasword`;
        await axios.put(url, { username: Username, newPassword });

    }
    const Register = async (user,newuser) => {
        try {
            const url = `${apiUrl}/Register`;
            const response = await axios.post(url, user);
            setusertoken(response.data.token); // Assuming the token is in response.data
            setUserMode(response.data.mode)
            setUserData(newuser)
            setAlldetails(response.data.userdetails)

        } catch (error) {
            console.error("Error fetching user token:", error.response.data.message);
            if (error.response && error.response.status === 409) {
                return true
            }


        }
        
    }
    const SignIn = async (user) => {
        try {

            const url = `${apiUrl}/SignIn`;
            const response = await axios.post(url, user);
            setusertoken(response.data.token); // Assuming the token is in response.data
            setUserMode(response.data.mode)
            setUserData(user)
            setAlldetails(response.data.userdetails)

        } catch (error) {
            console.error("Error fetching user token:", error.response.data.message);
            if (error.response && error.response.status === 401) {
                return error.response.data.message
            }
        }

    }
    const PullUserDetails = async () => {
        try {
            const url = `${apiUrl}/PullUserDetails`;
            const response = await axios.post(url, { usertoken: usertoken, mode: UserMode });
            setUserData(response)
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    useEffect(() => {

    }, [Alldetails]);
    
    useEffect(() => {
        ValidateToken(exp, usertoken, setusertoken, setExp)
    }, [usertoken, UserMode, exp]);

    const SharedObject = {
        UserMode,
        UserData,
        usertoken,
        Alldetails,
        SignAsGuest,
        SignIn,
        Register,
        PullUserDetails,
        ForgotPassword,
        EditPasword,
        setAlldetails
    };

    return (
        <MainContext.Provider value={SharedObject}>
            {children}
        </MainContext.Provider>
    );
};

export { MainProvider, MainContext };
