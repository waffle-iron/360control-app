angular.module('starter')
        .factory('ExtraModuloFactory',
                function (ValidacaoModuloFactory, $ionicScrollDelegate) {

                    var services = {};

                    services.top = function () {
                        $ionicScrollDelegate.scrollTop();
                    };

                    services.color = function (key) {
                        if (key % 2 === 0) {
                            return 'item-mydark';
                        } else {
                            return 'item-stable';
                        }
                    };

                    services.img = function (dados, campo, alias) {
                        dados = dados || {};
                        alias = alias || 'url';
                        if (ValidacaoModuloFactory.isNotNull(dados)) {
                            if (ValidacaoModuloFactory.isNotNull(dados[campo])) {
                                dados[alias] = dados[campo];
                                if (dados[campo] != '') {
                                    if (!services.checkConnection()) {
                                        dados[alias] = 'img/img_wifi.jpg';
                                        return dados;
                                    } else {
                                        dados[alias] = dados[campo];
                                        alert(dados[alias]);
                                        return dados;
                                    }
                                } else {
                                    dados[alias] = 'img/imagem_sem.jpg';
                                    return dados;
                                }
                            } else {
                                dados[alias] = 'img/imagem_sem.jpg';
                                return dados;
                            }
                        } else {
                            dados[alias] = 'img/imagem_sem.jpg';
                            return dados;
                        }
                        return dados;
                    };

                    services.info = function (scope, msg) {
                        return services.flashMensage(scope, msg, 'calm');
                    };

                    services.success = function (scope, msg) {
                        return services.flashMensage(scope, msg, 'balanced');
                    };

                    services.error = function (scope, msg) {
                        return services.flashMensage(scope, msg, 'assertive');
                    };

                    services.clear = function (scope) {
                        return services.flashMensage(scope, '', '');
                    };

                    services.flashMensage = function (scope, msg, color) {
                        scope = angular.merge(
                                scope, {
                                    msg: msg,
                                    msg_color: color
                                }
                        );
                        return scope;
                    };

                    services.saudacao = function () {
                        var data = new Date();
                        var hora = data.getHours();

                        if (hora >= 0 && hora < 6)
                            return '¡buenos días';
                        else if (hora >= 6 && hora < 12)
                            return 'Buen día';
                        else if (hora >= 12 && hora < 18)
                            return 'Buenas tardes';
                        else
                            return 'Buenas noches';
                    };

                    services.checkConnection = function () {
                        if (ionic.Platform.isAndroid()) {

                            var networkState = navigator.connection.type;

                            var states = {};
                            states[Connection.UNKNOWN] = false;
                            states[Connection.ETHERNET] = true;
                            states[Connection.WIFI] = true;
                            states[Connection.CELL_2G] = true;
                            states[Connection.CELL_3G] = true;
                            states[Connection.CELL_4G] = true;
                            states[Connection.CELL] = true;
                            states[Connection.NONE] = false;
                            return states[networkState];
                        } else {
                            return false;
                        }
                    };

                    services.calulcarPorcentagem = function (total, processado) {
                        return Math.round((((total - processado) / total) * 100) - 100) * -1;
                    };

                    return services;
                }
        );
