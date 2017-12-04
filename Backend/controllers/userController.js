/**
 * Created by KarlisBumans on 29.04.2016.
 */
require('../models/user');
var mongoose = require('mongoose');

var userSchema = mongoose.model('user');
var _ = require('underscore');
console.log('userController');

//exports.tests = function (req,res){
//    console.log("Kad tu strādāsi beidzot!!!");
   // console.log(req);
   // res.status(200).send('Ok');
//};

exports.createUser = function (req, res){
    var user = new userSchema(req.body);
    user.save(function(err){
        if(!err){
            res.status(200).send("Izveidots jauns lietotājs!");
        }
        else{
            res.status(404).send("Lietotāja pievienošana neveiksmīga");
        }
    });
};

exports.deleteUser = function (req, res){

    userSchema.loadOne(req.params.userId, function (err, user) {
        if (!err && user) {
            user.remove(function (err) {
                if (!err) {
                    res.jsonp(user);
                }
                else {
                    res.status(404).send("Lietotājs nav izdzēsts");
                }
            });
        }
    });



};

exports.updateUser = function (req, res){

    userSchema.loadOne(req.params.userId, function (err, user) {

        if (!err && user) {
            user = _.extend(user, req.body);
            user.save(function (err) {
                if (!err) {
                    res.jsonp(user);
                }
                else {
                    res.status(404).send("Lietotāja datu atjaunošana neveiksmīga!");
                }
            });
        }

    });

};

exports.getUser = function (req, res) {

    userSchema.loadOne(req.params.userId, function (err, user) {
        if (!err && user) {
            res.jsonp(user);
        } else {
            res.status(404).send('Lietotajs nav atrasts.....');
        }
    });

};

exports.getAllUsers = function (req, res){

    userSchema.loadAllUsers(function (err, user){
        if(!err && user){
            res.jsonp(user);
        }else{
            res.status(404).send('Nav neviens lietotajs.....');
        }
    });
};


exports.findUserByUsername = function (req, res) {
    userSchema.findUserByUsername(req.params.username, function (err, user) {
         if (!err && user) {
             res.jsonp(user);
         } else {
             res.status(404).send('Šāds lietotājs neeksistē');
         }
    });
};


