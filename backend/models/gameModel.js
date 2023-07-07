const Datastore = require('nedb');
const shortid = require('shortid');
const fiveLetterWords = require('../vocabulary/wordList.js');

class Game {
    constructor(dbFilePath) {
        this.db = dbFilePath ? new Datastore({ filename: dbFilePath, autoload: true }) : new Datastore();
    }

    createGame(gameAdmin, gameLength) {
        const gameCode = shortid.generate();
	const secretWord = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
        const game = { _id: gameCode, gameAdmin: gameAdmin, gameLength: gameLength, secretWord: secretWord, players: [], turns: [] };

	console.log("game: "+JSON.stringify(game));
        return new Promise((resolve, reject) => {
            this.db.insert(game, (err, newDoc) => {
                if (err) reject(err);
                resolve(newDoc._id);
            });
        });
    }

    findGame(gameCode) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: gameCode }, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }

    updateGame(gameCode, gameData) {
        return new Promise((resolve, reject) => {
            this.db.update({ _id: gameCode }, { $set: gameData }, {}, function (err, numReplaced) {
                if (err) reject(err);
                resolve(numReplaced > 0); // Return whether the update operation was successful
            });
        });
    }

    removeGame(gameCode) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: gameCode }, {}, function (err, numRemoved) {
                if (err) reject(err);
                resolve(numRemoved > 0); // Return whether the remove operation was successful
            });
        });
    }

    addPlayer(gameCode, userId) {
	return new Promise((resolve, reject) => {
    	    this.db.update({ _id: gameCode }, { $push: { players: userId } }, {}, function(err, numReplaced) {
        	if (err) reject(err);
        	resolve(numReplaced > 0);
    	    });
	});
    }

    getGameInfo(gameCode) {
	return new Promise((resolve, reject) => {
    	    this.db.findOne({ _id: gameCode }, (err, docs) => {
		console.log("err: "+err);
		console.log("docs: "+docs);
        	if (err) reject(err);
        	resolve(docs);
    	    });
	});
    }

    savePlayerProgress(username, result) {
	return new Promise((resolve, reject) => {
    	    this.db.update({ username }, { $push: { progress: result } }, {}, function (err, numReplaced) {
        	if (err) reject(err);
        	resolve(numReplaced > 0);
    	    });
	});
    }

    getPlayerProgress(username) {
	return new Promise((resolve, reject) => {
    	    this.db.findOne({ username }, (err, docs) => {
        	if (err) reject(err);
        	resolve(docs.progress);
    	    });
	});
    }
}

module.exports = Game;
