import React from "react"
import { useState } from "react"

export default function Signup() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("null")

  const handleSubmit = async (e) => {}
}
