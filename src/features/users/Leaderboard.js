import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectLoggedIn } from '../auth/authSlice';
import { getAllPolls, selectPolls } from '../polls/pollsSlice';
import { getAllUsers, selectUsers } from './usersSlice';

import { getAnswerCountByUserID, getQuestionCountByUserID} from '../../utils/pollUtils'
import dummy from '../../icons/ava-dummy.png';

export const Leaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const polls = useSelector(selectPolls);
    const users = useSelector(selectUsers);
    const isLoggedIn = useSelector(selectLoggedIn);

    const board = Object.keys(users)
        .map(user => (
            {ava: users[user].avatarURL, 
            name: users[user].name, 
            answers:getAnswerCountByUserID(polls, user), 
            polls: getQuestionCountByUserID(polls, user)}
        ))
        .sort((x,y)=> y.answers - x.answers || y.polls - x.polls)
   
    useEffect(()=> {
        if(!isLoggedIn) {

            navigate('/login')
        } else {
            dispatch(getAllPolls());
            dispatch(getAllUsers())
        }
    },[isLoggedIn, navigate, dispatch])
    return(
        <div>
            <h2 className="title">Leaderboard</h2>

            <div className="leaderbaord">
                <div></div>
                <div className="username LBtitle">Name</div>
                <div className="LBtitle">Answered</div>
                <div className="LBtitle">Created</div>

                {board.map(user => (
                    <>
                        <div className="ava"><img src={user.ava || dummy} alt='avatar'/></div>
                        <div className="username">{user.name}</div>
                        <div>{user.answers}</div>
                        <div>{user.polls}</div>
                    </>
                )
                )}
            </div>
        </div>
    )
}