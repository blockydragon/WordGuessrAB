const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    createUser: async (req, res) => {
        const user = new User('./db/users.db');
        const { username, password } = req.body;

        try {
            const existingUser = await user.findUser(username);
            if (existingUser) {
                return res.status(409).send({ message: 'User already exists' });
            }
            const newUser = await user.createUser(username, password);
            res.status(201).send({ username: newUser });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    },

    changePassword: async (req, res) => {
        const user = new User('./db/users.db');
        const { username, oldPassword, newPassword } = req.body;

        try {
            const existingUser = await user.findUser(username);
            if (!existingUser) {
                return res.status(404).send({ message: 'User not found' });
            }

            const match = await bcrypt.compare(oldPassword, existingUser.password);
            if (!match) {
                return res.status(401).send({ message: 'Incorrect password' });
            }

            await user.changePassword(username, newPassword);
            res.status(200).send({ message: 'Password changed successfully' });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    },

    removeUser: async (req, res) => {
        const user = new User('./db/users.db');
        const { username } = req.body;

        try {
            const existingUser = await user.findUser(username);
            if (!existingUser) {
                return res.status(404).send({ message: 'User not found' });
            }

            await user.removeUser(username);
            res.status(200).send({ message: 'User removed successfully' });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    },

    loginUser: async (req, res) => {
        const user = new User('./db/users.db');
        const { username, password } = req.body;

        try {
            const existingUser = await user.findUser(username);
            if (!existingUser) {
                return res.status(401).send({ message: 'Invalid username or password' });
            }

            // Compare the entered password with the stored hash
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) {
                return res.status(401).send({ message: 'Invalid username or password' });
            }

            // User is authenticated, create a token
	    console.log(existingUser);
            const token = jwt.sign({ id: existingUser._id, username: username }, 'secret', { expiresIn: '1h' });

            res.status(200).send({ token });
        } catch (error) {
            res.status(500).send({ message: error });
        }
    },
};

module.exports = userController;
