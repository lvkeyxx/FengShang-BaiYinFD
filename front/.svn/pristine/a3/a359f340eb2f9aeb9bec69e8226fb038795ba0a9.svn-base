angular.module('BaiYin.LeavesList', [
        'BaiYin.LeavesList.mock'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('LeavesList', {
            url: '/LeavesList',
            controller: 'LeavesListController',
            templateUrl: 'AllLeave/Leave/LeavesList/LeavesList.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])
    .controller('LeavesListController', ['$scope', '$ionicPopup', 'loadingAnimation', '$ionicLoading', 'ionicDatePicker', 'pageInitService', '$http', '$state', 'showAlert',
        function($scope, $ionicPopup, loadingAnimation, $ionicLoading, ionicDatePicker, pageInitService, $http, $state, showAlert) {
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveList&PageNo=1',
                    'ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveState',
                    'ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveFurloughType'
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.items = result[0].data;
                    $scope.item3s = result[1].data;
                    $scope.item4s = result[2].data;
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            //刷新
            $scope.doRefresh = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveList&PageNo=1')
                    .then(function(res) {
                        $scope.items = res.data;
                        $scope.$broadcast('scroll.refreshComplete');
                        if (res.data.length == 12) {
                            $scope.loadNumber = 1;
                            $scope.hasMore = true;
                        } else {
                            $scope.hasMore = false;
                        }
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
            //上拉加载
            $scope.hasMore = true;
            $scope.loadNumber = 1;
            $scope.loadMore = function() {
                $scope.loadNumber += 1;
                $http.get('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveList&PageNo=' + $scope.loadNumber)
                    .then(function(res) {
                        if (res.data.length > 0) {
                            for (var i = 0; i < res.data.length; i++) {
                                $scope.items.push(res.data[i])
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }
                        } else if (res.data.length <= 0 || res.data == null || res.data == undefined) {
                            $scope.hasMore = false;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                        $scope.hasMore = false;
                    })
            };
            //搜索按钮
            $scope.showOrhide = function() {
                $scope.trueStr = !$scope.trueStr;
            };
            //日期控件
            function dateList(tesr) {
                var disabledDates = [];
                var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
                var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
                var datePickerCallback = function(val) {};
                $scope.datepickerObject = {
                    titleLabel: 'Title', //Optional
                    todayLabel: '今天', //Optionals
                    closeLabel: '关闭', //Optional
                    setLabel: '确认', //Optional
                    setButtonType: 'button-assertive', //Optional
                    todayButtonType: 'button-assertive', //Optional
                    closeButtonType: 'button-assertive', //Optional
                    mondayFirst: false, //Optional
                    disabledDates: disabledDates, //Optional
                    weekDaysList: weekDaysList, //Optional
                    monthList: monthList, //Optional
                    templateType: 'popup', //Optional
                    showTodayButton: 'true', //Optional
                    modalHeaderColor: 'bar-positive', //Optional
                    modalFooterColor: 'bar-positive', //Optional
                    from: new Date(2008, 8, 2), //可选
                    to: new Date(2030, 8, 25), //可选
                    inputDate: new Date(), //Optional
                    callback: function(val) { //Mandatory
                        if (tesr == 1) {
                            $scope.filterDate = val
                        } else if (tesr == 2) {
                            $scope.filterDate2 = val
                        }
                        datePickerCallback(val);
                    },
                    dateFormat: 'yyyy-MM-dd', //Optional
                    closeOnSelect: false, //Optional
                };
            }
            //开始结束日期
            $scope.chooseTime = function(tesr) {
                dateList(tesr)
                ionicDatePicker.openDatePicker($scope.datepickerObject);
                dateList(tesr)
            };
            //搜索
            $scope.allChoose = function(res, req) {
                if (!$scope.filterDate) {
                    $scope.filterDate = "";
                };
                if (!$scope.filterDate2) {
                    $scope.filterDate2 = "";
                };
                loadingAnimation.showLoading();
                $scope.trueStr = false;
                var subParam = {
                    START_CREATED_DATE: $scope.filterDate + '',
                    END_CREATED_DATE: $scope.filterDate2 + '',
                    STATE: res,
                    FURLOUGH_TYPE: req
                };
                $http.post('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveList&PageNo=1', subParam)
                    .then(function(res) {
                        $ionicLoading.hide();
                        $scope.items = res.data;
                        if (res.data.length == 0) {
                            var alertPopup = $ionicPopup.alert({
                                okText: '确认',
                                template: '暂无数据'
                            })
                        }
                        $scope.$broadcast('scroll.refreshComplete');
                        if (res.data.length == 12) {
                            $scope.loadNumber = 1;
                            $scope.hasMore = true;
                        } else {
                            $scope.hasMore = false;
                        }
                    }, function(error) {
                        $ionicLoading.hide();
                        showAlert.showMsg(error, '', '网络异常', '确认')

                    })
            };
            //详情
            $scope.leavesDetail = function(res) {
                sessionStorage.setItem("detailParam",JSON.stringify(res));
                $state.go("LeavesDetail");
            };
            //清空
            $scope.listAll = function() {
                $scope.filterDate = "";
                $scope.filterDate2 = "";
                $scope.type="";
                $scope.type2="";
            };
            //新增
            $scope.newLeave = function() {
                $state.go("newLeaves",{"newParam":2});
            };
        }
    ])