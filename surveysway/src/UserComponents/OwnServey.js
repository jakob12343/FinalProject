import React, { useContext, useEffect } from 'react'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { UserContext } from './UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const OwnServey = () => {
  const { PullUserSurveys, DeletTargetSurvey, OwnServeys } = useContext(UserContext)
  const now = 60;

  useEffect(() => {
    PullUserSurveys()
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    // eslint-disable-next-line
  }, [OwnServeys])
  const CallculateVotes = (survey, vote) => {
    const results = survey.responses.filter(item => item.responses.answers[0] === vote)
    return results / (OwnServeys.length / 100)

  }
  const drawAnswer = (survey, item, i) => {
    const result = CallculateVotes(survey, item)
    return <div key={i}> <Card.Text >
      Answer Number {i + 1}: {item}
    </Card.Text>
      <ProgressBar now={result} label={`${result}%`} />

    </div>
  }
  const DeletSurvey = (survey) => {
    DeletTargetSurvey(survey.target.name)
  }
  return (
    <div>
      {OwnServeys.map((survey, index) => (
        <div key={index}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{survey.purpose}</Card.Title>
              <Card.Title>{survey.title}</Card.Title>
              <Card.Text>
                Duration: {new Date(survey.duration).toLocaleDateString('en-GB')}
              </Card.Text>
              <Card.Text>
                question: {survey.questions[0].text}
              </Card.Text>
              answers : {survey.questions[0].options.map((item, i) => drawAnswer(survey, item, i))}
              <Card.Text>
                Public? : {survey.isPublic && <FontAwesomeIcon icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
                {!survey.isPublic && <FontAwesomeIcon icon={faXmark} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
              </Card.Text>
              <Card.Text>
                {survey.responses.length} VOTES

              </Card.Text>
              <Button name={survey._id} onClick={DeletSurvey} variant="primary">Delete This Survey</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default OwnServey