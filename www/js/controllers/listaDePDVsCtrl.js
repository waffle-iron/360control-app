angular.module('starter').controller('listaDePDVsCtrl', function ($rootScope, $scope, $stateParams, LoadModuloFactory, ExtraModuloFactory, PdvTable, $ionicScrollDelegate, lodash) {
    $scope.dados = [];
    $scope.search = '';
    var maxLimit = 0;
    var fim = false;
    var dados = [];

    //PdvTable.populaBase();

    $scope.loadMore = function () {
        if (fim === false) {
            LoadModuloFactory.show();

            var options = {order: 'nome ASC'};
            if ($scope.search != '') {
                options['where'] = 'nome LIKE "%' + $scope.search + '%"';
                maxLimit = 0;
                $scope.dados = [];
                dados = [];
            } else {
                options['limit'] = maxLimit + ',50';
            }

            PdvTable.all(options, function (r) {
                if (r !== null) {
                    angular.forEach(r, function (v, k) {
                        dados.push(v);
                    });
                    $scope.dados = lodash.uniqBy(dados, 'id');
                    maxLimit = maxLimit + 50;
                    if ($scope.search != '') {
                        fim = true;
                    }
                } else {
                    fim = true;
                    ExtraModuloFactory.info($scope, 'No se encontraron registros.');
                }
                LoadModuloFactory.hide();
            });
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.scrollTop = function () {
        fim = false;
        $ionicScrollDelegate.scrollTop();
    };

    $scope.clearSearch = function () {
        $scope.search = '';
        $scope.dados = [];
        dados = [];
        fim = false;
        maxLimit = 0;
        $scope.loadMore();
        $ionicScrollDelegate.scrollTop();
    };

    /*$scope.$on('$stateChangeSuccess', function () {
     $scope.loadMore();
     });*/


});