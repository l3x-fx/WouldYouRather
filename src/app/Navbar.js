import { Link } from 'react-router-dom'
import dummy from '../icons/ava-dummy.png'
export const Navbar = () => {
    return(
        <div className="navbar" >
            <Link to="/" className="nav">Home </Link>
            <Link to="/leaderboard" className="nav">Leaderboard </Link>
            <Link to="/new" className="nav">New </Link>
            <div className="nav-name">John Doe </div>
            <div className="ava"><img src={dummy} alt='avatar dummy' /> </div>
            <Link to ="" className="nav-log">Logout </Link>
        </div>
    )
}