angular.module('BaiYin.KPI', [
    'BaiYin.KPI.mock',
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('KPI', {
            url: '/KPI',
            controller: 'KPIController',
            templateUrl: 'KPI/KPI.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('KPIController', ['$scope', '$ionicActionSheet', 'loadingAnimation', 'showAlert', 'pageInitService', '$http', '$state',
        function ($scope, $ionicActionSheet, loadingAnimation, showAlert, pageInitService, $http, $state) {

            $scope.$on('$ionicView.afterEnter', function () {
                initLoad();
            });
            var dataText;

            //初始化指标
            var buttons = [];
            var commitDate = '';
            function initLoad() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=listOpeProgramIndexRepCompany&REPORT_ID='+commitDate)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        initChartList();
                        if (res.code == '0') {
                            $scope.dateList = res.data.dList;
                            $scope.daylist = res.data.dayList;
                            $scope.allm = res.data.allm;
                            $scope.dateStr = res.data.dateStr;
                            buttons = [];
                            for (var i = 0; i < $scope.dateList.length; i++) {
                                var dtext = {};
                                dtext.text = $scope.dateList[i];
                                buttons.push(dtext);
                            }

                        } else {
                            showAlert.showMsg(res.msg);

                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            /**
             * 初始化图数据，此时不需要加载提示
             */
            function initChartList() {
                $http.post('ServiceName=TargetService&TransName=listOpeProgramIndexRepCompanyChart&REPORT_ID='+commitDate)
                    .then(function (res) {
                        if (res.code == '0') {
                            draw(res.data.chartList);
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }


            //点击日期选择
            $scope.openPopover = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: buttons,
                    /*titleText: '选择日期',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitDate = buttons[index].text;
                        initLoad();
                        return true;
                    }
                });
            };
            //点击返回
            $scope.goBack = function () {
                $state.go('tabs/homePage');
            };

            /**
             * 绘制图
             * @param dayPower
             */
            function draw(dayPower) {
                var option = {
                    title: {
                        subtext: '万KW·h'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var date = new Date(params.value[0]);
                            data = date.getFullYear() + '-'
                                + (date.getMonth() + 1) + '-'
                                + date.getDate();
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
                        data: ['实际']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: [
                        {
                            type: 'time',
                            splitNumber: 10,
                            axisLabel: {
                                formatter: function (params) {
                                    var date = new Date(params);
                                    var data = date.getDate();
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
                            name: '实际',
                            type: 'line',
                            smooth: false,
                            /*symbol: 'none',*/
                            showAllSymbol: true,
                            /*symbolSize: function (value) {
                                return Math.round(value[2] / 10) + 2;
                            },*/
                            data: (function () {
                                var d = [];
                                for (var v in dayPower) {
                                    d.push([
                                        new Date(dayPower[v].REPORT_ID),
                                        dayPower[v].DAY_ELE_AMOUNT
                                    ]);
                                }
                                return d;
                            })()
                        }
                    ]
                };
                // console.log("$scope.id=="+$scope.id);
                var myChart = echarts.init(document.getElementById('main1'), 'macarons');
                myChart.setOption(option);
            }

        }

    ]).directive('line1', function () {
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
