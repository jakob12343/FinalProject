import React, { useContext } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { UserContext } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import './CssFiles/OwnServey.css';

const OwnSurvey = () => {
  const { DeletTargetSurvey, OwnServeys } = useContext(UserContext);

  const calculateVotes = (survey, optionIndex) => {
    let count = 0;
    survey.responses.forEach((response) => {
      // Checking if the response's option matches the optionIndex
      if (response.option === optionIndex) {
        count++;
      }
    });
  
    let totalResponses = survey.responses.length;
    return totalResponses > 0 ? (count / totalResponses) * 100 : 0;
  };
  

const drawAnswer = (survey, item, i) => {
    const result = calculateVotes(survey, i);
    return (
        <div key={i}>
            <div className='Card-Tex'>
                Answer Number {i + 1}: {item}
            </div>
            <ProgressBar className='ProgressBar' now={result} label={`${result}%`} />
        </div>
    );
};


  const deleteSurvey = (surveyId) => {
    DeletTargetSurvey(surveyId);
  };

  return (
    <div>
      {OwnServeys.map((survey, index) => (
        <div key={index}>
          <Card className='Card' style={{ width: '18rem' }}>
            <Card.Body className='Card-Body'>
              <Card.Title className='Card-Title'>{survey.purpose}</Card.Title>
              <Card.Title className='Card-Title'>{survey.title}</Card.Title>
              <div className='Card-Tex'>
                Duration: {new Date(survey.duration).toLocaleDateString('en-GB')}
              </div>
              <div className='Card-Tex'>
                question: {survey.questions[0].text}
              </div>
              answers: {survey.questions[0].options.map((item, i) => drawAnswer(survey, item, i))}
              <div className='Card-Tex'>
                Public?: 
                {survey.isPublic ? <FontAwesomeIcon className='FontAwesomeIcon' icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} /> : <FontAwesomeIcon className='FontAwesomeIcon' icon={faXmark} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
              </div>
              <div className='Card-Tex'>
                Total Responses: {survey.responses.length}
              </div>
              <Button className='Button' name={survey._id} onClick={() => deleteSurvey(survey._id)} variant="primary">Delete This Survey</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default OwnSurvey;
