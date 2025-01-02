document.getElementById('addUserButton').addEventListener('click', function() {
    const searchContainer = document.getElementById('searchContainer');
    searchContainer.classList.toggle('expanded');  
});

document.getElementById('addButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput) {
        alert('Searching for: ' + searchInput);  
    } else {
        alert('Please enter a username to search');
    }
});



