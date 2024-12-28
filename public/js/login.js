document.getElementById('loginForm').addEventListener.apply('submit', function (e){
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            window.location.href = '/profile'
        } else {
            alert(data.message || 'Something went wrong');
        }
    })
    .catch((error) => {
        console.error('Error:', error);''
    });
})