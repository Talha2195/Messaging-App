export async function sendFriendRequest(token, username) {
  try {
    const response = await fetch(
      `http://localhost:3000/sendReq?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
        credentials: "include",
      }
    )
    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true }
    } else {
      return { success: false, message: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
