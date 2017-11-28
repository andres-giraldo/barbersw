(function () {
    var app = angular.module("booksApp",  ['naif.base64']);
    app.controller('cutsController', ['$scope', '$http', function ($scope, $http) {
        $scope.showError = false;
        $scope.error = "";
        $scope.showSuccess = false;
        $scope.success = "";
        $scope.booksList = [];


        $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
            alert('this is handler for file reader onload event!');
          };
        
          var uploadedCount = 0;
        
          $scope.files = [];

        console.log("myfile "+$scope.myfile);
        //listBooks();
        function listBooks() {
            $http({
                method: 'GET',
                url: 'http://localhost:1050/books'
            }).then(function successCallback(response) {
                $scope.booksList = response.data;
            }, function errorCallback(response) {
                $scope.booksList = [];
                $scope.error = "Error consultando los libros";
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


        $scope.newBook = function (bookId) {
            if ($scope.book != undefined && $scope.book.bookId != undefined) {
                $scope.book = {};
            }
            jQuery("#booksModal").modal("show");
        }
        $scope.getBook = function (bookId) {
            $http({
                method: 'GET',
                url: 'http://localhost:1050/books?bookId=' + bookId
            }).then(function successCallback(response) {
                if (response.data != null && response.data.length > 0) {
                    $scope.book = response.data[0];    
                    $scope.book.bookId = response.data[0]._id;
                    jQuery("#booksModal").modal("show");
                } else {
                    $scope.book = {};
                    $scope.error = "Error consultando los datos del libro";
                    $scope.showError = true;
                    $scope.showSuccess = false;
                }
            }, function errorCallback(response) {
                $scope.book = {};
            });
        }
        $scope.deleteBook = function (bookId) {
            $scope.book = {bookId: bookId}
            jQuery("#deleteModal").modal("show");
        }
        $scope.saveBook = function () {
            $http({
                method: 'POST',
                url: 'http://localhost:1050/books',
                data: $scope.book
            }).then(function successCallback(response) {
                $scope.book = {};
                listBooks();
                $scope.success = "El libro ha sido guardado correctamente";
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
                url: 'http://localhost:1050/books?bookId=' + $scope.book.bookId
            }).then(function successCallback(response) {
                $scope.book = {};
                listBooks();
                $scope.success = "El libro ha sido eliminado correctamente";
                $scope.showError = false;
                $scope.showSuccess = true;
                jQuery("#deleteModal").modal("hide");
            }, function errorCallback(response) {
                $scope.book = {};
                $scope.error = response.data.errors;
                $scope.showError = true;
                $scope.showSuccess = false;
                jQuery("#deleteModal").modal("hide");
            });
        }
    }]);
})();