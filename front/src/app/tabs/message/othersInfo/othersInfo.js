angular.module('BaiYin.message.othersInfo', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('message/othersInfo', {
        url: '/message/othersInfo:targetId',
        controller: 'othersInfoController',
        templateUrl: 'tabs/message/othersInfo/othersInfo.tpl.html',
        authorizedRuleType: ['1']
    })
}])

.controller('othersInfoController', ['$scope', '$http', '$ionicPopup', '$stateParams', 'Session',

    function($scope, $http, $ionicPopup, $stateParams, Session) {
        $scope.$on('$ionicView.beforeEnter', function() {
            if (isApp) {
                //获取用户信息
                if (Session.user.DeviceType == 'Android') {
                    window.JMessage.getUserInfo($stateParams.targetId, null,
                        function(response) {
                            $scope.userInfo = JSON.parse(response);
                        },
                        function(errorStr) {
                            console.log(errorStr); // 输出错误信息。
                        });
                } else {
                    window.JMessage.getUserInfo($stateParams.targetId, null,
                        function(response) {
                            $scope.userInfo = response;
                        },
                        function(errorStr) {
                            console.log(errorStr); // 输出错误信息。
                        });
                }

            }
        });
    }
])