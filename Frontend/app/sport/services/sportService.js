/**
 * Created by karlis on 2016.05.05..
 */
LSIS.service('sportService', ['$resource','$http', '$location',function($resource,$http, $location) {
    this.currentSport=null; //aktīvā sporta id
    this.sportData={};
    this.setSportData = function(data) {
        this.sportData = data;
    }
    this.getSportData = function () {
        return this.sportData;
    }
    this.clearSportData = function () {
        this.sportData = {};
    }

    this.sportList=null;
    this.setSportList = function(sportList) {
        this.sportList = sportList;
    }
    this.getSportList = function () {
        return this.sportList;
    }

    this.setCurrentSport = function(sport) {
        this.currentSport = sport;
    }
    this.getCurrentSport = function () {
        return this.currentSport;
    }




    this.createSport = function(sport) {
        $http.post('http://localhost:8080/api/sport/addsport', sport).then(function successCallback(response) {
            //alert("Sporta veids veiksmīgi pievienots");
            $location.path("/sportList" );
        }, function errorCallback(response) {
            //alert("Kļūda, Sporta veids nav pievienots");
            $location.path("/sportList" );
        });
    };

    this.updateSport = function(sport) {
        $http.put('http://localhost:8080/api/sport/' + sport._id, sport).then(function successCallback(response) {
            //alert("Sporta veids veiksmīgi labots");
            $location.path("/sportList" );
        }, function errorCallback(response) {
            //alert("Kļūda, Sporta veids nav labots!");
            $location.path("/sportList" );
        });
    };

    this.deleteSport = function(sportid) {
        $http.delete('http://localhost:8080/api/sport/'+sportid).then(function successCallback(response) {
            //alert("Sporta veids veiksmīgi izdzēsts");
        }, function errorCallback(response) {
            //alert("Kļūda, Sporta veids nav izdzēsts");
        });
    };


}]);