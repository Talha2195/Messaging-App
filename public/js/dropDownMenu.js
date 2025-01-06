document.getElementById('menuButton').addEventListener('click', () => {
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';

    if (!isVisible) {

        const menuButtonRect = document.getElementById('menuButton').getBoundingClientRect();
        
        dropdownMenu.style.top = `${menuButtonRect.bottom + window.scrollY + 5}px`; 
        dropdownMenu.style.left = `${menuButtonRect.left + window.scrollX}px`;  
    }
});

document.addEventListener('click', (event) => {
    const menuButton = document.getElementById('menuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});
