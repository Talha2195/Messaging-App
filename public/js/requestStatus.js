export async function getProfileData(token) {
  try {
    const response = await fetch(
      `http://localhost:3000/profileData?token=${encodeURIComponent(token)}`
    )
    const data = await response.json()
    if (response.ok && data.success) {
      console.log(data)
      return { success: true, profileData: data.requests }
    } else {
      return { success: false, message: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
