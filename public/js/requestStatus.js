document.addEventListener("DOMContentLoaded", function () {
  const tokenFromUrl = new URLSearchParams(window.location.search).get("token")
  if (!tokenFromUrl) {
    console.error("Token missing from URL")
    return
  }

  const token = tokenFromUrl.startsWith("Bearer ")
    ? tokenFromUrl
    : `Bearer ${tokenFromUrl}`

  const friendRequestsMenu = document.getElementById("friendRequestsMenu")

  document.querySelectorAll(".accept-button").forEach((button) => {
    button.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"), 10)
      if (isNaN(id)) {
        console.error("Invalid request ID")
        return
      }
      fetch(`/acceptReq?token=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message)
          this.closest("li").remove()
          friendRequestsMenu.style.display = "none"
        })
        .catch((error) => console.error("Error:", error))
    })
  })

  document.querySelectorAll(".decline-button").forEach((button) => {
    button.addEventListener("click", function () {
      const id = parseInt(this.getAttribute("data-id"), 10)
      if (isNaN(id)) {
        console.error("Invalid request ID")
        return
      }
      fetch(`/rejectReq?token=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message)
          this.closest("li").remove()
          friendRequestsMenu.style.display = "none"
        })
        .catch((error) => console.error("Error:", error))
    })
  })
})
