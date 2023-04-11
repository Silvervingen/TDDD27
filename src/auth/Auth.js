
import React, { useState } from "react"
import "../css/auth.css"


export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  let [accounts, setAccounts] = useState([])

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  // new
  const submitHandler = (event) => {
    event.preventDefault()
    const username = event.target.elements.username
    const password = event.target.elements.password

    if (authMode === "signup") {
      const newAccount = { username, password }
      setAccounts([...accounts, newAccount])
      setAuthMode("signin")
    } else if (authMode === "signin") {
      const account = accounts.find((a) => a.username === username && a.password === password)
      if (account) {
        console.log("Signed in!")
      } else {
        console.log("Invalid username or password.")
      }
    }
  }

  // end new

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={submitHandler} /*onsubmit*/> 
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                name="username" // new
                className="form-control mt-1"
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name="password" //new
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={submitHandler}/*new onsubmte*/>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter Username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}