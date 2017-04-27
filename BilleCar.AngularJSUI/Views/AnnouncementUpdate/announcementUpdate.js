app.config(function ($routeProvider) {
    $routeProvider
        .when('/announcementUpdate/:AnnouncementId?', {
            templateUrl: 'Views/AnnouncementUpdate/AnnouncementUpdate.html',
            controller: 'announcementUpdateController'
        });
});

app.factory('announcementUpdateService', function ($http) {
    annUpdateOjb = {};

    annUpdateOjb.GetByID = function (aid) {
        var Anns;

        Anns = $http({ method: 'Get', url: 'http://localhost:57037/api/Announcement', params: { id: aid } }).
            then(function (response) {
                return response.data;
            });

        return Anns;
    };

    annUpdateOjb.updateAnnouncement = function (ann) {
        var Ann;

        Ann = $http({ method: 'Put', url: 'http://localhost:57037/api/Announcement', data: ann }).
            then(function (response) {
                return response.data;
            }, function (error) {
                return error.data;
            });
        return Ann;
    };


    return annUpdateOjb;
});

app.factory('userByEmailUpdateService', function ($http) {
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


app.controller('announcementUpdateController', function ($scope, $routeParams, announcementUpdateService, userByEmailUpdateService, utilityService) {
    $scope.msg = "Witaj mordo na details";

    $scope.aid = $routeParams.AnnouncementId;
    announcementUpdateService.GetByID($scope.aid).then(function (result) {
        $scope.Anns = result;
        $scope.uemail = result.AutorRefUser;
        //$scope.anns.AddDate = new Date($scope.anns.AddDate);
        userByEmailUpdateService.GetByEmail($scope.uemail).then(function (result) {
            $scope.usrs = result;
        });
    });

    $scope.UpdateAnnouncement = function (Anns, IsValid) {
        if (IsValid) {
            announcementUpdateService.updateAnnouncement(Anns).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "Udało Ci się zaktualizować ogłoszenie nr:" + result.AnnouncementId;
                    $scope.Flg = true;
                    $scope.serverErrorMsgs = "";
                    utilityService.myAlert();

                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };

});
