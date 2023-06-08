// Inside logoutUser.js

function logoutUser() {
    // Remove the JWT from local storage
    localStorage.removeItem('jwt');

    // Optionally, you can redirect the user to the login page
    window.location.href = '/loginUser.html';
}
