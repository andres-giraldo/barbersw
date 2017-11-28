(function () {
    var app = angular.module("booksApp",  ['naif.base64']);
    app.controller('cutsController', ['$scope', '$http', function ($scope, $http) {
        $scope.showError = false;
        $scope.error = "";
        $scope.showSuccess = false;
        $scope.success = "";
        $scope.cutsList = [];


        $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
         
          };
        
          var uploadedCount = 0;
        
          $scope.files = [];

       
          listCuts();
        function listCuts() {
            $http({
                method: 'GET',
                url: 'http://localhost:1050/cuts'
            }).then(function successCallback(response) {
                $scope.cutsList = response.data;
            }, function errorCallback(response) {
                $scope.cutsList = [];
                $scope.error = "Error consultando los cortes";
                $scope.showError = true;
                $scope.showSuccess = false;
            });
        }


        $scope.onFileSelect = function($files) {
            Upload.upload({
              url: 'api/upload',
              method: 'POST',
              file: $files,            
            }).progress(function(e) {
            }).then(function(data, status, headers, config) {
              // file is uploaded successfully
              console.log(data);
            });
        } 


        $scope.newCut = function (cutId) {
            if ($scope.cut != undefined && $scope.cut.cutId != undefined) {
                $scope.cut = {};
            }
            jQuery("#booksModal").modal("show");
        }
        $scope.getCut = function (cutId) {
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
            $scope.cut = {cutId: cutId}
            jQuery("#deleteModal").modal("show");
        }
        $scope.saveCut = function () {
            
            var img = new Buffer($scope.cut.cutImage, 'base64');
            $http({
                method: 'POST',
                url: 'http://localhost:1050/cuts',
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
                $scope.success = "El libro ha sido eliminado correctamente";
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
})();