import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {getAllPolls, selectPolls } from './pollsSlice';
import { selectAuth, selectLoggedIn } from '../auth/authSlice';

import { PollCard } from './PollCard'
import './polls.css'

export const PollList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const polls = useSelector(selectPolls);
    const authUser = useSelector(selectAuth);
    const isLoggedIn = useSelector(selectLoggedIn);   

    const [answered, setAnswered] = useState(false);

    const toggleAnswered = ()=> {
        answered ? setAnswered(false) : setAnswered(true)
    }

    const displayPolls = (selectedPolls) => {
        return selectedPolls.map(poll => <PollCard key={poll.id} poll={poll} answered={answered} />)        
    }
    const answeredPolls = Object.values(polls)
                            .filter(poll =>  poll.optionOne.votes.includes(authUser.id) || poll.optionTwo.votes.includes(authUser.id) )   //  <<<<<<<<<<<<<<<<<<-------------------
                            .sort((x,y) => y.timestamp - x.timestamp)
    console.log('answered polls.....' + JSON.stringify(answeredPolls))
    const openPolls = Object.values(polls)
                            .filter(poll => !answeredPolls.includes(poll))   
                            .sort((x,y) => y.timestamp - x.timestamp)
    console.log('answered polls.....' + JSON.stringify(openPolls))

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
            answered <input type="checkbox" id="answered" name="answered" onClick={toggleAnswered} /> unanswered
            <div className="polllist">                
                {answered  
                    ? displayPolls(answeredPolls)
                    : displayPolls(openPolls)
                } 
            </div> 
        </div> 
    )
}