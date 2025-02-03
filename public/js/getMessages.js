export async function getMessages(token) {
  try {
    const response = await fetch(
      `http://localhost:3000/getMessages?token=${encodeURIComponent(token)}`
    )
    const data = await response.json()
    if (response.ok && data.success) {
      console.log("Messages retrieved!")
      return { success: true, messages: data.messages }
    } else {
      return { success: false, message: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
