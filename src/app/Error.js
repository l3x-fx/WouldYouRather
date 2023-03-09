import { NavLink } from "react-router-dom"


export const Error = () => {
    return(
        <div >
            <h2 className="title">404 error - Poll does not exist</h2>
            <p>Please click <NavLink to="/" className="navLink">here</NavLink> to search for polls you might like to vote. </p>
        </div>
    )
}