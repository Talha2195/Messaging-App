import React, { useState } from "react"
import { handleSignUpFormSubmit } from "../public/js/signUp"

export default function Signup() {
  const [name, setName] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = await handleSignUpFormSubmit(
      name,
      username,
      password,
      confirmPassword
    )
    if (result.success) {
      setSuccess("Sign up successful! Redirecting...")
      setError(null)

      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    } else {
      setError(result.message)
      setSuccess(null)
    }
  }

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <p className="login-link">
        Already a member? <a href="/loginPage">Login</a>
      </p>
    </div>
  )
}
