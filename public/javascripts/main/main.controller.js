'use strict';
(function () {
    angular.module('app.main')
        .controller('mainCtrl', ['$scope', '$http', function($scope, $http) {         
              // List of users got from the server
			  $scope.users = [];
			  $scope.user = {};
			  $scope.process = "";

			  // Fill the array to display it in the page
			  $http.get('/users').success(function(users){
			    for (var i in users)
			      $scope.users.push(users[i]);
			  });

			     // Register the login() function
			  $scope.sendFunction = function(){
			    $scope.process = "data processing";
			    

			    $http.put('/user', {
			      funct: $scope.user.Function
			    })
			    .success(function(user){
			        $scope.user.Function = "";
			        $scope.process = "";
			    })
			    .error(function(err){
			        $scope.user.Function = "";
			        $scope.process = "";
			        $('.inform').css({'display':'block'});
			    });
			  };

			  $scope.closeErr = function() {
			  	$('.inform').css({'display':'none'});
			  }
    }]);
})();