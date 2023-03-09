import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import{ selectUsers } from '../users/usersSlice'
import {selectAuth} from '../auth/authSlice'

export const PollCard = ({poll, answered}) => {
    const navigate = useNavigate();
    
    const users = useSelector(selectUsers);
    const authUser = useSelector(selectAuth); 

    const handleClick = () => {
        navigate(`questions/${poll.id}`)
    }
    
    return(
        <div className="cardbox">
            {/* HEADER */}
            <div className="cardinfo">
                <div className="cardname">{users[poll.author].name}</div>
                <div className="carddate">{new Date(poll.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
            </div>
            {/* QUESTION A*/}
            <div className="card-quest">
                <div className="quest">Would you rather...  </div>
                <div 
                    className="Q checkA" 
                    style={{
                        display: answered ? 'block':'none',
                        color: answered && poll.optionOne.votes.includes(authUser.id)  ? '#07aa07' : '#cc0606' 
                        }}>
                        {answered && poll.optionOne.votes.includes(authUser.id)  ? '✓' : '✗'}  
                </div>                
                <div className="Q optA"><span>A:</span> {poll.optionOne.text}</div>
             {/* QUESTION B*/}    
                <div 
                    className="Q checkB" 
                    style={{
                        display: answered ? 'block':'none',
                        color: answered && poll.optionTwo.votes.includes(authUser.id)  ? '#07aa07' : '#cc0606' 
                        }}> 
                        {answered && poll.optionTwo.votes.includes(authUser.id)  ? '✓' : '✗'} 
                </div>
                <div className="Q optB"><span>B:</span> {poll.optionTwo.text} </div> 
            </div>
             {/* BUTTON*/}
            <button className="btn-card" onClick={handleClick}> {answered ? 'Show Details' : 'Vote Now'} </button>
        </div>
    )
}