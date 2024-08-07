import { createContext, useContext, useEffect, useState } from "react";
import { MainContext } from "../MainContext";
import axios from "axios";

const UserContext = createContext()
const UserProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const { usertoken, UserData, Alldetails } = useContext(MainContext)
    const [Data, setData] = useState({})
    const [OwnServeys, setOwnServeys] = useState([]);
    const [OldSrveys, setOldSrveys] = useState([]);
    const [Surveys, setSurveys] = useState([]);
    const [SurveyResults, setSurveyResults] = useState([]);
    const [historyVoetes, setHistoryVoetes]=useState([]);
    const [SurveysByprofile, setSurveysByprofile]=useState([]);
    useEffect(() => {
        setData(Alldetails.user?? {_id: '669d48345455a61707752d2b',
        username: 'Guest',
        })
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
        const url = `${apiUrl}/PullUserSurveys?Username=${UserData.username}&usertoken=${usertoken}`;
        const data = await axios.get(url)
        setOwnServeys(data.data)


    }
    const PullAllSurveys = async () => {
        if (Data.username!=="Guest") {
            
        
        const url = `${apiUrl}/PullAllSurveys?Username=${UserData.username}&usertoken=${usertoken}`;
        const data = await axios.get(url)
        //console.log(data.data);
        setSurveys(data.data)
        }
    }

    const PullOldUserSurveys = async () => {
        // Example URL, adjust as needed
        const url = `${apiUrl}/PullOldUserSurveys?Username=${UserData.username}&usertoken=${usertoken}`;
        const response = await axios.get(url);
        // Assuming response.data contains your surveys
        setSurveys(response.data);
    };


    const PullUserDetails = async () => {
        const url = `${apiUrl}/PullUserDetails?Username=${UserData.username}&usertoken=${usertoken}`;

        const data = await axios.get(url)
        setData(data.data)
        return data.data
    }
    const UpdateUserDetails = async (user) => {
        const url = `${apiUrl}/UpdateUserDetails?&usertoken=${usertoken}`;
        const status = await axios.put(url, user)
        return status

    }
    const AddSuervey = async (survey) => {
        const url = `${apiUrl}/PublishSuervey?&usertoken=${usertoken}`;
        // eslint-disable-next-line
        const status = await axios.post(url, { survey, Data })
        PullUserSurveys()

    }
    const Vote = async (vote) => {
        console.log(vote);
        const url = `${apiUrl}/Vote?&usertoken=${usertoken}`;
        const status = await axios.put(url, vote)
        PullAllSurveys()
        return status

    }
    const DeletTargetSurvey = async (id) => {
        const url = `${apiUrl}/DeletTargetSurvey?&usertoken=${usertoken}&&_id=${id}&&Username=${UserData.username}`;
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