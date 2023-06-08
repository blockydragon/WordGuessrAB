const express = require('express');
const gameController = require('../controllers/gameController');
const router = express.Router();

router.post('/game', gameController.createGame);
// Add other necessary routes for game operations

module.exports = router;
