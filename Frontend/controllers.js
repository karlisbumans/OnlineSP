/**
 * Created by KarlisBumans on 29.04.2016.
 */
LSIS.controller('MainController', ['$scope', function($scope) {
    $scope.pazinojums = 'Sveiki! Šī ir galvenā lapa!';
    console.log('Main kontrolieris');
}]);

/**
 * Created by KarlisBumans on 29.04.2016.
 */
LSIS.controller('UserController', ['$scope', '$routeParams', '$window', '$location', 'userService', '$http', function($scope, $routeParams, $window, $location, userService, $http) {
    $scope.pazinojums = 'UserController';
    $scope.deleteUserId = $routeParams.deleteUserId;
    $scope.lietotajs = {};
    $scope.lietotajs._id = null;
    $scope.lietotajs.username = null;
    $scope.lietotajs.password = null;
    $scope.lietotajs.name = null;
    $scope.lietotajs.surname = null;
    $scope.userlist={};
    $scope.isUserLoggedIn = userService.isUserLoggedIn();
    console.log('user kontrolieris');
    

    $scope.checkUserRights=function() {
        userService.checkUserRights();
    }    


    $scope.refreshPage = function(){
        $scope.lietotajs = userService.getUserData();
        console.log('refreshPage username:' + $scope.lietotajs.username);

    };

    $scope.createUser = function(){
        userService.createUser($scope.lietotajs);
    };

    $scope.updateUser = function(){
        userService.updateUser($scope.lietotajs);
    };
    

    $scope.editUser = function(editData){
        $scope.lietotajs = editData;
        userService.setUserData(editData);
        
        console.log('controller: editUser');
        console.log('_id:' + $scope.lietotajs._id);
        console.log('username:' + $scope.lietotajs.username);
        console.log('name:' + $scope.lietotajs.name);
        console.log('surname' + $scope.lietotajs.surname);
        $location.path("/editUser/" + $scope.lietotajs._id);

    };

    $scope.deleteUser = function(userid){
        //console.log('No kontroliera deleteUser id=' + userid);
        userService.deleteUser(userid);
        //$route.reload();
        //$window.location.reload();
        $location.path("/manageUsers");
        
    };
    
    $scope.getUserList = function(){
        $http.get('http://localhost:8080/api/user/getallusers').then(function successCallback(response) {
            $scope.userlist = response;

        }, function errorCallback(response) {
            alert("Kļūda.....");
        });
    };

    $scope.logIn = function(){
       
        $http.get('http://localhost:8080/api/user/findUserByUsername/'+ $scope.lietotajs.username).then(function successCallback(response) {
            $scope.userlist = response;

            if ($scope.userlist.data.length>0 ) {
                realPassword = $scope.userlist.data[0].password;

                //paroles parbaude
                if (realPassword == $scope.lietotajs.password) {

                    console.log('mans lietotajs',response);
                    //ir OK, parole sakrit
                    userService.currentUserID = $scope.lietotajs.username;
                    sessionStorage.removeItem('sporta_lietotajs');
                    sessionStorage.setItem('sporta_lietotajs',  JSON.stringify(response.data[0]));
                    $location.path("/");
                }
                else {
                    //nav OK, parole nepareiza
                    alert("Parole ir nepareiza");
                    $location.path("/login");
                }
            }
            else {
                alert("Šāds lietotājs neeksistē");
                $location.path("/login");
            }

        }, function errorCallback(response) {
           $location.path("/login");
        });
    };


    $scope.logOut = function(){
        userService.currentUserID = null;
        sessionStorage.removeItem('sporta_lietotajs');
        console.log('logOut');
        $location.path("/");
    };

    $scope.isUserLoggedIn = function(){
        console.log('isUserLoggedIn?');
        if (userService.currentUserID) {
            
           return true;
        }
        else {
            return false;
        }
    }
  
  


}]);


LSIS.controller('homeController', ['$scope', 'userService', function($scope, userService) {
    $scope.pazinojums = 'Home Controller';

    console.log('home kontrolieris');


    $scope.isUserLoggedIn = userService.isUserLoggedIn();

}]);

LSIS.controller('createTeamController', ['$scope', function($scope) {
    $scope.pazinojums = 'createTeam controller';
}]);

LSIS.controller('createEventController', ['$scope', function($scope) {
    $scope.pazinojums = 'createEvent controller';
}]);

LSIS.controller('loginController', ['$scope', function($scope) {
    $scope.pazinojums = 'loginController controller';
}]);



