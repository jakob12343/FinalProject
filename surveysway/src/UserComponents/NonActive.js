
import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { UserContext } from './UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const NonActive = () => {
    const { PullOldUserSurveys, OldSrveys } = useContext(UserContext)
    useEffect(() => {
        PullOldUserSurveys()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        // eslint-disable-next-line
    }, [OldSrveys])
    const drawAnswer = (item, i) => {
        return <Card.Text key={i}>
            Answer Number {i + 1}: {item}
        </Card.Text>
    }

    return (
        <div>
            {OldSrveys.map((survey, index) => (
                <div key={index}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{survey.purpose}</Card.Title>
                            <Card.Title>{survey.title}</Card.Title>
                            <Card.Text>
                                question: {survey.questions[0].text}
                            </Card.Text>
                            answers : {survey.questions[0].options.map((item, i) => drawAnswer(item, i))}
                            <Card.Text>
                                Public? : {survey.isPublic && <FontAwesomeIcon icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
                                {!survey.isPublic && <FontAwesomeIcon icon={faXmark} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
                                <Card.Text>
                            </Card.Text>
                            This Poll Is Closed

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default NonActive