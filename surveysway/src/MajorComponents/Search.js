import React, { useContext, useState } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { UserContext } from '../UserComponents/UserContext';
import Votes from '../UserComponents/Votes';
import './Search.css';

const Search = () => {
    const { Alldetails } = useContext(UserContext);
    const [titleSelection, setTitleSelection] = useState(false);
    const [userSelection, setUserSelection] = useState(false);
    const [categorySelection, setCategorySelection] = useState(false);
    const [searchField, setSearchField] = useState("");
    const [surveysBySearch, setSurveysBySearch] = useState([]);
    const [profileSurvays, setProfileSurvays] = useState([]);

    const handleTitleSelection = () => {
        setTitleSelection(!titleSelection);
        setUserSelection(false);
        setCategorySelection(false);
    };

    const handleUserSelection = () => {
        setUserSelection(!userSelection);
        setTitleSelection(false);
        setCategorySelection(false);
    };

    const handleCategorySelection = () => {
        setCategorySelection(!categorySelection);
        setUserSelection(false);
        setTitleSelection(false);
    };

    const handleChange = (e) => {
        setSearchField(e.target.value);
    };

    const handleSubmit = () => {
        let filteredSurveys = Alldetails.Allsurveys;
        let userSurvays = Alldetails.exclusiveSurveys;

        if (titleSelection) {
            filteredSurveys = filteredSurveys.filter(survey => survey.title === searchField);
            userSurvays = userSurvays.filter(survey => survey.title === searchField);
        }
        if (userSelection) {
            filteredSurveys = filteredSurveys.filter(survey => survey.authorUsername === searchField);
            userSurvays = userSurvays.filter(survey => survey.authorUsername === searchField);
        }
        if (categorySelection) {
            filteredSurveys = filteredSurveys.filter(survey => survey.category === searchField);
            userSurvays = userSurvays.filter(survey => survey.category === searchField);
        }

        setSurveysBySearch(filteredSurveys);
        setProfileSurvays(userSurvays);
        setTitleSelection(false);
        setUserSelection(false);
        setCategorySelection(false);
        setSearchField('')
    };

    return (
        <div className="search-container">
            <TextField onChange={handleChange} value={searchField} id="filled-basic" label="Search" variant="filled" />
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={titleSelection} onChange={handleTitleSelection} />} label="Title" />
                <FormControlLabel control={<Checkbox checked={userSelection} onChange={handleUserSelection} />} label="User Name" />
                <FormControlLabel control={<Checkbox checked={categorySelection} onChange={handleCategorySelection} />} label="Category" />
            </FormGroup>
            <Button onClick={handleSubmit} variant="outlined">Submit</Button>
            <div className="survey-results">
                {surveysBySearch.length > 0 ? (
                    surveysBySearch.map((survey, index) => (
                        <Votes key={index} survey={survey} />
                    ))
                ) : (
                    <p className="no-surveys">No surveys found</p>
                )}
            </div>
            <div className="survey-results">
                {profileSurvays.length > 0 ? (
                    profileSurvays.map((survey, index) => (
                        <Votes key={index} survey={survey} />

                    ))
                ) : (
                    <p className="no-surveys">No surveys found</p>
                )}
            </div>
        </div>
    );
};

export default Search;
