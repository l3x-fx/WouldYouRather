import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import{ 
    getAllUsers, 
    selectUsers
 } from '../users/usersSlice'

 import { selectAuth, login } from '../auth/authSlice';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(selectUsers);
    const authUser = useSelector(selectAuth);

    const [loginName, setLoginName] = useState('');
    const [loginPW, setLoginPW] = useState('');
    const [failedattempt, setFailedattempt] = useState('none');
    
    useEffect(()=> {
        dispatch(getAllUsers());
    },[])

    const handleNameChange = (e) => {
        setLoginName(e.target.value)
    }

    const handlePWChange = (e) => {
        setLoginPW(e.target.value)
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const foundUser = users.find(user => user.name === loginName);
        if (foundUser.password === loginPW) { 
            dispatch(login(foundUser))
            navigate('/')
        } else {
            setFailedattempt('block')
        }
    }

    return(
        <div>
            <h2 className="title" >LogIn</h2>
            {authUser === '' ?
            <form className="authform">
                <label htmlFor="name">Name:</label>
                <input
                    onChange={handleNameChange}
                    value={loginName}
                    type="text"    
                    id="name"
                    name="name"
                    placeholder="Your full name"       
                />
                <label htmlFor="password">Password:</label><br />
                <input
                    onChange={handlePWChange}
                    value={loginPW}
                    type="password"    
                    id="password"
                    name="password"
                    placeholder="**********"                 
                /> 
            <input onClick={handleLoginSubmit} className="btn" type="submit" value="LogIn" />
            </form>
            : <div>You are already logged in!</div>
            }
            <div className='failmessage' style={{display: failedattempt }}>Your password/username is incorrect!</div>

        </div>
    )
}