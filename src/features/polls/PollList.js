import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {getAllPolls, selectPolls } from './pollsSlice';
import { selectAuth, selectLoggedIn } from '../auth/authSlice';

import {getAnsweredPollsByUserID, getOpenPollsByUserID} from '../../utils/pollUtils'
import { PollCard } from './PollCard'
import './polls.css'
import './switch.css'

export const PollList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const polls = useSelector(selectPolls);
    const authUser = useSelector(selectAuth);
    const isLoggedIn = useSelector(selectLoggedIn);

    const [answered, setAnswered] = useState(false);

    const toggleAnswered = () => {
        answered ? setAnswered(false) : setAnswered(true)
    }

    const displayPolls = (selectedPolls) => {
        return selectedPolls.map(poll => <PollCard key={poll.id} poll={poll} answered={answered} />)
    }

    const answeredPolls = getAnsweredPollsByUserID(polls, authUser.id)

    const openPolls = getOpenPollsByUserID(polls, authUser.id)
  
    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/login')
        } else {
            dispatch(getAllPolls());
        }
    },[isLoggedIn, navigate, dispatch])

    return(
        <div >
            <h2 className="title">List of Polls</h2>

            <div className="outer">
                <div className="view">unanswered </div>                
                    <label htmlFor="answerToggle" className="toggle"> 
                        <input type="checkbox" id="answerToggle" onChange={toggleAnswered} />
                        <span className="roundbutton"></span>
                    </label>                
                <div className="view">answered </div>
            </div>   

            <div className="polllist">
                {answered
                    ? displayPolls(answeredPolls)
                    : displayPolls(openPolls)
                }
            </div>
        </div>
    )
}