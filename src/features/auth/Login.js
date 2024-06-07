import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getAllUsers, selectUsers } from "../users/usersSlice"
import { selectAuth, login } from "../auth/authSlice"

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(selectUsers)
  const authUser = useSelector(selectAuth)

  const [loginName, setLoginName] = useState("")
  const [loginPW, setLoginPW] = useState("")
  const [failedattempt, setFailedattempt] = useState("none")

  useEffect(() => {
    dispatch(getAllUsers())
    // eslint-disable-next-line
  }, [])

  const handleNameChange = (e) => {
    setLoginName(e.target.value)
  }

  const handlePWChange = (e) => {
    setLoginPW(e.target.value)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (Object.values(users).some((user) => user.name === loginName)) {
      const foundUser = Object.values(users).find((user) => user.name === loginName)
      if (foundUser.password === loginPW && foundUser.name === loginName) {
        dispatch(login(foundUser))
        navigate("/")
      } else {
        setFailedattempt("block")
      }
    } else {
      setFailedattempt("block")
    }
  }

  return (
    <div>
      <h2 className="title">LogIn</h2>

      {!authUser.id ? (
        <form className="authform">
          <label htmlFor="name">Name:</label>
          <input
            onChange={handleNameChange}
            data-testid="loginName"
            value={loginName}
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
          />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            onChange={handlePWChange}
            data-testid="loginPW"
            value={loginPW}
            type="password"
            id="password"
            name="password"
            placeholder="**********"
          />
          <input
            onClick={handleLoginSubmit}
            data-testid="submitBtn"
            className="btn"
            disabled={loginName === "" || loginPW === ""}
            type="submit"
            value="LogIn"
          />
          <div className="info" style={{ display: !authUser.id }}>
            Testaccount: <br />
            name: Sarah Edo <br />
            password: password123
          </div>
        </form>
      ) : (
        <div data-testid="loggendIn">You are already logged in!</div>
      )}
      <div className="failmessage" data-textid="failmessage" style={{ display: failedattempt }}>
        Your password/username is incorrect!
      </div>
    </div>
  )
}
