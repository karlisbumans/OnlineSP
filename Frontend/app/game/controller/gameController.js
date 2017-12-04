/**
 * Created by karlis on 2016.05.05..
 */
LSIS.controller('gameController', [
    '$scope',
    '$window',
    '$location',
    'gameService',
    '$http',
    'sportService',
    'teamService',
    'userService',
    function($scope, $window, $location, gameService, $http, sportService, teamService, userService) {
        $scope.pazinojums = 'GameController';

        console.log('game kontrolieris');
        $scope.isUserLoggedIn = userService.isUserLoggedIn();
        
        $scope.game = {};
        $scope.game._id = null;
        $scope.game.date = null;
        $scope.game.sport = null;
        $scope.game.team1 = null;
        $scope.game.team2 = null;
        $scope.game.score1 = null;
        $scope.game.score2 = null;
        $scope.gamelist = {};
        $scope.sportlist = {};
        $scope.teamlist = {};

        $scope.teamSearch = {};

        $scope.checkUserRights=function() {
            userService.checkUserRights();
        }
        
        /*
         Pieliek $scope.sport.events masīvam galā jaunu elementu- objektu ar {name:newname}
         */
        $scope.addEvent = function (newname) {
            if ($scope.game.events == null) {
                $scope.game.events = [];
            }
            len = $scope.game.events.length;
            temp = [];
            for (i = 0; i < $scope.game.events.length; i++) {
                temp[i] = $scope.game.events[i];
            }
            temp[len] = {
                time: "", team: null, event_name: newname,
                player_number: null,
                comment: ""
            };
            $scope.game.events = temp;
        }

        $scope.deleteEvent = function (indexToDelete) {
            len = $scope.game.events.length;
            temp = [];
            j = -1;
            for (i = 0; i < $scope.game.events.length; i++) {
                if (i != indexToDelete) {
                    j++;
                    temp[j] = $scope.game.events[i];
                }
            }
            $scope.game.events = temp;
        }

        $scope.refreshPage = function () {
            $scope.game = gameService.getGameData();
        };

        $scope.updateGame = function () {
            //jāpievieno vai jālabo:
            $scope.calculateScore();
            if ($scope.game._id == null) {
                //gameService.createGame($scope.game);
                $scope.createGameDB($scope.game);
            }
            else {
                //gameService.updateGame($scope.game);
                $scope.updateGameDB($scope.game);
            }
            $scope.getGame();
        };

        $scope.editGame = function (editData) {
            $scope.game = editData;
            gameService.setGameData(editData);
            $location.path("/editGame/" + $scope.game._id);
        };


        $scope.watchGame = function (editData) {
            $scope.game = editData;
            gameService.setGameData(editData);
            $location.path("/watchGame/" + $scope.game._id);
        };

        $scope.deleteGame = function (gameid) {
            gameService.deleteGame(gameid);
            $scope.deleteGameFromList(gameid);
        };

        $scope.deleteGameFromList = function(gameid){
            len= $scope.gamelist.length;
            temp = [];
            j=-1;
            for (i=0; i<$scope.gamelist.length; i++) {
                if ($scope.gamelist[i]._id != gameid) {
                    j++;
                    temp[j] = $scope.gamelist[i];
                }
            }
            $scope.gamelist = temp;
            gameService.setGameList(temp);
        }


        $scope.getGameList = function () {
            console.log("call $scope.getGameList");
            if (true || gameService.getGameList() == null) {
                console.log("CALL DB");
                $http.get('http://localhost:8080/api/game/getallgames').then(function successCallback(response) {
                    $scope.gamelist = response.data;
                    gameService.setGameList($scope.gamelist);
                    console.log("getGameList row count:" + response.data.length);
                }, function errorCallback(response) {
                    //alert("Kļūda.....");
                });
            }
            else {
                console.log("GET locally by gameService.getGameList()");
                $scope.gamelist = gameService.getGameList();
            }
        };

        $scope.getGame = function () {
            console.log("call $scope.getGame from DB");
            $http.get('http://localhost:8080/api/game/' + $scope.game._id).then(function successCallback(response) {
                console.log(response);
                $scope.game = response.data;
                gameService.setGameData($scope.game);
            }, function errorCallback(response) {
                //alert("Kļūda.....");
            });
        };

        $scope.backToList = function () {
            $location.path("/gameList");
        };

        $scope.backToListPublic = function () {
            $location.path("/gameListPublic");
        };


        $scope.deleteSportFromList = function (gameId) {
            len = $scope.gamelist.length;
            temp = [];
            j = -1;
            for (i = 0; i < $scope.gamelist.length; i++) {
                if ($scope.gamelist[i]._id != gameId) {
                    j++;
                    temp[j] = $scope.gamelist[i];
                }
            }
            $scope.gamelist = temp;
            gameService.setGameList(temp);
        }

        $scope.addNewGame = function () {
            console.log("$scope.addNewGame:");
            console.log($scope.gamelist);
            $scope.game = {};
            $scope.game._id = null;
            $scope.game.date = null;
            $scope.game.sport = null;
            $scope.game.team1 = null;
            $scope.game.team2 = null;
            $scope.game.score1 = null;
            $scope.game.score2 = null;

            gameService.setGameData($scope.game);
            if ($scope.gamelist == null) {
                $scope.gamelist = [];
            }
            n = $scope.gamelist.length;
            $scope.gamelist[n] = $scope.game;
            gameService.setGameList(null);
            $location.path("/createGame");
        }

        /*
         * Iegūst sporta veidu sarakstu, ko izmanto html-ā <select><option> ... aizpildīšanai
         */
        $scope.getSportList = function () {
            if (sportService.getSportList() == null) {
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
        }

        /*
         * Iegūst sporta veidu sarakstu, ko izmanto html-ā <select><option> ... aizpildīšanai
         */
        $scope.getTeamList = function () {
            console.log("call $scope.getTeamList");
            if (true || teamService.getTeamList() == null) {
                console.log("CALL DB");
                $http.get('http://localhost:8080/api/team/getallteams').then(function successCallback(response) {
                    $scope.teamlist = response.data;
                    teamService.setTeamList($scope.teamlist);
                    console.log("row count:" + response.data.length);
                }, function errorCallback(response) {
                    //alert("Kļūda.....");
                });
            }
            else {
                console.log("GET locally by sportService.getSportList()");
                $scope.teamlist = teamService.getTeamList();
            }
            if (sportService.getCurrentSport() != null ) {
                $scope.game.sport = sportService.getCurrentSport(); //atjauno, kā saraksts tika atfiltrēts
            }

        }

        /*
         * Testa funkcija.
         * Tiek izsaukta no
         * <select name="sportSelect" ... ng-change="sportChange()">
         */
        $scope.sportChange = function () {
            console.log("sportChange to:");
            console.log($scope.game.sport);
            sportService.setCurrentSport($scope.game.sport); //saglabā, lai atcerētos, kā saraksts tika atfiltrēts
        }

        $scope.filterTeamsInline = function (value, index, array) {
            return (value._id == $scope.game.team1) || (value._id == $scope.game.team2)
        }

        /*
         * Iegūst spēlētāju sarakstu pēc komandas id
         */
        $scope.getPlayerList = function (teamId) {
            for (i = 0; i < $scope.teamlist.length; i++) {
                if ($scope.teamlist[i]._id == teamId) {
                    return $scope.teamlist[i].players;
                }
            }
        }

        /*
         * Iegūst spēles notikumu veidu sarakstu pēc spēles id
         */
        $scope.getEventTypeList = function (sportId) {
            for (i = 0; i < $scope.sportlist.length; i++) {
                if ($scope.sportlist[i]._id == sportId) {
                    return $scope.sportlist[i].events;
                }
            }
        }

        /*
         * Izrēķina spēles rezultātu
         */
        $scope.calculateScore = function () {
            score1 = 0;
            score2 = 0;
            currentSport = {}
            for (i = 0; i < $scope.sportlist.length; i++) {
                if ($scope.sportlist[i]._id == $scope.game.sport) {
                    currentSport = $scope.sportlist[i];
                }
            }
            if ($scope.game.events != null && $scope.game.events != undefined) {
                for (i = 0; i < $scope.game.events.length; i++) {
                    event_type = $scope.game.events[i].event_type;
                    for (j = 0; j < currentSport.events.length; j++) {
                        if (currentSport.events[j]._id == event_type) {
                            if (currentSport.events[j].score_change != null && currentSport.events[j].score_change != 0) {
                                if ($scope.game.events[i].team == $scope.game.team1) {
                                    //console.log("maina score1: " + currentSport.events[j].score_change);
                                    score1 = score1 + currentSport.events[j].score_change;
                                }
                                else {
                                    //console.log("maina score2: " + currentSport.events[j].score_change);
                                    score2 = score2 + currentSport.events[j].score_change;
                                }
                            }
                        }
                    }
                }
            }
            $scope.game.score1 = score1;
            $scope.game.score2 = score2;
        }


        $scope.initPage = function () {
            setInterval(function () {
                // method to be executed;
                $scope.getGame();
            }, 5000);
        }


        $scope.createGameDB = function(game) {
            $http.post('http://localhost:8080/api/game/addgame', game).then(function successCallback(response) {
                //alert("Spēle veiksmīgi pievienota");
                //$location.path("/gameList" );
                console.log("$scope.createGameDB, response:");
                console.log(response);
                $scope.game._id = response.data;

            }, function errorCallback(response) {
                //alert("Kļūda, Sporta veids nav pievienots");
                //$location.path("/gameList" );
            });
        };

        $scope.updateGameDB = function(game) {
            console.log("$scope.updateGame, game:");
            console.log(game);
            $http.put('http://localhost:8080/api/game/' + game._id, game).then(function successCallback(response) {
                //alert("Spēle veiksmīgi labota");
                //$location.path("/gameList" );
                $scope.getGame();
            }, function errorCallback(response) {
                //alert("Kļūda, Spēle nav labota!");
                //$location.path("/gameList" );
            });
        };

        $scope.getTeamName = function(teamId) {
            for (i=0; i < $scope.teamlist.length; i++) {
                if ( $scope.teamlist[i]._id == teamId ) {
                    return $scope.teamlist[i].team_name;
                }
            }
        }

        $scope.getEventName = function(sportId, eventId) {
            eventTypes = $scope.getEventTypeList(sportId);
            for (i=0; i < eventTypes.length; i++) {
                if ( eventTypes[i]._id == eventId ) {
                    return eventTypes[i].name;
                }
            }
        }

        $scope.getPlayerDescription = function(teamId, playerId) {
            players = $scope.getPlayerList(teamId);
            for (i=0; i < players.length; i++) {
                if ( players[i]._id == playerId ) {
                    return players[i].player_number + ": " + players[i].name + " " + players[i].surname;
                }
            }
        }

}]);
