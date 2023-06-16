function getInfo() {
    const gameCode = document.getElementById('game-code').value;

    axios.get(`/game/info/${gameCode}`)
    .then(response => {
        displayGameInfo(response.data);
    })
    .catch(error => {
        console.error(error);
	toastr.error(error.response.data.message);
//        alert('Failed to get game info. Please try again.');
    });
}

function displayGameInfo(data) {
    const gameInfoDiv = document.getElementById('game-info');

    // Clear any existing info
    gameInfoDiv.innerHTML = '';

    // Add new info
    const gameInfoString = JSON.stringify(data, null, 2);
    gameInfoDiv.innerText = gameInfoString;
}
