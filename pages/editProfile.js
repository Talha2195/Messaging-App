import React, { useEffect, useState } from "react"
import { getProfileData } from "../public/js/requestStatus"
import { editProfilePage } from "../public/js/editProfile"
import Loading from "./components/loading"

export default function EditProfile() {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [picture, setProfilePicture] = useState(null)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true)

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0])
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        const result = await getProfileData(token)
        if (result.success) {
          setName(result.profileData.user.name)
          setBio(result.profileData.user.bio)
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const updatedUser = await editProfilePage(token, name, bio, picture)
        if (updatedUser.success) {
          setMessage("Profile updated successfully!")
          setTimeout(() => {
            window.location.href = `/profilePage?token=${encodeURIComponent(
              token
            )}`
          }, 2000)
        }
      } catch (error) {
        console.error("Error updating user:", error)
        setMessage("Failed to update profile.")
      }
    } else {
      setMessage("User is not authenticated.")
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <h1 className="edit-profile-title">Edit Profile</h1>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="form-group name-group">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group bio-group">
            <label htmlFor="bio" className="form-label">
              Bio:
            </label>
            <textarea
              id="bio"
              className="form-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="form-group profile-picture-group">
            <label htmlFor="profilePicture" className="form-label">
              Profile Picture:
            </label>
            <input
              type="file"
              id="profilePicture"
              className="form-input"
              onChange={handleProfilePictureChange}
            />
          </div>
          <button type="submit" className="save-changes-button">
            Save Changes
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  )
}
