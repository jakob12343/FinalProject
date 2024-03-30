import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';
import { UserContext } from './UserContext';
import './CssFiles/Votes.css';

const Votes = ({ survey }) => {
    const { Data, Vote } = useContext(UserContext);
    const [vote, setVote] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState(false); // Track if the user has voted
const [showBars,setshowBars]=useState(false)
    const handleVote = (optionIndex) => {
        const newVote = {
            option: optionIndex,
            user: Data._id,
        };
        setVote(newVote);
        setSelectedOption(optionIndex);
        setHasVoted(true); // Update the state to indicate the user has voted
        setshowBars(false)

    };

    const calculateVotes = (survey, optionIndex) => {
        let count = 0;
        survey.responses.forEach((item) => {
            if (item.option === optionIndex) {
                count++;
            }
        });
        return (count / survey.responses.length) * 100;
    };

    const submitVote = () => {
        const array = survey.responses.filter((item) => item.user !== Data._id);
        array.push(vote);
        survey.responses = array;
        Vote(survey);
        setshowBars(true)
    };

    const drawAnswer = (survey, item, i) => {
        const result = showBars ? calculateVotes(survey, i) : null; // Calculate results only if hasVoted is true

        return (
            <div key={i} className={`Card-Text ${selectedOption === i ? 'selected' : ''}`} onClick={() => handleVote(i)}>
                <div>Answer Number {i + 1}: {item}</div>
                {/* Conditionally render ProgressBar only after voting */}
                {showBars && <ProgressBar className='ProgressBar' now={result} label={`${result.toFixed(2)}%`} />}
                {selectedOption === i && <FontAwesomeIcon icon={faCheck} style={{ marginLeft: '10px' }} />}
            </div>
        );
    };

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{survey.purpose}</Card.Title>
                    <Card.Title>{survey.title}</Card.Title>
                    <div>question: {survey.questions[0].text}</div>
                    <div>answers: {survey.questions[0].options.map((item, i) => drawAnswer(survey, item, i))}</div>
                    {hasVoted && <Button onClick={submitVote}>Save Vote</Button>}
                    <Card.Text>
                        Public?: 
                        {survey.isPublic ? <FontAwesomeIcon icon={faCheck} style={{ marginLeft: '10px' }} /> : <FontAwesomeIcon icon={faXmark} style={{ marginLeft: '10px' }} />}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Votes;
