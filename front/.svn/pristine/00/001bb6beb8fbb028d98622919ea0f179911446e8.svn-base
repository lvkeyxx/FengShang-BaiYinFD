angular.module('BaiYin.pdMounth', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('power/pdMounth', {
            url: '/power/pdMounth',
            controller: 'pdMounthController',
            templateUrl: 'power/pdMounth/pdMounth.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('pdMounthController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker) {
            $scope.$on('$ionicView.afterEnter', function () {
                drawBarGraph();
            });

            //画柱状图
            function drawBarGraph() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.get('ServiceName=TargetService&TransName=getPdMounth')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        console.log("res==" + JSON.stringify(res.data));
                        $scope.monthList = res.data;
                        $scope.monthDate =[];
                        $scope.mouthVal = [];
                        var labelTop = {
                            normal: {
                                color: '#ff9900',
                                label: {
                                    position: 'center',
                                    textStyle: {
                                        baseline: 'bottom'
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            }
                        };
                        for(var i=0 ;i<$scope.monthList.length;i++){
                            $scope.monthDate.push($scope.monthList[i].YEAR_MONTH);
                            $scope.mouthVal.push({
                                    value: $scope.monthList[i].MONTH_ELE_AMOUNT,
                                    itemStyle: labelTop});
                        }
                        var option = {
                            title: {
                                text: $scope.monthList[0].YEAR_MONTH + '~' + $scope.monthList[$scope.monthList.length-1].YEAR_MONTH,
                                x: 'center'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            toolbox: {
                                show: true,
                            },
                            grid: {
                                left: '15%',
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    data: $scope.monthDate
                                }
                            ],
                            yAxis: [
                                {
                                    name: '(万KW·h)',
                                    type: 'value'
                                },
                            ],
                            dataZoom: [{
                                type: 'inside',
                                start:50,
                                end: 100,
                                zoomLock:true,
                            }],
                            series: [
                                {
                                    name: '电量',
                                    type: 'bar',
                                    data: $scope.mouthVal,
                                }
                            ]
                        };
                        var myChart = echarts.init(document.getElementById('mainMounth'), 'macarons');
                        myChart.setOption(option);
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }

        }
    ])

