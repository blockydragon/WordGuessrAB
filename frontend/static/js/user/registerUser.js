async function registerUser(username, password) {
    const response = await fetch('/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        // Update the UI to show that the user is registered
	window.location.href = '/loginUser.html';
    } else {
        // Handle errors
    }
}
