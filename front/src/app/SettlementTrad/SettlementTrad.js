angular.module('BaiYin.SettlementTrad', [
    'ionic',
    'ionic-datepicker',
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('SettlementTrad', {
        url: '/SettlementTrad',
        controller: 'SettlementTradController',
        templateUrl: 'SettlementTrad/SettlementTrad.tpl.html',
        cache: 'true',
        authorizedRuleType: ['1']
    })
}])

.controller('SettlementTradController', ['$scope','$filter','showAlert' ,'pageInitService', '$http', '$state','$ionicTabsDelegate','$interval','$timeout','loadingAnimation','ionicDatePicker','$ionicActionSheet',
        function($scope,$filter,showAlert,pageInitService,$http,$state,$ionicTabsDelegate,$interval,$timeout,loadingAnimation,ionicDatePicker,$ionicActionSheet) {
            $scope.$on('$ionicView.afterEnter', function() {
                var date = new Date();
                $scope.nowElementYear=$filter("date")(date, "yyyy");
                $scope.newYear=$filter("date")(date, "yyyy");
                $ionicTabsDelegate.select(0);
                $scope.SetTlementProvience='QC';
                var getTimes = {
                    TRAND_YEAR:$scope.nowElementYear,
                    provience:'QC',
                    CONTRACT:''
                }
                $scope.getTlementQc(getTimes);
                $scope.CONTRACT='';
                $(".setTlementrightSelect").hide();

            });
            $scope.$on('$ionicView.leave',function () {
                $('.setElementCount').val('');
            });
            //全场请求数据
            $scope.setTlementQc = function () {
                $ionicTabsDelegate.select(0);
                var date = new Date();
                $scope.nowElementYear=$filter("date")(date, "yyyy");
                setTlementCONTRACT=[];
                $scope.SetTlementProvience='QC';
                var getTimes = {
                    TRAND_YEAR:$scope.nowElementYear,
                    provience:'QC',
                    CONTRACT:''
                }
                $scope.getTlementQc(getTimes);
                $scope.CONTRACT='';

            }
            var setTlementCONTRACT=[];
            //点击向前一个年
            $scope.chooseNewYear=function () {
                var parmas={
                    TRAND_YEAR:$scope.nowElementYear,
                    provience:$scope.SetTlementProvience,
                    CONTRACT:$scope.CONTRACT
                }
                $scope.getTlementQc(parmas)
            }
            $scope.getPresetTlementYear = function (date) {
                console.log(date);
                $scope.nowElementYear=parseInt(date)-1;
                var parmas={
                    TRAND_YEAR:$scope.nowElementYear,
                    provience:$scope.SetTlementProvience,
                    CONTRACT:$scope.CONTRACT
                }
                $scope.getTlementQc(parmas)
                $(".setTlementrightSelect").show();
            }
            //点击向后一个年
            $scope.getNextsetTlementYear= function (date) {
                console.log(date);
                var year2 = parseInt(date) + 1;
                if ($scope.newYear <= year2) {
                    $(".setTlementrightSelect").hide();
                    $scope.nowElementYear= year2;
                    var parmas={
                        TRAND_YEAR:$scope.nowElementYear,
                        provience:$scope.SetTlementProvience,
                        CONTRACT:$scope.CONTRACT
                    }
                    $scope.getTlementQc(parmas)
                }
                else {
                    $scope.nowElementYear =year2;
                    var parmas={
                        TRAND_YEAR:$scope.nowElementYear,
                        provience:$scope.SetTlementProvience,
                        CONTRACT:$scope.CONTRACT
                    }
                    $scope.getTlementQc(parmas)
                    $(".setTlementrightSelect").show();
                }
            }
            //甘肃数据请求
            $scope.setTlementGs = function (){
                $ionicTabsDelegate.select(1);
                var date = new Date();
                $scope.nowElementYear=$filter("date")(date, "yyyy");
                setTlementCONTRACT=[];
                $scope.SetTlementProvience='GS';
                var Field='GS';
                var parmas = {
                    provience: Field,
                }
                $scope.getTlementField(parmas);
            }
            //青海数据请求
            $scope.setTlementQh = function () {
                $ionicTabsDelegate.select(2);
                var date = new Date();
                $scope.nowElementYear=$filter("date")(date, "yyyy");
                setTlementCONTRACT=[];
                $scope.SetTlementProvience='QH';
                var Field='QH';
                var parmas = {
                    provience: Field,
                }
                $scope.getTlementField(parmas);
            }
            //宁夏数据请求
            $scope.setTlementNx = function () {
                $ionicTabsDelegate.select(3);
                var date = new Date();
                $scope.nowElementYear=$filter("date")(date, "yyyy");
                setTlementCONTRACT=[];
                $scope.SetTlementProvience='NX';
                var Field='NX';
                var parmas = {
                    provience: Field,
                }
                $scope.getTlementField(parmas);
            }
            //新疆数据请求
            $scope.setTlementXj = function () {
                $ionicTabsDelegate.select(4);
                var date = new Date();
                $scope.nowElementYear=$filter("date")(date, "yyyy");
                setTlementCONTRACT=[];
                $scope.SetTlementProvience='XJ';
                var Field='XJ';
                var parmas = {
                    provience: Field,
                }
                $scope.getTlementField(parmas);

            }
            /*获取域*/
            $scope.getTlementField=function (parmas) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ElecSettlementService&TransName=getElecSettlementDepartment', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            console.log(res);
                            $scope.getElementTradDepartList = res.data.departList;
                            $('.setElementCount').val($scope.getElementTradDepartList[0].CONTRACT_NAME);
                            $scope.CONTRACT=$scope.getElementTradDepartList[0].CONTRACT;
                            var getTimes = {
                                TRAND_YEAR:$scope.nowElementYear,
                                provience:$scope.SetTlementProvience,
                                CONTRACT:$scope.getElementTradDepartList[0].CONTRACT
                            }
                            for (var i = 0; i <$scope.getElementTradDepartList.length; i++) {
                                var dlist = {};
                                dlist.text = $scope.getElementTradDepartList[i].CONTRACT_NAME;
                                dlist.CONTRACT = $scope.getElementTradDepartList[i].CONTRACT;
                                setTlementCONTRACT.push(dlist);
                            }
                            $scope.getTlementQc(getTimes)


                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /*根据时间(年),电厂名,电厂域获取数据*/
            $scope.getTlementQc=function (parmas) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ElecSettlementService&TransName=getElecSettlementAll', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.getElementTradList = res.data.tList;
                            $scope.getElementTradpList = res.data.pList;
                            $scope.getElementTradAllList = res.data.totalList;
                            $scope.drawElementTrad()
                        } else {
                            $scope.getElementTradList=[];
                            $scope.getElementTradAllList=[];
                            $scope.getElementTradpList=[{
                                BASE_CHARGE_VALUE:0,
                                MARKET_CHARGE_VALUE:0,
                                DELIVERY_CHARGE_VALUE:0,
                                DIRECT_CHARGE_VALUE:0,
                                RIGHTS_CHARGE_VALUE:0
                            }];
                            $scope.drawElementTrad()
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        $scope.getElementTradList=[];
                        $scope.getElementTradpList=[];
                        $scope.getElementTradAllList=[];
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            $scope.toSelectField=function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons:setTlementCONTRACT,
                    cancel: function () {
                    },
                    buttonClicked: function (index) {
                        var CONTRACT=setTlementCONTRACT[index].CONTRACT;
                        var getTimes = {
                            TRAND_YEAR:$scope.nowElementYear,
                            provience:$scope.SetTlementProvience,
                            CONTRACT:CONTRACT
                        }
                        $scope.CONTRACT=setTlementCONTRACT[index].CONTRACT;
                        console.log(setTlementCONTRACT[index].text)
                        $('.setElementCount').val(setTlementCONTRACT[index].text);
                        $scope.getTlementQc(getTimes)
                        return true;
                    }
                });
            }
            $scope.getElementToTrandMonth=function (elementList) {
                console.log(elementList);
                console.log(elementList.TRADE_MONTH);
                var parmas = {
                    TRAND_MONTH:elementList.TRADE_MONTH,
                    provience:$scope.SetTlementProvience,
                    CONTRACT:$scope.CONTRACT
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ElecSettlementService&TransName=getElecSettlementMonthPie', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.getElementTradpList=res.data.pList;
                            $scope.drawElementTrad()
                        } else {
                            $scope.getElementTradpList=[{
                                BASE_CHARGE_VALUE:0,
                                MARKET_CHARGE_VALUE:0,
                                DELIVERY_CHARGE_VALUE:0,
                                DIRECT_CHARGE_VALUE:0,
                                RIGHTS_CHARGE_VALUE:0
                            }];
                            $scope.drawElementTrad()
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /*根据获取到的信息制作饼图*/
            $scope.drawElementTrad=function () {
                /*alert(JSON.stringify($scope.getElementTradpList));*/
                var BASE_CHARGE_VALUE=$scope.getElementTradpList[0].BASE_CHARGE_VALUE;/*基础电量*/
                var MARKET_CHARGE_VALUE=$scope.getElementTradpList[0].MARKET_CHARGE_VALUE;/*市场化电量*/
                var DELIVERY_CHARGE_VALUE=$scope.getElementTradpList[0].DELIVERY_CHARGE_VALUE;/*外送电量*/
                var DIRECT_CHARGE_VALUE=$scope.getElementTradpList[0].DIRECT_CHARGE_VALUE;/*直购电量*/
                var RIGHTS_CHARGE_VALUE=$scope.getElementTradpList[0].RIGHTS_CHARGE_VALUE;/*发电权置换电量*/
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
                    legend: {
                        orient : 'horizontal',
                        x : 'left',
                        y: '10',
                        data:['基础电量','市场化电量','外送电量','直购电量','发电权置换电量']
                    },
                    calculable : false,
                    series : [
                        {
                            name:'基础电量',
                            type:'pie',
                            selectedMode: 'single',
                            radius : [0,50],
                            x: '10%',
                            width: '10%',
                            funnelAlign: 'right',

                            itemStyle : {
                                normal : {
                                    label : {
                                        position : 'inner'
                                    },
                                    labelLine : {
                                        show : false
                                    }

                                }
                            },
                            data:[
                                {value:BASE_CHARGE_VALUE, name:'基础电量'},
                                {value:MARKET_CHARGE_VALUE, name:'市场化电量'},
                            ]
                        },
                        {
                            name:'结算电量',
                            type:'pie',
                            radius : [60,70],
                            x: '60%',
                            width: '10%',
                            funnelAlign: 'right',

                            data:[
                                {value:BASE_CHARGE_VALUE, name:'基础电量'},
                                {value:DELIVERY_CHARGE_VALUE, name:'外送电量'},
                                {value:DIRECT_CHARGE_VALUE, name:'直购电量'},
                                {value:RIGHTS_CHARGE_VALUE, name:'发电权置换电量'}

                            ]
                        }
                    ]
                };
                var Settlementmain='Settlementmain'+$scope.SetTlementProvience;
                var myChart = echarts.init(document.getElementById(Settlementmain), 'macarons');
                myChart.setOption(option);
            }

        }])