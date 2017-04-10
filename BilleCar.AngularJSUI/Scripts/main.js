var app = angular.module('app', ['ngRoute']);

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