import React, { useContext, useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
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
            <Card.Title className='Non-Active-Card-Title'>Surveys That Matches Your Profile</Card.Title>
            <div className='OtherSurveys-survey-container'>
                {exclusive.length === 0 && <h3>No Survay Has Been Found Yet </h3>}
                {exclusive.map((survey, index) => (
                    <Votes index={index} survey={survey} key={index} />
                ))}
            </div>
            <Card.Title className='Non-Active-Card-Title'>Suggasted Surveys</Card.Title>
            <div className='OtherSurveys-survey-container'>
                {currents.length === 0 && <h3>No One Posted Any Survey Yet </h3>}
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