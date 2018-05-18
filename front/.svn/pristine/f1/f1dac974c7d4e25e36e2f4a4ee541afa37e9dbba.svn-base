angular.module('BaiYin.pm.journal.journalDetail', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/journal/journalDetail', {
            url: '/pm/journal/journalDetail',
            controller: 'journalDetailController',
            templateUrl: 'pm/journal/journalDetail/journalDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item:null}
        })
    }])

    .controller('journalDetailController', ['$scope','loadingAnimation','showAlert', 'showAlert', '$http', '$state','$ionicTabsDelegate','$stateParams',
        function ($scope,loadingAnimation,showAlert, $showAlert, $http, $state,$ionicTabsDelegate,$stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取列表页对象
                console.log("item=="+JSON.stringify($stateParams.item));
                $scope.obj = $stateParams.item;
                //默认第一个选项卡
                $ionicTabsDelegate.select(0);
                $scope.listcenterOperRecordLine();
            });

            //运行日志
            $scope.toYxrzData = function () {
                $ionicTabsDelegate.select(0);
                $scope.listcenterOperRecordLine();
            }
            //运行方式
            $scope.toYxfsData = function () {
                $ionicTabsDelegate.select(1);
                $scope.listcenterOperMode();
            }
            //交接班
            $scope.toJjbData = function () {
                $ionicTabsDelegate.select(2);
                $scope.listcenterOperRecord();
            }
            //接地线
            $scope.toJdxData = function () {
                $ionicTabsDelegate.select(3);
                $scope.listcenterGroupWire();
            }
            //运行日志详情
            $scope.listcenterOperRecordLine = function() {
                $http.get("ServiceName=JournalService&TransName=listOperRecordLine&EVENT_NO=" + $scope.obj.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.list1 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //运行方式
            $scope.listcenterOperMode = function() {
                $http.get("ServiceName=JournalService&TransName=listopeMode&EVENT_NO=" + $scope.obj.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.list2 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //交接班
            $scope.listcenterOperRecord = function() {
                $http.get("ServiceName=JournalService&TransName=listteamChange&EVENT_NO=" + $scope.obj.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.list3 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //接地线
            $scope.listcenterGroupWire = function() {
                $http.get("ServiceName=JournalService&TransName=listgroupWire&EVENT_NO=" + $scope.obj.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.list4 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
                //生产运行日志详情
            $scope.listOper = function(EVENT_NO){
                $http.get("ServiceName=JournalService&TransName=listopeMode&EVENT_NO="+EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0'){
                            $scope.listoper = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    },function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])