var app = angular.module('app', ['ngRoute', 'ngMaterial', 'angularUtils.directives.dirPagination']);

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

app.factory('utilityService', function () {
    utilityObj = {};

    utilityObj.myAlert = function () {
        $('#alert').fadeTo(2000, 500).slideUp(1000, function () {
            $('#alert').slideUp(1000);
        });
    };

    return utilityObj;
});

app.controller('homeController', function ($scope, $mdSidenav ) {


});

app.controller("DemoController", function ($scope, $mdSidenav) {
        $scope.helloworld = 'Hello World';
        $scope.clickSide = function (dir) {
            $mdSidenav(dir).toggle();
        };
    });