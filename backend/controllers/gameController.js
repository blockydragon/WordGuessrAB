const Game = require('../models/gameModel');

const gameController = {
    createGame: async (req, res) => {
        const game = new Game('./db/games.db');
        const { gameLength } = req.body;
        const gameAdmin = req.userId;

        try {
            const newGame = await game.createGame(gameAdmin, gameLength);
            res.status(201).send({ gameCode: newGame });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    joinGame: async (req, res) => {
	const game = new Game('./db/games.db');
	const { gameCode } = req.body;
	const userId = req.userId;

        try {
	    const existingGame = await game.findGame(gameCode);
    	    if (!existingGame) {
        	return res.status(404).send({ message: 'Game not found' });
    	    }

	    console.log(existingGame);
	    if(typeof existingGame.players !== 'undefined')
    		if (existingGame.players.includes(userId)) {
        	    return res.status(409).send({ message: 'You have already joined this game' });
    		}

    	    await game.addPlayer(gameCode, userId);
    	    res.status(200).send({ message: 'Successfully joined game' });
	} catch (error) {
	    console.log(error);
    	    res.status(500).send(error);
	}
    },

    getGameInfo: async (req, res) => {
	const game = new Game('./db/games.db');
	const { gameCode } = req.params;

	console.log("gameCode: "+gameCode);
	try {
    	    const gameInfo = await game.getGameInfo(gameCode);
    	    if (!gameInfo) {
        	return res.status(404).send({ message: 'Game not found' });
    	    }
    	    res.status(200).send(gameInfo);
	} catch (error) {
    	    res.status(500).send(error);
	}
    },

    findGame: async (req, res) => {
        const game = new Game('./db/games.db');
        const { gameCode } = req.params;

        try {
            const existingGame = await game.findGame(gameCode);
            if (!existingGame) {
                return res.status(404).send({ message: 'Game not found' });
            }
            res.status(200).send({ game: existingGame });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    updateGame: async (req, res) => {
        const game = new Game('./db/games.db');
        const { gameCode } = req.params;
        const newData = req.body;

        try {
            const existingGame = await game.findGame(gameCode);
            if (!existingGame) {
                return res.status(404).send({ message: 'Game not found' });
            }

            await game.updateGame(gameCode, newData);
            res.status(200).send({ message: 'Game updated successfully' });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    removeGame: async (req, res) => {
        const game = new Game('./db/games.db');
        const { gameCode } = req.params;

        try {
            const existingGame = await game.findGame(gameCode);
            if (!existingGame) {
                return res.status(404).send({ message: 'Game not found' });
            }

            await game.removeGame(gameCode);
            res.status(200).send({ message: 'Game removed successfully' });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    playGame: async (req, res) => {
	const game = new Game('./db/games.db');
	const { guess } = req.body;
	const { username } = req.decoded; // Assuming username is stored in token

	try {
    	    const result = /* Implement game logic here */;
    	    await game.savePlayerProgress(username, result);
    	    res.status(200).send(result);
	} catch (error) {
    	    res.status(500).send(error);
	}
    },

    getPlayerProgress: async (req, res) => {
	const game = new Game('./db/games.db');
	const { username } = req.decoded; // Assuming username is stored in token

	try {
    	    const progress = await game.getPlayerProgress(username);
    	    res.status(200).send(progress);
	} catch (error) {
    	    res.status(500).send(error);
	}
    }
};

module.exports = gameController;
