angular.module('BaiYin.bulletinBoard.view', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bulletinBoard/view', {
            url: '/bulletinBoard/view',
            controller: 'boardViewController',
            templateUrl: 'bulletinBoard/view/boardView.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {LINE_NO: null}
        })
    }])
    .controller('boardViewController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams',
        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams) {
            $scope.$on('$ionicView.enter', function () {
            });
            $scope.$on('$ionicView.afterEnter', function () {
                boardViewDetail($stateParams.LINE_NO);
            });

            //白板明细
            function boardViewDetail(line_no){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var param={LINE_NO:line_no};
                $http.post('ServiceName=WhiteBoardService&TransName=FormWhiteBoardNewspaper',param)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.detail = res.data.detail;
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])
