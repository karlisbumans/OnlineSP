/**
 * Created by karlis on 2016.05.05..
 */
LSIS.service('teamService', ['$resource','$http', '$location',function($resource,$http, $location) {
    this.currentTeamID=null; //aktīvā team id
    this.teamData={};
    this.setTeamData = function(data) {
        this.teamData = data;
    }
    this.getTeamData = function () {
        return this.teamData;
    }

    this.teamList=null;
    this.setTeamList = function(teamList) {
        this.teamList = teamList;
    }
    this.getTeamList = function () {
        return this.teamList;
    }

    

    this.createTeam = function(team) {
        $http.post('http://localhost:8080/api/team/addteam', team).then(function successCallback(response) {
            //alert("Komanda veiksmīgi pievienota!");
            $location.path("/teamList" );
        }, function errorCallback(response) {
            //alert("Kļūda, komanda nav pievienota!");
            $location.path("/teamList" );
        });
    };

    this.updateTeam = function(team) {
        $http.put('http://localhost:8080/api/team/' + team._id, team).then(function successCallback(response) {
           // alert("Komanda veiksmīgi labota!");
            $location.path("/teamList" );
        }, function errorCallback(response) {
            //alert("Kļūda, komanda nav labota!");
            $location.path("/teamList" );
        });
    };

    this.deleteTeam = function(teamid) {
        $http.delete('http://localhost:8080/api/team/'+teamid).then(function successCallback(response) {
            //alert("Komanda veiksmīgi izdzēsta!");
        }, function errorCallback(response) {
            //alert("Kļūda, komanda nav izdzēsta!");
        });
    };

}]);