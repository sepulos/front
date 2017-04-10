app.config(function ($routeProvider) {
    $routeProvider
        .when('/announcementDetail', {
            templateUrl: 'Views/AnnouncementDetail/AnnouncementDetail.html',
            controller: 'announcementDetailController'
        });
});

app.factory('announcementService', function ($http) {
    annObj = {};
    annObj.getAll = function () {
        var anns;
        anns = $http({ method: 'Get', url: 'http://localhost:57037/api/Announcement' }).
            then(function (response) {
                return response.data;
            });
        return anns;
    };
    return annObj;
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

app.controller('announcementDetailController', function ($scope, announcementService, departmentService) {
    $scope.msg = "Witaj mordo";

    announcementService.getAll().then(function (result) {
        $scope.anns = result;
    });


    departmentService.getAll().then(function (result) {
        $scope.deps = result;
    });

    $scope.Sort = function (col) {
        $scope.key = col;
        $scope.AsOrDesc = !$scope.AsOrDesc;
    };

});
