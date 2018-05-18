angular.module('BaiYin.userConfig.myDevice', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('userConfig/myDevice', {
        url: '/userConfig/myDevice',
        controller: 'myDeviceController',
        templateUrl: 'userConfig/myDevice/myDevice.tpl.html',
        cache: false,
        authorizedRuleType: ['1']
    })
}])

.controller('myDeviceController', ['$scope', 'Session',
    function($scope, Session) {
        if (Session.user.DeviceID) {
            $scope.deviceID = Session.user.DeviceID;
        }
    }
])