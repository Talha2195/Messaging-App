import React, { useEffect, useState } from "react"
import { sendFriendRequest } from "../public/js/sendFriendRequest"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [message, setMessage] = useState("")
  const [requestsOpen, setRequestsOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [searchOpen])

  if (!user) {
    return <p>Loading...</p>
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  const toggleRequests = () => {
    setRequestsOpen(!requestsOpen)
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const handleSearchSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token")
    if (token) {
      const result = await sendFriendRequest(token, searchInput)
      if (result.success) {
        setMessage("Friend request sent successfully!")
      } else {
        setMessage(result.message || "Failed to send friend request.")
      }
    } else {
      setMessage("User is not authenticated.")
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-container left">
        <div className="menu-icon" onClick={toggleMenu}>
          <img src="/images/menuIcon.svg" alt="Menu Icon" />
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>Logout</li>
            </ul>
          </div>
        )}
        <div className="profile-picture"></div>
        <h2>{user}</h2>
      </div>
      <div className="profile-container right">
        <h1>Additional Info</h1>
        <p>Here you can add additional information or widgets.</p>
        <div className="search-container">
          <button className="search-button" onClick={toggleSearch}>
            +
          </button>
          <form
            onSubmit={handleSearchSubmit}
            className={`search-form ${searchOpen ? "open" : ""}`}
          >
            <button type="submit" className="submit-button">
              Submit
            </button>
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchChange}
            />
          </form>
          <button className="requests-button" onClick={toggleRequests}>
            <img src="/images/addPerson.svg" alt="Add Person" />
          </button>
          {requestsOpen && (
            <div className="requests-dropdown">
              <p>No friend requests</p>
            </div>
          )}
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  )
}
