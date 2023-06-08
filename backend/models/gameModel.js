const Datastore = require('nedb');

class Game {
    constructor(dbFilePath) {
        this.db = dbFilePath ? new Datastore({ filename: dbFilePath, autoload: true }) : new Datastore();
    }

    createGame(host, word, deadline, gridSize) {
        const game = {
            host,
            word,
            deadline,
            gridSize,
            players: [],
            // ... add other necessary properties
        };

        return new Promise((resolve, reject) => {
            this.db.insert(game, (err, newDoc) => {
                if (err) reject(err);
                resolve(newDoc._id);
            });
        });
    }

    // Add other necessary methods like adding players to the game, storing guesses etc.
}

module.exports = Game;
