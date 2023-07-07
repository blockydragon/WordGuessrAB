const express = require('express');
const gameController = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, gameController.createGame);
router.get('/find', authMiddleware, gameController.findGame);
router.put('/update', authMiddleware, gameController.updateGame);
router.delete('/remove', authMiddleware, gameController.removeGame);
router.post('/join', authMiddleware, gameController.joinGame);
router.get('/info/:gameCode', gameController.getGameInfo);
router.post('/play', authMiddleware, gameController.playGame);
router.get('/progress', authMiddleware, gameController.getPlayerProgress);

module.exports = router;
