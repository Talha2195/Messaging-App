const friendRequestsButton = document.getElementById('friendRequestsButton');
const friendRequestsDropdown = document.getElementById('friendRequestsDropdown');

friendRequestsButton.addEventListener('click', function (event) {

  event.stopPropagation();

  const isVisible = friendRequestsDropdown.style.display === 'block';
  friendRequestsDropdown.style.display = isVisible ? 'none' : 'block';
});

document.addEventListener('click', function (event) {
  if (!friendRequestsDropdown.contains(event.target) && event.target !== friendRequestsButton) {
    friendRequestsDropdown.style.display = 'none';
  }
});