document.addEventListener("DOMContentLoaded", function () {
  const friendRequestsButton = document.getElementById("friendRequestsButton")
  const friendRequestsMenu = document.getElementById("friendRequestsMenu")

  friendRequestsButton.addEventListener("click", function () {
    const isVisible = friendRequestsMenu.style.display === "block"
    friendRequestsMenu.style.display = isVisible ? "none" : "block"
  })

  document.addEventListener("click", function (event) {
    if (
      !friendRequestsButton.contains(event.target) &&
      !friendRequestsMenu.contains(event.target)
    ) {
      friendRequestsMenu.style.display = "none"
    }
  })
})
