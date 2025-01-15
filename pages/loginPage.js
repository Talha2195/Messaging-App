import React, { useState } from "react"
import { handleLogin } from "../public/js/login"

export default function Login() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const result = await handleLogin(username, password)
    if (result.success) {
      setSuccess("Login successful! Redirecting...")
      setError(null)
      localStorage.setItem("token", result.token)
      window.location.href = `/profilePage?token=${encodeURIComponent(
        result.token
      )}`
    } else {
      setError(result.message)
      setSuccess(null)
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <p className="signup-link">
        Not a member yet? <a href="/signUpPage">Sign Up</a>
      </p>
    </div>
  )
}
