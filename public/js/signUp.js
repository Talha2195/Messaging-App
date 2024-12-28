document.getElementById('signUpForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const password = document.getElementById('password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    fetch('http://localhost:5000/register', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,  
            confirmPassword: confirmPassword,
        }),
        credentials: 'include', 
    })
    .then(response => response.json())
    .then(data => {

        if (data.success) {
            window.location.href = '/';
        }else {

            alert(data.message || 'Something went wrong');
        }

        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
