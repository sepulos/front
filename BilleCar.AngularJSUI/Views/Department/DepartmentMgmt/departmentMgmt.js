app.config(function ($routeProvider) {
	$routeProvider
		.when('/listaoddzialow', {
			templateUrl: 'Views/Department/DepartmentMgmt/DepartmentMgmt.html',
			controller: 'departmentController'
		})
})

app.factory('departmentService', function ($http) {
    depObj = {};
    depObj.getAll = function () {
        var deps;
        deps = $http({ method: 'Get', url: 'http://localhost:57037/api/Department/' }).
        then(function (response) {
            return response.data;
        });
        return deps;
    };
    return depObj;
})

app.controller('departmentController', function ($scope, departmentService) {
	$scope.msg = "Witaj mordo"

	departmentService.getAll().then(function (result) {
	    $scope.deps = result;
    });

    $scope.Sort = function (col) {
        $scope.key = col;
        $scope.AsOrDesc = !$scope.AsOrDesc;
    }
});
