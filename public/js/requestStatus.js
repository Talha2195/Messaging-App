export async function getFriendRequests(token) {
  try {
    const response = await fetch(
      `/friendRequests?token=${encodeURIComponent(token)}`
    )
    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true, requests: data.requests }
    } else {
      return { success: false, message: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
