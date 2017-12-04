/**
 * Created by karlis on 2016.05.05..
 */
LSIS.controller('teamController', [
    '$scope',
    '$routeParams',
    '$window',
    '$location',
    'teamService',
    '$http',
    'sportService',
    'userService',
    function($scope, $routeParams, $window, $location, teamService, $http, sportService, userService) {
        $scope.pazinojums = 'TeamController';
        $scope.isUserLoggedIn = userService.isUserLoggedIn();
        console.log('team kontrolieris');
        $scope.deleteTeamId = $routeParams.deleteTeamId;
        $scope.team = {};
        $scope.team._id = null;
        $scope.team.sport = null;
        $scope.team.team_name = null;
        $scope.team.coaches = null;
        $scope.teamlist={};
        $scope.sportlist={};

        $scope.checkUserRights=function() {
            userService.checkUserRights();
        }        

    /*
    Pieliek $scope.team.events masīvam galā jaunu elementu- objektu ar {name:newname}
     */
    $scope.addPlayer = function(newname, newsurname, playernumber){
        if ($scope.team.players==null) {
            $scope.team.players=[];
        }
        len= $scope.team.players.length;
        temp = [];
        for (i=0; i<$scope.team.players.length; i++) {
            temp[i] = $scope.team.players[i];
    }
        temp[len] = {name: newname, surname: newsurname, player_number: playernumber};
        $scope.team.players = temp;
        //alert("Pievienot jaunu spēlētāju!");
    }

    $scope.deletePlayer = function(indexToDelete){
        len= $scope.team.players.length;
        temp = [];
        j=-1;
        for (i=0; i<$scope.team.players.length; i++) {
            if (i != indexToDelete) {
                j++;
                temp[j] = $scope.team.players[i];
            }
        }
        $scope.team.players = temp;
    }

    $scope.refreshPage = function(){
        $scope.team = teamService.getTeamData();
    };


    $scope.updateTeam = function(){
        console.log('updateTeam');
        // saglabā tekošo sporta veidu kā aktīvo, lai atfiltrētu komantu sarakstu pēc tā
        sportService.setCurrentSport($scope.team.sport);
        //jāpievieno vai jālabo:
        if ($scope.team._id ==null ) {
           teamService.createTeam($scope.team);
        }
        else {
            teamService.updateTeam($scope.team);
        }

    };


    $scope.editTeam = function(editData){
        $scope.team = editData;
        teamService.setTeamData(editData);
        $location.path("/editTeam/" + $scope.team._id);
    };

    $scope.deleteTeam = function(teamid){
        teamService.deleteTeam(teamid);
        $scope.deleteTeamFromList(teamid);
    };

    $scope.getTeamList = function(){
        console.log("call $scope.getTeamList");
        $http.get('http://localhost:8080/api/team/getallteams').then(function successCallback(response) {
            $scope.teamlist = response.data;
            teamService.setTeamList($scope.teamlist);
            console.log("$scope.teamlist size: " + $scope.teamlist.length);
        }, function errorCallback(response) {
            //alert("Kļūda.....");
        });
    };

    $scope.backToList = function(){
        // saglabā tekošo sporta veidu kā aktīvo, lai atfiltrētu komantu sarakstu pēc tā
        sportService.setCurrentSport($scope.team.sport);
        console.log('backToList');
        
        $location.path("/teamList" );
    };

    $scope.deleteTeamFromList = function(teamId){
        len= $scope.teamlist.length;
        temp = [];
        j=-1;
        for (i=0; i<$scope.teamlist.length; i++) {
            if ($scope.teamlist[i]._id != teamId) {
                j++;
                temp[j] = $scope.teamlist[i];
            }
        }
        $scope.teamlist = temp;
        teamService.setTeamList(temp);
    }

    $scope.addNewTeam = function(){
        sportCurrent =  $scope.team.sport;
        $scope.team = {};
        $scope.team.sport = sportCurrent;
        $scope.team._id = null;
        $scope.team.team_name = null;
        $scope.team.coaches = null;
        teamService.setTeamData($scope.team);
        if ($scope.teamlist==null) {
            $scope.teamlist=[];
        }
        n=$scope.teamlist.length;
        $scope.teamlist[n] = $scope.team;
        teamService.setTeamList(null);
        $location.path("/createTeam" );
    }


    $scope.getSportList = function(){
        if (2*2==4 || sportService.getSportList()==null) {
            $http.get('http://localhost:8080/api/sport/getallsports').then(function successCallback(response) {
                $scope.sportlist = response.data;
                sportService.setSportList($scope.sportlist);
            }, function errorCallback(response) {
                //alert("Kļūda.....");
            });
        }
        else {
            $scope.sportlist = sportService.getSportList();
        }
        if ( sportService.getCurrentSport() != null ) {
            console.log('load all sports');
            $scope.team.sport = sportService.getCurrentSport();
        }
    }

    $scope.pageReload = function(){
        console.log('reload page!');
        $window.location.reload();
    }
        
    

}]);
