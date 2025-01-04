document
  .getElementById("searchContainer")
  .addEventListener("submit", function (e) {
    e.preventDefault()

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

    console.log("Token to send in request:", token)

    const friendUsername = document.getElementById("searchInput").value
    if (!friendUsername) {
      console.error("Friend username is required")
      return
    }

    console.log("Friend username to send:", friendUsername)

    const requestPayload = {
      friendReq: friendUsername,
    }

    fetch("http://localhost:5000/sendReq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
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
