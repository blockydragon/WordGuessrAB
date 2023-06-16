function joinGame(e) {
    e.preventDefault();

    const gameCode = document.getElementById('game-code').value;
    const token = localStorage.getItem('jwt');

    axios.post('/game/join', {
    	    gameCode: gameCode,
	},
	{headers: {'x-access-token': token}}
    )
    .then(response => {
        console.log(response.data);
	toastr.success("Joined the game");
        // Navigate to the game page
        window.location.replace('/game.html');
    })
    .catch(error => {
        console.error(error);
	toastr.error(error.response.data.message);
//        alert('Failed to join game. Please try again.');
    });
}
