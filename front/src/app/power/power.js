angular.module('BaiYin.power', [
    'ionic',
    'BaiYin.load'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('power', {
        url: '/power',
        controller: 'powerController',
        templateUrl: 'power/power.tpl.html',
        cache: 'true',
        authorizedRuleType: ['1']
    })
}])

.controller('powerController', ['$scope','showAlert' ,'pageInitService', '$http', '$state','$ionicTabsDelegate','$interval','$timeout','loadingAnimation',
        function($scope,showAlert,pageInitService,$http,$state,$ionicTabsDelegate,$interval,$timeout,loadingAnimation) {
            $scope.$on('$ionicView.afterEnter', function() {
                $ionicTabsDelegate.select(0);
                getKPI();
                startInterval('getKPI');
            });
            $scope.$on('$ionicView.leave',function () {
                stopInterval();
            });
            //全场请求数据
            $scope.toQcData = function () {
                stopInterval();
                $ionicTabsDelegate.select(0);
                getKPI();
                startInterval('getKPI');
            }
            //甘肃数据请求
            $scope.toGsData = function (){
                $ionicTabsDelegate.select(1);
                stopInterval();
                selectGsData();
                startInterval('selectGsData');
            }
            //青海数据请求
            $scope.toQhData = function () {
                $ionicTabsDelegate.select(2);
                stopInterval();
                selectQhData();
                startInterval('selectQhData');
            }
            //宁夏数据请求
            $scope.toNxData = function () {
                $ionicTabsDelegate.select(3);
                stopInterval();
                selectNxData();
                startInterval('selectNxData');
            }
            //新疆数据请求
            $scope.toXjData = function () {
                $ionicTabsDelegate.select(4);
                stopInterval();
                selectXjData();
                startInterval('selectXjData');
            }
            //日电量柱状图
            $scope.toDayInfo = function(){
                $state.go('power/pdDay');
            }
            //月电量柱状图
            $scope.toMounthInfo = function(){
                $state.go('power/pdMounth');
            }
            //年电量柱状图
            $scope.toYearInfo = function(){
                $state.go('power/pdYear');
            }
            /**
             * 开启定时器,五分钟执行一次
             */
            function startInterval(funcName) {
                $scope.timer = $interval(function(){
                    if(typeof(eval(funcName)) == "function"){
                        eval(funcName+"();");
                    }
                    else
                    {
                        // 函数不存在
                        stopInterval();
                    }
                },5*60*1000);
               /* $scope.timer = $interval(function(){
                    getKPI();
                },5*60*1000);*/
            }
            //关闭定时器
            function stopInterval(){
                $interval.cancel($scope.timer);
            }

            // 获取集控中心负荷.......
            function getKPI(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.get('ServiceName=TargetService&TransName=getTargetIndex')
                    .then(function(res){
                        loadingAnimation.hideLoading();
                        $scope.companyPower = res.data;
                    },function(error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error,'','网络异常','确认')
                    })
            }
            //获取甘肃子发电厂发电量
            function selectGsData(){
                $("#dateGs").removeClass('dcnone');
                $("#dateGs").addClass('dcactive');
                $("#weekGs").removeClass('dcactive');
                $("#weekGs").addClass('dcnone');
                $http.post('ServiceName=TargetService&TransName=gsDayPower')
                    .then(function (res) {
                        $scope.gsCompanyPower = res.data.gsPower;
                        if (res.code == '0') {
                            // draw(res.data.gsHourPower);
                            drawWeek(res.data.gsDayPower,res.data.dateStr);
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            $scope.toweekGs = function(){
                if($("#weekGs").hasClass('dcactive')){
                    console.log('====我有这个类');
                    return false;
                }else{
                    console.log('====我没有这个类');
                    $("#weekGs").removeClass('dcnone');
                    $("#weekGs").addClass('dcactive');
                    $("#dateGs").removeClass('dcactive');
                    $("#dateGs").addClass('dcnone');
                    $http.post('ServiceName=TargetService&TransName=gsPower')
                        .then(function (res) {
                            $scope.gsCompanyPower = res.data.gsPower;
                            if (res.code == '0') {
                                draw(res.data.gsHourPower);
                            } else {
                                showAlert.showMsg(res.msg);
                            }
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }

            }
            $scope.todateGs = function(){
                if($("#dateGs").hasClass('dcactive')){
                    console.log('====我有这个类');
                    return false;
                }else{
                    console.log('====我没有这个类');
                    $("#dateGs").removeClass('dcnone');
                    $("#dateGs").addClass('dcactive');
                    $("#weekGs").removeClass('dcactive');
                    $("#weekGs").addClass('dcnone');
                    $http.post('ServiceName=TargetService&TransName=gsDayPower')
                        .then(function (res) {
                            $scope.gsCompanyPower = res.data.gsPower;
                            if (res.code == '0') {
                                drawWeek(res.data.gsDayPower);
                            } else {
                                showAlert.showMsg(res.msg);
                            }
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }

            }
            //获取青海子发电厂发电量
            function selectQhData() {
                $("#dateQh").removeClass('dcnone');
                $("#dateQh").addClass('dcactive');
                $("#weekQh").removeClass('dcactive');
                $("#weekQh").addClass('dcnone');
                $http.post('ServiceName=TargetService&TransName=qhDayPower')
                    .then(function (res) {
                        if (res.code == '0') {
                            $scope.qhCompanyPower = res.data.qhPower;
                            // draw2(res.data.qhHourPower);
                            drawQh(res.data.qhDayPower);
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }
            $scope.toweekQh = function(){
                if($("#weekQh").hasClass('dcactive')){
                    console.log('====我有这个类');
                    return false;
                }else{
                    console.log('====我没有这个类');
                    $("#weekQh").removeClass('dcnone');
                    $("#weekQh").addClass('dcactive');
                    $("#dateQh").removeClass('dcactive');
                    $("#dateQh").addClass('dcnone');
                    $http.post('ServiceName=TargetService&TransName=qhPower')
                        .then(function (res) {
                            $scope.gsCompanyPower = res.data.qhPower;
                            if (res.code == '0') {
                                draw2(res.data.qhHourPower);
                            } else {
                                showAlert.showMsg(res.msg);
                            }
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }
            }
            $scope.todateQh = function(){
                if($("#dateQh").hasClass('dcactive')){
                    console.log('====我有这个类');
                    return false;
                }else{
                    console.log('====我没有这个类');
                    $("#dateQh").removeClass('dcnone');
                    $("#dateQh").addClass('dcactive');
                    $("#weekQh").removeClass('dcactive');
                    $("#weekQh").addClass('dcnone');
                    $http.post('ServiceName=TargetService&TransName=qhDayPower')
                        .then(function (res) {
                            $scope.gsCompanyPower = res.data.qhPower;
                            if (res.code == '0') {
                                drawQh(res.data.qhDayPower);
                            } else {
                                showAlert.showMsg(res.msg);
                            }
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }

            }
            //获取宁夏子发电厂发电量
            function selectNxData() {
                $("#dateNx").removeClass('dcnone');
                $("#dateNx").addClass('dcactive');
                $("#weekNx").removeClass('dcactive');
                $("#weekNx").addClass('dcnone');
                $http.get('ServiceName=TargetService&TransName=nxDayPower')
                    .then(function (res) {
                        console.log(res);
                        if (res.code == '0') {
                            $scope.nxCompanyPower = res.data.nxPower;
                            // draw3(res.data.nxDayPower);
                            drawNx(res.data.nxDayPower);
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    },function (error) {
                        showAlert.showMsg(error,'','网络异常','确认');
                    });
            }
            $scope.toweekNx = function(){
                if($("#weekNx").hasClass('dcactive')){
                    console.log('====我有这个类');
                    return false;
                }else{
                    console.log('====我没有这个类');
                    $("#weekNx").removeClass('dcnone');
                    $("#weekNx").addClass('dcactive');
                    $("#dateNx").removeClass('dcactive');
                    $("#dateNx").addClass('dcnone');
                    $http.post('ServiceName=TargetService&TransName=nxPower')
                        .then(function (res) {
                            $scope.gsCompanyPower = res.data.NxPower;
                            if (res.code == '0') {
                                draw3(res.data.nxHourPower);
                            } else {
                                showAlert.showMsg(res.msg);
                            }
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }
            }
            $scope.todateNx = function(){
                if($("#dateNx").hasClass('dcactive')){
                    console.log('====我有这个类');
                    return false;
                }else{
                    console.log('====我没有这个类');
                    $("#dateNx").removeClass('dcnone');
                    $("#dateNx").addClass('dcactive');
                    $("#weekNx").removeClass('dcactive');
                    $("#weekNx").addClass('dcnone');
                    $http.post('ServiceName=TargetService&TransName=nxDayPower')
                        .then(function (res) {
                            $scope.gsCompanyPower = res.data.Nxpower;
                            if (res.code == '0') {
                                drawNx(res.data.nxDayPower);
                            } else {
                                showAlert.showMsg(res.msg);
                            }
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }

            }
            //获取新疆子发电厂发电量
            function selectXjData() {
                $("#dateXj").removeClass('dcnone');
                $("#dateXj").addClass('dcactive');
                $("#weekXj").removeClass('dcactive');
                $("#weekXj").addClass('dcnone');
                $http.get('ServiceName=TargetService&TransName=xjDayPower')
                    .then(function (res) {
                        console.log(res);
                        if (res.code == '0') {
                            $scope.xjCompanyPower = res.data.xjPower;
                            drawXj(res.data.xjDayPower);
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    },function (error) {
                        showAlert.showMsg(error,'','网络异常','确认');
                    });
            }
            $scope.toweekXj = function(){
                if($("#weekXj").hasClass('dcactive')){
                    console.log('====我有这个类');
                    return false;
                }else{
                    console.log('====我没有这个类');
                    $("#weekXj").removeClass('dcnone');
                    $("#weekXj").addClass('dcactive');
                    $("#dateXj").removeClass('dcactive');
                    $("#dateXj").addClass('dcnone');
                    $http.post('ServiceName=TargetService&TransName=xjPower')
                        .then(function (res) {
                            $scope.gsCompanyPower = res.data.gsPower;
                            if (res.code == '0') {
                                draw1(res.data.xjHourPower);
                            } else {
                                showAlert.showMsg(res.msg);
                            }
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }
            }
            $scope.todateXj = function(){
                if($("#dateXj").hasClass('dcactive')){
                    console.log('====我有这个类');
                    return false;
                }else{
                    console.log('====我没有这个类');
                    $("#dateXj").removeClass('dcnone');
                    $("#dateXj").addClass('dcactive');
                    $("#weekXj").removeClass('dcactive');
                    $("#weekXj").addClass('dcnone');
                    $http.post('ServiceName=TargetService&TransName=xjDayPower')
                        .then(function (res) {
                            $scope.gsCompanyPower = res.data.gsPower;
                            if (res.code == '0') {
                                drawXj(res.data.xjDayPower);
                            } else {
                                showAlert.showMsg(res.msg);
                            }
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }

            }

            //甘肃
            function draw(dayPower) {
                $scope.dayGsone=[];
                $scope.dayGstwo=[];
                $scope.dayGsthree=[];
                $scope.dayGsfour=[];
                $scope.dayGstimeone=[];
                // console.log(dayPower);
                for (var v in dayPower) {
                    // console.log(v)
                    if(dayPower[v].CONTRACT=='1101'){
                        $scope.dayGsone.push(dayPower[v].DAY_ELE_AMOUNT)
                        $scope.dayGstimeone.push(dayPower[v].REPORT_ID)
                    }
                    if(dayPower[v].CONTRACT=='1201'){
                        $scope.dayGstwo.push(dayPower[v].DAY_ELE_AMOUNT)
                    }
                    if(dayPower[v].CONTRACT=='1301'){
                        $scope.dayGsthree.push(dayPower[v].DAY_ELE_AMOUNT)

                    }
                    if(dayPower[v].CONTRACT=='1401'){
                        $scope.dayGsfour.push(dayPower[v].DAY_ELE_AMOUNT)

                    }
                }
                drawGsdiagram()

            }
            //甘肃按小时统计
            function drawWeek(dayPower) {
                var powerone=[];
                var powertwo=[];
                var powerthree=[];
                var powerfour=[];
                var powerfive=[];
                var powertime=[];
                for (var v in dayPower) {
                    if(dayPower[v].CONTRACT=='1101'){
                        powerone.push(dayPower[v].REAL_VALUE)
                        console.log(dayPower[v].RECORD_DATATIME.substr(11,5))
                        powertime.push(dayPower[v].RECORD_DATATIME.substr(11,5))
                    }
                    if(dayPower[v].CONTRACT=='1201'){
                        powertwo.push(dayPower[v].REAL_VALUE)
                    }
                    if(dayPower[v].CONTRACT=='1301'){
                        powerthree.push(dayPower[v].REAL_VALUE)
                    }
                    if(dayPower[v].CONTRACT=='1401'){
                        powerfour.push(dayPower[v].REAL_VALUE)
                    }
                }
                var option = {
                    title: {
                        subtext: '万KW·h',
                        top: '3%',
                    },
                    tooltip: {
                        trigger: 'axis'
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
                        data: ['捡财塘','北大桥东风电厂','桥东第二风电场','敦煌光伏']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: {
                        type: 'category',
                        data: powertime
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '捡财塘',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerone
                        },
                        {
                            name: '北大桥东风电厂',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powertwo
                        },
                        {
                            name: '桥东第二风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerthree
                        },
                        {
                            name: '敦煌光伏',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerfour
                        }

                    ]

                };
                // console.log("$scope.id=="+$scope.id);
                var myChart = echarts.init(document.getElementById('gszst'), 'macarons');
                myChart.setOption(option);
            }
            //青海按小时统计
            function drawQh(dayPower) {
                var powerone=[];
                var powertwo=[];
                var powerthree=[];
                var powerfour=[];
                var powerfive=[];
                var powertime=[];
                for (var v in dayPower) {
                    if(dayPower[v].CONTRACT=='1601'){
                        powerone.push(dayPower[v].REAL_VALUE)
                        console.log(dayPower[v].RECORD_DATATIME.substr(11,5))
                        powertime.push(dayPower[v].RECORD_DATATIME.substr(11,5))
                    }
                    if(dayPower[v].CONTRACT=='1701'){
                        powertwo.push(dayPower[v].REAL_VALUE)
                    }
                }
                var option = {
                    title: {
                        subtext: '万KW·h',
                        top: '3%',
                    },
                    tooltip: {
                        trigger: 'axis'
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
                        data: ['格尔木光伏电站','贝壳梁诺木洪风电场']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: {
                        type: 'category',
                        data: powertime
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '格尔木光伏电站',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerone
                        },
                        {
                            name: '贝壳梁诺木洪风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powertwo
                        }

                    ]

                };
                var myChart = echarts.init(document.getElementById('qhzst'), 'macarons');
                myChart.setOption(option);
            }
            /**
             * 作者：
             * 创建时间：2018.04.26
             * 时间：15.54
             * 版本：v1.1.2
             * 描述：绘制甘肃图表
             * 修改时间：
             **/
            function drawGsdiagram() {
                var option = {
                    title: {
                        subtext: '万KW·h',
                        top: '3%',
                    },
                    tooltip: {
                        trigger: 'axis'
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
                        data: ['捡财塘','北大桥东风电厂','桥东第二风电场','敦煌光伏']
                    },
                    grid: {
                        y2:80,
                        top: '20%',
                    },
                    xAxis: {
                        type: 'category',
                        data: $scope.dayGstimeone
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '捡财塘',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:$scope.dayGsone
                        },
                        {
                            name: '北大桥东风电厂',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:$scope.dayGstwo
                        },
                        {
                            name: '桥东第二风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:$scope.dayGsthree
                        },
                        {
                            name: '敦煌光伏',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:$scope.dayGsfour
                        }

                    ]
                };
                $scope.GsChart = echarts.init(document.getElementById('gszst'), 'macarons');
                $scope.GsChart.setOption(option);
            }

            //新疆
            function drawXj(dayPower) {
                var powerone=[];
                var powertwo=[];
                var powerthree=[];
                var powerfour=[];
                var powerfive=[];
                var powertime=[];
                for (var v in dayPower) {
                    if(dayPower[v].CONTRACT=='1801'){
                        powerone.push(dayPower[v].REAL_VALUE)
                        console.log(dayPower[v].RECORD_DATATIME.substr(11,5))
                        powertime.push(dayPower[v].RECORD_DATATIME.substr(11,5))
                    }
                    if(dayPower[v].CONTRACT=='1802'){
                        powertwo.push(dayPower[v].REAL_VALUE)
                    }
                    if(dayPower[v].CONTRACT=='1803'){
                        powerthree.push(dayPower[v].REAL_VALUE)
                    }
                    if(dayPower[v].CONTRACT=='1804'){
                        powerfour.push(dayPower[v].REAL_VALUE)
                    }
                    if(dayPower[v].CONTRACT=='1901'){
                        powerfive.push(dayPower[v].REAL_VALUE)
                    }
                }
                var option = {
                    title: {
                        subtext: '万KW·h',
                        top: '3%',
                    },
                    tooltip: {
                        trigger: 'axis'
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
                        data: ['麻黄沟东风电一场','淖毛湖风电场','景峡风电场','烟墩风电场','小草湖北风电一场']
                    },
                    grid: {
                        y2: 80,
                        top: '20%',
                    },
                    xAxis: {
                        type: 'category',
                        data:powertime
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '麻黄沟东风电一场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerone
                        },
                        {
                            name: '淖毛湖风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powertwo
                        },
                        {
                            name: '景峡风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerthree
                        },
                        {
                            name: '烟墩风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerfour
                        },
                        {
                            name: '小草湖北风电一场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerfive
                        },
                    ]
                };
                var myChart = echarts.init(document.getElementById('xjzst'), 'macarons');
                myChart.setOption(option);
            }
            function draw1(dayPower) {
                var powerone=[];
                var powertwo=[];
                var powerthree=[];
                var powerfour=[];
                var powerfive=[];
                var powertime=[];
                for (var v in dayPower) {
                    if(dayPower[v].CONTRACT=='1801'){
                        powerone.push(dayPower[v].DAY_ELE_AMOUNT)
                        powertime.push(dayPower[v].REPOART_ID)
                    }
                    if(dayPower[v].CONTRACT=='1802'){
                        powertwo.push(dayPower[v].DAY_ELE_AMOUNT)
                    }
                    if(dayPower[v].CONTRACT=='1803'){
                        powerthree.push(dayPower[v].DAY_ELE_AMOUNT)
                    }
                    if(dayPower[v].CONTRACT=='1804'){
                        powerfour.push(dayPower[v].DAY_ELE_AMOUNT)
                    }
                    if(dayPower[v].CONTRACT=='1901'){
                        powerfive.push(dayPower[v].DAY_ELE_AMOUNT)
                    }
                }
                var option = {
                    title: {
                        subtext: '万KW·h',
                        top: '3%',
                    },
                    tooltip: {
                        trigger: 'axis'
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
                        data: ['麻黄沟东风电一场','淖毛湖风电场','景峡风电场','烟墩风电场','小草湖北风电一场']
                    },
                    grid: {
                        y2: 80,
                        top: '20%',
                    },
                    xAxis: {
                        type: 'category',
                        data:powertime
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '麻黄沟东风电一场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerone
                        },
                        {
                            name: '淖毛湖风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powertwo
                        },
                        {
                            name: '景峡风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerthree
                        },
                        {
                            name: '烟墩风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerfour
                        },
                        {
                            name: '小草湖北风电一场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerfive
                        },
                    ]
                };
                var myChart = echarts.init(document.getElementById('xjzst'), 'macarons');
                myChart.setOption(option);
            }
            //青海
            function draw2(dayPower,dateStr) {
                var powerone=[];
                var powertwo=[];
                var powerthree=[];
                var powerfour=[];
                var powertime=[];
                for (var v in dayPower) {
                    if(dayPower[v].CONTRACT=='1601'){
                        powerone.push(dayPower[v].DAY_ELE_AMOUNT)
                        powertime.push(dayPower[v].REPOART_ID)
                    }
                    if(dayPower[v].CONTRACT=='1701'){
                        powertwo.push(dayPower[v].DAY_ELE_AMOUNT)
                    }
                }
                var option = {
                    title: {
                        subtext: '万KW·h'
                    },
                    tooltip: {
                        trigger: 'axis'
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
                        data: ['格尔木光伏电站','贝壳梁诺木洪风电场']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: {
                        type: 'category',
                        data:powertime
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '格尔木光伏电站',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerone
                        },
                        {
                            name: '贝壳梁诺木洪风电场',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powertwo
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('qhzst'), 'macarons');
                myChart.setOption(option);
            }
            //宁夏
            function drawNx(dayPower) {
                var powerone=[];
                var powertwo=[];
                var powerthree=[];
                var powerfour=[];
                var powertime=[];
                for (var v in dayPower) {
                    if(dayPower[v].CONTRACT=='1501'){
                        powerone.push(dayPower[v].REAL_VALUE)
                        powertime.push(dayPower[v].RECORD_DATATIME.substr(11,5))
                    }
                }
                var option = {
                    title: {
                        subtext: '万KW·h'
                    },
                    tooltip: {
                        trigger: 'axis'
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
                        data: ['石嘴山光伏电站']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: {
                        type: 'category',
                        data:powertime
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '石嘴山光伏电站',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerone
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('nxzst'), 'macarons');
                myChart.setOption(option);
            }
            function draw3(dayPower,dateStr) {
                var powerone=[];
                var powertwo=[];
                var powerthree=[];
                var powerfour=[];
                var powertime=[];
                for (var v in dayPower) {
                    if(dayPower[v].CONTRACT=='1501'){
                        powerone.push(dayPower[v].DAY_ELE_AMOUNT)
                        powertime.push(dayPower[v].REPOART_ID)
                    }
                }
                var option = {
                    title: {
                        subtext: '万KW·h'
                    },
                    tooltip: {
                        trigger: 'axis'
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
                        data: ['石嘴山光伏电站']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: {
                        type: 'category',
                        data:powertime
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '石嘴山光伏电站',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:powerone
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('nxzst'), 'macarons');
                myChart.setOption(option);
            }
        }])
    .directive('powerline', function () {
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