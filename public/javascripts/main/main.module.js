'use strict';
(function () {
  	angular.module('app.main', ['ngRoute'])
     	.config(['$routeProvider', function($routeProvider) {
        	$routeProvider.when('/main', {
                templateUrl: '../public/javascripts/main/main.html',
      		    controller: 'mainCtrl'
        	});
      	}])
})();