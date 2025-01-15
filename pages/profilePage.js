import React, { useEffect, useState } from "react"
import { sendFriendRequest } from "../public/js/sendFriendRequest"
import { getProfileData } from "../public/js/requestStatus"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [message, setMessage] = useState("")
  const [requestsOpen, setRequestsOpen] = useState(false)
  const [friendRequests, setFriendRequests] = useState([])
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        const result = await getProfileData(token)
        if (result.success) {
          setUser(result.profileData.user)
          setFriendRequests(result.profileData.friendRequests)
          setFriends(result.profileData.friends)
        } else {
          console.error("Failed to fetch profile data:", result.message)
          setMessage(result.message)
        }
      } else {
        setMessage("User is not authenticated.")
      }
    }

    fetchProfileData()
  }, [])

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [searchOpen])

  if (!user) {
    return <p>{message || "Loading..."}</p>
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

  const handleAcceptRequest = async (requestId) => {
    console.log(`Accept request with ID: ${requestId}`)
  }

  const handleDeclineRequest = async (requestId) => {
    console.log(`Decline request with ID: ${requestId}`)
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
        <h2>{user.username}</h2>
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
              {friendRequests.length > 0 ? (
                friendRequests.map((request, index) => (
                  <div key={index} className="request-item">
                    <p>{request.username}</p>
                    <button onClick={() => handleAcceptRequest(request.id)}>
                      Accept
                    </button>
                    <button onClick={() => handleDeclineRequest(request.id)}>
                      Decline
                    </button>
                  </div>
                ))
              ) : (
                <p>No friend requests</p>
              )}
            </div>
          )}
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  )
}
