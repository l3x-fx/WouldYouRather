import { NavLink } from "react-router-dom"
import "../App.css"

export const GeneralError = () => {
  return (
    <div>
      <h2 className="title">404 - Page does not exist</h2>
      <p>
        {" "}
        Please click{" "}
        <NavLink to="/" className="navLink">
          here
        </NavLink>{" "}
        to start over.{" "}
      </p>
    </div>
  )
}
