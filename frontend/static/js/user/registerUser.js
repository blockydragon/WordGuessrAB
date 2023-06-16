// Inside registerUser.js

function registerUser(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    axios.post('/user/register', { username, password })
    .then(() => {
        toastr.success('Registered successfully!');
        window.location.href = '/loginUser.html';
    })
    .catch(error => {
        // Access the error message from the server
        const errorMessage = error.response.data.message;

        toastr.error(errorMessage);
    });
}
