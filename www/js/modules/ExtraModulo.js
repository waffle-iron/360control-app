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
                                    if (!services.checkConnection) {
                                        dados[alias] = 'img/img_wifi.jpg';
                                    }
                                } else {
                                    dados[alias] = 'img/imagem_sem.jpg';
                                }
                            } else {
                                dados[alias] = 'img/imagem_sem.jpg';
                            }
                        } else {
                            dados[alias] = 'img/imagem_sem.jpg';
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

                    services.calculaDistance = function (lat1, lon1, lat2, lon2) {
                        var R = 6371; // now in km (change for get miles)
                        var dLat = (lat2 - lat1) * Math.PI / 180;
                        var dLon = (lon2 - lon1) * Math.PI / 180;
                        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var d = (R * c) || 0;
                        return d;
                    };

                    services.saudacao = function () {
                        var data = new Date();
                        var hora = data.getHours();

                        if (hora >= 0 && hora < 6)
                            return 'Bom madrugada';
                        else if (hora >= 6 && hora < 12)
                            return 'Bom dia';
                        else if (hora >= 12 && hora < 18)
                            return 'Boa tarde';
                        else
                            return 'Boa noite';
                    };


                    services.moeda = function (val) {
                        debug(val);
                        if (val === '') {
                            return null;
                        }

                        if (ValidacaoModuloFactory.empty(val)) {
                            return null;
                        }

                        if (val === '0.00') {
                            return null;
                        }

                        function number_format(number, decimals, decPoint, thousandsSep) { // eslint-disable-line camelcase
                            number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
                            var n = !isFinite(+number) ? 0 : +number
                            var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
                            var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
                            var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
                            var s = ''

                            var toFixedFix = function (n, prec) {
                                var k = Math.pow(10, prec)
                                return '' + (Math.round(n * k) / k)
                                        .toFixed(prec)
                            }

                            // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
                            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
                            if (s[0].length > 3) {
                                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
                            }
                            if ((s[1] || '').length < prec) {
                                s[1] = s[1] || ''
                                s[1] += new Array(prec - s[1].length + 1).join('0')
                            }

                            return s.join(dec);
                        }

                        return  number_format(val, 2, '.', '');
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
