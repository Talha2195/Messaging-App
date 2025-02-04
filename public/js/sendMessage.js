export async function sendMessage(token, senderId, receiverId, message) {
  try {
    const response = await fetch(
      `http://localhost:3000/sendMessage?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, receiverId, message }),
        credentials: "include",
      }
    )
    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true, newMessage: data.newMessage }
    } else {
      return { success: false, message: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
