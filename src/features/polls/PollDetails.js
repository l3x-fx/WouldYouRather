import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { selectAuth, selectLoggedIn, saveAnswerToAuth } from '../auth/authSlice';
import { selectUsers } from '../users/usersSlice';
import { getAllPolls, selectPolls, savePollAnswer } from './pollsSlice';
import { getAllUsers } from '../users/usersSlice'

import { Error } from '../../app/Error';
import dummy from '../../icons/ava-dummy.png';
import './polldetails.css'

export const PollDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const polls = useSelector(selectPolls);
    const users = useSelector(selectUsers);
    const authUser = useSelector(selectAuth);
    const isLoggedIn = useSelector(selectLoggedIn);  

    const [answered, setAnswered] = useState(false);
    const [isPoll, setIsPoll] = useState(true)
    const { question_id } = useParams();

    const poll = polls[question_id]; 

    const countOne = poll.optionOne.votes.length;
    const countTwo = poll.optionTwo.votes.length;

    const percentageOne = () => {

        if (countOne+countTwo !== 0){ 
            return (countOne*100)/(countOne + countTwo)
        } else {return 0}
    };
    const percentageTwo = () => {
        if (countOne+countTwo !== 0){ 
            return (countTwo*100)/(countOne + countTwo)
        } else {return 0}
    };

    const checkAnswered = (id) => {
        if (Object.keys(authUser.answers).includes(id)) {
            setAnswered(true)
        } else if (Object.keys(polls).includes(id)) {
            setAnswered(false)
        } else {
            setIsPoll(false)
        }
    }

    const handleVote = (e) => {
        e.preventDefault(); 
        dispatch(savePollAnswer({authedUser:authUser.id, qid:question_id, answer:e.target.name}))
        dispatch(saveAnswerToAuth({[question_id]: e.target.name}))
        navigate('/');
    }

    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/login')
        } else {
            dispatch(getAllUsers());
            dispatch(getAllPolls());  
            checkAnswered(question_id);
        }
    },[navigate, dispatch])

    if (isPoll) {
    return(
        <div className="blah">
        <div className="quest-detail">
            <div className="quest-title">
                <div className="ava qava"><img src={dummy} alt='avatar dummy' /></div>
                <div className="quest-name">{users[poll.author].name} asks:</div>
                <h2 className="quest-detail-title">Would you rather ... </h2>
            </div>
        {/* ------------------------------ */}
            <div 
                className="check DcheckA" 
                style={{
                    display: answered ? 'block':'none', 
                    color: answered && authUser.answers[poll.id] === 'optionOne' ? '#07aa07' : '#cc0606'
                    }}
            >{answered && authUser.answers[poll.id] === 'optionOne' ? '✓' : '✗'}</div> 
            <div className="det DoptA">... {poll.optionOne.text} </div> 
            <div className="det DoptB">... {poll.optionTwo.text}</div> 
            <div 
                className="check DcheckB" 
                style={{
                    display: answered ? 'block':'none', 
                    color: answered && authUser.answers[poll.id] === 'optionTwo' ? '#07aa07' : '#cc0606'
                }}
            >{answered && authUser.answers[poll.id] === 'optionTwo' ? '✓' : '✗'} </div>
        {/* ------------------------------ */}
            <div className="statsA" style={{display: answered ? 'block':'none'}}>
                <div className="resultbarA">
                    <div className="resultA" style={{width: percentageOne()+'%'}}>&nbsp;{percentageOne()}% </div>
                </div>
                <div className="votesA">{countOne} votes</div> 
            </div>
           <div className="statsB" style={{display: answered ? 'block':'none'}}>
                <div className="resultbarB" >
                    <div className="resultB" style={{width: percentageTwo()+'%'}}>&nbsp;{percentageTwo()}%</div>
                </div>
                <div className="votesB">{countTwo} votes</div> 
            </div>
            

            <button 
                className="btn btnoptA" 
                style={{display: !answered ? 'block':'none'}}
                name='optionOne'
                onClick={handleVote}
            >Vote For Option A</button>

            <button 
                className="btn btnoptB" 
                style={{display: !answered ? 'block':'none'}}
                name='optionTwo'
                onClick={handleVote}
            >Vote For Option B</button>

            <button className="btn btnback" onClick={()=> navigate('/')} >Back</button>
        </div>
        </div>
    )
    } else {return <Error />}
}