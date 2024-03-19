
import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { UserContext } from './UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import './CssFiles/NonActive.css'
const NonActive = () => {
    const {  OldSrveys} = useContext(UserContext)
   
    useEffect(() => {
        // eslint-disable-next-line
    }, [OldSrveys])
    const drawAnswer = (item, i) => {
        return <div key={i}>
            Answer Number {i + 1}: {item}
        </div>
    }

    return (
        <div>
            {OldSrveys.map((survey, index) => (
                <div key={index}>
                    <Card className='Card' style={{ width: '18rem' }}>
                        <Card.Body className='Card-Body'>
                            <Card.Title className='Card-Title'>{survey.purpose}</Card.Title>
                            <Card.Title className='Card-Title'>{survey.title}</Card.Title>
                            <div className='Card-Tex'>
                                question: {survey.questions[0].text}
                            </div>
                            answers : {survey.questions[0].options.map((item, i) => drawAnswer(item, i))}
                            <div className='Card-Tex'>
                                Public? : {survey.isPublic && <FontAwesomeIcon icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
                                {!survey.isPublic && <FontAwesomeIcon icon={faXmark} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
                            </div>
                            This Poll Is Closed

                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default NonActive