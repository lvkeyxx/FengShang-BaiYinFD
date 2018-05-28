angular.module('BaiYin.MarketbasedTradDetail', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('MarketbasedTradDetail', {
            url: '/MarketbasedTrad/MarketbasedTradDetail',
            controller: 'MarketbasedTradDetailController',
            templateUrl: 'MarketbasedTrad/MarketbasedTradDetail/MarketbasedTradDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                TITLE: null,
                CONTENT: null,
                BILLING_CHARGE_PRICE: null,
                TRADE_NO: null
            }
        })
    }])
    .controller('MarketbasedTradDetailController', ['$interval', '$scope','$rootScope', '$http', 'showAlert', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', '$state', 'Session', '$ionicLoading','$ionicActionSheet','$stateParams',
        function ($interval, $scope,$rootScope, $http, showAlert, $ionicTabsDelegate, $ionicHistory, $ionicPopup, $state, Session, $ionicLoading,$ionicActionSheet,$stateParams) {

            $scope.$on('$ionicView.enter', function () {


            });
            $scope.$on('$ionicView.afterEnter', function () {
                console.log($stateParams);
                $scope.detailTitle=$stateParams.TITLE;
                $scope.detailCONTENT=$stateParams.CONTENT;
                $scope.detailBILLING_CHARGE_PRICE=$stateParams.BILLING_CHARGE_PRICE;
                $scope.detailTRADE_NO=$stateParams.TRADE_NO;

            });

            






        }]);

