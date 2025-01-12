document.addEventListener("DOMContentLoaded", function () {
  const tokenFromUrl = new URLSearchParams(window.location.search).get("token")
  if (!tokenFromUrl) {
    console.error("Token missing from URL")
    return
  }

  const token = tokenFromUrl.startsWith("Bearer ")
    ? tokenFromUrl
    : `Bearer ${tokenFromUrl}`

  const friendRequestsDetails = document.getElementById("friendRequestsDetails")
  const friendRequestsButton = document.getElementById("friendRequestsButton")

  friendRequestsButton.addEventListener("click", function () {
    friendRequestsDetails.style.display =
      friendRequestsDetails.style.display === "none" ||
      friendRequestsDetails.style.display === ""
        ? "block"
        : "none"
  })

  fetch(`/getFriendRequests?token=${encodeURIComponent(token)}`)
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("friendRequestsList")
      if (data.requests && data.requests.length > 0) {
        data.requests.forEach((request) => {
          const li = document.createElement("li")
          li.innerHTML = `
            <div>${request.username}</div>
            <div>
              <button class="accept-button" data-id="${request.id}">Accept</button>
              <button class="decline-button" data-id="${request.id}">Decline</button>
            </div>
          `
          list.appendChild(li)
        })
      } else {
        friendRequestsDetails.innerHTML = "<p>No friend requests</p>"
      }
    })
    .catch((error) => console.error("Error fetching friend requests:", error))
})
