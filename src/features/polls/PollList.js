import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {getAllPolls, selectPolls } from './pollsSlice';
import{ getAllUsers } from '../users/usersSlice'
 import { selectAuth, selectLoggedIn } from '../auth/authSlice';

import { PollCard } from './PollCard'
import './polls.css'

export const PollList = () => {
    const navigate = useNavigate();
    const polls = useSelector(selectPolls);
    const authUser = useSelector(selectAuth);
    const isLoggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();

    const [answered, setAnswered] = useState(false);
    const [authAnswerIds, setAuthAnswerIds] = useState([]);
    const toggleAnswered = ()=> {
        answered ? setAnswered(false) : setAnswered(true)
    }
    // arrayofobjects.sort(function (x,y){
    //        return x.key - y.key
    // })
    const displayPolls = (selectedPolls) => {
        const sortedPolls = selectedPolls.sort((x,y)=>  x - y)
        return sortedPolls.map(poll => <PollCard id={poll} pollId={poll} answered={answered} />)        
    }

    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/login')
        } else {
            dispatch(getAllUsers());
            dispatch(getAllPolls());
            setAuthAnswerIds(Object.keys(authUser.answers))
        }
    },[])
    
    return(
        <div >
            <h2 className="title">List of Polls</h2>
            answered <input type="checkbox" id="answered" name="answered" onClick={toggleAnswered} /> open
            <div className="polllist">                
                {answered  
                    ? displayPolls(authAnswerIds)
                    : displayPolls(polls.filter(poll => !authAnswerIds.includes(poll.id)).map(poll => poll.id))
                } 
            </div> 
        </div> 
    )
}