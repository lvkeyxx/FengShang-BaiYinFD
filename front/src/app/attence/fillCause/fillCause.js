angular.module('BaiYin.attence.fillCause', [
    'ionic',
    'ionic-datepicker',

])
    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider,ionicDatePickerProvider) {
        $stateProvider.state('attence/fillCause', {
            url: '/attence/fillCause',
            controller: 'fillCauseController',
            templateUrl: 'attence/fillCause/fillCause.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
        var datePickerObj = {
            inputDate: new Date(),
            setLabel: '选择',
            todayLabel: '今天',
            closeLabel: '关闭',
            mondayFirst: false,
            weeksList: ["日", "一", "二", "三", "四", "五", "六"],//["S", "M", "T", "W", "T", "F", "S"],
            monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],//["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            templateType: 'popup',
            from: new Date(2012, 1, 1),
            to: new Date(2020, 1, 1),
            showTodayButton: true,
            dateFormat: 'yyyy-MM-dd',
            closeOnSelect: false
        };
        ionicDatePickerProvider.configDatePicker(datePickerObj);
    }])
    .controller('fillCauseController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup','$ionicActionSheet','ionicDatePicker',

        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup,$ionicActionSheet,ionicDatePicker) {
        var chidaoNOTE="事由:" ;
        $scope.$on('$ionicView.afterEnter', function () {
                //获取当前月份
                getNowDate();
            });
            var date = new Date();
            var number=1;
            //获取系统前一周的时间
            var oneweekdate = new Date(date-7*24*3600*1000);
            var y = oneweekdate.getFullYear();
            var m = oneweekdate.getMonth()+1;
            var d = oneweekdate.getDate();
            $scope.fromDate = y+'-'+m+'-'+d;
            function getNowDate() {
                $scope.now = $filter("date")(date, "yyyy-MM-dd");
                lateAndEarlyList();
            }
            //获取日历插件
            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    $scope.now = $filter("date")(val, "yyyy-MM-dd");
                    if($scope.tabType=='lateAndEarly'){
                        lateAndEarlyList();
                    }else if($scope.tabType=='unClock'){
                        unClockList();
                    }
                },
                from: $scope.fromDate,
                to: new Date(),
                inputDate: new Date(),
                mondayFirst: false,
                closeOnSelect: false,
                templateType: 'popup'
            };
            $scope.openDatePicker = function () {
                ipObj1.inputDate = new Date($scope.now);
                ionicDatePicker.openDatePicker(ipObj1);
            };
            //隐藏填写事由
            $scope.fillCause = true;
            $scope.blackShow = true;

            //点击向前一个月
            $scope.getPreMonth = function (date) {
                console.log("date==" + date);
                var arr = date.split('-');
                var year = arr[0]; //获取当前日期的年份
                var month = arr[1]; //获取当前日期的月份
                var year2 = year;
                var month2 = parseInt(month) - 1;
                if (month2 == 0) {
                    year2 = parseInt(year2) - 1;
                    month2 = 12;
                }
                if (month2 < 10) {
                    month2 = '0' + month2;
                }
                var t2 = year2 + '-' + month2;
                $scope.now = t2;
            }
            //点击向后一个月
            $scope.getNextMonth = function (date) {
                console.log("date==" + date);
                var arr = date.split('-');
                var year = arr[0]; //获取当前日期的年份
                var month = arr[1]; //获取当前日期的月份
                var year2 = year;
                var month2 = parseInt(month) + 1;
                if (month2 == 13) {
                    year2 = parseInt(year2) + 1;
                    month2 = 1;
                }
                if (month2 < 10) {
                    month2 = '0' + month2;
                }

                var t2 = year2 + '-' + month2;
                $scope.now = t2;
            }
            //点击异常考勤查看事由
            $scope.tofillCause = function (list, index) {
                console.log(list,index)
                 chidaoNOTE=list[index].NOTE;
                weiCONFIRM_DATE=list[index].CONFIRM_DATE;
                console.log(weiCONFIRM_DATE);
                $scope.node =chidaoNOTE;
                if(weiCONFIRM_DATE == null || typeof weiCONFIRM_DATE == "undefined" ||
                    weiCONFIRM_DATE == ""){
                    //缺勤事由点击事件
                    $scope.data = new Object();
                    // 自定义弹窗
                    var myPopup = $ionicPopup.show({
                        template: '<textarea ng-style="syWidth" ng-model="node" readonly></textarea>',
                        title: '事由确认',
                        scope: $scope,
                        buttons: [
                            {
                                text: '取消',
                                type: 'button-cancel'
                            },
                            {
                                text: '<b>确认审核</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if (!$scope.node) {
                                        // 不允许用户关闭，除非输入数据
                                        e.preventDefault();
                                    } else {
                                        submitNote(list, index);
                                    }
                                }
                            },
                        ]
                    });
                    myPopup.then(function (res) {
                        console.log('Tapped!', res);
                    });

                }else{
                    return false;
                }

            };

            //缺勤事由编辑框样式
            $scope.syWidth = {
                "height": '100px',
                "border": '1px solid #f4f4f4',
                "margin": '0 auto',
            }
            //点击取消
            $scope.toFillCancel = function () {
                $scope.fillCause = true;
                $scope.blackShow = true;
            }

            //切换标签
            $scope.tabType = "lateAndEarly";
            $scope.changeTabType=function(tabType){
                console.log(number);
                if(number==1){

                }else{
                    $scope.tabType = tabType;
                    if(tabType=='lateAndEarly'){
                        lateAndEarlyList();
                    }else if(tabType=='unClock'){
                        unClockList();
                    }
                }
                number=2;
            }
            //获取迟到早退信息
            function lateAndEarlyList() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=lateAndEarlyReason&QUERY_DATE=' + $scope.now)
                    .then(function (res) {
                        $scope.lateAndEarlyList = new Array();
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.lateAndEarlyList = res.data.tList;
                        } else if ($scope.tabType == "lateAndEarly") {
                            showAlert.showMsg(res.data);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //未打卡数据
            function unClockList(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=unClockReason&QUERY_DATE=' + $scope.now)
                    .then(function (res) {
                        $scope.unClockList = new Array();
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            console.log(res.data.wList)
                            $scope.unClockList = res.data.wList;
                        } else if ($scope.tabType == "unClock") {
                            showAlert.showMsg(res.data);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //确认事由
            function submitNote(list, index) {
                console.log(list,index,$scope.now);
                loadingAnimation.showLoading('数据保存中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=Confirmation', {
                    "TRANSACTION_ID": list[index].TRANSACTION_ID || "",
                    "PERSON_ID": list[index].PERSON_ID,
                    "QUERY_DATE": $scope.now
                }).then(function (res) {
                    loadingAnimation.hideLoading();
                    if (res.data.code == '0') {
                        if($scope.tabType=='lateAndEarly'){
                            lateAndEarlyList();
                        }else if($scope.tabType=='unClock'){
                            unClockList();
                        }
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
