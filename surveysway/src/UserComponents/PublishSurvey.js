


import React, { useState } from 'react';
import './CssFiles/PublishSurvey.css';
import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from './UserContext';

const PublishSurvey = () => {
  const { AddSuervey } = useContext(UserContext)
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState([]);
  const [selectedReligiousAffiliations, setSelectedReligiousAffiliations] = useState([]);

  const [survey, setSurvey] = useState({
    title: '',
    category: '',
    question: { text: '', options: ['', ''] }, // Initialize with two empty options
    duration: '',
    isPublic: false,
    targetAudience: '',
    purpose: '',
  });
  const ageRanges = ["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65 and over"];
  const Religions = ["Jewish", "Muslims", "Christian", "Undefined"]
  const Genders = ["Male", "Woman", "Undefined"]
  const PersonalStatus = ["Singel", "Married", "Divorced", "Widow", "Undefined"]
  const surveyCategories = [
    "Arts & Culture",
    "Business & Economics",
    "Education",
    "Environment",
    "Health & Wellness",
    "Politics & Governance",
    "Science & Technology",
    "Sports",
    "Entertainment & Media",
    "Food & Beverage",
    "Lifestyle",
    "Travel & Tourism",
    "Social Issues",
    "Religion & Spirituality",
    "History",
    "Fashion & Beauty",
    "Hobbies & Crafts",
    "Home & Garden",
    "Pets & Animals",
    "Relationships & Family"
  ];


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
  const toggleGender = (gender) => {
    setSelectedGenders((prevSelected) =>
      prevSelected.includes(gender)
        ? prevSelected.filter((g) => g !== gender)
        : [...prevSelected, gender]
    );
  };
  const toggleAgeRange = (range) => {
    setSelectedAgeRanges(prev => prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]);
  };

  const toggleMaritalStatus = (status) => {
    setSelectedMaritalStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };
  const toggleReligiousAffiliation = (affiliation) => {
    setSelectedReligiousAffiliations(prev => prev.includes(affiliation) ? prev.filter(a => a !== affiliation) : [...prev, affiliation]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let choices = []
    selectedAgeRanges.map(choice => choices.push(choice))
    selectedGenders.map(choice => choices.push(choice))
    selectedMaritalStatuses.map(choice => choices.push(choice))
    selectedReligiousAffiliations.map(choice => choices.push(choice))
    survey.targetAudience=choices
    AddSuervey(survey)
    setSelectedAgeRanges([])
    setSelectedGenders([])
    setSelectedMaritalStatuses([])
    setSelectedReligiousAffiliations([])
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
        <Form.Select
          value={survey.category}
          onChange={handleChange}
          name="category"
          required
        >
          <option value="">Select category</option>
          {surveyCategories.map((el) => (
            <option key={el} value={el}>
              {el}
            </option>
          ))}
        </Form.Select>
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

      {!survey.isPublic && <div className='form-group'>
        <Form.Label className='form-label'>Genders? :</Form.Label>
        <div className='category-list'>
          {Genders.map(gender => (
            <label key={gender} className="category-item">
              <input
                type="checkbox"
                checked={selectedGenders.includes(gender)}
                onChange={() => toggleGender(gender)}
              />
              {gender}
            </label>
          ))}
        </div>
        <Form.Label className='form-label'>Age? :</Form.Label>
        <div className='category-list'>
          {ageRanges.map(range => (
            <label key={range} className="category-item">
              <input
                type="checkbox"
                checked={selectedAgeRanges.includes(range)}
                onChange={() => toggleAgeRange(range)}
              />
              {range}
            </label>
          ))}
        </div>
        <Form.Label className='form-label'>Personal Status? :</Form.Label>
        <div className='category-list'>
          {PersonalStatus.map(status => (
            <label key={status} className="category-item">
              <input
                type="checkbox"
                checked={selectedMaritalStatuses.includes(status)}
                onChange={() => toggleMaritalStatus(status)}
              />
              {status}
            </label>
          ))}
        </div>
        <Form.Label className='form-label'>Religions? :</Form.Label>
        <div className='category-list'>
          {Religions.map(affiliation => (
            <label key={affiliation} className="category-item">
              <input
                type="checkbox"
                checked={selectedReligiousAffiliations.includes(affiliation)}
                onChange={() => toggleReligiousAffiliation(affiliation)}
              />
              {affiliation}
            </label>
          ))}
        </div>
      </div>
      }

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
