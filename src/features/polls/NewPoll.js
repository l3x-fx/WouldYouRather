import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { selectAuth, selectLoggedIn} from '../auth/authSlice';
import { getAllPolls, saveNewPoll} from '../polls/pollsSlice'



export const NewPoll = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector(selectAuth); 
    const isLoggedIn = useSelector(selectLoggedIn);  

    const [newPoll, setNewPoll] = useState({optionOneText:'', optionTwoText:'', author: authUser.id}); 
 
    const handleOptOneChange = (e) => {
        if(newPoll.optionOneText.length < e.target.maxLength){
            setNewPoll({...newPoll, optionOneText:e.target.value})
        }
    }

    const handleOptTwoChange = (e) => {
        if(newPoll.optionTwoText.length < e.target.maxLength){
            setNewPoll({...newPoll, optionTwoText:e.target.value})
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(saveNewPoll(newPoll))   
    
        navigate('/')
    }

    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/login')
        } else {
            dispatch(getAllPolls()); 
        }
    },[navigate, dispatch])

    return(
        <div>
            <h2 className="title">Create a new Poll</h2>
            Would you rather ... 
            <form onSubmit={handleSubmit}>
                <textarea
                    className="opt-input"
                    name="optA"
                    cols="30" 
                    rows="5"       
                    maxLength="100"           
                    placeholder='Option A'
                    value={newPoll.optOne}
                    onChange={handleOptOneChange}
                />
                <textarea
                    className="opt-input"
                    name="optB"
                    cols="30" 
                    rows="5" 
                    maxLength="100"
                    placeholder='Option B'
                    onChange={handleOptTwoChange}
                /> <br />
                <input className="btn" type="submit" value="Submit New Poll" />
            </form>
        </div>
    )
}