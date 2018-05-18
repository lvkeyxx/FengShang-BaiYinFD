var app = angular.module('BaiYin.load', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('load', {
            url: '/load',
            controller: 'loadController',
            templateUrl: 'load/load.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    //echarts directive

    .controller('loadController', ['$timeout','$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval','$ionicTabsDelegate',
        function ($timeout,$scope, showAlert, loadingAnimation, $http, $state, $interval,$ionicTabsDelegate) {
        var type={type:'T',name:'全厂'};
        var nrefresh=true;
        //点击近一小时数据
            $scope.$on('$ionicView.afterEnter', function () {
                nrefresh=true;
                //处理刷新
                if(localStorage.getItem("backToLoad")){
                    nrefresh=false;
                }
                localStorage.removeItem("backToLoad");
                if(nrefresh){
                    $ionicTabsDelegate.select(0);
                    initLoad();
                    startInterval();
                    type={type:'T',name:'全厂'};
                }
            });
            $scope.$on('$ionicView.leave',function () {
                stopInterval();
            });
            $scope.toNearHour = function () {
                localStorage.setItem("backToLoad","1");
                $state.go('load/nearlyHour',{'type':type});
            };
            //历史日负荷
            $scope.goHistoryInfo = function () {
                localStorage.setItem("backToLoad","1");
                $state.go('load/historyInfo',{'type':type});
            };
            //全场请求数据
            $scope.toQcData = function () {
                $ionicTabsDelegate.select(0);
                initLoad();
                startInterval();
                type={type:'T',name:'全厂'};
            }
            //甘肃数据请求
            $scope.toGsData = function (){
                type={type:'GS',name:'甘'};
                $ionicTabsDelegate.select(1);
                stopInterval();
                GSData();
            }
            //青海数据请求
            $scope.toQhData = function () {
                type={type:'QH',name:'青'};
                $ionicTabsDelegate.select(2);
                stopInterval();
                $scope.proviceChart($scope,'QH');
                // QHData();
            }
            //宁夏数据请求
            $scope.toNxData = function () {
                type={type:'NX',name:'宁'};
                $ionicTabsDelegate.select(3);
                stopInterval();
                // NXData();
                $scope.proviceChart($scope,'NX');
            }
            //新疆数据请求
            $scope.toXjData = function () {
                type={type:'XJ',name:'新'};
                $ionicTabsDelegate.select(4);
                stopInterval();
                XJData();
            }
            /**
             * 初始化负荷
             */
            function initLoad() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=totalLoad')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        initQc();
                        if (res.code == '0') {
                            $scope.fcLoad = res.data.load;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            /**
             * 开启定时器,五分钟执行一次
             */
            function startInterval() {
                $scope.timer = $interval(function(){
                    initLoad();
                },3000*60);
            }
            //关闭定时器
            function stopInterval(){
                $interval.cancel($scope.timer);
            }

            /**
             * 初始化全厂负荷
             */
            function initQc() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=getTargetIndexLoad')
                    .then(function (res) {
                        $scope.initChart($scope);
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.totalLoad = res.data;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            /**
             * 获取甘肃数据
             * @constructor
             */
            function GSData(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=gsLoad')
                    .then(function (res) {
                        $scope.proviceChart($scope,'GS');
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.gsLoad = res.data.gsLoad;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /**
             * 获取青海数据
             * @constructor
             */
            function QHData(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=qhLoad')
                    .then(function (res) {
                        $scope.proviceChart($scope,'QH');
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.qhLoad = res.data.qhLoad;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /**
             * 获取宁夏数据
             * @constructor
             */
            function NXData(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=nxLoad')
                    .then(function (res) {
                        $scope.proviceChart($scope,'NX');
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.nxLoad = res.data.nxLoad;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /**
             * 获取新疆数据
             * @constructor
             */
            function XJData(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=xjLoad')
                    .then(function (res) {
                        $scope.proviceChart($scope,'XJ');
                        loadingAnimation.hideLoading();
                        console.log(res);
                        if (res.code == '0') {
                            $scope.xjLoad = res.data.xjLoad;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /**
             * 实现柱状图
             */
            $scope.initChart = function ($scope) {
                console.log("enter into ===");
                // $scope.legend = ["昨日", "今日"];
                // $scope.item = ["0","2","4","6","8","10","12","14","16","18","20","22"];
                /*$scope.data = [
                    [62.675,89.943,89.707,102.094,118.099,120.428],
                    [143.07899,156.67999,139.283,118.086,96.066,80.908]
                ];*/

                $http.get('ServiceName=TargetService&TransName=totalHoursLoad')
                    .then(function (res) {
                        if (res.code == '0') {
                            $("#tdes").text(res.data.dateStr);
                            draw($scope, res.data.yestLoad, res.data.todayLoad, res.data.dateStr,'');
                            // $scope.item = ["0","2","4","6","8","10"];
                            /* $scope.data = [
                                 [62.675,89.943,89.707,102.094,118.099,120.428],
                                 [143.07899,156.67999,139.283,118.086,96.066,80.908]
                             ];*/
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                        //进行line绘制

                    });
            };
            /**
             * 实现各个省的走势图
             */
            $scope.proviceChart = function ($scope,type) {
                console.log("enter into ===chartGqnxLoad");
                // $scope.legend = ["昨日", "今日"];
                // $scope.item = ["0","2","4","6","8","10","12","14","16","18","20","22"];
                /*$scope.data = [
                    [62.675,89.943,89.707,102.094,118.099,120.428],
                    [143.07899,156.67999,139.283,118.086,96.066,80.908]
                ];*/

                $http.get('ServiceName=TargetService&TransName=chartGqnxLoad')
                    .then(function (res) {
                        if (res.code == '0') {
                            $scope.timeDes=res.data.dateStr;
                            var yestoday = [];
                            for (var v in res.data.yestLoad) {
                                yestoday.push(res.data.yestLoad[v].TOTAL_POWER);
                            }
                            var today = [];
                            for (var v in res.data.todayLoad) {
                                today.push(res.data.todayLoad[v].TOTAL_POWER);
                            }
                            draw($scope, res.data.yestLoad, res.data.todayLoad, res.data.dateStr,type);
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                        //进行line绘制

                    });
            };
            /**
             *
             * @param $scope
             * @param yestoday
             * @param today
             * @param dateStr
             */
            function draw($scope, yestoday, today, dateStr,type) {
                dateStr=dateStr.replace(/\-/g,'/');

                console.log("dateStr=="+new Date(dateStr+" 00:00"));
                var option = {
                    title: {
                        subtext: 'MW'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var date = new Date(params.value[0]);
                            data = date.getHours() + ':'
                                + date.getMinutes();
                            return data + '<br/>'
                                + params.value[1];
                        }
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    dataZoom: {
                        show: false,
                        start: 0
                    },
                    legend: {
                        data: ['昨天', '今天']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: [
                        {
                            type: 'time',
                            splitNumber: 12,
                            axisLabel: {
                                formatter: function (params) {
                                    var date = new Date(params);
                                    var data = date.getHours();
                                    if (data == '23') {
                                        data = '24';
                                    }
                                    return data;
                                }
                            }

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '昨天',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            symbolSize: function (value) {
                                return Math.round(value[2] / 10) + 2;
                            },
                            data: (function () {
                                var d = [];
                                for (var v in yestoday) {
                                    d.push([
                                        new Date(dateStr + " " + yestoday[v].OCCUR_TIME),
                                        type==''||type==undefined?
                                            (((yestoday[v].TOTAL_POWER - 0) < 0 ? 0 : ((yestoday[v].TOTAL_POWER - 0) > 999) ? 999 : yestoday[v].TOTAL_POWER)):
                                            (((yestoday[v][type+'_POWER'] - 0) < 0 ? 0 : ((yestoday[v][type+'_POWER'] - 0) > 999) ? 999 : yestoday[v][type+'_POWER']))
                                    ]);
                                }
                                return d;
                            })()
                        },
                        {
                            name: '今天',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            symbolSize: function (value) {
                                return Math.round(value[2] / 10) + 2;
                            },
                            data: (function () {
                                var d = [];
                                for (var v in today) {
                                    d.push([
                                        new Date(dateStr + " " + today[v].OCCUR_TIME),
                                        type==''||type==undefined?
                                            (((today[v].TOTAL_POWER - 0) < 0 ? 0 : ((today[v].TOTAL_POWER - 0) > 999) ? 999 : today[v].TOTAL_POWER)):
                                            (((today[v][type+'_POWER'] - 0) < 0 ? 0 : ((today[v][type+'_POWER'] - 0) > 999) ? 999 : today[v][type+'_POWER']))
                                    ]);
                                }
                                return d;
                            })()
                        }
                    ]
                };
                var lineId = 'main';
                if(type!=''&&type!=undefined){
                    lineId=type+'main';
                }
                var myChart = echarts.init(document.getElementById(lineId), 'macarons');
                myChart.setOption(option);
            }
        }

    ])
    .directive('line', function () {
        return {
            scope: {
                id: "@",
                legend: "=",
                item: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:350px;"></div>',
            replace: true,
            link: function ($scope, element, attr, ctr) {
                // $scope.$parent.initChart($scope);
            }
        };
    });