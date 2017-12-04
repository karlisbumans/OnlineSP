/**
 * Created by Guntars on 2016.05.11..
 */
/**
 * Created by KarlisBumans on 29.04.2016.
 */
require('../models/game');
var mongoose = require('mongoose');

var gameSchema = mongoose.model('game');
var _ = require('underscore');
console.log('gameController');

/*
atgriež res: jaunizveidotā ieraksta _id
 */
exports.createGame = function (req, res){
    var game = new gameSchema(req.body);
    console.log('gameController createGame save');
    console.log(req.body);
    game.save(function(err){
        if(!err){
            //res.status(200).send("Izveidota jauna spēle");
            console.log("OK");
            gameSchema.loadAllGames(function (err, sport){
                if(!err && sport){
                    newid="";
                    for (i=0; i<sport.length;i++) {
                        newid=sport[i]._id;
                    }
                    res.status(200).send(newid);
                }else{
                    res.status(405).send('Nav neviena spēle .....');
                }
            });

        }
        else{
            console.log("NOT OK error: " + err.toString());
            res.status(404).send("Spēles izveide neveiksmīga " + err.toString() );
        }

    });


};

exports.deleteGame = function (req, res){
    console.log('gameController deleteGame req.params:');
    console.log(req.params);
    gameSchema.loadOneGame(req.params.gameId, function (err, game) {

        if (!err && game) {
            game.remove(function (err) {
                if (!err) {
                    res.jsonp(game);
                }
                else {
                    res.status(404).send("Spēle nav izdzēsta");
                }
            });
        }
    });
};

exports.updateGame = function (req, res){

    gameSchema.loadOneGame(req.params.gameId, function (err, game) {

        if (!err && game) {
            game = _.extend(game, req.body);
            console.log('gameController updateGame save');
            console.log(req.body);
            game.save(function (err) {
                if (!err) {
                    console.log("IR OK");
                    res.jsonp(game);
                }
                else {
                    console.log("NAV OK err:");
                    console.log(err);
                    res.status(404).send("Spēles atjaunošana neveiksmīga!");
                }
            });
        }
    });
};

exports.getGame = function (req, res) {
    console.log('gameController getGame req.params:');
    console.log(req.params);

    gameSchema.loadOneGame(req.params.gameId, function (err, sport) {
        if (!err && sport) {
            res.jsonp(sport);
        } else {
            res.status(404).send('Spēle nav atrasta.....');
        }
    });
};

exports.getAllGames = function (req, res){

    gameSchema.loadAllGames(function (err, sport){
        if(!err && sport){
            res.jsonp(sport);
        }else{
            res.status(405).send('Nav neviena spēle .....');
        }
    });
};



