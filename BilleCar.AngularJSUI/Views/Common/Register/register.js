app.config(function ($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: 'Views/Common/Register/Register.html',
            controller: 'registerController'
        });
});

app.factory('departmentService', function ($http) {
    depObj = {};
    depObj.getAll = function () {
        var deps;
        deps = $http({ method: 'Get', url: 'http://localhost:57037/api/Department' }).
            then(function (response) {
                return response.data;
            });
        return deps;
    };
    return depObj;
});


app.factory('userService', function ($http) {
    userObj = {};

    userObj.getAll = function () {
        var users;

        users = $http({ method: 'Get', url: 'http://localhost:57037/api/User' }).
            then(function (response) {
                return response.data;

            });

        return users;
    };

    userObj.createUsers = function (users) {
        var Users;

        Users = $http({ method: 'Post', url: 'http://localhost:57037/api/User', data: users }).
            then(function (response) {
                return response.data;
            }, function (error) {
                return error.data;
            });
        return Users;
    };


    return userObj;
});



app.controller('registerController', function ($scope, $http, departmentService, userService) {
//	var arrDepartments = new Array();
  //  $http.get("http://localhost:57037/api/Department").success(function (data) {
//
	//    $.map(data, function (item) {
	//        arrDepartments.push(item.Name);
	//    });
	//    $scope.list = arrDepartments;
	//}).error(function (status) {
	//    alert(status);
    //    });

    departmentService.getAll().then(function (result) {
        $scope.deps = result;
    });


    userService.getAll().then(function (result) {
        $scope.users = result;
    });

    $scope.CreateUsers = function (Users, IsValid) {
        if (IsValid) {
            userService.createUsers(Users).then(function (result) {
                $scope.Msg = " Udało Ci się utworzyć użytkownika " + result.Email;
                $scope.Flg = true;
                $scope.Flg2 = true;
                userService.getAll().then(function (result) {
                    $scope.users = result;
                });

                //$('#alert').fadeTo(2000, 500).slideUp(2000, function () {
                //    $('#alert').slideUp(1000);
                // });

            });
        };
    };

});