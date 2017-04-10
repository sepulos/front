angular.module('app')

	.config(function ($routeProvider) {
	    $routeProvider
			.when('/login', {
			    templateUrl: 'Views/Common/Login/Login.html',
			    controller: 'loginController'
			})
	})

	.controller('loginController', function ($scope) {

	});