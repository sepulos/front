var app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Views/Common/Login/Login.html',
            controller: 'loginController'
        })
        .otherwise({
            redirectTo: '/Views/Common/Home',
            controller: 'homeController'
        });

});

app.controller('homeController', function ($scope, $mdSidenav ) {


});

app.controller("DemoController", function ($scope, $mdSidenav) {
        $scope.helloworld = 'Hello World';
        $scope.clickSide = function (dir) {
            $mdSidenav(dir).toggle();
        };
    });