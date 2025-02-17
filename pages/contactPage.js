import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { getContactPageDetails } from "../public/js/contactPage"

function ContactPage() {
  const router = useRouter()
  const { friendId } = router.query
  const [profile, setProfile] = useState({ name: "User Name", bio: "User Bio" })

  useEffect(() => {
    const fetchContactDetails = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        const contactDetails = await getContactPageDetails(token, friendId)

        if (contactDetails.success) {
          setProfile(contactDetails.details)
        } else {
          console.error(contactDetails.message)
        }
      } else {
        router.push("/login")
      }
    }

    fetchContactDetails()
  }, [friendId])

  return (
    <div className="contact-profile-page">
      <div className="profile-box">
        <div className="profile-picture"></div>
        {profile && (
          <>
            <h2>{profile.name}</h2>
            <p>{profile.bio}</p>
          </>
        )}
      </div>
    </div>
  )
}

export default ContactPage
