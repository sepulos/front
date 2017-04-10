angular.module('app')

	.config(function ($routeProvider) {
	    $routeProvider
			.when('/register', {
			    templateUrl: 'Views/Common/Register/Register.html',
			    controller: 'registerController'
			})
	})


    .controller('registerController', function ($scope, $http, departmentService) {
	    var arrDepartments = new Array();
        $http.get("http://localhost:57037/api/Department").success(function (data) {

	        $.map(data, function (item) {
	            arrDepartments.push(item.Name);
	        });
	        $scope.list = arrDepartments;
	    }).error(function (status) {
	        alert(status);
            });

        departmentService.getAll().then(function (result) {
            $scope.deps = result;
        });
	});