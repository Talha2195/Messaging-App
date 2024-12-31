
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    menuButton.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && e.target !== menuButton) {
            dropdownMenu.classList.remove('show');
        }
    });

    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        console.log('Logging out...');
    });
});
