angular.module('BaiYin.pm.journal.journalDetailList', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/journal/journalDetailList', {
            url: '/pm/journal/journalDetailList',
            controller: 'journalDetailListController',
            templateUrl: 'pm/journal/journalDetailList/journalDetailList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])

    .controller('journalDetailListController', ['$scope', 'loadingAnimation', 'showAlert', 'showAlert', '$http', '$state', '$ionicTabsDelegate', '$stateParams',
        function ($scope, loadingAnimation, showAlert, $showAlert, $http, $state, $ionicTabsDelegate, $stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                console.log("objCenteritem==" + $stateParams.item);
                //获取列表页对象
                $scope.objCenter = $stateParams.item;
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
            $scope.toYxfsData = function (x) {
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
            //集控中心运行日志详情
            $scope.myDiv = false;
            $scope.listcenterOperRecordLine = function () {
                $http.get("ServiceName=JournalService&TransName=listcenterOperRecordLine&EVENT_NO=" + $scope.objCenter.EVENT_NO)
                    .then(function (result) {
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listcenter1 = result.data.rList;
                            if ($scope.listcenter1 == '' || $scope.listcenter1 == undefined) {
                                $scope.myDiv = true;
                            }
                            console.log("listcenter1==" + JSON.stringify(result.data.rList));
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //集控中心运行方式
            $scope.listcenterOperMode = function () {
                $http.get("ServiceName=JournalService&TransName=listcenterOperMode&EVENT_NO=" + $scope.objCenter.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listcenter2 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //集控中心交接班
            $scope.listcenterOperRecord = function () {
                $http.get("ServiceName=JournalService&TransName=listcenterOperRecord&EVENT_NO=" + $scope.objCenter.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listcenter3 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //集控中心接地线
            $scope.listcenterGroupWire = function () {
                $http.get("ServiceName=JournalService&TransName=listcenterGroupWire&EVENT_NO=" + $scope.objCenter.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listcenter4 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //生产运行日志详情
            $scope.listOper = function (EVENT_NO) {
                $http.get("ServiceName=JournalService&TransName=listopeMode&EVENT_NO=" + EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listoper = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])