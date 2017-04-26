app.config(function ($routeProvider) {
    $routeProvider
        .when('/announcement', {
            templateUrl: 'Views/Announcement/Announcement.html',
            controller: 'announcementController'
        });
});



app.factory('announcementMgmtService', function ($http) {
    annObj = {};

    annObj.getAll = function () {
        var Anns;
        Anns = $http({ method: 'Get', url: 'http://localhost:57037/api/Announcement' }).
            then(function (response) {
                return response.data;
            });
        return Anns;
    };

    annObj.deleteAnnouncementById = function (aid) {
        var Anns;

        Anns = $http({ method: 'Delete', url: 'http://localhost:57037/api/Announcement/', params: { id: aid } }).
            then(function (response) {
                return response.data;

            });

        return Anns;
    };


    return annObj;
});

app.controller('announcementController', function ($scope, announcementMgmtService, utilityService, $window) {
    $scope.msg = "Witaj mordo";

    announcementMgmtService.getAll().then(function (result) {
        $scope.Anns = result;
    });


    $scope.DeleteAnnouncementById = function (Ann) {
        if ($window.confirm("Czy chcesz usunąć ogłoszenie nr: " + Ann.AnnouncementId + "?")) {
            announcementMgmtService.deleteAnnouncementById(Ann.AnnouncementId).then(function (result) {
                if (result.ModelState == null) {
                    $scope.Msg = "Usunąłeś właśnie ogłoszenie nr: " + result.AnnouncementId;
                    $scope.Flg = true;
                    utilityService.myAlert();

                    announcementMgmtService.getAll().then(function (result) {
                        $scope.Anns = result;
                    });
                }
                else {
                    $scope.serverErrorMsgs = result.ModelState;
                }
            });
        }
    };



    /*funkcjonanosci*/


    $scope.Sort = function (col) {
        $scope.key = col;
        $scope.AsOrDesc = !$scope.AsOrDesc;
    };

});
