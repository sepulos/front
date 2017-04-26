app.config(function ($routeProvider) {
    $routeProvider
        .when('/announcementDetail/:AnnouncementId?', {
            templateUrl: 'Views/AnnouncementDetail/AnnouncementDetail.html',
            controller: 'announcementDetailController'
        });
});

app.factory('announcementDetailService', function ($http) {
    annUpdateOjb = {};

    annUpdateOjb.GetByID = function (aid) {
        var anns;

        anns = $http({ method: 'Get', url: 'http://localhost:57037/api/Announcement', params: { id: aid } }).
            then(function (response) {
                return response.data;
            });

        return anns;
    };

    return annUpdateOjb;
});

app.factory('userByEmailService', function ($http) {
    usrUpdateObj = {};

    usrUpdateObj.GetByEmail = function (uemail) {
        var usrs;

        usrs = $http({ method: 'Get', url: 'http://localhost:57037/api/User', params: { email: uemail } }).
            then(function (response) {
                return response.data;
            });
        return usrs;
    };
    return usrUpdateObj;
});


app.controller('announcementDetailController', function ($scope, $routeParams, announcementDetailService, userByEmailService) {
    $scope.msg = "Witaj mordo na details";

    $scope.aid = $routeParams.AnnouncementId;
    announcementDetailService.GetByID($scope.aid).then(function (result) {
        $scope.anns = result;
        $scope.uemail = result.AutorRefUser;
        //$scope.anns.AddDate = new Date($scope.anns.AddDate);
        userByEmailService.GetByEmail($scope.uemail).then(function (result) {
            $scope.usrs = result;
        });
    });

});
