angular.module('BaiYin.APPfeedback', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('APPfeedback', {
        url: '/APPfeedback',
        controller: 'APPfeedbackController',
        templateUrl: 'tabs/mine/APPfeedback/APPfeedback.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1', '0']
    })
}])

.controller('APPfeedbackController', ['$scope', '$http', '$ionicHistory', '$ionicPopup',
    function($scope, $http, $ionicHistory, $ionicPopup) {

        // 提交反馈
        $scope.appFeedback2 = function(opinion, phone) {
            $scope.upData = {
                CONTENT: encodeURIComponent(opinion),
                PHONE: phone,
            }
            $http.post('ServiceName=SuggestionService&TransName=doSuggestion&SUBJECT=subject1', $scope.upData).then(function(res) {
                var alertPopup = $ionicPopup.alert({
                    template: res.msg,
                    okText: '确认',
                });
                alertPopup.then(function(res) {
                    $ionicHistory.goBack();
                });
            }, function(msg) {
                var alertPopup = $ionicPopup.alert({
                    template: '提交信息失败请重试',
                    okText: '确认'
                });
                alertPopup.then(function(res) {});
            });
        };
    }
])