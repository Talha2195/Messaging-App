export async function editPage(token) {
  try {
    const response = await fetch(
      `http://localhost:3000/editPage?token=${encodeURIComponent(token)}`
    )
    const data = await response.json()
    if (response.ok && data.success) {
      return { success: true, editPage: data.editPage }
    } else {
      return { success: false, message: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
