const Game = require('../models/gameModel');

const gameController = {
    createGame: async (req, res) => {
        const game = new Game('./db/games.db');
        const { host, word, deadline, gridSize } = req.body;
        try {
            const newGame = await game.createGame(host, word, deadline, gridSize);
            res.status(201).send(newGame);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    // Add other necessary methods like adding players to the game, storing guesses etc.
};

module.exports = gameController;
