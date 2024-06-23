
import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { UserContext } from './UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import './CssFiles/NonActive.css'
import Votes from './Votes'
const NonActive = () => {
    const {  OldSrveys,historyVoetes} = useContext(UserContext)
   
    useEffect(() => {
        // eslint-disable-next-line
    }, [OldSrveys])
    const drawAnswer = (item, i) => {
        return <div className='Non-Active-Card-Tex' key={i}>
            Answer Number {i + 1}: {item}
        </div>
    }

    return (
        <div className='Non-Active-Container'>
                                        
            <Card.Title className='Non-Active-Card-Title'>Survays You Voted</Card.Title>
            {historyVoetes.length===0&& <h3>You Didn't Vote To Any Survay Yet </h3>}

            <div className='non-active-section'>
            {historyVoetes.map((survey, index) => (
                <Votes index={index} survey={survey} key={index}/>
            ))}
            </div>
            <Card.Title className='Non-Active-Card-Title'>Your Old Surveys</Card.Title>

            <div className='non-active-section'>
                {OldSrveys.length===0&& <h3>You Don't Have Any Survey History Yet </h3>}

            {OldSrveys.map((survey, index) => (
                <div key={index}>
                    <Card className='Non-Active-Card' style={{ width: '18rem' }}>
                        <Card.Body className='Non-Active-Card-Body'>
                            <Card.Title className='Non-Active-Card-Title'>{survey.purpose}</Card.Title>
                            <Card.Title className='Non-Active-Card-Title'>{survey.title}</Card.Title>
                            <div className='Non-Active-Card-Tex'>
                                question: {survey.questions[0].text}
                            </div>
                            Answers : {survey.questions[0].options.map((item, i) => drawAnswer(item, i))}
                            <div className='Non-Active-Card-Tex'>
                                Public? : {survey.isPublic && <FontAwesomeIcon className='Non-Active-FontAwesomeIcon' icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
                                {!survey.isPublic && <FontAwesomeIcon className='Non-Active-FontAwesomeIcon' icon={faXmark} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
                            </div>
                            This Poll Is Closed

                        </Card.Body>
                    </Card>
                </div>
            ))}</div>
        </div>
    )
}

export default NonActive