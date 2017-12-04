/**
 * Created by KarlisBumans on 28.04.2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var user = new schema({

    username: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    name: {type: String, required:true},
    surname: {type: String, required:true}

});

user.statics = {
    loadOne: function (id, cb){
        this.findOne(
            {_id: id }
        ).exec(cb);
    },
    loadAllUsers: function(cb){
        this.find({
        }).exec(cb);
    },
    findUserByUsername: function(username, cb){
        this.find(
            { username: username}
        ).exec(cb);
    }
};


module.exports = mongoose.model('user', user);