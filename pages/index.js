import React from "react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Messaging App</h1>
      <p>Welcome to the home page!</p>
      <p>
        Not a member yet? <a href="/signUpPage">Signup</a>
      </p>
      <p>
        Already a member? <a href="/loginPage">Login</a>
      </p>
    </div>
  )
}
