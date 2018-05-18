angular.module('BaiYin.mine.netWork', [
    'BaiYin.mine.netWork.mock',
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('mine/netWork', {
        url: '/mine/netWork',
        controller: 'netWorkController',
        templateUrl: 'tabs/mine/netWork/netWork.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1', '0']
    })
}])

.controller('netWorkController', ['$scope', '$http', '$ionicHistory',
    function($scope, $http, $ionicHistory) {

        if (localStorage.getItem('uri') == null) {
            $scope.choice = 'B';
        } else {
            $scope.choice = 'A';
        }

        $scope.seleteNet = function(seleteNet) {
            if (seleteNet == 'A') {
                localStorage.setItem('uri', '1');
                $ionicHistory.goBack();
            } else {
                localStorage.removeItem('uri');
                $ionicHistory.goBack();
            }
        }
    }
])