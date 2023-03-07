import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectPolls } from './pollsSlice';
import{ selectUsers } from '../users/usersSlice'

export const PollCard = ({pollId, answered}) => {
    const navigate = useNavigate();
    const polls = useSelector(selectPolls);
    const users = useSelector(selectUsers);

    const poll = polls.find(poll => poll.id === pollId); 
    const user = users.find(user => user.id === poll.author);

    console.log('blah ' + JSON.stringify(poll))
    
    return(
        <div className="cardbox">
            <div className="cardinfo">
                <div className="cardname">{user.name}</div>
                <div className="carddate">{new Date(poll.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
            </div>
            <div className="card-quest">
                <div className="quest">Would you rather...  </div>
                <div className="Q checkA" style={{display: answered ? 'block':'none'}}>✓ </div>                
                <div className="Q optA">{poll.optionOne.text}</div>
                <div className="Q checkB" style={{display: answered ? 'block':'none'}}>✗ </div>
                <div className="Q optB">{poll.optionTwo.text} </div> 
                            </div>
            <button className="btn-card"> {answered ? 'Show Details' : 'Vote Now'} </button>
        </div>
    )
}