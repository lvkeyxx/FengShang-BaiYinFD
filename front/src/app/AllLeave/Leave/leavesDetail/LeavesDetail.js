angular.module('BaiYin.LeavesDetail', [
        'BaiYin.LeavesDetail.mock'
    ])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('LeavesDetail', {
            url: '/LeavesDetail',
            controller: 'LeavesDetailController',
            templateUrl: 'AllLeave/Leave/leavesDetail/LeavesDetail.tpl.html',
            //params: { 'detailParam': null },
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    .controller('LeavesDetailController', ['$scope', 'pageInitService', '$stateParams', '$http', '$state', 'showAlert','$ionicHistory',
        function($scope, pageInitService, $stateParams, $http, $state, showAlert,$ionicHistory) {
            var delParam = JSON.parse(sessionStorage.getItem("detailParam"));
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveDetail&APPLY_NO=' + delParam.APPLY_NO,
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.item = result[0].data;
                    if (result[0].data.APPLYFORLEAVESTATE == "新建") {
                        $scope.submitL = true;
                        $scope.editL = true;
                        $scope.deleL = true;
                    } 
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            $scope.doRefresh = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveDetail&APPLY_NO=' + delParam.APPLY_NO)
                    .then(function(res) {
                        $scope.item = res.data;
                        $scope.$broadcast('scroll.refreshComplete');
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };

            //提交
            $scope.submit = function() {
                $http.get('ServiceName=ApplyForLeaveService&ACTION_TYPE=submit&TransName=doApplyForLeaveDetail&APPLY_NO=' + delParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
           
            //编辑
            $scope.edit = function(item) {
                var editParam = angular.copy(item);
                editParam.numTT = 1;
                $state.go("newLeaves", { "newParam": editParam });
            };
            //删除
            $scope.dele = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=doApplyForLeaveDetail&ACTION_TYPE=delete&APPLY_NO=' + delParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
        }
    ])