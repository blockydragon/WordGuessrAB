async function createGame(e) {
    e.preventDefault();

    const gameLength = document.getElementById('gameLength').value;
    const token = localStorage.getItem('jwt');

    try {
        const response = await axios.post('/game/create', { gameLength }, {headers: {'x-access-token': token}});

        document.getElementById('game-code').innerText = `Your Game Code: ${response.data.gameCode}`;
        toastr.success('Game created successfully!');
    } catch (error) {
        console.error(error);
        toastr.error(error.response.data.message);
    }
}
