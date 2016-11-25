angular.module('starter')
        .directive('widgetClientes', function () {
            var ddo = {};
            ddo.restrict = "AE";
            ddo.transclude = true;
            ddo.templateUrl = ('templates/directive/widget-clientes.html');
            return ddo;
        })
        .directive('msg', function () {
            var ddo = {};
            ddo.restrict = "AE";
            ddo.transclude = true;
            ddo.templateUrl = ('templates/directive/msg.html');
            return ddo;

        })
        ;