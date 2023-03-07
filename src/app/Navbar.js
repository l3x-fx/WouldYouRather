import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth, logout } from '../features/auth/authSlice';

import dummy from '../icons/ava-dummy.png'

export const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector(selectAuth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return(
        <div className="navbar" >
            <Link to="/" className="nav">Home </Link>
            <Link to="/leaderboard" className="nav">Leaderboard </Link>
            <Link to="/new" className="nav">New </Link>
            <div className="nav-name">{authUser !== '' &&  authUser.name} </div>
            <div className="ava"><img src={dummy} alt='avatar dummy' /> </div>
            {authUser === ''
                ? <>
                    <div className='nav-log' onClick={()=> navigate('/login')}>Login</div> 
                    <div>|</div>
                    <div className='nav-log'onClick={()=> navigate('/signup')}>Signup</div>
                  </>  
                : <Link to ="" className="nav-log" onClick={handleLogout}>Logout </Link>
                
            }
        </div>
    )
}