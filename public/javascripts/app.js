'use strict';

/**********************************************************************
 * Angular Application
 **********************************************************************/
var app = angular.module('app', [
  'app.result', 
  'app.login',
  'app.main'])
  .config(function($routeProvider, $locationProvider, $httpProvider) {   
    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          return response;
        },
        responseError: function(response) {
          if (response.status === 401)
            $location.url('/');
          return $q.reject(response);
        }
      };
    });

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

  }) // end of config()
  .run(function($rootScope, $http, $location, loginService){
    $rootScope.message = '';

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
      localStorage.setItem("user", "1");
    };
      var routespermission=['/result','/main'];  //route that require login
      $rootScope.$on('$routeChangeStart', function(){
        if( routespermission.indexOf($location.path()) !=-1){
          loginService.checkLoggedin();
        }
      });
  });

