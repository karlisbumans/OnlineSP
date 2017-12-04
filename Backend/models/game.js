/**
 * Created by Guntars on 2016.05.11..
 */
/**
 * Created by KarlisBumans on 05.05.2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var game = new schema({
    date: String,
    sport: {type: schema.ObjectId, ref: 'sport'},
    team1: {type: schema.ObjectId, ref: 'team'},
    team2: {type: schema.ObjectId, ref: 'team'},
    score1: {type: Number, required:false},
    score2: {type: Number, required:false},
    events: [
        {
            time: String,
            team: {type: schema.ObjectId, ref: 'team'},
            player: {type: schema.ObjectId, ref: 'team.players'},
            event_type: {type: schema.ObjectId, ref: 'sport.events'},
            comment: String
        }
    ]
});

game.statics = {
    loadOneGame: function (id, cb){
        this.findOne(
            {_id: id }
        ).exec(cb);
    },
    loadAllGames: function(cb){
        this.find({
        }).exec(cb);
    }

};


module.exports = mongoose.model('game', game);