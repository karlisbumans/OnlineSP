/**
 * Created by Guntars on 2016.05.11..
 */
/**
 * Created by Guntars on 2016.05.05..
 */
/**
 * Created by KarlisBumans on 29.04.2016.
 */
var express = require('express');
var router = express.Router();

var gameController = require("../controllers/gameController");

router.get('/getallgames',gameController.getAllGames);
router.post('/addgame',gameController.createGame);

router.delete('/:gameId',gameController.deleteGame);
router.put('/:gameId',gameController.updateGame);
router.get('/:gameId',gameController.getGame);




console.log('gameRoutes');


module.exports = router;

