import { createContext, useContext } from "react";
import { MainContext } from "../MainContext";

const GuestContext=createContext()

const GuestProvider=({children})=>{
    const {usertoken}=useContext(MainContext)
const SharedObject={
    usertoken
}
return (
    <GuestContext.Provider value={SharedObject}>
        {children}
    </GuestContext.Provider>
);
};

export {GuestProvider , GuestContext }