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
    if(typeof e !== 'undefined')
	e.preventDefault();

    const gameCode = localStorage.getItem('gameCode');
    const token = localStorage.getItem('jwt');

    const guess = (typeof e !== 'undefined')?document.getElementById('game-input').value:'';
    axios.post('/game/play', {
	gameCode: gameCode,
	guess: guess },
	{headers: {'x-access-token': token}}
    )
    .then(response => {
	if(typeof response.data.message !== 'undefined')
	    toastr.info(response.data.message);
	updateGameResultsTable(response.data.turns);
	updateGameBoard(response.data);
    })
    .catch(error => {
        console.error(error);
	if(typeof response.data.turns !== 'undefined')
	    updateGameResultsTable(response.data.turns);
	toastr.error(error.response.data.message);
	updateGameBoard(response.data);
//        alert('Failed to submit guess. Please try again.');
    });
}


function updateGameBoard(data) {
    // Update game board based on data received from backend
    const gameBoard = document.getElementById('game-board');
    if(data.status == 'OVER')
	gameBoard.innerText = 'GAME OVER! WINNER '+data.winner;
}

function updateGameResultsTable(turns) {
  // get the table body
  let tableBody = document.getElementById('gameResultsTableBody');

  // remove any existing rows
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }

    console.log(turns);

  // add a row for each turn
  turns.forEach((turn, index) => {
    let row = document.createElement('tr');

    // add a cell for the turn number
    let turnCell = document.createElement('td');
    turnCell.textContent = index + 1;
    row.appendChild(turnCell);

    console.log(turn);

    // add a cell for each letter in the guess
    turn.result.forEach(result => {
      let guessCell = document.createElement('td');
      guessCell.textContent = result.letter;

      // add a class based on the status of the letter
      guessCell.classList.add(result.status);
      row.appendChild(guessCell);
    });

    tableBody.appendChild(row);
  });
}
