angular.module('BaiYin.load.nearlyHour', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('load/nearlyHour', {
            url: '/load/nearlyHour',
            controller: 'nearlyHourController',
            templateUrl: 'load/nearlyHour/nearlyHour.tpl.html',
            cache: 'true',
            params:{type:null},
            authorizedRuleType: ['1']
        })
    }])

    .controller('nearlyHourController', ['$scope', 'showAlert', '$http', '$state','$stateParams','loadingAnimation',
        function ($scope, showAlert,$http, $state,$stateParams,loadingAnimation) {
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.type=$stateParams.type.type;
                $scope.name=$stateParams.type.name;
                var url="ServiceName=TargetService&TransName=nearlyOneHourP";
                if($scope.type=='T'){
                    url="ServiceName=TargetService&TransName=nearlyOneHourT";
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
    ]);