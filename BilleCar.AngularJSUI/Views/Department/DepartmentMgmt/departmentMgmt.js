app.config(function ($routeProvider) {
    $routeProvider
        .when('/listaoddzialow', {
            templateUrl: 'Views/Department/DepartmentMgmt/DepartmentMgmt.html',
            controller: 'departmentMgmtController'
        });
});

app.factory('departmentMgmtService', function ($http) {
    depObj = {};

    depObj.getAll = function () {
        var Deps;
        Deps = $http({ method: 'Get', url: 'http://localhost:57037/api/Department/' }).
            then(function (response) {
                return response.data;
            });
        return Deps;
    };

    depObj.createDepartment = function (dep) {
        var Dep;

        Dep = $http({ method: 'Post', url: 'http://localhost:57037/api/Department/', data: dep }).
            then(function (response) {

                return response.data;

            }, function (error) {
                return error.data;
            });
        return Dep;
    };

    depObj.deleteDepartmentById = function (did) {
        var Deps;

        Deps = $http({ method: 'Delete', url: 'http://localhost:57037/api/Department/', params: { id: did } }).
            then(function (response) {
                return response.data;

            });

        return Deps;
    };



    return depObj;
});

app.controller('departmentMgmtController', function ($scope, departmentMgmtService, utilityService, $window) {
    $scope.msg = "Witaj mordo";

    departmentMgmtService.getAll().then(function (result) {
	    $scope.Deps = result;
    });

    $scope.CreateDepartment = function (Dep, IsValid) {
        if (IsValid) {
            departmentMgmtService.createDepartment(Dep).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "Dodałeś nowy oddział o nazwie: " + result.Name;
                    $scope.Flg = true;

                    departmentMgmtService.getAll().then(function (result) {
                        $scope.Deps = result;
                    });

                    utilityService.myAlert();
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }

            });
        };
    };

    $scope.DeleteDepartmentById = function (Dep) {
        if ($window.confirm("Czy chcesz usunąć oddział " + Dep.DepartmentId + "?")) {
            departmentMgmtService.deleteDepartmentById(Dep.DepartmentId).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "Usunąłeś właśnie odział " + result.DepartmentId;
                    $scope.Flg = true;
                    utilityService.myAlert();

                    departmentMgmtService.getAll().then(function (result) {
                        $scope.Deps = result;
                    });
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };



    /*funkcjonalności*/

    $scope.Sort = function (col) {
        $scope.key = col;
        $scope.AsOrDesc = !$scope.AsOrDesc;
    };

    $scope.zwin = function () {
            $('.zwin').slideToggle(1);
    };
});
