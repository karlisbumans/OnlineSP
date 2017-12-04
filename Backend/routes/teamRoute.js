/**
 * Created by KarlisBumans on 05.05.2016.
 */
var express = require('express');
var router = express.Router();

var teamController = require("../controllers/teamController");

router.get('/getallteams',teamController.getAllTeams);
router.post('/addteam',teamController.createTeam);

//router.get('/findTeamByName/:teamname', teamController.findTeamByName());

router.delete('/:teamId',teamController.deleteTeam);
router.put('/:teamId',teamController.updateTeam);
router.get('/:teamId',teamController.getTeam);




console.log('teamRoute');


module.exports = router;
