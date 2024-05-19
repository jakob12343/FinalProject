import { createContext, useContext, useEffect, useState } from "react";
import { MainContext } from "../MainContext";
import axios from "axios";

const UserContext = createContext()
const UserProvider = ({ children }) => {
    const { usertoken, UserData, Alldetails } = useContext(MainContext)
    const [Data, setData] = useState({})
    const [OwnServeys, setOwnServeys] = useState([]);
    const [OldSrveys, setOldSrveys] = useState([]);
    const [Surveys, setSurveys] = useState([]);
    const [SurveyResults, setSurveyResults] = useState([]);
    const [historyVoetes, setHistoryVoetes]=useState([]);
    const [SurveysByprofile, setSurveysByprofile]=useState([]);
    useEffect(() => {
        setData(Alldetails.user)
        setOldSrveys(Alldetails.OldSurveys ?? []);
        setSurveys(Alldetails.Allsurveys ?? []);
        setOwnServeys(Alldetails.surveys ?? []);
        setSurveyResults(Alldetails.results ?? []);
        setHistoryVoetes(Alldetails.voteHistory??[]);
        setSurveysByprofile(Alldetails.exclusiveSurveys??[]);
        // eslint-disable-next-line
    }, [Alldetails])
    useEffect(() => {
        // eslint-disable-next-line
    }, [Surveys]);

    const PullUserSurveys = async () => {

        const url = `http://localhost:3000/PullUserSurveys?Username=${UserData.username}&usertoken=${usertoken}`;
        const data = await axios.get(url)
        setOwnServeys(data.data)


    }
    const PullAllSurveys = async () => {
        const url = `http://localhost:3000/PullAllSurveys?Username=${UserData.username}&usertoken=${usertoken}`;
        const data = await axios.get(url)
        //console.log(data.data);
        setSurveys(data.data)
    }

    const PullOldUserSurveys = async () => {
        // Example URL, adjust as needed
        const url = `http://localhost:3000/PullOldUserSurveys?Username=${UserData.username}&usertoken=${usertoken}`;
        const response = await axios.get(url);
        // Assuming response.data contains your surveys
        setSurveys(response.data);
    };


    const PullUserDetails = async () => {
        const url = `http://localhost:3000/PullUserDetails?Username=${UserData.username}&usertoken=${usertoken}`;

        const data = await axios.get(url)
        setData(data.data)
        return data.data
    }
    const UpdateUserDetails = async (user) => {
        const url = `http://localhost:3000/UpdateUserDetails?&usertoken=${usertoken}`;
        const status = await axios.put(url, user)
        return status

    }
    const AddSuervey = async (survey) => {
        const url = `http://localhost:3000/PublishSuervey?&usertoken=${usertoken}`;
        // eslint-disable-next-line
        const status = await axios.post(url, { survey, Data })
        PullUserSurveys()

    }
    const Vote = async (vote) => {
        const url = `http://localhost:3000/Vote?&usertoken=${usertoken}`;
        const status = await axios.put(url, vote)
        PullAllSurveys()
        return status

    }
    const DeletTargetSurvey = async (id) => {
        const url = `http://localhost:3000/DeletTargetSurvey?&usertoken=${usertoken}&&_id=${id}&&Username=${UserData.username}`;
        const status = await axios.delete(url)
        if (status.status === 200) {
            setOwnServeys(status.data.surveys)
            setOldSrveys(status.data.OldSurveys)

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
        Vote,
        SurveyResults,
        historyVoetes,
        UserData,
        Data,
        OwnServeys,
        OldSrveys,
        Surveys,
        Alldetails,
        SurveysByprofile
    }


    return (
        <UserContext.Provider value={SharedObject}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext }