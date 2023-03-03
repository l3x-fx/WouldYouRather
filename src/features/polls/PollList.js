import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    getAllQuestions, 
    selectPolls 
} from './pollsSlice'

import { PollCard } from './PollCard'
import './polls.css'

export const PollList = () => {
    const polls = useSelector(selectPolls);
    const dispatch = useDispatch();

    const [answered, setAnswered] = useState(false)

    return(
        <div >
            <h2 className="title">List of Polls</h2>
            answered <input type="checkbox" id="answered" name="answered" onClick={()=> {answered?setAnswered(false):setAnswered(true)}} /> unanswered
            <div className="polllist">
                <PollCard answered={answered} />
                <PollCard answered={answered} />
                <PollCard answered={answered} />
                <PollCard answered={answered} />
            </div>
        </div>
    )
}