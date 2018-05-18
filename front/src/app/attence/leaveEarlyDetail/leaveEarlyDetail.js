angular.module('BaiYin.attence.leaveEarlyDetail', [
    'ionic',
    'ionic-datepicker',
])

    .config(['$stateProvider', 'ionicDatePickerProvider',function ($stateProvider,ionicDatePickerProvider) {
        $stateProvider.state('attence/leaveEarlyDetail', {
            url: '/attence/leaveEarlyDetail',
            controller: 'leaveEarlyDetailController',
            templateUrl: 'attence/leaveEarlyDetail/leaveEarlyDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
        var datePickerObj = {
            inputDate: new Date(),
            setLabel: '选择',
            todayLabel: '今天',
            closeLabel: '关闭',
            mondayFirst: false,
            weeksList: ["日", "一", "二", "三", "四", "五", "六"],//["S", "M", "T", "W", "T", "F", "S"],
            monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],//["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            templateType: 'popup',
            from: new Date(2012, 1, 1),
            to: new Date(2020, 1, 1),
            showTodayButton: true,
            dateFormat: 'yyyy-MM-dd',
            closeOnSelect: false
        };
        ionicDatePickerProvider.configDatePicker(datePickerObj);
    }])
    .controller('leaveEarlyDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams','$ionicActionSheet','ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams,$ionicActionSheet,ionicDatePicker) {
        $scope.qqCause = true;
        $scope.$on('$ionicView.enter', function () {
                //获取当前月份
                getNowDate();
            });
            var date = new Date();

            function getNowDate() {
                $scope.now = $filter("date")(date, "yyyy-MM-dd");
            }

            /*//点击向前一个月
            $scope.getPreMonth = function (date) {
                console.log("date==" + date);
                var arr = date.split('-');
                var year = arr[0]; //获取当前日期的年份
                var month = arr[1]; //获取当前日期的月份
                var year2 = year;
                var month2 = parseInt(month) - 1;
                if (month2 == 0) {
                    year2 = parseInt(year2) - 1;
                    month2 = 12;
                }
                if (month2 < 10) {
                    month2 = '0' + month2;
                }
                var t2 = year2 + '-' + month2;
                $scope.now = t2;
            }
            //点击向后一个月
            $scope.getNextMonth = function (date) {
                console.log("date==" + date);
                var arr = date.split('-');
                var year = arr[0]; //获取当前日期的年份
                var month = arr[1]; //获取当前日期的月份
                var year2 = year;
                var month2 = parseInt(month) + 1;
                if (month2 == 13) {
                    year2 = parseInt(year2) + 1;
                    month2 = 1;
                }
                if (month2 < 10) {
                    month2 = '0' + month2;
                }

                var t2 = year2 + '-' + month2;
                $scope.now = t2;
            }*/
            $scope.toCause = function(){
                $scope.qqCause = false;
            }
            //点击选择部门
            var glassName = '';
            var glassArray = [{"text": "人事部"}, {"text": "财务部"}, {"text": "技术部"}, {"text": "现场部"}, {"text": "研发部"}, {"text": "销售部"}, {"text": "理财部"}];
            $scope.selectGlass = function() {

                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArray,
                    //destructiveText: 'Delete',
                    //titleText: 'Modify your album',
                    //cancelText: 'Cancel',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        glassName = glassArray[index].text;
                        $("#detailGalssId").val(glassName);
                        return true;
                    }
                });
            };
            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    $scope.now = $filter("date")(val, "yyyy-MM-dd");
                },
                from: new Date(2012, 1, 1),
                to: new Date(),
                inputDate: new Date(),
                mondayFirst: false,
                closeOnSelect: false,
                templateType: 'popup'
            };
            $scope.openDatePicker = function () {
                ionicDatePicker.openDatePicker(ipObj1);
            };
        }

    ])
