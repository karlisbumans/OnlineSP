/**
 * Created by KarlisBumans on 05.05.2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var sport = new schema({
    sport_name: {type: String, unique:true, required:true},
    period_count: {type: Number, required:false},
    period_length: {type: Number, required:false},
    events: [
        {
            name: {type: String, required:true},
            score_change: Number
        }
    ]
});

sport.statics = {
    loadOneSport: function (id, cb){
        this.findOne(
            {_id: id }
        ).exec(cb);
    },
    loadAllSports: function(cb){
        this.find({
        }).exec(cb);
    },
    findSportByName: function(sportname, cb){
        this.find(
            { sport_name: sportname}
        ).exec(cb);
    }
};


module.exports = mongoose.model('sport', sport);