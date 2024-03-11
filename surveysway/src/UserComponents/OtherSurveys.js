import React, { useContext, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { UserContext } from './UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const OtherSurveys = () => {
    const { PullAllSurveys, Surveys } = useContext(UserContext)
    useEffect(() => {
        PullAllSurveys()
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        console.log(Surveys);
        // eslint-disable-next-line
    }, [Surveys])
    const drawAnswer = (item, i) => {
        return <Card.Text key={i}>
            Answer Number {i + 1}: {item}
        </Card.Text>
    }

    return (
        <div>
            {Surveys.map((survey, index) => (
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

                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    )
}

export default OtherSurveys