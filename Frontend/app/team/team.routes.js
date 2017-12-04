/**
 * Created by Guntars on 2016.05.05..
 */
/**
 * Created by KarlisBumans on 02.05.2016.
 */
LSIS.config( function($routeProvider) {

    $routeProvider

        .when('/createTeam',{
            templateUrl: 'app/team/html/editTeam.html',
            controller: 'teamController'
        })

        .when('/teamList',{
            templateUrl: 'app/team/html/teamList.html',
            controller: 'teamController'
        })

        .when('/editTeam/:teamId',{
            templateUrl: 'app/team/html/editTeam.html',
            controller: 'teamController'
        })
});