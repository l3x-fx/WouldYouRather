import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import{ selectUsers } from '../users/usersSlice'
import {selectAuth} from '../auth/authSlice'

export const PollCard = ({poll, answered}) => {
    const navigate = useNavigate();
    
    const users = useSelector(selectUsers);
    const authUser = useSelector(selectAuth); //  <<<<<<<<<<<<<<<<<<-------------------

    const handleClick = () => {
        navigate(`questions/${poll.id}`)
    }
    
    return(
        <div className="cardbox">
            <div className="cardinfo">
                <div className="cardname">{users[poll.author].name}</div>
                <div className="carddate">{new Date(poll.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })}</div>
            </div>
            <div className="card-quest">
                <div className="quest">Would you rather...  </div>
                <div 
                    className="Q checkA" 
                    style={{
                        display: answered ? 'block':'none',
                        color: answered && authUser.answers[poll.id] === 'optionOne' ? '#07aa07' : '#cc0606' //  <<<<<<<<<<<<<<<<<<-------------------
                        }}>
                        {answered && authUser.answers[poll.id] === 'optionOne' ? '✓' : '✗'}  {/* //  <<<<<<<<<<<<<<<<<<------------------- */}
                </div>                
                <div className="Q optA">{poll.optionOne.text}</div>
                
                <div 
                    className="Q checkB" 
                    style={{
                        display: answered ? 'block':'none',
                        color: answered && authUser.answers[poll.id] === 'optionTwo' ? '#07aa07' : '#cc0606' //  <<<<<<<<<<<<<<<<<<-------------------
                        }}> 
                        {answered && authUser.answers[poll.id] === 'optionTwo' ? '✓' : '✗'} {/* //  <<<<<<<<<<<<<<<<<<------------------- */}
                </div>
                <div className="Q optB">{poll.optionTwo.text} </div> 
                            </div>
            <button className="btn-card" onClick={handleClick}> {answered ? 'Show Details' : 'Vote Now'} </button>
        </div>
    )
}