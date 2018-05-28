angular.module('BaiYin.EleTrad', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('EleTrad', {
            url: '/EleTrad',
            controller: 'EleTradController',
            templateUrl: 'EleTrad/EleTrad.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    .controller('EleTradController', ['$interval', '$scope','$rootScope', '$http', 'showAlert', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', '$state', 'Session', '$ionicLoading','$ionicActionSheet',
        function ($interval, $scope,$rootScope, $http, showAlert, $ionicTabsDelegate, $ionicHistory, $ionicPopup, $state, Session, $ionicLoading,$ionicActionSheet) {

            $scope.$on('$ionicView.enter', function () {
                $scope.EleTradcanvas()

            });
            $scope.$on('$ionicView.afterEnter', function () {

            });
            $scope.EleTradGain=function () {

            };
            $scope.dianchanglist = [
                {CONTRACT: "1201", DESCRIPTION: "北大桥东风电场", CITY: "酒泉市"},
                {CONTRACT: "1201", DESCRIPTION: "北大桥东风电场", CITY: "酒泉市"},
                {CONTRACT: "1201", DESCRIPTION: "北大桥东风电场", CITY: "酒泉市"},
                {CONTRACT: "1201", DESCRIPTION: "北大桥东风电场", CITY: "酒泉市"},
                {CONTRACT: "1201", DESCRIPTION: "北大桥东风电场", CITY: "酒泉市"},
                {CONTRACT: "1201", DESCRIPTION: "北大桥东风电场", CITY: "酒泉市"},
            ];
            dianchanglist = [];
            for (var i = 0; i < $scope.dianchanglist.length; i++) {
                var dlist = {};
                dlist.text = $scope.dianchanglist[i].DESCRIPTION;
                dlist.CONTRACT = $scope.dianchanglist[i].CONTRACT;
                dlist.CITY = $scope.dianchanglist[i].CITY;
                dianchanglist.push(dlist);
            }
            $scope.selectEletrad=function () {
                $scope.num++;
                var hideSheet = $ionicActionSheet.show({
                    buttons: dianchanglist,
                    cancel: function () {

                    },
                    buttonClicked: function (index) {
                        var dianchanglength=dianchanglist[index].text.length;
                        var sel =  document.getElementById("EleTradID");
                        sel.style.width =18*dianchanglength+'px';
                        commitYu = dianchanglist[index].text;
                        console.log(commitYu);
                        yunum = dianchanglist[index].CONTRACT;
                        city = dianchanglist[index].CITY;
                        $("#EleTradID").val(commitYu);
                        return true;
                    }
                });
            }
            $scope.EleTradcanvas=function () {
                var dianchanglength=dianchanglist[0].text.length;
                var sel =  document.getElementById("EleTradID");
                sel.style.width =18*dianchanglength+'px';
                $("#EleTradID").val(dianchanglist[0].text);
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
                        data: ["结算电量","市场化电量","基础电量"]
                    },
                    grid: {
                        y2:80,
                        top: '20%',
                    },
                    xAxis: {
                        type: 'category',
                        data: ['2018-05-01','2018-05-02','2018-05-03','2018-05-04','2018-05-05','2018-05-06','2018-05-07','2018-05-08','2018-05-09','2018-05-10','2018-05-11','2018-05-12','2018-05-13','2018-05-14','2018-05-15','2018-05-16','2018-05-17','2018-05-18','2018-05-19','2018-05-20','2018-05-21','2018-05-22','2018-05-23','2018-05-24','2018-05-25','2018-05-26','2018-05-27','2018-05-28','2018-05-29','2018-05-30','2018-05-30']
                    },
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '结算电量',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:[1,3,5,4,3,5,14,6,7,9,15,32,1,15,45,25,35,18,14,20,14,22,17,35,42,54,14,28,14,29,24]
                        },
                        {
                            name: '市场化电量',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:[5,6,8,15,47,6,5,3,89,4,5,6,7,5,24,14,35,14,20,31,11,21,17,25,14,25,36,5,20,14]
                        },
                        {
                            name: '基础电量',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            data:[4,6,8,45,37,16,15,13,29,24,15,6,17,35,14,24,25,4,10,21,21,31,27,15,34,15,26,15,10,24]
                        }

                    ]
                };
                $scope.GsChart = echarts.init(document.getElementById('EleTradst'), 'macarons');
                $scope.GsChart.setOption(option);
            }




        }]);

