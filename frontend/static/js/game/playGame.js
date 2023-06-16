/*document.addEventListener('DOMContentLoaded', function() {
    const gameForm = document.getElementById('game-form');

    gameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const guess = document.getElementById('game-input').value;
        submitGuess(guess);
    });
});

function submitGuess(guess) {
    // Submit guess to backend and update game board based on response
    axios.post('/game/play', { guess })
    .then(response => {
        updateGameBoard(response.data);
    })
    .catch(error => {
        console.error(error);
        alert('Failed to submit guess. Please try again.');
    });
}*/

function submitGuess(e) {
    e.preventDefault();
    const guess = document.getElementById('game-input').value;
    axios.post('/game/play', { guess })
    .then(response => {
        updateGameBoard(response.data);
    })
    .catch(error => {
        console.error(error);
        alert('Failed to submit guess. Please try again.');
    });
}

function updateGameBoard(data) {
    // Update game board based on data received from backend
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerText = JSON.stringify(data, null, 2);
}
