import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { UserContext } from './UserContext'
import Votes from './Votes'

const OtherSurveys = () => {
    const { Surveys, PullAllSurveys } = useContext(UserContext)
    const [currents, setcurrents] = useState([])
    useEffect(() => {

        setcurrents(Surveys)
        // eslint-disable-next-line
    }, [Surveys])

    const RenderSurveysList = () => {
        PullAllSurveys()
    }
    return (
        <div>
            {currents.map((survey, index) => (
                <div key={index}>
                <Votes index={index} survey={survey} />
                </div>
            ))}
            <div>
                <Button className='Button' onClick={RenderSurveysList} variant="primary">Upload More Surveys</Button>
            </div>
        </div>
    )
}

export default OtherSurveys