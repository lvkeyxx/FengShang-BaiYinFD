angular
    .module('BaiYin.tabs.OMA', [
        'ionic',
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('tabs/OMA', {
            url: '/tabs/OMA',
            controller: 'OMAController',
            templateUrl: 'tabs/OMA/OMA.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    .controller('OMAController', ['$interval', '$scope','$rootScope', '$http', 'showAlert', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', '$state', 'Session', '$ionicLoading','$ionicActionSheet',
        function ($interval, $scope,$rootScope, $http, showAlert, $ionicTabsDelegate, $ionicHistory, $ionicPopup, $state, Session, $ionicLoading,$ionicActionSheet) {
            $scope.myActiveSlide = 1;
            $scope.$on('$ionicView.enter', function () {
                //显示tabs
                $rootScope.hideTabs = false;
                $scope.currentTab = 'tabs/OMA';
                $ionicTabsDelegate.select(2);
            });
            $scope.$on('$ionicView.afterEnter', function () {
                // getPowerPlantList();
            });
            $scope.totask=function () {
                showAlert.showMsg('','','开发中……');
                /*$state.go('');*/
            }
            /**
             * @author:Grant
             * @remark:跳转交易电量
             * @parameter:
             * request:
             * field:
             */
            $scope.toEleTrad=function () {
                // showAlert.showMsg('','','开发中……');
                $state.go('EleTrad');
            }
            /**
             * @author:Grant
             * @remark:跳转现货交易
             * @parameter:
             * request:
             * field:
             */
            $scope.tospotTransaction=function () {
                // showAlert.showMsg('','','开发中……');
                $state.go('spotTransaction');
            }
            /**
             * @author:Grant
             * @remark:跳转市场化交易
             * @parameter:
             * request:
             * field:
             */
            $scope.toMarketbasedTrad=function () {
                // showAlert.showMsg('','','开发中……');
                $state.go('MarketbasedTrad');
            }
            /**
             * @author:Grant
             * @remark:跳转结算电量
             * @parameter:
             * request:
             * field:
             */
            $scope.toSettlementTrad=function () {
                // showAlert.showMsg('','','开发中……');
                $state.go('SettlementTrad');
            }
        }]);