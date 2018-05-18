angular.module('BaiYin.pm.defectFill.defectFillDetail', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/defectFill/defectFillDetail', {
            url: '/pm/defectFill/defectFillDetail',
            controller: 'defectFillDetailController',
            templateUrl: 'pm/defectFill/defectFillDetail/defectFillDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item:null}
        })
    }])

    .controller('defectFillDetailController', ['$scope', 'showAlert', '$http', '$state','loadingAnimation','$stateParams',
        function ($scope, showAlert, $http, $state,loadingAnimation,$stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取列表页对象
                $scope.defectDetail = $stateParams.item;
                queryDoc();
            });

            //查询附件列表
            function queryDoc(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.get('ServiceName=DefectManageService&TransName=listEdmFile&FAULT_REP_ID='
                    + $scope.defectDetail.FAULT_REP_ID)
                    .then(function (res) {
                        console.log("list==="+JSON.stringify(res.data.fList));
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