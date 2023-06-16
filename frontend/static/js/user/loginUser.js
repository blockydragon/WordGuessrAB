// Inside loginUser.js

function loginUser(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    axios.post('/user/login', { username, password })
    .then(res => {
        // Store the JWT in local storage
        localStorage.setItem('jwt', res.data.token);

        // Show a success notification
        toastr.success('Logged in successfully!');

        // Check if there's a page to redirect to
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
            // If yes, redirect to that page
            window.location.href = redirectUrl;
            // Clear the stored URL
            sessionStorage.removeItem('redirectAfterLogin');
        } else {
            // If no, redirect to a default page
            window.location.href = '/defaultPage.html';
        }
    })
    .catch(error => {
        console.error(error);

        // Show an error notification
//        toastr.error('Failed to log in. Please check your username and password.');
	toastr.error(error.response.data.message);
    });
}
