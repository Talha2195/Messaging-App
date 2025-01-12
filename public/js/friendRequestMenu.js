document.addEventListener("DOMContentLoaded", function () {
  const friendRequestsButton = document.getElementById("friendRequestsButton")
  const friendRequestsMenu = document.getElementById("friendRequestsDetails")

  if (!friendRequestsButton || !friendRequestsMenu) {
    console.error("Required elements not found in the DOM")
    return
  }

  // Toggle visibility of the friend requests dropdown
  friendRequestsButton.addEventListener("click", function (event) {
    const isVisible = friendRequestsMenu.style.display === "block"
    friendRequestsMenu.style.display = isVisible ? "none" : "block"
    event.stopPropagation() // Prevent the click event from propagating to document
  })

  // Hide dropdown if clicking anywhere outside
  document.addEventListener("click", function (event) {
    if (
      !friendRequestsButton.contains(event.target) &&
      !friendRequestsMenu.contains(event.target)
    ) {
      friendRequestsMenu.style.display = "none"
    }
  })
})
