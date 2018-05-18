angular.module('BaiYin.bulletinBoard', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bulletinBoard', {
            url: '/bulletinBoard',
            controller: 'bulletinBoardController',
            templateUrl: 'bulletinBoard/bulletinBoard.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])
    .controller('bulletinBoardController', ['$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$ionicTabsDelegate', '$stateParams',
        function ($scope, showAlert, loadingAnimation, $http, $state, $ionicTabsDelegate, $stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                bulletinInit();
            });

            //点击标题
            $scope.toEdit = function (line_no) {
                console.log("toEdit.line_no==="+line_no);
                $state.go('bulletinBoard/edit', {LINE_NO: line_no})
            };

            //初始化白板公告列表
            function bulletinInit() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=WhiteBoardService&TransName=listWhiteBoardNewspaper')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.tList = res.data.tList;
                        } else {
                            showAlert.showMsg('', '', res.data.msg);

                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

        }
    ])
