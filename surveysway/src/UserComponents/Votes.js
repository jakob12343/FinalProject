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
        console.log(Data);
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
        if (Data.username==='Guest') {
            console.log(vote);
            const array = survey.responses;
            array.push(vote);
            survey.responses = array;
            Vote(survey);
            setshowBars(true)
        }
        else {
            const array = survey.responses.filter((item) => item.user !== Data._id);
            array.push(vote);
            survey.responses = array;
            Vote(survey);
            setshowBars(true)
        }
        
    };

    const drawAnswer = (survey, item, i) => {
        const isSelected = selectedOption === i;
        const result = showBars ? calculateVotes(survey, i) : null;
    
        return (
            <div className={`Votes-Card ${isSelected && hasVoted ? 'selected-temp' : 'unselected-temp'}`} key={i} onClick={() => handleVote(i)}>
                <div >Answer Number {i + 1}: {item}</div>
                {showBars && <ProgressBar className='Votes-ProgressBar' now={result} label={`${ result.toFixed(2)}%`} />}
                {isSelected && <FontAwesomeIcon icon={faCheck} style={{ marginLeft: '10px' }} />}
            </div>
        );
    };
    

    return (
        <div className='Votes-container'>
            <Card className='Votes-Card' style={{ width: '18rem' }}>
                <Card.Body className='Votes-Card-Body'>
                    <Card.Title className='Votes-Card-Title '>{survey.purpose}</Card.Title>
                    <Card.Title className='Votes-Card-Title '>{survey.title}</Card.Title>
                    <div>question: {survey.questions[0].text}</div>
                    <div>answers: {survey.questions[0].options.map((item, i) => drawAnswer(survey, item, i))}</div>
                    {hasVoted && <Button className='Votes-Button' onClick={submitVote}>Save Vote</Button>}
                    <Card.Text className='Card-Text'>
                       published by {survey.authorUsername }
                    </Card.Text>
                    <Card.Text className='Card-Text'>
                        Public?: 
                        {survey.isPublic ? <FontAwesomeIcon className='Votes-FontAwesomeIcon' icon={faCheck} style={{ marginLeft: '10px' }} /> : <FontAwesomeIcon icon={faXmark} style={{ marginLeft: '10px' }} />}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Votes;
