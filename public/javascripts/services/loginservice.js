'use strict';
app.factory('loginService',function($q, $http, $location, $rootScope){
	return{
		    checkLoggedin: function(){
	        	// Initialize a new promise
		     	var deferred = $q.defer();

		        var locStor = localStorage.getItem("user");

		        var sendData = JSON.parse(locStor);

		      	// Make an AJAX call to check if the user is logged in
		      	$http.post('/loggedin', {"name": sendData}).success(function(user){
		        	// Authenticated
		        	if (user !== '0') {
		          	/*$timeout(deferred.resolve, 0);*/
		          		deferred.resolve();

		        	// Not Authenticated
		        	} else {

		          		$rootScope.message = 'You need to log in.';
		          		deferred.reject();
		          		$location.url('/');
		        	}
		      	});
	    	}
	}
});


