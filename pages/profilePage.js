import React, { useEffect, useState, useRef } from "react"
import { sendFriendRequest } from "../public/js/sendFriendRequest"
import { getProfileData } from "../public/js/requestStatus"
import { acceptReq } from "../public/js/acceptReq"
import { rejectReq } from "../public/js/rejectReq"
import { sendMessage } from "../public/js/sendMessage"
import { getMessages } from "../public/js/getMessages"
import Loading from "./components/loading"
import ChatLoading from "./components/chatLoading"

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
  const [sentMessages, setSentMessages] = useState([])
  const [receivedMessages, setReceivedMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [contactDropdown, setContactDropdown] = useState(null)
  const dropdownRefs = useRef([])

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
      setLoading(false)
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

  useEffect(() => {
    const requestsDropdown = document.querySelector(".requests-dropdown")
    if (requestsDropdown) {
      const baseHeight = 100
      const itemHeight = 50
      const newHeight = baseHeight + friendRequests.length * itemHeight
      requestsDropdown.style.height = `${newHeight}px`
    }
  }, [friendRequests])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every((ref) => ref && !ref.contains(event.target))
      ) {
        setContactDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRefs])

  const filteredSentMessages = sentMessages.filter(
    (msg) => msg.receiverId === selectedContact?.id && msg.senderId === user?.id
  )
  const filteredReceivedMessages = receivedMessages.filter(
    (msg) => msg.senderId === selectedContact?.id && msg.receiverId === user?.id
  )

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
  }

  const handleLogout = () => {
    window.location.href = "/loginPage"
    localStorage.removeItem("token")
  }

  const handleEdit = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      window.location.href = `/editProfile?token=${encodeURIComponent(token)}`
    } else {
      setMessage(result.message || "Failed to fetch edit page.")
    }
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

  const handleContactClick = async (friend) => {
    setSelectedContact(friend)
    setLoadingMessages(true)
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const result = await getMessages(token)
        if (result.success) {
          setSentMessages(result.messages.sent)
          setReceivedMessages(result.messages.received)
        } else {
          console.error("Failed to fetch messages:", result.message)
        }
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
    setLoadingMessages(false)
  }

  const handleChatInputChange = (event) => {
    setChatInput(event.target.value)
  }

  const handleSendChat = async () => {
    const token = localStorage.getItem("token")
    if (token && selectedContact && chatInput.trim() !== "") {
      console.log(chatInput)
      const result = await sendMessage(
        token,
        user.id,
        selectedContact.id,
        chatInput
      )
      if (result.success) {
        console.log("message sent!")
        setSentMessages([...sentMessages, result.newMessage])
        setChatInput("")
      } else {
        console.error("Failed to send message:", result.message)
      }
    } else {
      console.error("User is not authenticated or message is empty.")
    }
  }

  const toggleDropdown = (index) => {
    setContactDropdown(contactDropdown === index ? null : index)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="profile-page">
      <div className="profile-container left">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <img src="/images/menuIcon.svg" alt="Menu Icon" />
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={handleLogout}>Logout</li>
              <li onClick={handleEdit}>Edit</li>
            </ul>
          </div>
        )}
        <div className="profile-picture"></div>
        {user && <h2>{user.name}</h2>}
        <hr className="separator" />
        <div className="contacts">
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <div key={index} className="contact-item">
                <button onClick={() => handleContactClick(friend)}>
                  {friend.name}
                </button>
                <button
                  className="dropdown-button"
                  onClick={() => toggleDropdown(index)}
                >
                  <img
                    src="/images/contactMenuIcon.svg"
                    alt="Menu Icon"
                    className="contact-menu-icon"
                  />
                </button>
                {contactDropdown === index && (
                  <div
                    className="dropdown-menu"
                    ref={(el) => (dropdownRefs.current[index] = el)}
                  >
                    <ul>
                      <li>Profile</li>
                    </ul>
                  </div>
                )}
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
              <h3>{selectedContact.name}</h3>
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
                    <p className="request-name">{request.name}</p>
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
            {loadingMessages ? (
              <ChatLoading />
            ) : (
              <div className="chat-messages">
                {filteredSentMessages
                  .concat(filteredReceivedMessages)
                  .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                  .map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.senderId === user.id ? "sent" : "received"
                      }`}
                    >
                      {msg.message}
                    </div>
                  ))}
              </div>
            )}
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
