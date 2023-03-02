import dummy from '../icons/ava-dummy.png'
export const Navbar = () => {
    return(
        <div className="navbar" >
            <div className="nav" style={{display: "inline"}}>Home </div>
            <div className="nav" style={{display: "inline"}}>Leaderboard </div>
            <div className="nav" style={{display: "inline"}}>New </div>
            <div className="nav-name" style={{display: "inline"}}>John Doe </div>
            <div className="ava" style={{display: "inline"}}>AVA </div>
            <div className="nav-log" style={{display: "inline"}}>Logout </div>
        </div>
    )
}