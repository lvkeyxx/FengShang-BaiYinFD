angular.module('BaiYin.attence.countAttence.wdkList', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/wdkList', {
            url: '/attence/countAttence/wdkList',
            controller: 'wdkListController',
            templateUrl: 'attence/countAttence/wdkList/wdkList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, personNum: null, partCode: null, partName: null}
        })
    }])
    .controller('wdkListController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$stateParams',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取统计页面传来的日期和人数
                if(!localStorage.getItem("ATTENDENCE_FLG")){
                    console.log("3333");
                    $scope.dateTimeShow = $stateParams.dateTimeShow;
                    $scope.personNum = $stateParams.personNum;
                    $scope.partCode = $stateParams.partCode;
                    $scope.partName = $stateParams.partName;
                    console.log("partName==" + $scope.partName + "/personNum==" + $scope.personNum);
                    localStorage.setItem("dateTimeShow",$stateParams.dateTimeShow);
                    localStorage.setItem("personNum",$stateParams.personNum);
                    localStorage.setItem("partCode",$stateParams.partCode);
                    localStorage.setItem("partName",$stateParams.partName);
                }else{
                    $scope.dateTimeShow = localStorage.getItem("dateTimeShow");
                    $scope.personNum = localStorage.getItem("personNum");
                    $scope.partCode = localStorage.getItem("partCode");
                    $scope.partName = localStorage.getItem("partName");
                }

                //获取未打卡人员列表
                wdkPersonList($scope.dateTimeShow, $scope.partCode);
                localStorage.removeItem("ATTENDENCE_FLG");

            });

            function wdkPersonList(mounth, dept) {
                console.log("mounth==" + mounth + "/dept==" + dept);
                var parmas = {
                    QUERY_MONTH: mounth,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=monthStatisticsUnclock', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.wdkList = res.data.tList;
                            console.log("wdkList.length==" + $scope.wdkList.length);
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.towdkDetail = function (obj) {
                localStorage.setItem("ATTENDENCE_FLG","1");
                console.log("dateTimeShow==" + $scope.dateTimeShow + "/obj==" + JSON.stringify(obj));
                $scope.PERSON_ID = obj.PERSON_ID;
                $scope.personName = obj.PERSON_NAME;
                $scope.count = obj.COUNT;
                var item = {
                    PERSON_ID: $scope.PERSON_ID,
                    QUERY_MONTH: $scope.dateTimeShow,
                    personName: $scope.personName,
                    count: $scope.count,
                }
                $state.go('attence/countAttence/wdkDetail', item);
            }
        }
    ])
