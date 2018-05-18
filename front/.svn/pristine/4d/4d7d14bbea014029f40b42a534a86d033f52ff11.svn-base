angular.module('BaiYin.historyList', [
        'ionic'
    ])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('historyList', {
            url: '/historyList',
            controller: 'historyListController',
            templateUrl: 'Agents/AgentsList/operatingHistory/historyList.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('historyListController', ['$scope', 'loadingAnimation', '$ionicLoading', 'ionicDatePicker', 'loadingAnimation', '$ionicPopup', 'showAlert', 'pageInitService', '$http', '$state',
        function($scope, loadingAnimation, $ionicLoading, ionicDatePicker, loadingAnimation, $ionicPopup, showAlert, pageInitService, $http, $state) {
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [

                    'ServiceName=ApproveService&TransName=getDoneApprvedList&PageNo=1'
                ];

                pageInitService.pageInit(apis).then(function(result) {
                    $scope.listsMsg = result[0]
                    agentListMsg($scope.listsMsg)

                    $scope.agentsItem = function(item) {
                        $state.go('historyDetail', { 'item': item })
                    }
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
                $scope.showWhich = true;
                $scope.loadNumber = 1;
                $scope.loadMore = function() {
                    $scope.loadNumber += 1;
                    $http.get('ServiceName=ApproveService&TransName=getDoneApprvedList&PageNo=' + $scope.loadNumber)
                        .then(function(res) {
                            if (res.data.length > 0) {
                                for (var i = 0; i < res.data.length; i++) {
                                    res.data[i].CREATED_DATE = new Date(res.data[i].CREATED_DATE);
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
            });
            var date = $scope.year + $scope.dateNum

            function reqPort() {
                $http.get('ServiceName=ApproveService&TransName=getDoneApprvedList&PageNo=1')
                    .then(function(res) {
                        agentListMsg(res)

                    }, function(error) {

                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            $scope.datQuery = function() {
                reqPort()
            }

            $scope.inpTitle = { vom: '' };
            $scope.listAll = function() {
                $scope.inpTitle.vom = '';
                $scope.filterDate = '';
                $scope.filterDate2 = '';
                $scope.chooseNum = '';

            }

            function agentListMsg(res) {
                var str = [];
                var arr = {};
                for (var i = 0; i < res.data.length; i++) {
                    arr = res.data[i]
                    arr.CREATED_DATE = new Date(arr.CREATED_DATE)
                    str.push(arr)
                }
                $scope.items = str;
                if ($scope.items.length >= 10 && $scope.items != undefined && $scope.items != null) {
                    $scope.hasMore = true;
                }
            };
            $scope.trueStr = false;
            $scope.showOrhide = function() {
                $scope.trueStr = !$scope.trueStr;

            }
            $scope.doRefresh = function() {
                $http.get('ServiceName=ApproveService&TransName=getDoneApprvedList&PageNo=1')
                    .then(function(res) {
                        agentListMsg(res)
                        $scope.$broadcast('scroll.refreshComplete');
                        if (res.data.length == 10) {
                            $scope.loadNumber = 1;
                            $scope.hasMore = true;
                        } else {
                            $scope.hasMore = false;
                        }
                    }, function(error) {
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            $scope.allChoose = function(value) {
                loadingAnimation.showLoading()
                $scope.trueStr = false;
                $scope.inpTitle.vom = value;
                var searchParamS = {
                    TITLE: value,
                    START_CREATED_DATE: $scope.filterDate,
                    END_CREATED_DATE: $scope.filterDate2,
                    FROM_CLIENT: $scope.chooseNum
                };
                $http.post('ServiceName=ApproveService&TransName=getDoneApprvedList', searchParamS)
                    .then(function(res) {
                        $ionicLoading.hide();
                        agentListMsg(res)
                        if (res.data.length == 0) {
                            var alertPopup = $ionicPopup.alert({
                                okText: '确认',
                                template: '暂无数据'
                            })
                        }
                        $scope.$broadcast('scroll.refreshComplete');
                        if (res.data.length == 10) {
                            $scope.loadNumber = 1;
                            $scope.hasMore = true;
                        } else {
                            $scope.hasMore = false;
                        }
                    }, function(error) {
                        $ionicLoading.hide();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
           /* $http.get('ServiceName=ApproveService&TransName=getDoneApprvedList&TITLE=' +
                    ($scope.inpTitle.vom == undefined ? '' : $scope.inpTitle.vom) +
                    '&START_CREATED_DATE=' + ($scope.filterDate == undefined ? '' : $scope.filterDate) +
                    '&END_CREATED_DATE=' + ($scope.filterDate2 == undefined ? '' : $scope.filterDate2) +
                    '&FROM_CLIENT=' + ($scope.chooseNum == undefined ? '' : $scope.chooseNum))
                .then(function(res) {
                    $ionicLoading.hide();
                    agentListMsg(res)
                    if (res.data.length == 0) {
                        var alertPopup = $ionicPopup.alert({
                            okText: '确认',
                            template: '暂无数据'
                        })
                    }
                    $scope.$broadcast('scroll.refreshComplete');
                    if (res.data.length == 10) {
                        $scope.loadNumber = 1;
                        $scope.hasMore = true;
                    } else {
                        $scope.hasMore = false;
                    }
                }, function(error) {
                    $ionicLoading.hide();
                    $scope.hasMore = false;
                    showAlert.showMsg(error, '', '网络异常', '确认')
                })
        }*/
        $scope.chooseWhich = function() {
            $scope.showChoose = !$scope.showChoose
        }
        $scope.conts = [
            { name: 'App' },
            { name: 'Ifs Ee' }
        ];
        $scope.chooseFrom = function(value) {
            $scope.chooseNum = value
            $scope.showChoose = false;
        };

        function dateList(tesr) {
            var disabledDates = [
                /*new Date(1437719836326),
                new Date(),
                new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
                new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
                new Date("08-14-2015"), //Short format
                new Date(1439676000000) //UNIX format*/
            ];


            //方便的年月日设置方式，正和我意，可以随便改了。
            var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
            // var weekDaysList = ["S", "M", "T", "W", "T", "F", "S"];//中文：["日", "一", "二", "三", "四", "五", "六"];
            var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            // var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            //中文：["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            // 日期选择后的回调函数
            var datePickerCallback = function(val) {
                /* if (typeof(val) === 'undefined') {
                     console.log('No date selected');
                 } else {
                       $http.get('ServiceName=ApproveService&TransName=getDoneApprvedList&CREATED_DATE='+val)
                     .then(function(res) {
                         agentListMsg(res)
                         $scope.$broadcast('scroll.refreshComplete');
                        
                     }, function(error) {
                         $scope.hasMore = false;
                         showAlert.showMsg(error, '', '网络异常', '确认')
                     })
                 }*/
            };
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

        $scope.chooseTime = function(tesr) {
            dateList(tesr)
            ionicDatePicker.openDatePicker($scope.datepickerObject);
            dateList(tesr)
        }

    }])