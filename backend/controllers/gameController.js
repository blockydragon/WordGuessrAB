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
            res.status(500).send({ message: error });
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
    	    res.status(500).send({ message: error });
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
    	    res.status(500).send({ message: error });
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
            res.status(500).send({ message: error });
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
            res.status(500).send({ message: error });
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
            res.status(500).send({ message: error });
        }
    },

    playGame: async (req, res) => {
	const game = new Game('./db/games.db');
	const userId = req.userId;
	const { gameCode, guess } = req.body;

	try {
	    console.log("gameCode: "+gameCode);
	    const existingGame = await game.findGame(gameCode);
	    console.log(JSON.stringify(existingGame));
            if (!existingGame) {
	        return res.status(404).send({ message: 'Game not found' });
    	    }

	    let userTurns = existingGame.turns.filter(turn => turn.userId === userId);

	    if(existingGame.status == 'OVER'){
		console.log("GAME OVER!");
		return res.status(200).send({ turns: userTurns, 
		    status: existingGame.status, winner: existingGame.winner });
	    }



            if (userTurns.length >= 6) {
	        return res.status(400).send({ message: 'No more guesses left for user '+userId, turns: userTurns });
    	    }

	    if(guess === ''){
		return res.status(200).send({ turns: userTurns});
	    }

            if (guess === existingGame.secretWord) {
		existingGame.status = 'OVER';
		existingGame.winner = userId;
		await game.updateGame(gameCode, existingGame);
	        return res.status(200).send({ message: 'Congratulations! You guessed the word.', turns: userTurns, 
		    status: existingGame.status, winner: existingGame.winner });
    	    }

            const result = existingGame.secretWord.split('').map((letter, index) => {
	        if (letter === guess[index]) return { letter, status: 'green' };
    	        else if (existingGame.secretWord.includes(guess[index])) return { letter: guess[index], status: 'yellow' };
        	else return { letter: guess[index], status: 'grey' };
            });

            existingGame.turns.push({ userId, guess, result });

	    await game.updateGame(gameCode, existingGame);
//	    await game.savePlayerProgress(username, game);
	    userTurns = existingGame.turns.filter(turn => turn.userId === userId);
    	    return res.status(200).send({ turns: userTurns});
	} catch (error) {
	    console.log(error);
    	    return res.status(500).send({ message: error });
	}
    },

    getPlayerProgress: async (req, res) => {
	const game = new Game('./db/games.db');
	const { username } = req.decoded; // Assuming username is stored in token

	try {
    	    const progress = await game.getPlayerProgress(username);
    	    res.status(200).send(progress);
	} catch (error) {
    	    res.status(500).send({ message: error });
	}
    }
};

module.exports = gameController;
