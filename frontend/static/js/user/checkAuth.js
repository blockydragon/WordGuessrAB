// Inside checkAuth.js

/*function checkAuth() {
    // Check if there's a JWT in local storage
    if (!localStorage.getItem('jwt')) {
        // If not, store the current page URL to redirect back after login
        sessionStorage.setItem('redirectAfterLogin', window.location.href);
        // Then, redirect to the login page
        window.location.href = '/loginUser.html';
    }
}*/

function checkAuth() {
    const token = localStorage.getItem('jwt');
    if (token) {
        try {
	    const base64Url = token.split('.')[1];
	    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	    const payload = JSON.parse(window.atob(base64));

	    const expiry = payload.exp;
            if (expiry < Date.now() / 1000) {
                // Token expired
                alert("Session expired, please login again");
		reLogin();
            }
        } catch (e) {
            console.error(e);
	    reLogin();
        }
    } else {
        // No token, not logged in
	reLogin();
    }
}

function reLogin(){
    localStorage.removeItem('jwt');
    sessionStorage.setItem('redirectAfterLogin', window.location.href);
    window.location.href = "/loginUser.html";
}

checkAuth();



checkAuth();
