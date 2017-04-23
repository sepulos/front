app.config(function ($routeProvider) {
    $routeProvider
        .when('/create', {
            templateUrl: 'Views/AnnouncementCreate/AnnouncementCreate.html',
            controller: 'announcementCreateController'
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

      annObj.createAnns = function (anns) {
        var Anns;
    
        Anns = $http({ method: 'Post', url: 'http://localhost:57037/api/Announcement', data: anns }).
             then(function (response) {
                 return response.data;
             }, function (error) {
                 return error.data;
              });
          return Anns;
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


    app.controller('announcementCreateController', function ($scope, $http, departmentService, announcementService) {
   // var arrDepartments = new Array();
    //$http.get("http://localhost:57037/api/Department").success(function (data) {
//
   //     $.map(data, function (item) {
    //        arrDepartments.push(item.Name);
   //     });
    //    $scope.list = arrDepartments;
  //  }).error(function (status) {
  //      alert(status);
   // });

    departmentService.getAll().then(function (result) {
        $scope.deps = result;
        });

    announcementService.getAll().then(function (result) {
        $scope.anns = result;
    });

    $scope.CreateAnns = function (Anns) {
        announcementService.createAnns(Anns).then(function (result) {
            $scope.Msg = " Udało Ci się utworzyć ogłoszenie " + result.AnnouncementId;
            $scope.Flg = true;
            $scope.Flg2 = true;
            announcementService.getAll().then(function (result) {
                $scope.anns = result;
            });

            //$('#alert').fadeTo(2000, 500).slideUp(2000, function () {
            //    $('#alert').slideUp(1000);
           // });

        });
    };

});