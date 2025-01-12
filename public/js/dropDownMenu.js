document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton")
  const dropdownMenu = document.getElementById("dropdownMenu")

  if (menuButton && dropdownMenu) {
    menuButton.addEventListener("click", (event) => {
      const isVisible = dropdownMenu.style.display === "block"
      dropdownMenu.style.display = isVisible ? "none" : "block"

      if (!isVisible) {
        const menuButtonRect = event.target.getBoundingClientRect()
        dropdownMenu.style.top = `${
          menuButtonRect.bottom + window.scrollY + 5
        }px`
        dropdownMenu.style.left = `${menuButtonRect.left + window.scrollX}px`
      }
    })

    document.addEventListener("click", (event) => {
      if (
        !menuButton.contains(event.target) &&
        !dropdownMenu.contains(event.target)
      ) {
        dropdownMenu.style.display = "none"
      }
    })
  } else {
    console.error("Menu button or dropdown menu element not found!")
  }
})
