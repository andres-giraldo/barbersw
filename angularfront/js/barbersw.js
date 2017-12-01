var app = angular.module("barberswApp", ["ngRoute", "naif.base64"]);

app.config(function ($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/cuts', {
            templateUrl: 'pages/cuts.html',
            controller: 'cutsController'
        })

        // route for the contact page
        .when('/reservations', {
            templateUrl: 'pages/reservations.html',
            controller: 'reservationController'
        });
});

app.controller('mainController', function ($scope) {
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('cutsController', ['$scope', '$http', function ($scope, $http) {
    $scope.showError = false;
    $scope.error = "";
    $scope.showSuccess = false;
    $scope.success = "";
    $scope.cutsList = [];
    $scope.edit = 0;
    $scope.rute = "images/";
    $scope.date = new Date();

    $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
        $scope.edit = 2;
    };

    var uploadedCount = 0;

    $scope.files = [];


    listCuts();
    function listCuts() {
        $http({
            method: 'GET',
            url: 'http://localhost:1050/cuts'
        }).then(function successCallback(response) {
            $scope.date = new Date().getTime();
            $scope.cutsList = response.data;
        }, function errorCallback(response) {
            $scope.cutsList = [];
            $scope.error = "Error consultando los cortes";
            $scope.showError = true;
            $scope.showSuccess = false;
        });
    }


    $scope.onFileSelect = function ($files) {
        Upload.upload({
            url: 'api/upload',
            method: 'POST',
            file: $files,
        }).progress(function (e) {
        }).then(function (data, status, headers, config) {
            // file is uploaded successfully
        });
    }


    $scope.newCut = function (cutId) {
        $scope.edit = 0;
        if ($scope.cut != undefined && $scope.cut.cutId != undefined) {
            $scope.cut = {};
        }
        jQuery("#booksModal").modal("show");
    }
    $scope.getCut = function (cutId) {
        $scope.edit = 1;
        $http({
            method: 'GET',
            url: 'http://localhost:1050/cuts?cutId=' + cutId
        }).then(function successCallback(response) {
            if (response.data != null && response.data.length > 0) {
                $scope.cut = response.data[0];
                $scope.cut.cutId = response.data[0]._id;
                jQuery("#booksModal").modal("show");
            } else {
                $scope.cut = {};
                $scope.error = "Error consultando los datos del libro";
                $scope.showError = true;
                $scope.showSuccess = false;
            }
        }, function errorCallback(response) {
            $scope.cut = {};
        });
    }
    $scope.deleteCut = function (cutId) {
        $scope.cut = { cutId: cutId }
        jQuery("#deleteModal").modal("show");
    }
    $scope.saveCut = function () {

        // var blob = new Blob([$scope.cut.cutImage], {type: 'image/png'});
        //var file = new File([blob], 'imageFileName.png');

        // var img = new Buffer($scope.cut.cutImage, 'base64');
        $http({
            method: 'POST',
            url: 'http://localhost:1050/cuts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: $scope.cut
        }).then(function successCallback(response) {
            $scope.cut = {};
            listCuts();
            $scope.success = "El corte ha sido guardado correctamente";
            $scope.showError = false;
            $scope.showSuccess = true;
            jQuery("#booksModal").modal("hide");
        }, function errorCallback(response) {
            $scope.error = response.data.errors;
            $scope.showError = true;
            $scope.showSuccess = false;
            jQuery("#booksModal").modal("hide");
        });
    }
    $scope.confirmDelete = function () {
        $http({
            method: 'DELETE',
            url: 'http://localhost:1050/cuts?cutId=' + $scope.cut.cutId
        }).then(function successCallback(response) {
            $scope.cut = {};
            listCuts();
            $scope.success = "El corte ha sido eliminado correctamente";
            $scope.showError = false;
            $scope.showSuccess = true;
            jQuery("#deleteModal").modal("hide");
        }, function errorCallback(response) {
            $scope.cut = {};
            $scope.error = response.data.errors;
            $scope.showError = true;
            $scope.showSuccess = false;
            jQuery("#deleteModal").modal("hide");
        });
    }
}]);

app.controller('reservationController', ['$scope', '$http', function ($scope, $http) {
    $scope.showError = false;
    $scope.error = "";
    $scope.showSuccess = false;
    $scope.success = "";
    $scope.reservationsList = [];
    $scope.cutsList = [];


    $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
    };

    // var uploadedCount = 0;
    
    // $scope.files = [];

    // listCuts();
    listReservations();
    
    function listReservations() {
        $http({
            method: 'GET',
            url: 'http://localhost:1050/reservations'
        }).then(function successCallback(response) {
            $scope.reservationsList = response.data;
        }, function errorCallback(response) {
            $scope.reservationsList = [];
            $scope.error = "Error consultando las reservas";
            $scope.showError = true;
            $scope.showSuccess = false;
        });
    }

    // $scope.onFileSelect = function ($files) {
    //     Upload.upload({
    //         url: 'api/upload',
    //         method: 'POST',
    //         file: $files,
    //     }).progress(function (e) {
    //     }).then(function (data, status, headers, config) {
    //         // file is uploaded successfully
    //         console.log(data);
    //     });
    // }

    $scope.getReservation = function (reservationId) {
        $http({
            method: 'GET',
            url: 'http://localhost:1050/reservations?reservationId=' + reservationId
        }).then(function successCallback(response) {
            if (response.data != null && response.data.length > 0) {
                $scope.reservation = response.data[0];
                $scope.reservation.reservationId = response.data[0]._id;
                jQuery("#reservationsModal").modal("show");
            } else {
                $scope.reservation = {};
                $scope.error = "Error consultando los datos de la reserva";
                $scope.showError = true;
                $scope.showSuccess = false;
            }
        }, function errorCallback(response) {
            $scope.reservation = {};
        });
    }

    $scope.saveReservation = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:1050/reservations',
            data: $scope.reservation
        }).then(function successCallback(response) {
            $scope.reservation = {};
            listReservations();
            $scope.success = "La reserva se ha realizado correctamente";
            $scope.showError = false;
            $scope.showSuccess = true;
            jQuery("#reservationsModal").modal("hide");
        }, function errorCallback(response) {
            $scope.error = response.data.errors;
            $scope.showError = true;
            $scope.showSuccess = false;
            jQuery("#reservationsModal").modal("hide");
        });
    }

    $scope.newReservation = function (reservationId) {
        if ($scope.reservation != undefined && $scope.reservation.reservationId != undefined) {
            $scope.reservation = {};
        }
        jQuery("#reservationsModal").modal("show");
    }

    $scope.deleteReservation = function (reservationId) {
        $scope.reservation = { reservationId: reservationId }
        jQuery("#deleteModal").modal("show");
    }

    $scope.confirmDelete = function () {
        $http({
            method: 'DELETE',
            url: 'http://localhost:1050/reservations?reservationId=' + $scope.reservation.reservationId
        }).then(function successCallback(response) {
            $scope.reservation = {};
            listReservations();
            $scope.success = "La reserva se ha cancelado correctamente";
            $scope.showError = false;
            $scope.showSuccess = true;
            jQuery("#deleteModal").modal("hide");
        }, function errorCallback(response) {
            $scope.reservation = {};
            $scope.error = response.data.errors;
            $scope.showError = true;
            $scope.showSuccess = false;
            jQuery("#deleteModal").modal("hide");
        });
    }

    // function listCuts() {
    //     $http({
    //         method: 'GET',
    //         url: 'http://localhost:1050/cuts'
    //     }).then(function successCallback(response) {
    //         $scope.cutsList = response.data;
    //     }, function errorCallback(response) {
    //         $scope.cutsList = [];
    //         $scope.error = "Error consultando los cortes";
    //         $scope.showError = true;
    //         $scope.showSuccess = false;
    //     });
    // }
}]);
