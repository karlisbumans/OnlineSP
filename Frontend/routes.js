/**
 * Created by KarlisBumans on 02.05.2016.
 */
LSIS.config( function($routeProvider) {

    $routeProvider

        .when('/',{
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/userAdminMenu',{
            templateUrl: 'pages/userAdminMenu.html',
            controller: 'homeController'
        })

        .when('/dataAdminMenu',{
            templateUrl: 'pages/dataAdminMenu.html',
            controller: 'homeController'
        })


        .when('/adminMenu',{
            templateUrl: 'pages/adminMenu.html',
            controller: 'homeController'
        })
        
        .when('/createUser',{
            templateUrl: 'pages/createUser.html',
            controller: 'UserController'
        })


        .when('/login',{
        templateUrl: 'pages/login.html',
        controller: 'UserController'
        })

        .when('/logout',{
            templateUrl: 'pages/logout.html',
            controller: 'UserController'
        })

        .when('/manageUsers',{
            templateUrl: 'pages/manageUsers.html',
            controller: 'UserController'
        })

        .when('/noRightsPage',{
            templateUrl: 'pages/noRightsPage.html',
            controller: 'UserController'
        })

        .when('/editUser/:userId',{
            templateUrl: 'pages/editUser.html',
            controller: 'UserController'
        })

        .when('/userDelete?deleteUserId=:deleteUserId',{
            templateUrl: 'pages/manageUsers.html',
            controller: 'UserController'
        })
     
});