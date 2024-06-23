import React, { useState } from 'react';
import './CssFiles/PublishSurvey.css';
import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { Autocomplete, Box, Button, Snackbar, Step, StepLabel, Stepper, Switch, TextField } from '@mui/material';

const PublishSurvey = () => {
  const { AddSuervey } = useContext(UserContext)
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState([]);
  const [selectedReligiousAffiliations, setSelectedReligiousAffiliations] = useState([]);
  const steps = ['Survey Details', 'Target Audience', 'Questionare And Submit'];

  const [survey, setSurvey] = useState({
    title: '',
    category: 'Select Category',
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [snackOpen, setSnackOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleNext = (e) => {

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
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

    if (survey.title === '' || survey.category === 'Select Category' || !survey.duration) {
      setErrorMessage("Required details are missing. Please ensure you've filled out all required fields.");
      setSnackOpen(true);
    }
    else {
      let choices = []
      selectedAgeRanges.map(choice => choices.push(choice))
      selectedGenders.map(choice => choices.push(choice))
      selectedMaritalStatuses.map(choice => choices.push(choice))
      selectedReligiousAffiliations.map(choice => choices.push(choice))
      survey.targetAudience = choices
      AddSuervey(survey)
      setSelectedAgeRanges([])
      setSelectedGenders([])
      setSelectedMaritalStatuses([])
      setSelectedReligiousAffiliations([])
      setSurvey({
        title: '',
        category: 'Select Category',
        question: { text: '', options: ['', ''] }, // Initialize with two empty options
        duration: '',
        isPublic: false,
        targetAudience: '',
        purpose: '',
      })
      setActiveStep(0)
    }

    // Here, implement your logic to handle the survey data, such as sending it to a backend server
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <div>
          <div className='form-survey'>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              className='survey-input'
              name="title"
              type="text"
              value={survey.title}
              onChange={handleChange}
              required />


          </div>

          <div className='form-survey'>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={surveyCategories}
              sx={{ width: 300 }}
              onChange={(event, newValue) => {
                setSurvey((prevSurvey) => ({
                  ...prevSurvey,
                  category: newValue, // Assuming newValue is the string you want to set as category
                }));
              }}
              renderInput={(params) => <TextField {...params} label={survey.category} value={survey.category} required />}
            />
          </div>
          <div className='form-survey'>
            <Form.Label className='form-label'>Duration (YYYY-MM-DD):</Form.Label>
            <input
              className='survey-input'
              name="duration"
              type="date"
              value={survey.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>;
      case 1:
        return <div>
          <div className='form-survey '>
            <Form.Label className='form-label'>Is Public:</Form.Label>
            <br />

            <Switch
              className='survey-input'
              name="isPublic"
              checked={survey.isPublic}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
          {!survey.isPublic && <div className='form-survey '>
            <Form.Label className='form-label'>Genders? :</Form.Label>
            <div className='category-list form-user-selction'>
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
            <div className='category-list form-user-selction'>
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
            <div className='category-list form-user-selction'>
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
            <div className='category-list form-user-selction'>
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


          <div className='form-survey'>
            <TextField
              id="outlined-basic"
              label="Purpose"
              variant="outlined"
              className='survey-input'
              name="purpose"
              type="text"
              value={survey.purpose}
              onChange={handleChange} />
          </div>
        </div>;
      case 2:
        return <div>
          <div className="questions-section">
            <h3>Write Your Question And Least Tow Options  </h3>
            <TextField
              id="outlined-basic"
              label="Question Text"
              variant="outlined"
              className='survey-input'
              type="text"
              value={survey.question.text}
              onChange={handleQuestionTextChange}
              required
            />
            {survey.question.options.map((option, index) => (
              <div key={index}>
                <TextField
                  id="outlined-basic"
                  label={`Option ${index + 1}`}
                  variant="outlined"
                  className='survey-input'
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required />
                {survey.question.options.length > 2 && (
                  <button type="button" className="question-remove-button" onClick={() => removeOption(index)}>Remove Option</button>
                )}
              </div>
            ))}
            <button type="button" className="add-option-button" onClick={addOption}>Add Option</button>
          </div>

        </div>;

      default:
        return 'Unknown step';
    }
  };

  return (
    <div className='container-Survey'>
      <Snackbar
        open={snackOpen}
        anchorOrigin={{ vertical: 'top', horizontal: "center" }}

        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        message={errorMessage}
        action={
          <Button color="inherit" size="small" onClick={() => setSnackOpen(false)}>
            Close
          </Button>
        }
      />
      <h1>Publish A New Survey</h1>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack}>Back</Button>
            )}
            {activeStep === steps.length - 1 ? (
              <div>
                <Button className='Stepper-Button' type="submit">Submit Survey</Button>
                <Snackbar
                  autoHideDuration={6000}
                  message="The Survey Published"
                />
              </div>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </Box>
        </form>
      </Box>

    </div>
  );
};

export default PublishSurvey;
