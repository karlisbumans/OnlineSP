/**
 * Created by KarlisBumans on 05.05.2016.
 */
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var team = new schema({
    sport: {type: schema.ObjectId, ref: 'sport'},
    team_name: {type: String, unique:true, required:true},
    coaches: {type: String, required:false},
    players: [
        { name: {type: String, required:false},
          surname: {type: String, required:false},
          player_number: {type: String, required:false}
       
        }
    ]
});

team.statics = {
    loadOneTeam: function (id, cb){
        this.findOne(
            {_id: id }
        ).exec(cb);
    },
    loadAllTeams: function(cb){
        this.find({
        }).exec(cb);
    },
    findTeamByName: function(teamname, cb){
        this.find(
            { team_name: teamname}
        ).exec(cb);
    }
};


module.exports = mongoose.model('team', team);