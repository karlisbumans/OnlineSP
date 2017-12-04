/**
 * Created by KarlisBumans on 29.04.2016.
 */
require('../models/sport');
var mongoose = require('mongoose');

var sportSchema = mongoose.model('sport');
var _ = require('underscore');
console.log('sportController');

exports.createSport = function (req, res){
    var sport = new sportSchema(req.body);
    console.log('sportController createSport save');
    console.log(req.body);
    sport.save(function(err){
        if(!err){
            res.status(200).send("Izveidots jauns sporta veids");
            console.log("OK")
        }
        else{
            console.log("NOT OK error: " + err.toString());
            res.status(404).send("Sporta veida izveide neveiksmīga " + err.toString() );
        }
    });
};

exports.deleteSport = function (req, res){

    sportSchema.loadOneSport(req.params.sportId, function (err, sport) {
        if (!err && sport) {
            sport.remove(function (err) {
                if (!err) {
                    res.jsonp(sport);
                }
                else {
                    res.status(404).send("Sporta veids nav izdzēsts");
                }
            });
        }
    });
};

exports.updateSport = function (req, res){

    sportSchema.loadOneSport(req.params.sportId, function (err, sport) {

        if (!err && sport) {
            sport = _.extend(sport, req.body);

            console.log('sportController updateSport save');
            console.log(req.body);

            sport.save(function (err) {
                if (!err) {
                    console.log("IR OK");
                    res.jsonp(sport);
                }
                else {
                    console.log("NAV OK");
                    res.status(404).send("Sporta veida datu atjaunošana neveiksmīga!");
                }
            });
        }

    });

};

exports.getSport = function (req, res) {

    sportSchema.loadOneSport(req.params.sportId, function (err, sport) {
        if (!err && sport) {
            res.jsonp(sport);
        } else {
            res.status(404).send('Sporta veids nav atrasts.....');
        }
    });

};

exports.getAllSports = function (req, res){

    sportSchema.loadAllSports(function (err, sport){
        if(!err && sport){
            res.jsonp(sport);
        }else{
            res.status(404).send('Nav neviens sporta veids .....');
        }
    });
};


exports.findSportByName = function (req, res) {
    sportSchema.findSportByName(req.params.sportname, function (err, sport) {
        if (!err && sport) {
            res.jsonp(sport);
        } else {
            res.status(404).send('Šāds sporta veids neeksistē');
        }
    });
};


