angular.module('BaiYin.OSI.OSIcount', [
        'ionic',
        'BaiYin.OSI.OSIHistory',
        'BaiYin.OSI.OSIPersonnelEquipment',
        'BaiYin.OSI.OSIDepartmentEquipment',
        'BaiYin.OSI.OSIDepartmentPersonnel'
    ])
    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('OSI/OSIcount', {
            url: '/OSI/OSIcount',
            controller: 'OSIcountController',
            templateUrl: 'OSI/OSIcount/OSIcount.tpl.html',
            cache: true,
            authorizedRuleType: ['1'],
            params: { item: new Object() }
        });
        var datePickerConfig = {
            inputDate: new Date(),
            setLabel: '选择',
            todayLabel: '今天',
            closeLabel: '关闭',
            mondayFirst: false,
            weeksList: ["日", "一", "二", "三", "四", "五", "六"],//["S", "M", "T", "W", "T", "F", "S"],
            monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],//["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            templateType: 'popup',
            from: new Date(2012, 1, 1),
            to: new Date(2030, 12, 31),
            showTodayButton: true,
            dateFormat: 'yyyy-MM-dd',
            closeOnSelect: true
        };
        ionicDatePickerProvider.configDatePicker(datePickerConfig);
    }])
    .controller('OSIcountController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', 'ionicDatePicker', '$ionicActionSheet',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, ionicDatePicker, $ionicActionSheet) {
            $scope.tabs = null;
            //进入页面
            $scope.$on('$ionicView.beforeEnter', function (event, view) {
                if(view.direction == "forward"){
                    $scope.tabs = {
                        "personal": null,
                        "department": null
                    };
                    $ionicTabsDelegate.select(0);
                    setTimeout(() => {
                        $scope.changeTabType("personal");
                    }, 0);
                }
            });
            //当前tab分页
            $scope.tabType = "personal";
            $scope.changeTabType = function(tabType){
                $scope.tabType = tabType;
                if($scope.tabs && $scope.tabs[$scope.tabType] == null){
                    $scope.reload();
                }
            };
            $scope.reload = function(tabType){
                $scope.tabs[tabType || $scope.tabType] = {
                    pageIndex: 1,
                    hasMore: true,
                    list: new Array()
                };
                $scope.getInspectStatisticalData();
            };
            //初始化时间
            var initDate =  [new Date().getFullYear(), new Date().getMonth() - 0 + 1];
            initDate = initDate[0] + "-" + (initDate[1] - 0 < 10 ? "0" + initDate[1] : initDate[1]);
            //查询条件的时间集合
            $scope.date = {
                now: new Date(),
                personalStart: initDate,
                personalEnd: initDate,
                departmentStart: initDate,
                departmentEnd: initDate
            };
            /**
             * 改变时间
             */
            var changeDateTime = function(dateKey, changeNumber, minDate, maxDate){
                var date = this[dateKey].split("-");
                date[1] = parseInt(date[1]) + changeNumber;

                if(date[1] < 1){
                    date[0] -= 1;
                    date[1] = 12 - date[1];
                }else if(date[1] > 12){
                    date[0] = parseInt(date[0]) + 1;
                    date[1] = date[1] - 12;
                }
                if(date[1] < 10){
                    date[1] = "0" + date[1];
                }

                date = date.join('-');

                if(minDate && new Date(date).getTime() < new Date(minDate).getTime()){
                    console.log("min");
                    return false;
                }
                if(maxDate && new Date(date).getTime() > new Date(maxDate).getTime()){
                    console.log("max");
                    return false;
                }

                this[dateKey] = date;
                return true;
            };
            $scope.changeDateTime = function(){
                if(changeDateTime.apply($scope.date, arguments))
                    $scope.reload();
            };
            //人员设备列表视图
            $scope.openPersonnelEquipment = function(data){
                $state.go('OSI/OSIPersonnelEquipment', {item: {
                    date: $scope.date,
                    changeDateTime: changeDateTime,
                    data: data
                }});
            };
            //巡查记录视图
            $scope.openRecord = function(data){
                data.date = {
                    startDate: $scope.date.personalStart,
                    endDate:$scope.date.personalEnd
                };
                $state.go('OSI/OSIHistory', {item: {autoOperation: "personnel", data: data}});
            };
            //单位人员列表视图
            $scope.openDepartmentPersonnel = function(data){
                $state.go('OSI/OSIDepartmentPersonnel', {item: {
                    date: $scope.date,
                    changeDateTime: changeDateTime,
                    data: data
                }});
            };
            //单位设备列表视图
            $scope.openDepartmentEquipment = function(data){
                $state.go('OSI/OSIDepartmentEquipment', {item: {
                    date: $scope.date,
                    changeDateTime: changeDateTime,
                    data: data
                }});
            };
            //获取巡查统计数据
            $scope.getInspectStatisticalData = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http
                    .post('ServiceName=InspectionService&TransName=getInspectStatisticalData', {
                        restrict: $scope.tabType == "personal" ? "personnel" : "department",
                        pageIndex: $scope.tabs[$scope.tabType].pageIndex++,
                        startTime: $scope.tabType == "personal" ? $scope.date.personalStart : $scope.date.departmentStart,
                        endTime: $scope.tabType == "personal" ? $scope.date.personalEnd : $scope.date.departmentEnd
                    })
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        
                        if(res.data.list.length != 10){
                            $scope.tabs[$scope.tabType].hasMore = false;
                        }

                        $scope.tabs[$scope.tabType].list = $scope.tabs[$scope.tabType].list.concat(res.data.list.map(function(v, i){
                            v.percentage = Math.round(v.PLAN_INSPECTED/(v.PLAN_INSPECT == 0 ? 1 : v.PLAN_INSPECT) * 1000) / 10;
                            return v;
                        }));
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.tabs[$scope.tabType].hasMore = false;
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])
