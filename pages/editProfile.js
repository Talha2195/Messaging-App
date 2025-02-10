import React, { useEffect, useState } from "react"
import { getProfileData } from "../public/js/requestStatus"

export default function EditProfile() {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [profilePicture, setProfilePicture] = useState(null)

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
    }

    fetchProfileData()
  }, [])

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <h1 className="edit-profile-title">Edit Profile</h1>
        <form className="edit-profile-form">
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
              required
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
              required
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
              required
            />
          </div>
          <button type="submit" className="save-changes-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
