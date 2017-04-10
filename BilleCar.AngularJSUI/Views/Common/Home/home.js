angular.module('app')

	.config(function ($routeProvider) {
	    $routeProvider
			.when('/home', {
			    templateUrl: 'Views/Common/Home/Home.html', 
			    controller: 'homeController'
			});
	})

	.controller('homeController', function ($scope) {

	});