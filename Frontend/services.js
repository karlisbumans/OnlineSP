/**
 * Created by KarlisBumans on 02.05.2016.
 */

LSIS.service('userService', ['$resource','$http', '$location',function($resource,$http, $location) {
   this.userData={};
   this.currentUserID=null;
   
   this.setUserData = function(data) {
    this.userData = data;
     }
     this.getUserData = function () {
        return this.userData;
         var st = sessionStorage.getItem('currentUserID');
        console.log(st);
     }

    this.createUser = function(lietotajs) {
          $http.post('http://localhost:8080/api/user/adduser', lietotajs).then(function successCallback(response) {
          alert("Lietotājs veiksmīgi pievienots");
          $location.path("/manageUsers");

        }, function errorCallback(response) {
            alert("Kļūda, lietotājs nav pievienots");
        });
    };

    this.updateUser = function(lietotajs) {
           $http.put('http://localhost:8080/api/user/' + lietotajs._id, lietotajs).then(function successCallback(response) {
           alert("Lietotājs veiksmīgi labots");
           
        }, function errorCallback(response) {
            alert("Kļūda, lietotājs nav labots");
        });
    };

    this.deleteUser = function(userid) {
        //console.log('No servisa deleteUser id=' + userid);
        $http.delete('http://localhost:8080/api/user/'+userid).then(function successCallback(response) {
            alert("Lietotājs veiksmīgi izdzēsts");
            location.reload();

        }, function errorCallback(response) {
            alert("Kļūda, lietotājs nav izdzēsts");
        });
    };

    this.isUserLoggedIn = function(){
        console.log('isLoggedIn');
        var user = JSON.parse(sessionStorage.getItem('sporta_lietotajs'));
        if(user !== null){
            this.currentUserID = user._id;
        console.log('true');
        
            return true;
        } else {
        console.log('false');
            return false;   
             
        }
    };

    this.checkUserRights = function(){
        if (! this.isUserLoggedIn()) {
            $location.path("/noRightsPage" );
        }
    };
  

    
}]);