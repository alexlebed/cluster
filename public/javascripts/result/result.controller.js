'use strict';
(function () {
    angular.module('app.result')
        .controller('resultCtrl', ['$scope', '$http', function($scope, $http) {         
            $scope.alldb = [];

            $http.get('/user').success(function(users){
                for (var i in users) {
                    $scope.alldb.push(users[i]);
                }
            });           
    }]);
})();