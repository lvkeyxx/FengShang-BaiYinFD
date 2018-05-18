angular.module('BaiYin.editingPwd', [
    'ionic',
    'BaiYin.editingPwd.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('editingPwd', {
        url: '/editingPwd',
        controller: 'editingPwdController',
        templateUrl: 'userConfig/editingPwd/editingPwd.tpl.html',
        cache: false,
        authorizedRuleType: ['1']
    })
}])

.controller('editingPwdController', ['$scope', '$http', '$ionicPopup', '$ionicHistory',

    function($scope, $http, $ionicPopup, $ionicHistory) {

        $scope.userPwd = {
            'password': '', //原密码
            'newPassword': '', //新密码
            'repeatPwd': '' //重新新密码
        };

        $scope.editPwd = {
            'username': '',
            'password': '', //输入的原密码
            'newPassword': '', //新密码
        }

        // 修改信息方法
        $scope.updateUserInfor = function() {

        }
        var showConfirm = function(template, okText, num) {
            var confirmPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
            confirmPopup.then(function(res) {
                if (res && num == 2) {
                    $ionicHistory.clearCache().then(function() {
                        $ionicHistory.goBack();
                    });
                }
            });
        };
    }
])