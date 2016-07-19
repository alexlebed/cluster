'use strict';
(function () {
  	angular.module('app.result', ['ngRoute'])
     	.config(['$routeProvider', function($routeProvider) {
        	$routeProvider.when('/result', {
                templateUrl: '../public/javascripts/result/result.html',
      		    controller: 'resultCtrl'
        	});
      	}])
})();