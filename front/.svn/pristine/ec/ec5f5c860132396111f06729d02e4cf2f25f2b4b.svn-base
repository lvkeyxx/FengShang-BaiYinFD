angular
    .module('BaiYin.erp.my', [
        'ionic',
        'BaiYin.erp.details'
    ])
    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('erpMy', {
            url: '/erp/my',
            controller: 'erpMyController',
            templateUrl: 'erp/my/my.tpl.html',
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
    .controller('erpMyController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', 'ionicDatePicker', '$ionicActionSheet',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, ionicDatePicker, $ionicActionSheet) {
            //标题
            $scope.titles = ["我申请的", "我审批的"];
            $scope.index = 0;
            //查询条件集合
            $scope.queryData = {pageIndex: 0};
            $scope.hasMore = false;
            //数据
            $scope.list = new Array();
            //进入页面
            $scope.$on('$ionicView.beforeEnter', function (event, view) {
                if(view.direction == "forward"){
                    getLuName();
                    $scope.index = $stateParams.item.index;
                    if($scope.index == 0){
                        $scope.queryData.submit_user = token.UserID;
                    }else if($scope.index == 1){
                        $scope.queryData.app_sign = token.UserID;
                    }
                }
            });

            var luName = [{text: "全部", id: ""}];
            //业务类型
            $scope.toSelectType = function(){
                var hideSheet = $ionicActionSheet.show({
                    buttons: luName,
                    buttonClicked: function (index) {
                        $scope.queryData.type = luName[index].text;
                        $scope.queryData.lu_name = luName[index].id;
                        return true;
                    }
                });
            };
             //获取业务类型
             var getLuName = function () {
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                $http
                    .post("ServiceName=ErpService&TransName=getLuName")
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if(res.code == 0){
                            res.data.forEach(function(v, i){
                                luName.push({
                                    text: v.DESCRIPTION,
                                    id: v.LOGIC_UNIT
                                });
                            });
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            };

            var datePickerConfig = {
                callback: function (val) {
                    $scope.queryData.record_time = $filter("date")(val, "yyyy-MM-dd");
                }
            };
            //提交时间
            $scope.toSelectTime = function () {
                datePickerConfig.inputDate = new Date($scope.queryData.record_time || new Date());
                ionicDatePicker.openDatePicker(datePickerConfig);
            };

            var $dom = $(".erpMyCSS .query, .erpMyCSS .dataList");
            //切换查询
            $scope.slideToggle = function () {
                $dom.slideToggle();
            }
            //点击搜索
            $scope.select = function (slideToggle) {
                $scope.hasMore = true;
                $scope.list = new Array();
                $scope.queryData.pageIndex = 0;
                $scope.toInquiry(true);
            };
            //查询
            $scope.toInquiry = function (slideToggle) {
                ++$scope.queryData.pageIndex;
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                $http
                    .post("ServiceName=ErpService&TransName=getRecordList", $scope.queryData)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if(res.code == 0){
                            if(res.data.length == 0){
                                $scope.hasMore = false;
                            }else{
                                $scope.list = $scope.list.concat(res.data.map(function(v, i){
                                    v.MSG_INFO = v.MSG_INFO ? v.MSG_INFO.replace(/\n/g, "<br/>") : "";
                                    return v;
                                }));
                            }

                            if(slideToggle){
                                $scope.slideToggle();
                            }
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        $scope.hasMore = false;
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            };

            //详情
            $scope.toDetailsPage = function (data) {
                $state.go('erpDetails', {item: {data: data, type: "details"}});
            };
        }
    ]);