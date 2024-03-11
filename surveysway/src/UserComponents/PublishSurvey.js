


import React, { useState } from 'react';
import './CssFiles/PublishSurvey.css';
import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const PublishSurvey = () => {
  const {AddSuervey}=useContext(UserContext)
  const [survey, setSurvey] = useState({
    title: '',
    category: '',
    question: { text: '', options: ['', ''] }, // Initialize with two empty options
    duration: '',
    isPublic: false,
    targetAudience: '',
    purpose: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleQuestionTextChange = (e) => {
    const { value } = e.target;
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      question: { ...prevSurvey.question, text: value },
    }));
  };
  const handleOptionChange = (optionIndex, value) => {
    let updatedOptions = [...survey.question.options];
    updatedOptions[optionIndex] = value;
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      question: { ...prevSurvey.question, options: updatedOptions },
    }));
  };
  // Add a new option to the question
  const addOption = () => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      question: { ...prevSurvey.question, options: [...prevSurvey.question.options, ''] },
    }));
  };

  // Remove an option from the question, ensuring at least two options remain
  const removeOption = (optionIndex) => {
    if (survey.question.options.length > 2) {
      let updatedOptions = survey.question.options.filter((_, index) => index !== optionIndex);
      setSurvey((prevSurvey) => ({
        ...prevSurvey,
        question: { ...prevSurvey.question, options: updatedOptions },
      }));
    } else {
      alert('A question must have at least two options.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
AddSuervey(survey)

    setSurvey({
      title: '',
      category: '',
      question: { text: '', options: ['', ''] }, // Initialize with two empty options
      duration: '',
      isPublic: false,
      targetAudience: '',
      purpose: '',
    })
    // Here, implement your logic to handle the survey data, such as sending it to a backend server
  };

  return (
    <Form className='form-wrapper' onSubmit={handleSubmit}>
      <h1>Publish A New Survey</h1>
      <div className='form-group'>
        <Form.Label className='form-label'>Title:</Form.Label>
        <Form.Control
          className='form-input'
          name="title"
          type="text"
          value={survey.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <Form.Label className='form-label'>Category:</Form.Label>

        <Form.Control
          className='form-input'
          name="category"
          type="text"
          value={survey.category}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
        <Form.Label className='form-label'>Duration (YYYY-MM-DD):</Form.Label>

        <Form.Control
          className='form-input'
          name="duration"
          type="date"
          value={survey.duration}
          onChange={handleChange}
          required
        />
      </div>

      <div className='form-group'>
      <Form.Label className='form-label'>Is Public:</Form.Label>

        <Form.Check
          className='form-input'
          name="isPublic"
          type="checkbox"
          checked={survey.isPublic}
          onChange={handleChange}
          
        />
      </div>

      <div className='form-group'>
        <Form.Label className='form-label'>Target Audience:</Form.Label>

        <Form.Control
          className='form-input'
          name="targetAudience"
          type="text"
          value={survey.targetAudience}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <Form.Label className='form-label'>Purpose:</Form.Label>

        <Form.Control
          className='form-input'
          name="purpose"
          type="text"
          value={survey.purpose}
          onChange={handleChange}
        />
      </div>
      <h3>Write Your Question And Least Tow Options  </h3>


      <div className="questions-section">
        <Form.Label className='form-label'>Question Text:</Form.Label>

        <Form.Control
          className='form-input'
          type="text"
          value={survey.question.text}
          onChange={handleQuestionTextChange}
          required
        />

        {survey.question.options.map((option, index) => (
          <div key={index}>
            <Form.Label className='form-label'>Option {index + 1}:</Form.Label>

            <Form.Control
              className='form-input'
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              
              required
            />
            {survey.question.options.length > 2 && (
              <button type="button" className="question-remove-button" onClick={() => removeOption(index)}>Remove Option</button>
            )}
          </div>
        ))}
        <button type="button" className="add-option-button" onClick={addOption}>Add Option</button>
      </div>

      <button type="submit" className='form-button'>Submit Survey</button>
    </Form>
  );
};

export default PublishSurvey;
