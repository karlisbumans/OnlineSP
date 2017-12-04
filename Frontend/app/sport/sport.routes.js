/**
 * Created by Guntars on 2016.05.05..
 */
/**
 * Created by KarlisBumans on 02.05.2016.
 */
LSIS.config( function($routeProvider) {

    $routeProvider

        .when('/createSport',{
            templateUrl: 'app/sport/html/editSport.html',
            controller: 'sportController'
        })

        .when('/sportList',{
            templateUrl: 'app/sport/html/sportList.html',
            controller: 'sportController'
        })

        .when('/editSport/:sportId',{
            templateUrl: 'app/sport/html/editSport.html',
            controller: 'sportController'
        })
});