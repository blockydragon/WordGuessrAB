// Inside checkAuth.js

function checkAuth() {
    // Check if there's a JWT in local storage
    if (!localStorage.getItem('jwt')) {
        // If not, store the current page URL to redirect back after login
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        // Then, redirect to the login page
        window.location.href = '/loginUser.html';
    }
}

checkAuth();
