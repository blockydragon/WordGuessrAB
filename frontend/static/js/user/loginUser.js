async function loginUser(username, password) {
    const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const { token } = await response.json();

        // Save the JWT in local storage or cookies
        localStorage.setItem('jwt', token);

        // Redirect to a protected page
        window.location.href = '/protected.html';
    } else {
        // Handle errors
    }
}
