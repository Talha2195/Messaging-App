import React, { useEffect, useState } from "react"
import { sendFriendRequest } from "../public/js/sendFriendRequest"
import { getProfileData } from "../public/js/requestStatus"
import { acceptReq } from "../public/js/acceptReq"
import { rejectReq } from "../public/js/rejectReq"
import { sendMessage } from "../public/js/sendMessage"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [message, setMessage] = useState("")
  const [requestsOpen, setRequestsOpen] = useState(false)
  const [friendRequests, setFriendRequests] = useState([])
  const [friends, setFriends] = useState([])
  const [selectedContact, setSelectedContact] = useState(null)
  const [chatInput, setChatInput] = useState("")

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
    const token = localStorage.getItem("token")
    if (token) {
      const result = await acceptReq(token, requestId)
      if (result.success) {
        setMessage("Friend request accepted successfully!")
        setFriendRequests(
          friendRequests.filter((request) => request.id !== requestId)
        )
      } else {
        setMessage(result.message || "Failed to accept friend request.")
      }
    } else {
      setMessage("User is not authenticated.")
    }
  }

  const handleDeclineRequest = async (requestId) => {
    const token = localStorage.getItem("token")
    if (token) {
      const result = await rejectReq(token, requestId)
      if (result.success) {
        setMessage("Friend request declined successfully!")
        setFriendRequests(
          friendRequests.filter((request) => request.id !== requestId)
        )
      } else {
        setMessage(result.message || "Failed to decline friend request.")
      }
    } else {
      setMessage("User is not authenticated.")
    }
  }

  const handleContactClick = (friend) => {
    setSelectedContact(friend)
  }

  const handleChatInputChange = (event) => {
    setChatInput(event.target.value)
  }

  const handleSendChat = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      const result = await sendMessage(token, selectedContact.id, chatInput)
      if (result.success) {
        console.log("message sent!")
      } else {
        console.error("Failed to send message:", result.message)
      }
    } else {
      console.error("User is not authenticated.")
    }
  }

  useEffect(() => {
    const requestsDropdown = document.querySelector(".requests-dropdown")
    if (requestsDropdown) {
      const baseHeight = 100
      const itemHeight = 50
      const newHeight = baseHeight + friendRequests.length * itemHeight
      requestsDropdown.style.height = `${newHeight}px`
    }
  }, [friendRequests])

  return (
    <div className="profile-page">
      <div className="profile-container left">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
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
        {user && <h2>{user.username}</h2>}
        <hr className="separator" />
        <div className="contacts">
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <div key={index} className="contact-item">
                <button onClick={() => handleContactClick(friend)}>
                  {friend.username}
                </button>
              </div>
            ))
          ) : (
            <p>No contacts</p>
          )}
        </div>
      </div>
      <div className="profile-container right">
        <div className="top-bar">
          <div className="search-container">
            <button className="search-button" onClick={toggleSearch}>
              +
            </button>
            <button className="requests-button" onClick={toggleRequests}>
              <img src="/images/addPerson.svg" alt="Add Person" />
            </button>
          </div>
          {selectedContact && (
            <div className="contact-name">
              <h3>{selectedContact.username}</h3>
            </div>
          )}
          {searchOpen && (
            <form className="search-form open" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-bar"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="Search..."
              />
              <button type="submit" className="submit-button">
                Search
              </button>
            </form>
          )}

          {requestsOpen && (
            <div className="requests-dropdown">
              {friendRequests.length > 0 ? (
                friendRequests.map((request, index) => (
                  <div key={index} className="request-item">
                    <p className="request-name">{request.username}</p>
                    <div className="request-buttons">
                      <button
                        className="accept-button"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="decline-button"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-requests-message">No friend requests</p>
              )}
            </div>
          )}
        </div>
        {selectedContact && (
          <div className="chat-container">
            <div className="chat-messages">
              {/* Placeholder for chat messages */}
            </div>
            <div className="chat-box">
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={chatInput}
                onChange={handleChatInputChange}
              />
              <button className="send-button" onClick={handleSendChat}>
                Send
              </button>
            </div>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  )
}
