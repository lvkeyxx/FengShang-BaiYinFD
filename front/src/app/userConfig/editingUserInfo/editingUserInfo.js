angular.module('BaiYin.editingUserInfo', [
    'ionic',
    'BaiYin.editingUserInfo.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('editingUserInfo', {
        url: '/editingUserInfo',
        controller: 'editingUserInfoController',
        templateUrl: 'userConfig/editingUserInfo/editingUserInfo.tpl.html',
        cache: false,
        authorizedRuleType: ['1']
    })
}])

.controller('editingUserInfoController', ['$scope', '$http', '$ionicPopup',

    function($scope, $http, $ionicPopup) {

    }
])