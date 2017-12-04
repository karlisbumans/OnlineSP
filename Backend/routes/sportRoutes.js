/**
 * Created by Guntars on 2016.05.05..
 */
/**
 * Created by KarlisBumans on 29.04.2016.
 */
var express = require('express');
var router = express.Router();

var sportController = require("../controllers/sportController");

router.get('/getallsports',sportController.getAllSports);
router.post('/addsport',sportController.createSport);

router.get('/findSportByName/:sportname', sportController.findSportByName);

router.delete('/:sportId',sportController.deleteSport);
router.put('/:sportId',sportController.updateSport);
router.get('/:sportId',sportController.getSport);




console.log('sportRoute');


module.exports = router;

