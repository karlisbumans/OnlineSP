/**
 * Created by KarlisBumans on 05.05.2016.
 */
require('../models/team');
var mongoose = require('mongoose');

var teamSchema = mongoose.model('team');
var _ = require('underscore');
console.log('teamController');

exports.createTeam = function (req, res){
    var team = new teamSchema(req.body);

    console.log('teamController createTeam save');
    console.log(req.body);

    team.save(function(err){
        if(!err){
            res.status(200).send("Izveidota jauna komanda");
            console.log("OK")
        }
        else{
            console.log("NOT OK error: " + err.toString());
            res.status(404).send("Komandas izveide neveiksmīga " + err.toString() );
        }
    });
};

exports.deleteTeam = function (req, res){

    teamSchema.loadOneTeam(req.params.teamId, function (err, team) {
        if (!err && team) {
            team.remove(function (err) {
                if (!err) {
                    res.jsonp(team);
                }
                else {
                    res.status(404).send("Komanda nav dzēsta");
                }
            });
        }
    });
};

exports.updateTeam = function (req, res){

    teamSchema.loadOneTeam(req.params.teamId, function (err, team) {

        console.log('teamController updateTeam save');
        console.log(req.body);
        
        if (!err && team) {
            team = _.extend(team, req.body);

            team.save(function (err) {
                if (!err) {
                    console.log("IR OK");
                    res.jsonp(team);
                }
                else {
                    console.log("NAV OK");
                    res.status(404).send("Komandas labošana neveiksmīga");
                }
            });
        }

    });

};

exports.getTeam = function (req, res) {

    teamSchema.loadOneTeam(req.params.teamId, function (err, team) {
        if (!err && team) {
            res.jsonp(team);
        } else {
            res.status(404).send('Komanda nav atrasta');
        }
    });

};

exports.getAllTeams = function (req, res){

    teamSchema.loadAllTeams(function (err, team){
        if(!err && team){
            res.jsonp(team);
        }else{
            res.status(404).send('Nav nevienas komandas');
        }
    });
};

/*
exports.findTeamByName = function (req, res) {
    
    teamSchema.findTeamByName(req.params.teamname, function (err, team) {
        if (!err && team) {
            res.jsonp(team);
        } else {
            res.status(404).send('Šāda komanda nav atrasta');
        }
    });
};

*/