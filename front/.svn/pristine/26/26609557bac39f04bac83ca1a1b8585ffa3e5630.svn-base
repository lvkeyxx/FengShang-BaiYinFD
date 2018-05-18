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
                showAlert.showMsg('','','程序员正在玩命开发中……')
            }
        }]);