angular.module('BaiYin.VacationDetail', [
        'BaiYin.VacationDetail.mock'
    ])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('VacationDetail', {
            url: '/VacationDetail',
            controller: 'VacationDetailController',
            templateUrl: 'AllLeave/Vacation/VacationDetail/VacationDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('VacationDetailController', ['$scope','$ionicHistory', 'pageInitService', '$stateParams', '$http', '$state', 'showAlert',
        function($scope,$ionicHistory, pageInitService, $stateParams, $http, $state, showAlert) {
            var vacParam = JSON.parse(sessionStorage.getItem("vacationParam"));
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelDetail&APPLY_NO=' + vacParam.APPLY_NO,
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.item = result[0].data;
                    if (result[0].data.APPROVE_STATUS == "未定义"||result[0].data.APPROVE_STATUS == "新建") {
                        $scope.submitL = true;
                        $scope.editL = true;
                        $scope.deleL = true;
                    } else if (result[0].data.APPROVE_STATUS == "审批通过" || result[0].data.APPROVE_STATUS == "审批中") {
                        $scope.backLeaveL = true;
                    };
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            $scope.doRefresh = function() {
                $http.get('ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelDetail&APPLY_NO=' + vacParam.APPLY_NO)
                    .then(function(res) {
                        $scope.item = res.data;
                        $scope.$broadcast('scroll.refreshComplete');
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
            //提交
            $scope.submit = function() {
                $http.get('ServiceName=ApplyForBusinessTravelService&TransName=doApplyForBusinessTravelDetail&ACTION_TYPE=submit&APPLY_NO=' + vacParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
            //销假
            $scope.backLeave = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveDetail&APPLY_NO=' + vacParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
            //编辑
            $scope.edit = function(item) {
                var editParam = item;
                editParam.numTT = 1;
                $state.go("newVacation", { "newParam": editParam });
            };
            //删除
            $scope.dele = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveDetail&APPLY_NO=' + vacParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
        }
    ])