/*angular.module('BaiYin.tabs.porductManage', [
    'ionic'
])*/
angular.module('BaiYin.tabs.porductManage', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('tabs/porductManage', {
            url: '/tabs/porductManage',
            controller: 'pmController',
            templateUrl: 'tabs/porductManage/porductManage.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    .controller('pmController', ['$interval', '$scope','$rootScope', '$http', 'showAlert', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', '$state', 'Session', '$ionicLoading','$ionicActionSheet',
        function ($interval, $scope,$rootScope, $http, showAlert, $ionicTabsDelegate, $ionicHistory, $ionicPopup, $state, Session, $ionicLoading,$ionicActionSheet) {
            $scope.myActiveSlide = 1;
            $scope.$on('$ionicView.enter', function () {
                //显示tabs
                $rootScope.hideTabs = false;
                $scope.currentTab = 'tabs/porductManage';
                $ionicTabsDelegate.select(1);
            });
            $scope.selectVal = '';
            /*$interval(function () {
                getKPI();
            }, 300000);*/

            $scope.$on('$ionicView.afterEnter', function () {
                getPowerPlantList();
            });
            //点击生产指标
            $scope.tosczb = function () {
                $state.go('KPI');
            }
            //点击负荷
            $scope.toFhyc = function () {
                showAlert.showMsg('', '', '程序员正在玩命开发中……')
            }
            //点击考勤签到
            $scope.toKqqd = function () {
                showAlert.showMsg('', '', '程序员正在玩命开发中……')
            }
            //点击任务管理
            $scope.toRwgl = function () {
                $state.go('taskManage');
            }
            //点击设备台账
            $scope.toSbxx = function () {
                // showAlert.showMsg('', '', '程序员正在玩命开发中……');
                $state.go('facilityInfo');
            }
            //点击现场巡查
            $scope.toXcxc = function () {
                $state.go('OSI');
                //showAlert.showMsg('', '', '程序员正在玩命开发中……')
            }
            //点击巡查统计
            $scope.toXctj = function () {
                //localStorage.removeItem("backToLoad");
                $state.go('OSI/OSIcount');
                //showAlert.showMsg('', '', '程序员正在玩命开发中……')
            }
            //点击离线巡查
            $scope.toOffLine = function () {
                //localStorage.removeItem("backToLoad");
                $state.go('OffLine');
                //showAlert.showMsg('', '', '程序员正在玩命开发中……')
            }
            //点击电量
            $scope.goPower = function () {
                $state.go('power');
            }
            //点击负荷
            $scope.goLoad = function () {
                localStorage.removeItem("backToLoad");
                $state.go('load');
            }
            //点击隐患排查
            $scope.toYhpc = function () {
                // showAlert.showMsg('','',"点击隐患排查");
                $state.go('pm/trouble/hideTrouble');
            }
            //点击缺陷填报
            $scope.toqxtb = function () {
                $state.go('pm/defectFill/defectFill');
            }
            //运行日志
            $scope.toJournal = function () {
                $state.go('pm/journal/journalList');
            }

            //获取电厂列表
            $scope.num = 1;
            var dianchanglist = [];

            function getPowerPlantList() {
                $http.post('ServiceName=TargetService&TransName=listCompanySiteAddress')
                    .then(function (res) {
                        //loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.powerPlantList = res.data;
                            console.log("powerPlantList==="+$scope.powerPlantList.length);
                            //默认第一条电厂数据
                            if($scope.num == 1){
                                var dianlength=$scope.powerPlantList[0].DESCRIPTION.length;
                                var sel =  document.getElementById("fieldID");
                                sel.style.width =18*dianlength+'px';
                                $("#fieldID").val($scope.powerPlantList[0].DESCRIPTION);
                                getWeather($scope.powerPlantList[0].CITY);
                                displayedJkzx($scope.powerPlantList[0].DESCRIPTION);
                            }
                            //dianchanglist.push({text: '全部', CONTRACT: ''});
                            //默认电厂
                            /*$scope.dianchang = '0';
                            //displayedJkzx(res.data[0].DESCRIPTION);
                            $scope.selectVal = $scope.powerPlantList[0].DESCRIPTION;
                            if ($scope.num == 2) {
                                getWeather(res.data[0].CITY);
                                if ($scope.selectVal == '集控中心') {
                                    $scope.footHide = false;
                                } else {
                                    $scope.footHide = true;
                                }
                            }*/
                            dianchanglist = [];
                            for (var i = 0; i < $scope.powerPlantList.length; i++) {
                                var dlist = {};
                                dlist.text = $scope.powerPlantList[i].DESCRIPTION;
                                dlist.CONTRACT = $scope.powerPlantList[i].CONTRACT;
                                dlist.CITY = $scope.powerPlantList[i].CITY;
                                dianchanglist.push(dlist);
                            }
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        //loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //电厂选择事件
            $scope.selectPlantPower = function () {
                $scope.num++;
                console.log("dianchanglist=="+JSON.stringify(dianchanglist));
                /*$scope.selectVal = $("#cityid option:selected").text();
                showAlert.showMsg('','',"$scope.selectVal=="+$scope.selectVal);

                var descr = $scope.powerPlantList[$("#cityid ").val()].DESCRIPTION;
                displayedJkzx(descr);*/
                var hideSheet = $ionicActionSheet.show({
                    buttons: dianchanglist,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        var dianchanglength=dianchanglist[index].text.length;
                        var sel =  document.getElementById("fieldID");
                        sel.style.width =18*dianchanglength+'px';
                        commitYu = dianchanglist[index].text;
                        yunum = dianchanglist[index].CONTRACT;
                        city = dianchanglist[index].CITY;
                        console.log("yunum==" + yunum);
                        //获取对应城市的天气
                        getWeather(city);
                        //底条数据是否显示
                        displayedJkzx(commitYu);
                        $("#fieldID").val(commitYu);
                        return true;
                    }
                });


            }

            //如果就集控中心，显示各省数据
            function displayedJkzx(descr) {
                console.log("descr==" + descr);
                if (descr == '集控中心') {
                    $scope.footHide = false;
                } else {
                    $scope.footHide = true;
                }
                console.log("$scope.footHide==" + $scope.footHide);
            }

            //获取KPI指标
            function getKPI() {
                // 获取全公司总负荷
                // 获取全公司日发电量
                // 获取集控中心负荷
                $http.post('ServiceName=TargetService&TransName=getTargetIndexLoad')
                    .then(function (res) {
                        getProvice();
                        console.log(res);
                        $scope.companyPower = res.data;
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            function getProvice(){
                //获取甘肃负荷
                //获取青海负荷
                //获取宁夏负荷
                //获取新疆负荷
                $http.post('ServiceName=TargetService&TransName=totalLoad')
                    .then(function (res) {
                        console.log(res);
                        $scope.companyPower1 = res.data;
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }



            //获取天气情况
            function getWeather(cityDes) {
                console.log("cityDes==" + cityDes);
                var winfo = {city: cityDes};
                $http.post("ServiceName=WeatherService&TransName=weatherList", winfo)
                    .then(function (res) {
                        getKPI();
                        console.log(res);
                        $scope.temp = res.data;
                        $scope.Weather = $scope.temp;
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
        }]);

