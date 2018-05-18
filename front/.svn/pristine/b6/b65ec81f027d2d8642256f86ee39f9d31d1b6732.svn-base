angular.module('BaiYin.common.login', [])
    .service('Session', [function() {
        this.userInfoData = null;
        this.user = null;
        this.create = function(userInfoData, user) {
            this.userInfoData = userInfoData;
            this.user = user;
        };
        this.destroy = function() {
            this.userInfoData = null;
            this.user = null;
        }
        return this;
    }])

.factory('CurrentUserService', ['$rootScope', '$timeout', '$ionicHistory', '$http', 'Session', '$filter', '$state', '$ionicModal', '$ionicPopup', 'SavePopShowFristService', '$ionicHistory',
    function($rootScope, $timeout, $ionicHistory, $http, Session, $filter, $state, $ionicModal, $ionicPopup, SavePopShowFristService, $ionicHistory) {
        var currentUser = {};
        currentUser.userSession = function() {
            return Session;
        };
        currentUser.destroyUserSession = function() {
            Session.destroy();
            return Session;
        };
        currentUser.contains = function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] == obj) {
                    return true;
                }
            }
            return false;
        };
        currentUser.usrAuth = function(evt, toState, toParams, fromState, fromParams) {
            console.log(toState);
            var rule = toState.authorizedRuleType;
            pageAuth(rule, evt, toState, toParams);
            if (!Session.userInfoData) {
                $ionicModal.fromTemplateUrl('userServers/login/login.tpl.html', {
                        nextState: {
                            toState: toState,
                            toParams: toParams
                        },
                        backdropClickToClose: false,
                        animation: 'slide-in-right'
                    })
                    .then(function(modal) {
                        modal.show();
                    });
                return;
            } else {
                blankPageToHomeIndex(toState);
            };
        };

        var pageAuth = function(rule, evt, toState, toParams) {
            var showConfirm = function(title, template, leftText, rightText, url) {
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $ionicModal.fromTemplateUrl(url, {
                                nextState: {
                                    toState: toState,
                                    toParams: toParams
                                },
                                animation: 'slide-in-right'
                            })
                            .then(function(modal) {
                                modal.show();
                            });

                    } else {
                        $ionicHistory.nextViewOptions({ historyRoot: false });
                    }
                });
            };

            if (!Session.userInfoData) return;
            var LoginStatus = Session.userInfoData.LoginStatus;
            var isHasAuth = currentUser.contains(rule, LoginStatus);
            if (!isHasAuth) {
                // 用户未登录
                evt.preventDefault();
                showConfirm('权限不足', '非常抱歉，本功能目前仅对用户开放，来登录吧', '确定', '取消', 'userServers/login/login.tpl.html');
            }
        }

        var blankPageToHomeIndex = function(toState) {
            if (toState.name == "blankPage") {
                $state.go("tabs/homePage", {}, { location: 'replace' });
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
            }
        };
        currentUser.tokenBug = function(event, mass) {
            if (SavePopShowFristService.getPopShowBlr().popShowBlr) {
                currentUser.destroyUserSession();
                token = null;
                var user = null;
                SavePopShowFristService.setPopShowBlr(false);
                showAlert("提示", mass, "确定");
            }
        };
        currentUser.noDataInfo = function(event, msg) {
            showDataInfo("提示", msg, "确定");
        };

        var showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                $ionicModal.fromTemplateUrl('userServers/login/login.tpl.html', {
                        animation: 'slide-in-right'
                    })
                    .then(function(modal) {
                        modal.show();
                    });
            });
        };
        var showDataInfo = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                $ionicHistory.goBack();
            });
        };
        currentUser.updateSession = function(data, user) {
            Session.create(data, user);
            return Session;
        };
        return currentUser;
    }
])