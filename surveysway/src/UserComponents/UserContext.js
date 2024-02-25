import { createContext, useContext, useState } from "react";
import { MainContext } from "../MainContext";
import axios from "axios";

const UserContext = createContext()
const UserProvider = ({ children }) => {
    const { usertoken, UserData } = useContext(MainContext)
    const [Data, setData]=useState({})

    const PullUserDetails = async () => {
        console.log(UserData);
        const url = `http://localhost:3000/PullUserDetails?Username=${UserData.user.username}&usertoken=${usertoken}`;

        const data = await axios.get(url)
        console.log(data);
        setData(data.data)
    }
    const SharedObject = {
        PullUserDetails,
        UserData,
        Data
    }
   
    return (
        <UserContext.Provider value={SharedObject}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext }