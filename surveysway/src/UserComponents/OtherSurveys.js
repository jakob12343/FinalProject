import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { UserContext } from './UserContext'
import Votes from './Votes'
import './CssFiles/OtherSurveys.css'
const OtherSurveys = () => {
    const { Surveys, PullAllSurveys, SurveysByprofile } = useContext(UserContext)
    const [currents, setcurrents] = useState([]);
    const [exclusive, setExclusive] = useState([]);
    useEffect(() => {

        setcurrents(Surveys)
        setExclusive(SurveysByprofile)
        // eslint-disable-next-line
    }, [Surveys])

    const RenderSurveysList = () => {
        PullAllSurveys()
    }
    return (
        <div>

            <div className='OtherSurveys-survey-container'>
                {exclusive.map((survey, index) => (
                    <Votes index={index} survey={survey} key={index} />
                ))}

            </div>
            <div className='OtherSurveys-survey-container'>
                {currents.map((survey, index) => (
                    <Votes index={index} survey={survey} key={index} />
                ))}

            </div>


            <div>
                <Button className='OtherSurveys-Button' onClick={RenderSurveysList} variant="primary">Upload More Surveys</Button>
            </div>
        </div>
    )
}

export default OtherSurveys