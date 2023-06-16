async function changePassword(username, oldPassword, newPassword) {
    const response = await fetch('/user/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, oldPassword, newPassword }),
    });

    if (response.ok) {
        // Update the UI to show that the password was changed
	toastr.success('Password changed!');
    } else {
        // Handle errors
	toastr.error('Shit happened!');
    }
}
