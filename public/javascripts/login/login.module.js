'use strict';
(function () {
  	angular.module('app.login', ['ngRoute'])
     	.config(['$routeProvider', function($routeProvider) {
        	$routeProvider.when('/', {
                templateUrl: '../public/javascripts/login/login.html',
      		    controller: 'loginCtrl'
        	});
      	}])
})();