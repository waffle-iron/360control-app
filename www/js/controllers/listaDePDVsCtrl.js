angular.module('starter').controller('listaDePDVsCtrl', function ($rootScope, $ionicModal, TiersTable, $scope, $stateParams, LoadModuloFactory, ExtraModuloFactory, PdvTable, $ionicScrollDelegate, lodash) {
    $scope.dados = [];
    $scope.tiers = [];
    $scope.search = '';
    $scope.tier_search = '';
    $scope.tier_resetar = false;
    var maxLimit = 0;
    var fim = false;
    var dados = [];

    debug('$stateParams.canal_id');
    debug($stateParams.canal_id);

    TiersTable.all({}, function (r) {
        debug(r);
        if (r !== null) {
            $scope.tiers = r;
        }
    });

    $scope.loadMore = function () {
        if (fim === false) {
            LoadModuloFactory.show();

            var options = {
                where: '',
                order: 'nome ASC'
            };

            if (!!$stateParams.canal_id) {
                options['where'] += 'canal_id = ' + $stateParams.canal_id;
            }

            if ($scope.tier_resetar) {
                maxLimit = 0;
                $scope.dados = [];
                dados = [];
                $scope.tier_resetar = false;
            }

            if ($scope.tier_search != '') {
                options['where'] += ' AND tier_id = ' + $scope.tier_search;
            }
            if ($scope.search != '') {
                options['where'] += ' AND (nome LIKE "%' + $scope.search + '%" OR endereco LIKE "%' + $scope.search + '%" OR codigo LIKE "%' + $scope.search + '%") ';
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
                    if ($scope.dados.length < 1) {
                        ExtraModuloFactory.info($scope, 'No se encontraron registros.');
                    }
                }
                LoadModuloFactory.hide();
            });
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    $scope.scrollTop = function () {
        fim = false;
        $scope.loadMore();
        $ionicScrollDelegate.scrollTop();
    };

    $scope.clearSearch = function () {
        $scope.search = '';
        $scope.tier_search = '';
        $scope.dados = [];
        dados = [];
        fim = false;
        maxLimit = 0;
        $scope.loadMore();
        $ionicScrollDelegate.scrollTop();
    };

    $scope.filtrarTier = function (id) {
        $scope.closeModal();
        $scope.tier_search = id;
        fim = false;
        $scope.tier_resetar = true;
        $scope.loadMore();
    };

    $ionicModal.fromTemplateUrl('pdv-filtro.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });

});