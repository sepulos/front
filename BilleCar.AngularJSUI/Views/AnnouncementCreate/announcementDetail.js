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


app.controller('announcementDetailController', function ($scope, $routeParams, announcementDetailService) {
    $scope.msg = "Witaj mordo na details";

    $scope.aid = $routeParams.AnnouncementId;
    announcementDetailService.GetByID($scope.aid).then(function (result) {
        $scope.anns = result;
        //$scope.anns.AddDate = new Date($scope.anns.AddDate);
    });

});
