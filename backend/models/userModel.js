const bcrypt = require('bcrypt');
const Datastore = require('nedb');

class User {
    constructor(dbFilePath) {
        this.db = dbFilePath ? new Datastore({ filename: dbFilePath, autoload: true }) : new Datastore();
    }

    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password before storing
        const user = { _id: username, password: hashedPassword, gamesPlayed: 0, gamesWon: 0 };

        return new Promise((resolve, reject) => {
            this.db.insert(user, (err, newDoc) => {
                if (err) reject(err);
                resolve(newDoc._id);
            });
        });
    }

    findUser(username) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: username }, (err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        });
    }

    async changePassword(username, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password

        return new Promise((resolve, reject) => {
            this.db.update({ _id: username }, { $set: { password: hashedPassword } }, {}, function (err, numReplaced) {
                if (err) reject(err);
                resolve(numReplaced > 0); // Return whether the update operation was successful
            });
        });
    }

    removeUser(username) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: username }, {}, function (err, numRemoved) {
                if (err) reject(err);
                resolve(numRemoved > 0); // Return whether the remove operation was successful
            });
        });
    }
}

module.exports = User;
