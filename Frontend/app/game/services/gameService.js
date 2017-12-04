/**
 * Created by karlis on 2016.05.05..
 */
LSIS.service('gameService', ['$resource','$http', '$location',function($resource,$http, $location) {
    this.currentGameID=null; //aktīvā game id
    this.gameData={};
    this.setGameData = function(data) {
        this.gameData = data;
    }
    this.getGameData = function () {
        return this.gameData;
    }
    this.clearGameData = function () {
        this.gameData = {};
    }

    this.gameList=null;
    this.setGameList = function(gameList) {
        this.gameList = gameList;
    }
    this.getGameList = function () {
        return this.gameList;
    }




    this.createGame = function(game) {
        $http.post('http://localhost:8080/api/game/addgame', game).then(function successCallback(response) {
            //alert("Spēle veiksmīgi pievienota");
            //$location.path("/gameList" );
        }, function errorCallback(response) {
            //alert("Kļūda, Sporta veids nav pievienots");
            //$location.path("/gameList" );
        });
    };

    this.updateGame = function(game) {
        $http.put('http://localhost:8080/api/game/' + game._id, game).then(function successCallback(response) {
            //alert("Spēle veiksmīgi labota");
            //$location.path("/gameList" );
        }, function errorCallback(response) {
            //alert("Kļūda, Spēle nav labota!");
            //$location.path("/gameList" );
        });
    };

    this.deleteGame = function(gameid) {
        $http.delete('http://localhost:8080/api/game/'+gameid).then(function successCallback(response) {
            //alert("Spēle veiksmīgi izdzēsta");
        }, function errorCallback(response) {
            //alert("Kļūda, spēle nav izdzēsta!");
        });
    };

}]);