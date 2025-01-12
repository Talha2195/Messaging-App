document
  .getElementById("searchContainer")
  .addEventListener("submit", function (e) {
    e.preventDefault() // Prevent form submission

    const tokenFromUrl = new URLSearchParams(window.location.search).get(
      "token"
    )
    if (!tokenFromUrl) {
      console.error("Token missing from URL")
      return
    }

    const token = tokenFromUrl.startsWith("Bearer ")
      ? tokenFromUrl
      : `Bearer ${tokenFromUrl}`

    const friendUsername = document.getElementById("searchInput").value
    if (!friendUsername) {
      console.error("Friend username is required")
      return
    }

    const requestPayload = { friendReq: friendUsername }

    fetch(`http://localhost:5000/sendReq?token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Friend request sent:", data.request)
        } else {
          console.error("Error sending request:", data.message)
        }
      })
      .catch((error) => {
        console.error("Request failed:", error)
      })
  })
