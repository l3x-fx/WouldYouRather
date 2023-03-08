import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../features/auth/authSlice';

import dummy from '../icons/ava-dummy.png'

export const Navbar = () => {
    const dispatch = useDispatch();
    const authUser = useSelector(selectAuth);

    return(
        <div className="navbar" >
            <Link to="/" className="nav">Home </Link>
            <Link to="/leaderboard" className="nav">Leaderboard </Link>
            <Link to="/add" className="nav">New </Link>
            <div className="nav-name">{authUser !== '' &&  authUser.name} </div>
            <div className="ava"><img src={authUser === '' ? dummy : authUser.avatarURL} alt='avatar picture' /> </div>
            {authUser === ''
                ? <Link to ="/login" className="nav-log" >Login</Link>   
                : <Link to ="/login" className="nav-log" onClick={()=> dispatch(logout())}>Logout </Link>                
            }
        </div>
    )
}