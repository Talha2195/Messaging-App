import React, { useEffect, useState } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false) // State to manage menu visibility

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

  if (!user) {
    return <p>Loading...</p>
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
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
      </div>
    </div>
  )
}
