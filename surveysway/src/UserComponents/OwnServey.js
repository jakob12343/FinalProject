import React, { useContext } from 'react';
import { Button, Card, ProgressBar } from 'react-bootstrap';
import { UserContext } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import './CssFiles/OwnServey.css';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

const OwnSurvey = () => {
  const { DeletTargetSurvey, OwnServeys, SurveyResults } = useContext(UserContext);

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
  const GetPieCart = (survey) => {
    let array = [];
    for (let index = 0; index < SurveyResults.length; index++) {
      const element = SurveyResults[index];
      if (element.surveyId === survey._id) {
        array = element.results
      }

    }
    const data = {
      labels: [
        "Single", "Married", "Divorced", "Widow",
        "Male", "Woman", "Jewish", "Muslims", "Christian", "Undefined"
      ],
      datasets: [{
        data: array,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
        borderColor: 'white', // Borders between sections
        borderWidth: 2
      }]
    };
    return data
  }
  const backgroundColors = [
    '#FF6384', // Single - Soft Red
    '#36A2EB', // Married - Soft Blue
    '#FFCE56', // Divorced - Soft Yellow
    '#6A2135', // Widow - Dark Maroon
    '#4BC0C0', // Male - Soft Teal
    '#FF9F40', // Woman - Orange
    '#9966FF', // Jewish - Soft Purple
    '#4D5360', // Muslims - Dark Grey
    '#E7E9ED', // Christian - Light Grey
    '#C9CBCF'  // Undefined - Medium Grey
  ];



  ChartJS.register(
    Tooltip, Legend, ArcElement, CategoryScale, LinearScale
  );

  const drawAnswer = (survey, item, i) => {
    const result = calculateVotes(survey, i);
    return (
      <div key={i}>
        <div className='Own-Survey-Card-Tex'>
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
    <div className='Own-Survey-container'>

      {OwnServeys.map((survey, index) => (
        <div key={index}>
          <Card className='Own-Survey-Card' style={{ width: '18rem' }}>
            <Pie data={GetPieCart(survey)} />

            <Card.Body className='Own-Survey-Card-Body'>
              <Card.Title className='Own-Survey-Card-Title'>{survey.purpose}</Card.Title>
              <Card.Title className='Own-Survey-Card-Title'>{survey.title}</Card.Title>
              <div className='Own-Survey-Card-Tex'>
                Duration: {new Date(survey.duration).toLocaleDateString('en-GB')}
              </div>
              <div className='Own-Survey-Card-Tex'>
                question: {survey.questions[0].text}
              </div >
              Answers: {survey.questions[0].options.map((item, i) => drawAnswer(survey, item, i))}
              <div className='Own-Survey-Card-Tex'>
                Public?:
                {survey.isPublic ? <FontAwesomeIcon className='Own-Survey-FontAwesomeIcon' icon={faCheck} style={{ marginLeft: '10px', cursor: 'pointer' }} /> : <FontAwesomeIcon className='FontAwesomeIcon' icon={faXmark} style={{ marginLeft: '10px', cursor: 'pointer' }} />}
              </div>
              <div className='Own-Survey-Card-Tex'>
                Total Responses: {survey.responses.length}
              </div>
              <Button className='Own-Survey-Button' name={survey._id} onClick={() => deleteSurvey(survey._id)} variant="primary">Delete This Survey</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default OwnSurvey;
