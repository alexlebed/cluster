'use strict';
(function () {
    angular.module('app.login')
        .controller('loginCtrl', ['$scope', '$rootScope','$http', '$location', function($scope, $rootScope, $http, $location) {         
              // This object will be filled by the form
			  $scope.user = {};

			  // Register the login() function
			  $scope.login = function(){
			    $http.post('/login', {
			      username: $scope.user.username,
			      password: $scope.user.password,
			    })
			    .success(function(user){
			      // No error: authentication OK
			      $rootScope.message = 'Authentication successful!';
			      $location.url('/main');
			     
			     localStorage.setItem("user", JSON.stringify(user));

			    })
			    .error(function(){
			      // Error: authentication failed
			      $rootScope.message = 'Authentication failed.';
			      $location.url('/');
			    });
			  };          
    }]);
})();