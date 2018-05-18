angular.module('BaiYin.attence.myAttence', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('attence/myAttence', {
            url: '/attence/myAttence',
            controller: 'myAttenceController',
            templateUrl: 'attence/myAttence/myAttence.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('myAttenceController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup',

        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup) {

            var u = navigator.userAgent, app = navigator.appVersion;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
                $('textarea').focus(function () {
                    alert("textarea输入");
                    $(".popup").css("top", "10px");
                });
            }

            $scope.$on('$ionicView.enter', function () {
                //获取当前月份
                getNowDate();
            });
            var date = new Date();

            function getNowDate() {
                //禁止点击当前月的后一个月
                $(".rightSelect").attr("disabled", true);
                $scope.now = $filter("date")(date, "yyyy-MM");
                $scope.newDate = $filter("date")(date, "yyyy-MM");
                attenceList($scope.now);
            }

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
                attenceList(t2);
                //点击当前月的后一个月
                $(".rightSelect").attr("disabled", false);
            }
            //点击向后一个月
            $scope.getNextMonth = function (date) {
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
                    $scope.now = t2;
                    attenceList(t2);
                }
                else {
                    $scope.now = t2;
                    attenceList(t2);
                    $(".rightSelect").attr("disabled", false);
                }

            }

            //获取考勤信息
            function attenceList(mounth) {
                console.log("mounth==" + mounth);
                $scope.attenList = [];
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=myAttendence&QUERY_MONTH=' + mounth)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.attenceList = new Array();
                            res.data.dList.forEach(function (v, i) {
                                var date = [v.year, v.month, v.date].join("-");
                                $scope.attenceList.push({
                                    dates: date,
                                    year: v.year,
                                    month: v.month,
                                    date: v.date,
                                    week: v.week,
                                    list: res.data.dvalue[date].map(function (v, i) {
                                        if (v.actualStartTime == null) {
                                            v.actualStartTime = ''
                                        } else {
                                            v.actualStartTime = v.actualStartTime.substr(11, 5)
                                        }
                                        if (v.actualEndTime == null) {
                                            v.actualEndTime = ''
                                        } else {
                                            v.actualEndTime = v.actualEndTime.substr(11, 5)
                                        }
                                        return v;
                                    })
                                });
                            });
                            // $scope.attencedateList =res.data.dList;

                            console.log($scope.attenceList)
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.textareaFoucs = function () {
                var userAgent = navigator.userAgent;
                var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; //android终端
                var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是iOS
                if (isIOS) {
                    $(".popup-container").css("top", "-300px")

                }
            }

            //点击异常考勤编辑事由
            $scope.to_edit = function (obj) {

                console.log("obj==" + JSON.stringify(obj));
                if (obj.checkInState == "正常" && obj.checkOutState == "正常") {
                    return false;
                } else {

                    if (obj.confirmDate == null || typeof obj.confirmDate == "undefined" ||
                        obj.confirmDate == "") {
                        var weidakazao = obj.actualStartTime;
                        var weidakawan = obj.actualEndTime;
                        console.log('====早上打卡没?' + weidakazao + '====晚上打卡没?' + weidakawan);
                        console.log(token.UserID);
                        var months = obj.month;
                        var dates = obj.date;
                        if (months < 10) {
                            months = '0' + months;
                        }
                        if (dates < 10) {
                            dates = '0' + dates;
                        }
                        var QUERY_DATE = obj.year + '-' + months + '-' + dates;
                        var nowmonth = date.getMonth() + 1;
                        var nowdata = date.getDate();
                        if (nowmonth < 10) {
                            nowmonth = '0' + nowmonth;
                        }
                        if (nowdata < 10) {
                            nowdata = '0' + nowdata;
                        }
                        var s2 = date.getFullYear() + "-" + nowmonth + "-" + nowdata;
                        console.log(s2);
                        var d1 = new Date(QUERY_DATE.replace(/\-/g, "\/"));
                        var d2 = new Date(s2.replace(/\-/g, "\/"));
                        if (QUERY_DATE > s2) {
                            showAlert.showMsg('', '', '还未到考勤时间!')
                            return false;
                        }
                        var PERSON_ID = obj.personalId;
                        if (!obj.personalId) {
                            PERSON_ID = token.UserID;
                        }
                        var TRANSACTION_ID = obj.transactionId;
                        if (!TRANSACTION_ID) {
                            TRANSACTION_ID = '';
                        }
                        console.log(QUERY_DATE);
                        var nownote = obj.note;
                        $scope.placeholder = nownote;
                        $scope.data = new Object();
                        // 自定义弹窗

                        var myPopup = $ionicPopup.show({
                            template: '<textarea ng-style="syWidth" id="textID"  ng-model="data.node" placeholder="{{placeholder}}" ng-focus="textareaFoucs()"></textarea>',
                            title: '填写事由',
                            scope: $scope,
                            buttons: [
                                {
                                    text: '取消',
                                    type: 'button-cancel'
                                },
                                {
                                    text: '<b>确认</b>',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        console.log($scope.data.node);
                                        if (!$scope.data.node) {

                                            // 不允许用户关闭，除非输入数据

                                            e.preventDefault();
                                        } else {
                                            if (weidakazao == null && weidakawan == null || weidakazao == '' && weidakawan == '' || weidakazao == '' && weidakawan == null || weidakazao == null && weidakawan == '') {
                                                submitWNote(QUERY_DATE, PERSON_ID, $scope.data.node, TRANSACTION_ID);
                                            } else {
                                                console.log('======提交数据' + QUERY_DATE + '====' + PERSON_ID + '====' + $scope.data.node + '===' + TRANSACTION_ID);
                                                submitNote(QUERY_DATE, PERSON_ID, $scope.data.node, TRANSACTION_ID);
                                            }

                                        }
                                    }
                                },
                            ]
                        });
                        myPopup.then(function (res) {
                            console.log('Tapped!', res);
                        });

                    } else {
                        return false;
                    }

                }

            };

            //提交事由
            function submitWNote(QUERY_DATE, PERSON_ID, note, TRANSACTION_ID) {
                loadingAnimation.showLoading('数据保存中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=wClockReason', {
                    "TRANSACTION_ID": TRANSACTION_ID,
                    "PERSON_ID": PERSON_ID,
                    "NOTE": note,
                    "QUERY_DATE": QUERY_DATE
                }).then(function (res) {
                    loadingAnimation.hideLoading();
                    if (res.data.code == '0') {
                        attenceList($scope.now);

                    } else {
                        showAlert.showMsg(res.data);
                    }
                }, function (error) {
                    loadingAnimation.hideLoading();
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });
            }

            //提交事由
            function submitNote(QUERY_DATE, PERSON_ID, note, TRANSACTION_ID) {
                loadingAnimation.showLoading('数据保存中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=reason', {
                    "TRANSACTION_ID": TRANSACTION_ID,
                    "PERSON_ID": PERSON_ID,
                    "NOTE": note,
                    "QUERY_DATE": QUERY_DATE
                }).then(function (res) {
                    loadingAnimation.hideLoading();
                    if (res.data.code == '0') {
                        attenceList($scope.now);

                    } else {
                        showAlert.showMsg(res.data);
                    }
                }, function (error) {
                    loadingAnimation.hideLoading();
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });
            }

            //获取打卡位置
            $scope.toPosition = function (obj) {
                console.log("obj==" + JSON.stringify(obj));
                $scope.data = {}
                // 自定义弹窗
                if (obj.checkInAddr != null && obj.checkOutAddr != null) {
                    var myPopup = $ionicPopup.show({
                        template: '<div class="dkposition"><ul><li ng-style="myPopupLi">上班打卡位置：' + obj.checkInAddr + '</li>' +
                        '<li ng-style="myPopuplastLi">下班打卡位置：' + obj.checkOutAddr + '</li></ul></div>',
                        title: '打卡位置',
                        scope: $scope,
                    });
                    myPopup.then(function (res) {
                        console.log('Tapped!', res);
                    });
                    $timeout(function () {
                        myPopup.close(); // 2秒后关闭弹窗
                    }, 2000);
                    $scope.myPopupLi = {
                        "line-height": "35px",
                        "font-size": "12px",
                        "text-align": "center",
                        "border-bottom": "1px dotted #f4f4f4",
                    }
                    $scope.myPopuplastLi = {
                        "line-height": "35px",
                        "font-size": "12px",
                        "text-align": "center",
                    }
                }
            };


        }

    ])
