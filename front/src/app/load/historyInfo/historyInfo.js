angular.module('BaiYin.load.historyInfo', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('load/historyInfo', {
            url: '/load/historyInfo',
            controller: 'historyInfoController',
            templateUrl: 'load/historyInfo/historyInfo.tpl.html',
            cache: 'true',
            params:{type:null},
            authorizedRuleType: ['1']
        })
    }])

    .controller('historyInfoController', ['$scope', 'showAlert', '$http', '$state','$stateParams','loadingAnimation',
        function ($scope,showAlert,$http, $state,$stateParams,loadingAnimation) {
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.type=$stateParams.type.type;
                $scope.name=$stateParams.type.name;
                var url="ServiceName=TargetService&TransName=currMonthP";
                if($scope.type=='T'){
                    url="ServiceName=TargetService&TransName=currMonthT";
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post(url)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.hList = res.data.hList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            });
        }
    ])