angular.module('BaiYin.OSI.OSIArear', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OSI/OSIArear', {
            url: '/OSI/OSIArear',
            controller: 'OSIArearController',
            templateUrl: 'OSI/OSIArear/OSIArear.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('OSIArearController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout) {
            //人员信息
            $scope.user = {
                PERSON_NAME: "",//人员姓名
                qualified: 0,//合格区域
                unqualified: 0//不合格区域
            };
            //数据
            $scope.data = {
                iList: new Array(),//计划内
                oList: new Array()//计划外
            };
            $scope.$on('$ionicView.enter', function () {
                $scope.user.PERSON_NAME = $stateParams.item.PERSON_NAME;
                getList();
            });
            //获取数据
            var getList = function(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http
                    .post('ServiceName=InspectionService&TransName=inspectStatisticsRoute', {
                        START_TIME: $stateParams.item.START_TIME,
                        END_TIME: $stateParams.item.END_TIME,
                        PERSON_ID: $stateParams.item.PERSON
                    })
                    .then(function (res) {
                        $scope.data = new Object();
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.data = {
                                iList: res.data.iList,
                                oList: res.data.oList
                            };
                            $scope.data.iList.forEach(function(v, i){
                                if (v.AREA.indexOf("不合格") == -1){
                                    $scope.user.qualified++;
                                }else{
                                    $scope.user.unqualified++;
                                }
                            });
                        } else {
                            showAlert.showMsg(res.data);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])
