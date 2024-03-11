import { createContext, useContext, useState } from "react";
import { MainContext } from "../MainContext";
import axios from "axios";

const UserContext = createContext()
const UserProvider = ({ children }) => {
    const { usertoken, UserData } = useContext(MainContext)
    const [Data, setData] = useState({})
    const [OwnServeys, setOwnServeys]=useState([])
    const [OldSrveys,setOldSrveys]=useState([])
    const [Surveys, setSurveys]=useState([])
const PullUserSurveys=async()=>{
    const url = `http://localhost:3000/PullUserSurveys?Username=${UserData.user.username}&usertoken=${usertoken}`;
    const data = await axios.get(url)
    //console.log(data.data);
    setOwnServeys(data.data)


}
const PullAllSurveys=async()=>{
    const url = `http://localhost:3000/PullAllSurveys?Username=${UserData.user.username}&usertoken=${usertoken}`;
    const data = await axios.get(url)
    //console.log(data.data);
    setSurveys(data.data)
}
const PullOldUserSurveys=async()=>{
    const url = `http://localhost:3000/PullOldUserSurveys?Username=${UserData.user.username}&usertoken=${usertoken}`;
    const data = await axios.get(url)
    //console.log(data.data);
    setOldSrveys(data.data)
}
    const PullUserDetails = async () => {
        const url = `http://localhost:3000/PullUserDetails?Username=${UserData.user.username}&usertoken=${usertoken}`;

        const data = await axios.get(url)
        setData(data.data)
        return data.data
    }
    const UpdateUserDetails = async (user) => {
        const url = `http://localhost:3000/UpdateUserDetails?&usertoken=${usertoken}`;
        const status = await axios.put(url, user)
        return status

    }
    const AddSuervey=async(survey)=>{
        const url = `http://localhost:3000/PublishSuervey?&usertoken=${usertoken}`;

        const status= await axios.post(url ,{survey, Data})
        PullUserSurveys()
        
    }
    const DeletTargetSurvey=async(id)=>{
        const url = `http://localhost:3000/DeletTargetSurvey?&usertoken=${usertoken}&&_id=${id}`;
       const status=await axios.delete(url )
       console.log(status);
       if (status.status===200) {
        PullUserSurveys()

       }
        return status
        

    }
    const SharedObject = {
        PullUserDetails,
        UpdateUserDetails,
        AddSuervey,
        PullUserSurveys,
        DeletTargetSurvey,
        PullOldUserSurveys,
        PullAllSurveys,
        UserData,
        Data,
        OwnServeys,
        OldSrveys,
        Surveys
    }


    return (
        <UserContext.Provider value={SharedObject}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext }