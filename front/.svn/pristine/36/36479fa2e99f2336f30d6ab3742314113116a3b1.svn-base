angular
    .module('BaiYin.erp.selectUser', [
        'ionic'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('erpSelectUser', {
            url: '/erp/select/user',
            controller: 'erpSelectUserController',
            templateUrl: 'erp/select/user/user.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: { item: null }
        })
    }])
    .controller('erpSelectUserController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, ionicDatePicker) {
            //进入页面
            $scope.$on('$ionicView.enter', function () {
                console.log("进入人员选择页面");
            });
            //选择下一步联系人
            $scope.selectUser = function(){
                history.go(-2);
            };
        }
    ]);