angular.module('BaiYin.pm.journal.journalList', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/journal/journalList', {
            url: '/pm/journal/journalList',
            controller: 'journalListController',
            templateUrl: 'pm/journal/journalList/journalList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })

    }])
    .controller('journalListController', ['$scope', 'loadingAnimation', 'showAlert', '$http', '$state', '$ionicActionSheet',
        function ($scope, loadingAnimation, showAlert, $http, $state, $ionicActionSheet) {

            $scope.$on('$ionicView.afterEnter', function () {
                // $(".journalList ul").hide()
                $scope.flag2 = false;
                $scope.flag = false;
                var status = false;

            });
            $scope.getBackground = function (status) {
                var c = "";
                if (status) {
                    c = '#f4f4f4';
                } else {
                    c = '#f4f4f4';
                }
                return {"background": c};
            };
            //日期选择
            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#select_date_please', //标签id
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                'minDate': (new Date().getFullYear() - 10) + '-' + 1 + '-' + 1, //最小日期
                'maxDate': (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()) //最大日期
            });
            $scope.dateChangeEvent = function(){
                $scope.RECORD_DATE = $('#select_date_please').val();
                console.log("到这里来了不空$scope.RECORD_DATE===" + $scope.RECORD_DATE);
                $scope.listCenter($scope.WORK_SEQ, $scope.RECORD_DATE);
            }
            $scope.RECORD_DATE = '';
            $scope.WORK_SEQ = '';
            //input框显示位置
            $("input").width($(window).width() - 120);
            $scope.toDetailListCenter = function (item) {
                $state.go('pm/journal/journalDetailList', {item: item})
            }
            $scope.toDetailList = function (item) {
                $state.go('pm/journal/journalDetail', {item: item})
            }
            //选择班次
            $scope.arr = [
                {text: '全部'},
                {text: '白班'},
                {text: '中班'},
                {text: '夜班'}];
            $scope.toSelectClass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.arr,
                    //destructiveText: 'Delete',
                    /*titleText: '选择班次',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        $('#selectclass').val($scope.arr[index].text);
                        //取班次的值
                        $scope.WORK_SEQ = $scope.arr[index].text;
                        if ($scope.WORK_SEQ == '全部') {
                            $scope.WORK_SEQ = '';
                        }
                        $scope.listCenter($scope.WORK_SEQ, $scope.RECORD_DATE);
                        return true;
                    }
                });
            };
            $scope.listCenter = function (WORK_SEQ, RECORD_DATE) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                //集控中心运行日志概览
                var params = {
                    WORK_SEQ: WORK_SEQ,
                    RECORD_DATE: RECORD_DATE
                };

                $http.post("ServiceName=JournalService&TransName=listCenterOperRecorde", params)
                    .then(function (result) {
                        $scope.listOper(WORK_SEQ, RECORD_DATE);
                        console.log(result);
                        loadingAnimation.hideLoading();
                        $scope.flag2 = false;
                        if (result.data.code == '0') {
                            $scope.journal2 = result.data.rList;
                            console.log("journal2===" + JSON.stringify($scope.journal2));
                            $scope.listcenter_EVENT_NO = $scope.journal2;
                            if($scope.journal2.length == 0){
                                showAlert.showMsg('','','没有查询到集控中心运行日志数据...');
                            }
                        } else if (result.data.coce == '1' || result.data.rList.length == 0) {
                            $scope.flag2 = true;//不显示
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            $scope.listOper = function (WORK_SEQ, RECORD_DATE) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                //生产运行日志概览
                var params = {
                    WORK_SEQ: WORK_SEQ,
                    RECORD_DATE: RECORD_DATE
                };
                $http.post("ServiceName=JournalService&TransName=listOperRecorde",params)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        $scope.flag = false;
                        if (result.data.code == '0') {
                            $scope.journal = result.data.rList;
                            $scope.listoper_EVENT_NO = $scope.journal;
                            if($scope.journal.length == 0){
                                showAlert.showMsg('','','没有查询到生产运行日志数据...');
                            }
                        } else if (result.data.coce == '1' || result, data.rList.length == 0) {
                            $scope.flag = true;//不显示
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
