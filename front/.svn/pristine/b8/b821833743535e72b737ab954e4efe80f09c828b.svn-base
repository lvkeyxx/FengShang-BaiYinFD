angular
    .module('BaiYin.taskManage.tmDetail', [
        'ionic',
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('taskManage/tmDetail', {
            url: '/taskManage/tmDetail',
            controller: 'tmDetailController',
            templateUrl: 'taskManage/tmDetail/tmDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('tmDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$ionicActionSheet',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $ionicActionSheet) {
            //标题
            $scope.title = "专项详情";
            //详情数据
            $scope.data = new Object();
            $scope.$on('$ionicView.enter', function () {
                $scope.data = $stateParams.item.data;
            });
        }
    ]);