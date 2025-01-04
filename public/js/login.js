document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault()

  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.token)
        window.location.href = `/profile?token=${encodeURIComponent(
          data.token
        )}`
      } else {
        alert(data.message || "Something went wrong")
      }
    })
    .catch((error) => {
      console.error("Error:", error)
    })
})
