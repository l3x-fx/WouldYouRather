import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { selectAuth, selectLoggedIn } from '../auth/authSlice';
import { selectUsers } from '../users/usersSlice';
import { getAllPolls, selectPolls, savePollAnswer, selectPollsStatus } from './pollsSlice';

import { Error } from '../../app/Error';
import dummy from '../../icons/ava-dummy.png';
import './polldetails.css'

export const PollDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const polls = useSelector(selectPolls);
    const pollsStatus = useSelector(selectPollsStatus)
    const users = useSelector(selectUsers);
    const authUser = useSelector(selectAuth); 
    const isLoggedIn = useSelector(selectLoggedIn);  

    const [answered, setAnswered] = useState(false);
    const [isPoll, setIsPoll] = useState(true)
    const { question_id } = useParams();

    const poll = polls[question_id]; 

    const countOne = poll !== undefined ? poll.optionOne.votes.length : 0;
    const countTwo = poll !== undefined ? poll.optionTwo.votes.length : 0;

    const percentageOne = () => {
        if (countOne+countTwo !== 0){ 
            return Math.round((countOne*100)/(countOne + countTwo))
        } else {return 0}
    };
    const percentageTwo = () => {
        if (countOne+countTwo !== 0){ 
            return Math.round((countTwo*100)/(countOne + countTwo))
        } else {return 0}
    };

    const checkPoll = (id) => {
        if (!Object.keys(polls).includes(id)) {
            setIsPoll(false)
        } else if (poll.optionOne.votes.includes(authUser.id) || poll.optionTwo.votes.includes(authUser.id) ) {
            setAnswered(true)
            setIsPoll(true)
        } else {
            setAnswered(false)
        } 
    }

    const handleVote = (e) => {
        e.preventDefault(); 
        dispatch(savePollAnswer({authedUser:authUser.id, qid:question_id, answer:e.target.name}))
        dispatch(getAllPolls());  
        setAnswered(true)
    }

    useEffect(()=> {
        if(!isLoggedIn && isPoll ) {
            navigate('/login')
        } else {
            dispatch(getAllPolls());  
            checkPoll(question_id)
        }
    },[])

    if (poll !== undefined && pollsStatus==='idle') {
        return(
            <div className="blah">
            <div className="quest-detail">
                {/* HEADER */}
                <div className="quest-title">
                    <div className="ava qava"><img src={users[poll.author].avatarURL || dummy } alt='avatar dummy' /></div>
                    <div className="quest-name">{users[poll.author].name} asks:</div>
                    <h2 className="quest-detail-title">Would you rather ... </h2>
                </div>

                {/* QUESTIONS */}
                <div 
                    className="check DcheckA" 
                    style={{
                        display: answered ? 'block':'none', 
                        color: answered && poll.optionOne.votes.includes(authUser.id)  ? '#07aa07' : '#cc0606' 
                        }}
                >
                    {answered && poll.optionOne.votes.includes(authUser.id)  ? '✓' : '✗'}
                </div>  
                <div className="det DoptA"> <span>A: </span> {poll.optionOne.text} </div> 
                <div className="det DoptB"> <span>B: </span> {poll.optionTwo.text}</div> 
                <div 
                    className="check DcheckB" 
                    style={{
                        display: answered ? 'block':'none', 
                        color: answered && poll.optionTwo.votes.includes(authUser.id) ? '#07aa07' : '#cc0606' 
                    }}
                >
                    {answered && poll.optionTwo.votes.includes(authUser.id) ? '✓' : '✗'} 
                </div>  

                {/* RESULTS */}
                <div className="statsA" style={{display: answered ? 'block':'none'}}>
                    <div className="resultbarA">
                        <div className="resultA" style={{width: percentageOne()+'%'}}>&nbsp;{percentageOne()}% </div>
                    </div>
                    <div className="votesA">{countOne} votes</div> 
                </div>

                {/* BUTTON */}
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
                >Vote A</button>

                <button 
                    className="btn btnoptB" 
                    style={{display: !answered ? 'block':'none'}}
                    name='optionTwo'
                    onClick={handleVote}
                >Vote B</button>

                <button className="btn btnback" onClick={()=> navigate('/')} >Back</button>
            </div>
            </div>
        )
    } else if (pollsStatus==='loading') {
        return <h2>Loading...</h2>
    } else {return <Error />}
}