/**
 * Created by Guntars on 2016.05.05..
 */
/**
 * Created by KarlisBumans on 02.05.2016.
 */
LSIS.config( function($routeProvider) {

    $routeProvider

        .when('/createGame',{
            templateUrl: 'app/game/html/editGame.html',
            controller: 'gameController'
        })

        .when('/gameList',{
            templateUrl: 'app/game/html/gameList.html',
            controller: 'gameController'
        })

        .when('/editGame/:gameId',{
            templateUrl: 'app/game/html/editGame.html',
            controller: 'gameController'
        })

        .when('/gameListPublic',{
            templateUrl: 'app/game/html/gameListPublic.html',
            controller: 'gameController'
        })

        .when('/watchGame/:gameId',{
            templateUrl: 'app/game/html/watchGame.html',
            controller: 'gameController'
        })

});