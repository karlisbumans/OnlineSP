/**
 * Created by karlis on 2016.05.05..
 */
LSIS.controller('sportController', [
    '$scope',
    '$routeParams',
    '$window',
    '$location',
    'sportService',
    '$http',
    'userService',
    function($scope, $routeParams, $window, $location, sportService, $http, userService) {
    $scope.pazinojums = 'SportController';
    console.log('sporta kontrolieris');
    $scope.isUserLoggedIn = userService.isUserLoggedIn();
    $scope.deleteSportId = $routeParams.deleteSportId;
    $scope.sport = {};
    $scope.sport._id = null;
    $scope.sport.sport_name = null;
    $scope.sport.period_count = null;
	$scope.sport.period_length = null;
    $scope.sportlist={};

    $scope.checkUserRights=function() {
        userService.checkUserRights();
    }
    /*
    Pieliek $scope.sport.events masīvam galā jaunu elementu- objektu ar {name:newname}
     */
    $scope.addEvent = function(newname){
        if ($scope.sport.events==null) {
            $scope.sport.events=[];
        }
        len= $scope.sport.events.length;
        temp = [];
        for (i=0; i<$scope.sport.events.length; i++) {
            temp[i] = $scope.sport.events[i];
        }
        temp[len] = {name: newname, score_change: 0};
        $scope.sport.events = temp;
    }

    $scope.deleteEvent = function(indexToDelete){
        len= $scope.sport.events.length;
        temp = [];
        j=-1;
        for (i=0; i<$scope.sport.events.length; i++) {
            if (i != indexToDelete) {
                j++;
                temp[j] = $scope.sport.events[i];
            }
        }
        $scope.sport.events = temp;
    }

    $scope.refreshPage = function(){
        $scope.sport = sportService.getSportData();
    };

    $scope.updateSport = function(){
        //jāpievieno vai jālabo:
        if ($scope.sport._id ==null ) {
            sportService.createSport($scope.sport);
        }
        else {
            sportService.updateSport($scope.sport);
        }
    };

    $scope.editSport = function(editData){
        $scope.sport = editData;
        sportService.setSportData(editData);
        $location.path("/editSport/" + $scope.sport._id);
    };

    $scope.deleteSport = function(sportid){
        sportService.deleteSport(sportid);
        $scope.deleteSportFromList(sportid);
    };

    $scope.getSportList = function(){
        console.log("call $scope.getSportList");
        if (sportService.getSportList()==null) {
            console.log("CALL DB");
            $http.get('http://localhost:8080/api/sport/getallsports').then(function successCallback(response) {
                $scope.sportlist = response.data;
                sportService.setSportList($scope.sportlist);
                console.log("row count:" + response.data.length);
            }, function errorCallback(response) {
                //alert("Kļūda.....");
            });
        }
        else {
            console.log("GET locally by sportService.getSportList()");
            $scope.sportlist = sportService.getSportList();
        }
    };

    $scope.backToList = function(){
        $location.path("/sportList" );
    };

    $scope.deleteSportFromList = function(sportId){
        len= $scope.sportlist.length;
        temp = [];
        j=-1;
        for (i=0; i<$scope.sportlist.length; i++) {
            if ($scope.sportlist[i]._id != sportId) {
                j++;
                temp[j] = $scope.sportlist[i];
            }
        }
        $scope.sportlist = temp;
        sportService.setSportList(temp);
    }

    $scope.addNewSport = function(){
        console.log("$scope.addNewSport:");
        console.log($scope.sportlist);
        $scope.sport = {};
        $scope.sport._id = null;
        $scope.sport.sport_name = null;
		$scope.sport.period_count = null;
        $scope.sport.period_length = null;
        sportService.setSportData($scope.sport);
        if ($scope.sportlist==null) {
            $scope.sportlist=[];
        }
        n=$scope.sportlist.length;
        $scope.sportlist[n] = $scope.sport;
        sportService.setSportList(null);
        $location.path("/createSport" );
    }

}]);
