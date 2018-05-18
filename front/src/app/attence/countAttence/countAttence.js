angular.module('BaiYin.attence.countAttence', [
    'ionic',
    'ionic-datepicker',
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence', {
            url: '/attence/countAttence',
            controller: 'countAttenceController',
            templateUrl: 'attence/countAttence/countAttence.tpl.html',
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
    .controller('countAttenceController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicActionSheet', 'ionicDatePicker',

        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicActionSheet, ionicDatePicker) {
            var date = new Date();
            console.log(date);
            //当前部门
            $scope.deptName = token.DeptName;
            $scope.deptNo = token.DeptNo;
            //部门变量
            var glassName = token.DeptName;
            var glassMName = token.DeptName;
            var glassMCode = '';
            var glassCode = '';
            var glassArray;
            var glassArraym;
            glassCode = $scope.deptNo;
            glassMCode = $scope.deptNo;
            $scope.num=0;
            $scope.$on('$ionicView.afterEnter', function () {
                //当前部门
                $scope.num++;
                if($scope.num==1){
                    $scope.deptName = token.DeptName;
                    $("#countgalssId").val(token.DeptName);
                }else{
                    // $scope.deptName = glassName;
                    $("#countgalssId").val(glassName);
                }

                $scope.now = $filter("date")(date, "yyyy-MM-dd");
                countByDay($scope.now, glassCode);
            });
            //点击日统计数据
            $scope.toCountDay = function () {
                $ionicTabsDelegate.select(0);
                $scope.now = $filter("date")(date, "yyyy-MM-dd");
                countByDay($scope.now, glassCode);
            }
            //点击月统计数据
            $scope.toCountMounth = function () {
                $ionicTabsDelegate.select(1);
                console.log("月当前部门==" + token.DeptName);
                //$("#glassMounthId").val(token.DeptName);
                //点击当前月的后一个月
                $(".rightSelect").attr("disabled", true);
                //获取部门
                $scope.nowMounth = $filter("date")(date, "yyyy-MM");
                $scope.newDate = $filter("date")(date, "yyyy-MM");
                countnMounth($scope.nowMounth, glassMCode);
            }

            //点击向前一个月
            $scope.getPreMonth = function (date) {
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
                $scope.nowMounth = t2;
                countnMounth(t2, glassMCode);
                //点击当前月的后一个月
                $(".rightSelect").attr("disabled", false);
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
                if ($scope.newDate <= t2) {
                    $(".rightSelect").attr("disabled", true);
                    $scope.nowMounth = t2;
                    countnMounth(t2, glassMCode);
                }
                else {
                    $scope.nowMounth = t2;
                    countnMounth(t2, glassMCode);
                    $(".rightSelect").attr("disabled", false);
                }
            }
            //获取日历插件
            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    $scope.now = $filter("date")(val, "yyyy-MM-dd");
                    countByDay($scope.now, glassCode);
                },
                from: new Date(2012, 1, 1),
                to: new Date(),
                inputDate: new Date(),
                mondayFirst: false,
                closeOnSelect: false,
                templateType: 'popup'
            };
            $scope.openDatePicker = function () {
                ionicDatePicker.openDatePicker(ipObj1);
            };

            //获取日统计信息
            function countByDay(day, dept) {
                var parmas = {
                    QUERY_DATE: day,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=dayStatistics', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.countDayList = res.data;
                            $scope.wdkNUM = $scope.countDayList.unclockPerson;
                            $scope.dkNUM = $scope.countDayList.clockPerson;
                            $scope.allNUM = $scope.countDayList.allPerson;
                            orgList();
                            draw($scope, $scope.wdkNUM, $scope.dkNUM, $scope.allNUM);
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            //获取月统计信息
            function countnMounth(mounth, dept) {
                var parmas = {
                    QUERY_MONTH: mounth,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=monthStatistics', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.personList= res.data.tList;
                            orgList();
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            //获取部门信息
            function orgList() {
                glassArray = [];
                glassArraym = [];
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ClockService&TransName=deptList')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.orgList = res.data.tList;
                            for (var i = 0; i < $scope.orgList.length; i++) {
                                var olist = {};
                                olist.orgCode = $scope.orgList[i].ORG_CODE;
                                olist.text = $scope.orgList[i].ORG_NAME;
                                glassArray.push(olist);
                                glassArraym.push(olist);
                            }
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            //月统计选择部门
            $scope.toSelectGlass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArraym,
                    cancel: function () {

                    },
                    buttonClicked: function (index) {
                        glassMName = glassArraym[index].text;
                        glassMCode = glassArraym[index].orgCode;
                        $("#glassMounthId").val(glassMName);
                        countnMounth($scope.nowMounth, glassMCode);
                        return true;
                    }
                });
            };
            //日统计选择部门
            $scope.selectGlass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArray,
                    cancel: function () {

                    },
                    buttonClicked: function (index) {
                        glassName = glassArray[index].text;
                        glassCode = glassArray[index].orgCode;
                        $("#countgalssId").val(glassName);
                        countByDay($scope.now, glassCode);
                        return true;
                    }
                });
            };

            //画饼图
            function draw($scope, wdkNum, dkNum, allNum) {
                var a = [];
                var radius = [55, 75];
                var labelTop = {
                    normal: {
                        color: '#ccc',
                        label: {
                            show: true,
                            position: 'center',
                            formatter: '打卡人数/总数',
                            textStyle: {
                                baseline: 'bottom'
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    }
                };
                var labelFromatter = {
                    normal: {
                        label: {
                            formatter: function (params) {
                                return dkNum + '/' + allNum;
                            },
                            textStyle: {
                                baseline: 'top'
                            }
                        }
                    },
                }
                var labelBottom = {
                    normal: {
                        color: '#3492e9',
                        label: {
                            show: true,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        color: 'rgba(0,0,0,0)'
                    }
                };
                var option = {
                    title: {
                        /*text : '考勤统计',*///标题说明
                        x: 'center'//居中
                    },
                    // 提示框，鼠标悬浮交互时的信息提示
                    tooltip: {
                        show: true,
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    // 图例
                    legend: {
                        x: 'center',
                        y: '10',
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: radius,
                            center: ['50%', '43%'],
                            label: {
                                normal: {
                                    position: 'inner' //内置文本标签
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {name: '打卡人数', value: dkNum, itemStyle: labelBottom},
                                {name: '未打卡', value: wdkNum, itemStyle: labelTop}
                            ],
                            itemStyle: labelFromatter,
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('main'), 'macarons');
                myChart.setOption(option);
            }

            //点击跳转迟到详情
            $scope.tocdDetail = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $("#countDayId").text();
                    $scope.partName = $("#countgalssId").val();
                    $scope.partCode = glassCode;
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        partName: $scope.partName,
                        partCode: $scope.partCode,
                    }
                    $state.go('attence/attenceCdDetail', item);
                }
            }
            //点击跳转早退详情
            $scope.toZtDetail = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $("#countDayId").text();
                    $scope.partName = $("#countgalssId").val();
                    $scope.partCode = glassCode;
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        partName: $scope.partName,
                        partCode: $scope.partCode,
                    }
                    $state.go('attence/attenceZtDetail', item);
                }
            }
            //点击正常打卡详情
            $scope.tozcDetail = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $("#countDayId").text();
                    $scope.partName = $("#countgalssId").val();
                    $scope.partCode = glassCode;
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        partName: $scope.partName,
                        partCode: $scope.partCode,
                    }
                    $state.go('attence/attenZcDetail', item);
                }
            }

            //点击跳打卡详情页面
            $scope.towdDetail = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $("#countDayId").text();
                    $scope.partName = $("#countgalssId").val();
                    $scope.partCode = glassCode;
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        partName: $scope.partName,
                        partCode: $scope.partCode,
                    }
                    $state.go('attence/attenceWdDetail', item);
                }

            }
            //点击跳转到日未打卡列表
            $scope.towdkList = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $scope.nowMounth;
                    $scope.partCode = glassCode;
                    $scope.partName = $("#glassMounthId").val();
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        personNum: num,
                        partCode: $scope.partCode,
                        partName: $scope.partName,
                    }
                    $state.go('attence/countAttence/wdkList', item);
                }

            }
            //点击跳转到日迟到列表
            $scope.tocdList = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $scope.nowMounth;
                    $scope.partCode = glassCode;
                    $scope.partName = $("#glassMounthId").val();
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        personNum: num,
                        partCode: $scope.partCode,
                        partName: $scope.partName,
                    }
                    $state.go('attence/countAttence/cdList', item);
                }
            }
            //点击跳转日早退列表
            $scope.toztList = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $scope.nowMounth;
                    $scope.partCode = glassCode;
                    $scope.partName = $("#glassMounthId").val();
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        personNum: num,
                        partCode: $scope.partCode,
                        partName: $scope.partName,
                    }
                    $state.go('attence/countAttence/ztList', item);
                }
            }

            //点击跳转个人月打卡详情
            $scope.toeveryDetail=function (obj) {
                console.log(obj);
                $scope.dateTimeShow = $scope.nowMounth;
                $scope.PERSON_ID = obj.personId;
                $scope.personName = obj.personName;
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
    .directive('pie', function () {
        return {
            scope: {
                id: "@",
                legend: "=",
                //item: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:200px; width:200px"></div>',
            replace: true,
            link: function ($scope, element, attrs, controller) {
            }
        };
    });
