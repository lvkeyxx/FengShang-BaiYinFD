angular.module('BaiYin.newVacation', [
        'BaiYin.newVacation.mock'
    ])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('newVacation', {
            url: '/newVacation',
            controller: 'newVacationController',
            templateUrl: 'AllLeave/Vacation/newVacation/newVacation.tpl.html',
            params: { 'newParam': null },
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('newVacationController', ['$scope', '$timeout', '$stateParams', '$ionicHistory', '$filter', 'loadingAnimation', 'ionicDatePicker', 'pageInitService', '$http', '$state', '$ionicPopup', 'showAlert',
        function($scope, $timeout, $stateParams, $ionicHistory, $filter, loadingAnimation, ionicDatePicker, pageInitService, $http, $state, $ionicPopup, showAlert) {
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelEmployeeType',
                    'ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelTransprtation'
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.item4s = result[0].data;
                    $scope.item5s = result[1].data;
                    $timeout(function() {
                        if ($stateParams.newParam.numTT == 1) {
                            $scope.contN = "编辑";
                            $stateParams.newParam.EMPLOYEE_TYPE = $stateParams.newParam.EMPLOYEE_TYPE + '';
                            $scope.newLeavePara = $stateParams.newParam;
                            $scope.filterDate1 = $filter('date')($stateParams.newParam.APPLY_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.filterDate2 = $filter('date')($stateParams.newParam.BEGIN_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.filterDate3 = $filter('date')($stateParams.newParam.END_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.DAYS = $stateParams.newParam.DAYS;
                        } else {
                            $scope.contN = "新增";
                        };
                    })

                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            //日期计算
            function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
                var aDate, oDate1, oDate2, iDays
                aDate = sDate1.split("-")
                oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2006格式  
                aDate = sDate2.split("-")
                oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
                iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
                return iDays
            };
            $scope.filterDate1 = $filter('date')(new Date(), "yyyy-MM-dd");
            $scope.filterDate2 = $filter('date')(new Date(), "yyyy-MM-dd");
            //日期控件
            function dateList(tesr) {
                var disabledDates = [];
                var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
                var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
                var datePickerCallback = function(val) {};
                $scope.datepickerObject = {
                    titleLabel: 'Title', //Optional
                    todayLabel: '今天', //Optionals
                    closeLabel: '关闭', //Optional
                    setLabel: '确认', //Optional
                    setButtonType: 'button-assertive', //Optional
                    todayButtonType: 'button-assertive', //Optional
                    closeButtonType: 'button-assertive', //Optional
                    mondayFirst: false, //Optional
                    disabledDates: disabledDates, //Optional
                    weekDaysList: weekDaysList, //Optional
                    monthList: monthList, //Optional
                    templateType: 'popup', //Optional
                    showTodayButton: 'true', //Optional
                    modalHeaderColor: 'bar-positive', //Optional
                    modalFooterColor: 'bar-positive', //Optional
                    from: new Date(2008, 8, 2), //可选
                    to: new Date(2030, 8, 25), //可选
                    inputDate: new Date(), //Optional
                    callback: function(val) { //Mandatory
                        if (tesr == 1) {
                            $scope.filterDate1 = $filter('date')(val, "yyyy-MM-dd")
                        } else if (tesr == 2) {
                            $scope.filterDate2 = $filter('date')(val, "yyyy-MM-dd")
                        } else if (tesr == 3) {
                            $scope.filterDate3 = $filter('date')(val, "yyyy-MM-dd");
                            var date1 = $scope.filterDate2;
                            var date2 = $scope.filterDate3;


                            $scope.DAYS = DateDiff(date1, date2) + 1;
                        }
                        datePickerCallback(val);
                    },
                    dateFormat: 'yyyy-MM-dd', //Optional
                    closeOnSelect: false, //Optional
                };
            }
            //开始结束日期
            $scope.chooseTime = function(tesr) {
                dateList(tesr)
                ionicDatePicker.openDatePicker($scope.datepickerObject);
                dateList(tesr)
            };
            //提交/保存
            $scope.doApproval = function(num, param) {
                var subParam = angular.copy(param);
                subParam.APPLY_DATE = $scope.filterDate1;
                subParam.BEGIN_DATE = $scope.filterDate2;
                subParam.END_DATE = $scope.filterDate3;
                subParam.DAYS = $scope.DAYS + '';
                var dat1 = (new Date(subParam.END_DATE.replace(/-/g, '/'))).getTime();
                var dat2 = (new Date(subParam.BEGIN_DATE.replace(/-/g, '/'))).getTime();
                var dat3 = (new Date(subParam.APPLY_DATE.replace(/-/g, '/'))).getTime();
                var dat = dat1 - dat2;
                var dat4 = dat2 - dat3;
                function reqSub() {
                    $http.post('ServiceName=ApplyForBusinessTravelService&TransName=doApplyForBusinessTravelDetail', subParam)
                        .then(function(res) {
                            showAlert.showMsg(res, '', '网络异常', '确认');
                            $state.go("VacationList");
                        }, function(error) {
                            showAlert.showMsg(error, '', '网络异常', '确认');
                            $scope.hasMore = false;
                        });
                };

                function resSub() {
                    $http.post('ServiceName=ApplyForBusinessTravelService&TransName=doApplyForBusinessTravelDetail', subParam1)
                        .then(function(res) {
                            subParam.APPLY_NO=res.data.APPLY_NO;
                            $http.post('ServiceName=ApplyForBusinessTravelService&TransName=doApplyForBusinessTravelDetail', subParam)
                                .then(function(res) {
                                    showAlert.showMsg(res, '', '网络异常', '确认');
                                    $state.go("VacationList");
                                }, function(error) {
                                    showAlert.showMsg(error, '', '网络异常', '确认');
                                    $scope.hasMore = false;
                                });
                        }, function(error) {
                            showAlert.showMsg(error, '', '网络异常', '确认');
                            $scope.hasMore = false;
                        });
                };
                if (dat >= 0 && dat4 >= 0) {
                    if ($stateParams.newParam.numTT == 1) {
                        if (num == 1) {
                            var subParam1 = angular.copy(subParam);
                            subParam1.ACTION_TYPE = "edit";
                            subParam.ACTION_TYPE = "submit";
                            console.log(subParam1);
                            resSub();
                        } else {
                            subParam.ACTION_TYPE = "edit";
                            reqSub();
                        };
                    } else {
                        if (num == 1) {
                            var subParam1 = angular.copy(subParam);
                            subParam1.ACTION_TYPE = "save";
                            subParam.ACTION_TYPE = "submit";
                            resSub();
                        } else {
                            subParam.ACTION_TYPE = "save";
                            reqSub();
                        };
                    };

                } else {
                    showAlert.showMsg("", '', '请选择正确日期', '确认');
                };
            };
            //返回
            $scope.back = function() {
                var confirmfalse = $ionicPopup.confirm({
                    okText: '是',
                    cancelText: '否',
                    template: '确定返回？'
                }).then(function(res) {
                    if (res) {
                        $ionicHistory.goBack();
                    };
                });
            };
            //回到首页
            $scope.backHomePage=function(){
                $state.go("tabs/homePage");
            };

        }
    ])