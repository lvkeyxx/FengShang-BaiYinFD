angular.module('BaiYin.flowDetail', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('flowDetail', {
        url: '/flowDetail',
        params: { 'item': null },
        controller: 'flowDetailController',
        templateUrl: 'Agents/AgentsList/agentsView/Flow/flowDetail.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('flowDetailController', ['$scope', '$state', 'showAlert', 'pageInitService', '$timeout', '$ionicHistory', '$stateParams', '$http', '$ionicPopup', 'Session',
    function($scope, $state, showAlert, pageInitService, $timeout, $ionicHistory, $stateParams, $http, $ionicPopup, Session) {
        var valKey = $stateParams.item;
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
                'ServiceName=ApproveService&TransName=getApprvedStream&LU_NAME=' + valKey.LU_NAME + '&KEY_REF=' + valKey.KEY_REF
            ];
            pageInitService.pageInit(apis).then(function(result) {
                agentViewMsg(result[0])
            }, function(error) {
                showAlert.showMsg(error, '', '网络异常', '确认')
            })
        });
        $scope.doRefresh = function() {
            $http.get('ServiceName=ApproveService&TransName=getApprvedStream&LU_NAME=' + valKey.LU_NAME + '&KEY_REF=' + valKey.KEY_REF)
                .then(function(res) {
                    agentViewMsg(res)
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
        };

        function agentViewMsg(res) {
            console.log(res)
            var str = [];
            var arr = {};
            for (var i = 0; i < res.data.length; i++) {
                arr = res.data[i];
                if (arr.APP_DATE == 'null') {
                    arr.APP_DATE = '无'
                } else {
                    arr.APP_DATE = new Date(arr.APP_DATE)
                }
                str.push(arr)
            }
            $scope.items = str;
            console.log(str)

        }

        $scope.openUrl = function(URL) {
            document.addEventListener("deviceready", function() {
                if (Session.user.DeviceType == 'Android') {
                    MRUpdateVersion.updateVersion(function success() {}, function failed(message) {}, URL);
                } else {
                    cordova.InAppBrowser.open(URL, '_system', 'zoom=yes');
                }
            }, false);
        }

    }
])
