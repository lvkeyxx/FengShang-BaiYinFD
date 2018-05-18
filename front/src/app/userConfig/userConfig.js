angular.module('BaiYin.userConfig', [
    'ionic',
    'BaiYin.editingUserInfo',
    'BaiYin.editingPwd',
    'BaiYin.userConfig.myDevice'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('userConfig', {
        url: '/userConfig',
        controller: 'userConfigController',
        templateUrl: 'userConfig/userConfig.tpl.html',
        authorizedRuleType: ['1']
    })
}])

.controller('userConfigController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state', 'Session',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state, Session) {
        $scope.UserInfo = Session.userInfoData.UserInfo;
    }
])