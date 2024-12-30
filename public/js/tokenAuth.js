document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You need to login first');
        window.location.href = '/login';
        return;
    }

    fetch('http://localhost:5000/profile', {
        method: 'GET',
        headers: {
            'Authorization': token, 
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Profile data:', data);
    })
    .catch(error => {
        console.error('Error fetching profile:', error);
        alert('Error: ' + error.message);
    });
});

