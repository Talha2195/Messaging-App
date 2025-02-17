export async function getContactPageDetails(token, userId) {
  try {
    const response = await fetch(
      `http://localhost:3000/contactPageDetails?token=${encodeURIComponent(
        token
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      }
    )
    const text = await response.text()
    const data = JSON.parse(text)
    if (response.ok && data.success) {
      return { success: true, details: data.contactProfileDetails }
    } else {
      return { success: false, details: data.message || "Something went wrong" }
    }
  } catch (error) {
    console.error("Error:", error)
    return { success: false, message: "An error occurred. Please try again." }
  }
}
