app.config(function ($routeProvider) {
    $routeProvider
        .when('/employee', {
            templateUrl: 'Views/Employee/Employee.html',
            controller: 'employeeController'
        });
});



app.factory('userListService', function ($http) {
    userObj = {};

    userObj.getAll = function () {
        var Usrs;

        Usrs = $http({ method: 'Get', url: 'http://localhost:57037/api/User' }).
            then(function (response) {
                return response.data;

            });

        return Usrs;
    };

    userObj.deleteUsersByEmail = function (uemail) {
        var Usrs;

        Usrs = $http({ method: 'Delete', url: 'http://localhost:57037/api/User', params: { email: uemail } }).
            then(function (response) {
                return response.data;
            });
        return Usrs;
    };


    return userObj;
});



app.controller('employeeController', function ($scope, $http, userListService, utilityService, $window) {


    userListService.getAll().then(function (result) {
        $scope.users = result;
    });

    $scope.Sort = function (col) {
        $scope.key = col;
        $scope.AsOrDesc = !$scope.AsOrDesc;
    };


    $scope.DeleteUsersByEmail = function (User) {
        if ($window.confirm("Czy chcesz usunąć użytkownika o emailu: " + User.Email + "?")) {
            userListService.deleteUsersByEmail(User.Email).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "Idealnie żeś wywalił " + result.Email;
                    $scope.Flg = true;
                    utilityService.myAlert();

                    userListService.getAll().then(function (result) {
                        $scope.users = result;
                    });
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };

    $scope.Sort = function (col) {
        $scope.key = col;
        $scope.AsOrDesc = !$scope.AsOrDesc;
    };

});