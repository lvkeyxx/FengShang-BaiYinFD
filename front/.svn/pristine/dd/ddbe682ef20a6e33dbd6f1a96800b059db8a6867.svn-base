angular.module('BaiYin.pm.trouble.troubleDetail', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/trouble/troubleDetail', {
            url: '/pm/trouble/troubleDetail',
            controller: 'troubleDetailController',
            templateUrl: 'pm/trouble/troubleDetail/troubleDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item:null}
        })
    }])

    .controller('troubleDetailController', ['$scope', 'showAlert', '$http', '$state','$stateParams','loadingAnimation',

        function ($scope, showAlert, $http, $state,$stateParams,loadingAnimation) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取列表页对象
                $scope.title = $stateParams.item;
                //查询附件列表
                queryDoc();
            });
            $scope.setColor = function (status) {
                var c = "";
                if ('一般隐患' == status) {
                    c = '#3492e9';
                } else {
                    c = '#ff0000';
                }
                return {"color": c};
            };
            //查询附件列表
            function queryDoc(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.get('ServiceName=HiddenDangerService&TransName=listEdmFile&HIDDEN_DANGER_NO='
                    + $scope.title.HIDDEN_DANGER_NO+'&CONTRACT='+$scope.title.CONTRACT)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {//如果存在附件则显示
                            $scope.isShow=true;
                            $scope.docList=res.data.fList;
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])