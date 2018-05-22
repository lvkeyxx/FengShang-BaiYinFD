angular.module('maxrocky.framework.directives',[
	'maxrocky.framework.directives.rem',
	'maxrocky.framework.directives.navBar',
	'maxrocky.framework.directives.goback'
])
angular.module('maxrocky.framework',[
	'maxrocky.framework.directives'
	// 'maxrocky.framework.swiper',
	// 'maxrocky.framework.iscroll'
])


angular.module('BaiYin.app.config', [
    'ionic'
])

/*
 *  正式
 */
//外网
/*.constant('outerNetUri', 'http://61.178.91.96:57001/AppSerivce/json?')

//内网
.constant('intranetUri', 'http://10.0.12.80:57001/AppSerivce/json?')*/

/*
 *  测试
 */
//外网
//.constant('outerNetUri', 'http://124.152.7.69:57001/AppSerivce/json?')
.constant('outerNetUri', 'http://192.168.1.112:81/AppSerivce/json?')
//
//内网
//.constant('intranetUri', 'http://10.0.12.73:57001/AppSerivce/json?')
.constant('intranetUri', 'http://192.168.1.112:81/AppSerivce/json?')

.constant('AppDefaultRootUrl', '/blankPage')

.constant('HTTP_COMMON_ERROR_MESSAGE_INTRANET', '网络异常(内网)!')

.constant('HTTP_COMMON_ERROR_MESSAGE_OUTERNET', '网络异常(外网)!')

//configs
.config(['$ionicConfigProvider', '$provide', '$httpProvider', '$urlRouterProvider', 'AppDefaultRootUrl', '$locationProvider',
    function($ionicConfigProvider, $provide, $httpProvider, $urlRouterProvider, AppDefaultRootUrl, $locationProvider) {
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.navBar.positionPrimaryButtons('left')
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.icon('backBtn');
        $ionicConfigProvider.scrolling.jsScrolling(true);
        //防止ios滑跑
        $ionicConfigProvider.views.swipeBackEnabled(false);
        $httpProvider.defaults.timeout = 500;

        $provide.decorator('ngClickDirective', ['$delegate', '$timeout', function($delegate, $timeout) {
            var original = $delegate[0].compile;
            var delay = 100;
            $delegate[0].compile = function(element, attrs, transclude) {

                var disabled = false;

                function onClick(evt) {
                    if (disabled) {
                        evt.preventDefault();
                        evt.stopImmediatePropagation();
                    } else {
                        disabled = true;
                        $timeout(function() { disabled = false; }, delay, false);
                    }
                }
                element.on('click', onClick);

                return original(element, attrs, transclude);
            };
            return $delegate;
        }]);

        /**
         * 重定向
         */
        $urlRouterProvider.otherwise(AppDefaultRootUrl);

        /**
         * [enabled description]
         * @type {Boolean}
         * 开启html5的history api
         */

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
]);

angular.module('BaiYin.app', [
    'ionic',
    'maxrocky.framework',
    'BaiYin.common',
    'BaiYin.app.config',
    'BaiYin.templates',
    'BaiYin.home',
    'BaiYin.login',
    'BaiYin.app.mock',
    'BaiYin.userServers',
    'BaiYin.KPIs',
    'BaiYin.News',
    'BaiYin.boardA',
    'BaiYin.attenceA',
    'BaiYin.OSIA',
    'BaiYin.OffLineA',
    'BaiYin.taskManageA',
    'BaiYin.facilityInfoA',
    'BaiYin.pm.troubleA',
    'BaiYin.pm.defectFillA',
    'BaiYin.pm.journalA',
    'BaiYin.powerA',
    'BaiYin.loadA',
    'BaiYin.AgentsA',
    'BaiYin.userConfig',
    'BaiYin.companyNewsDetails',
    'BaiYin.ProblemsA',
    'BaiYin.LeavesA',
    'BaiYin.erp'
])
    .run(['$rootScope', 'CurrentUserService', '$ionicPlatform', '$ionicPopup', '$location', '$ionicHistory', '$ionicLoading', 'Session', '$http', 'SavePopShowFristService',
        function ($rootScope, CurrentUserService, $ionicPlatform, $ionicPopup, $location, $ionicHistory, $ionicLoading, Session, $http, SavePopShowFristService) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    if ($ionicPlatform.isIOS()) {
                        window.cordova.plugins.Keyboard.disableScroll(true);
                    }
                }
            });
                $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
                    CurrentUserService.usrAuth(evt, toState, toParams, fromState, fromParams);
                });
                $rootScope.$on('tokenBug', function (event, mass) {
                    CurrentUserService.tokenBug(event, mass);
                });

                $rootScope.$on('noData', function (event, msg) {
                    CurrentUserService.noDataInfo(event, msg);
                })

                //主页面显示退出提示框
                $ionicPlatform.registerBackButtonAction(function (e) {
                    e.preventDefault();

                    function showConfirm() {
                        $ionicLoading.hide();
                        var confirmPopup = $ionicPopup.confirm({
                            title: '<strong>退出应用?</strong>',
                            template: '你确定要退出应用吗?',
                            okText: '退出',
                            cancelText: '取消'
                        });

                        confirmPopup.then(function (res) {
                            if (res) {
                                if (Session.userInfoData && Session.userInfoData.LoginStatus == '1') {
                                    $http.get('ServiceName=UserService&TransName=logout').then(function (res) {
                                        $ionicHistory.clearHistory();
                                        $ionicHistory.clearCache().then(function () {
                                            $ionicHistory.nextViewOptions({
                                                disableAnimate: true,
                                                disableBack: true,
                                                historyRoot: true
                                            });
                                            token = null;
                                            var user = null;
                                            CurrentUserService.updateSession(res.data, user);
                                            SavePopShowFristService.setPopShowBlr(false);
                                            if (isApp) {
                                                window.JMessage.logout(function (response) {
                                                    console.log("退出成功");
                                                    ionic.Platform.exitApp();
                                                }, function (response) {
                                                    console.log(response);
                                                    ionic.Platform.exitApp();
                                                });
                                            }
                                        });
                                    }, function (err) {
                                        showAlertOut('', '退出失败,请检查网络后重试', '确认');
                                    });
                                } else {
                                    CurrentUserService.destroyUserSession();
                                    token = null;
                                    ionic.Platform.exitApp();
                                }
                            } else {
                                // Don't close
                            }
                        });
                    }

                    // Is there a page to go back to?
                    if ($location.path() == '/blankPage' || $location.path() == '/tabs/homePage' || $location.path() == '/tabs/companyAddressBook' || $location.path() == '/tabs/message' || $location.path() == '/tabs/mine' || $location.path() == '/tabs/porductManage') {
                        showConfirm();
                    } else {
                        $ionicHistory.goBack();
                    }
                    return false;
                }, 400);

                var showAlertOut = function (title, template, okText) {
                    var alertPopup = $ionicPopup.alert({
                        title: title,
                        okText: okText,
                        template: template
                    });
                    alertPopup.then(function (res) {
                    });
                };
            }
        ])

        .
            controller('AppController', ['$scope', '$ionicPopup', '$ionicHistory', '$http', '$ionicPopup', '$state',
                function ($scope, $ionicPopup, $ionicHistory, $http, $ionicPopup, $state) {
                    $scope.myGoBack = function () {
                        $ionicHistory.goBack();
                    }

                    var onOpenNotification = function (event) {
                        try {
                            var alertContent;
                            if (device.platform == "Android") {
                                alertContent = event.alert;
                            } else {
                                alertContent = event.aps.alert;
                                window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                            }
                            showAlert('', alertContent, '确认');
                        } catch (exception) {
                            console.log("JPushPlugin:onOpenNotification" + exception);
                        }
                    };

                    //iOS处于前台收到消息
                    var onReceiveNotification = function (event) {
                        if (device.platform != "Android") {
                            var alertContent
                            alertContent = event.aps.alert
                            showAlert('', alertContent, '确认');
                            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                        }
                    }

                    var initiateUI = function () {
                        try {
                            window.JPush.init();
                            //未登录停止推送
                            window.plugins.jPushPlugin.stopPush();
                            if (device.platform != "Android") {
                                window.plugins.jPushPlugin.setDebugModeFromIos();
                                window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
                            } else {
                                window.plugins.jPushPlugin.setDebugMode(true);
                                window.plugins.jPushPlugin.setStatisticsOpen(true);
                            }
                        } catch (exception) {
                            console.log(exception);
                        }
                    };

                    document.addEventListener('jmessage.onOpenMessage', function (msg) {
                        $state.go('tabs/message');
                    }, false);

                    //初始化监听
                    document.addEventListener("deviceready", initiateUI, false);

                    //通知监听
                    document.addEventListener("jpush.openNotification", onOpenNotification, false);

                    //应用程序处于前台时收到推送会触发该事件
                    document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);

                    //监听收到好友请求
                    document.addEventListener('jmessage.onInviteReceived', function (msg) {
                        if (!msg.reason || msg.reason == 'null') {
                            showConfirm(msg.fromUsername + ' 请求加您为好友,描述信息为: 空', '同意', '拒绝', msg.fromUsername);
                        } else {
                            showConfirm(msg.fromUsername + ' 请求加您为好友,描述信息为: ' + msg.reason, '同意', '拒绝', msg.fromUsername);
                        }
                    }, false);

                    //当前用户发送的好友请求被接受
                    document.addEventListener('jmessage.onInviteAccepted', function (msg) {
                        showAlert('', msg.fromUsername + ' 已接受您的请求', '确认');
                    }, false);

                    //当前用户发送的好友请求被拒绝
                    document.addEventListener('jmessage.onInviteDeclined', function (msg) {
                        showAlert('', msg.fromUsername + ' 已拒绝您的请求', '确认');
                    }, false);


                    var showAlert = function (title, template, okText) {
                        var alertPopup = $ionicPopup.alert({
                            title: title,
                            okText: okText,
                            template: template
                        });
                        alertPopup.then(function (res) {
                        });
                    };
                    var showConfirm = function (template, leftText, rightText, targetUsername) {
                        var messagePopup = $ionicPopup.confirm({
                            template: template,
                            okText: leftText,
                            cancelText: rightText
                        });
                        messagePopup.then(function (res) {
                            if (res) {
                                window.JMessage.acceptInvitation(targetUsername, null,
                                    function (response) {
                                    },
                                    function (errorStr) {
                                        console.log(errorStr);
                                    })
                            } else {
                                window.JMessage.declineInvitation(targetUsername, null, '',
                                    function (response) {
                                        console.log('ju success');
                                    },
                                    function (errorStr) {
                                        console.log(errorStr);
                                    })
                            }
                        });
                    }
                }
            ]);
angular.module('BaiYin.app.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenGET('/workbench/staffVersion/1').passThrough();
    $httpBackend.whenGET('/workbench/staffVersion/2').passThrough();
}])
angular.module('maxrocky.framework.directives.goback',[
])

.directive('mrGoBack',['$ionicHistory','$parse', '$filter', function($ionicHistory,$parse, $filter){
	return {
		restrict:'C',
		link: function(scope, element, attrs){
            element.on('click',function(){
             	$ionicHistory.goBack();
            });
		}
	};
}])
angular.module('maxrocky.framework.directives.navBar',[
])

.directive('mrNavBar',['$parse', '$filter', function($parse, $filter){

	return {
		restrict:'C',
		scope:{
			opacity:"="
		},
		link: function(scope, element, attrs){
			scope.$watch('opacity',function(newValue){
				newValue=newValue||0;
				element.css('opacity',newValue);
			})
		}
	};
}])
angular.module('maxrocky.framework.directives.rem',[
])

.directive('mrRem',['$parse', '$filter', function($parse, $filter){

	return {
		restrict:'A',
		link: function(scope, element, attrs){
	    var _size = 50;
        var p = (document.body && document
            .body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) /375
       _size = p * 50; 
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _size + "px!important");
      
		}
	};
}])
angular.module('BaiYin.Agents', [
    'BaiYin.Agents.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('Agents', {
        url: '/Agents',
        controller: 'AgentsController',
        templateUrl: 'Agents/Agents.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('ServiceName=ApproveService&TransName=getUnApprvedList');
            }]
        },
        authorizedRuleType: ['1']
    })
}])

.controller('AgentsController', ['$scope', '$http', 'resolvedData', '$state',
    function($scope, $http, resolvedData, $state) {
        $scope.listLength = resolvedData.data.length
        $scope.erpAgents = function() {
            $state.go('AgentsList', {})
        }
    }
])
angular.module('BaiYin.Agents.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.AgentsA', [
    'BaiYin.Agents',
    'BaiYin.agentsList',
    'BaiYin.agentsView',
    'BaiYin.historyList',
    'BaiYin.historyDetail',
])
angular.module('BaiYin.Leaves', [
        'BaiYin.Leaves.mock'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('Leaves', {
            url: '/Leaves',
            controller: 'LeavesController',
            templateUrl: 'AllLeave/Leaves.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])
    .controller('LeavesController', ['$scope', '$http', '$state',
        function($scope, $http, $state) {
            $scope.goLeaves = function(res) {
                if (res == 1) {
                    $state.go("LeavesList");
                } else {
                    $state.go("VacationList");
                };
            };
        }
    ])
angular.module('BaiYin.Leaves.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.LeavesA', [
    "BaiYin.Leaves",
    "BaiYin.LeavesList",
    "BaiYin.LeavesDetail",
    "BaiYin.newLeaves",
    "BaiYin.VacationList",
    "BaiYin.VacationDetail",
    "BaiYin.newVacation"
])
angular.module('BaiYin.attence', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('attence', {
            url: '/attence',
            controller: 'attenceController',
            templateUrl: 'attence/attence.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('attenceController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout','$filter',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout,$filter) {

            $scope.$on('$ionicView.afterEnter', function () {
                var nowtady=new Date();
                $scope.nowDate = $filter("date")(nowtady, "yyyy-MM-dd");
                getHomePageDate();
            });
            $scope.$on('$ionicView.leave',function () {
                $scope.searchBtn = false;
                $scope.$apply(function () {
                    $("#blueToothAddress").text('');
                });
            })
            //返回
            $scope.goindex = function () {
                $state.go('tabs/homePage');
            }
            //显示和隐藏上班打卡时间
            $scope.sbdktimeShow = true;
            $scope.clockinBtn = false;
            $scope.searchBtn = false;
            $scope.xbdktimeShow = true;
            $scope.clockoutBtn = false;
            //点击上班打卡
            $scope.toClockIn = function () {
                loadingAnimation.showLoading('加载中', 'loding', 0);
                judgeTimes($scope.workTime.detail.START_TIME,'punckTheClockOn');


                // punckTheClockOn();

            }
            //点击下班打卡
            $scope.toClockout = function () {
                loadingAnimation.showLoading('加载中', 'loding', 0);
                judgeTimes($scope.workTime.detail.END_TIME,'punckTheClockOff');


                // punckTheClockOff();

            }
            //点击更新打卡
            $scope.toClockupdate = function () {
                if($("#blueToothAddress").text() == ''){
                    showAlert.showMsg('','','请先搜索蓝牙设备');
                    return false;
                }
                loadingAnimation.showLoading('加载中', 'loding', 0);
                // punckTheClockOff();
                judgeTimes($scope.workTime.detail.END_TIME,'punckTheClockOff');
            }
            //点击我的考勤
            $scope.toMyattence = function () {
                $state.go('attence/myAttence');
            }
            //点击考勤统计
            $scope.tocountAttence = function () {
                var sec = token.sec;
                var noAuth=true;
                if(sec!=undefined){
                    if(sec.length>0){
                        for(var no in sec){
                            if(sec[no].SEC_NO=='K001'){
                                noAuth=false;
                                break;
                            }
                        }
                    }
                }
                if(noAuth){
                    showAlert.showMsg('', '', '您无权操作考勤统计', '确认');
                    return;
                }
                $state.go('attence/countAttence');
            }
            //点击缺勤事由
            $scope.tofillCause = function () {
                /*var sec = token.sec;
                var noAuth=true;
                if(sec!=undefined){
                    if(sec.length>0){
                        for(var no in sec){
                            if(sec[no].SEC_NO=='K002'){
                                noAuth=false;
                                break;
                            }
                        }
                    }
                }
                if(noAuth){
                    showAlert.showMsg('', '', '您无权操作考勤事由', '确认');
                    return;
                }*/
                $state.go('attence/fillCause');
            }
            //点击搜索蓝牙
            $scope.searchBlueTooth = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                // $scope.searchBtn = true;
                blueToothEnable();
            }

            //开启本机蓝牙
            function blueToothEnable() {
                ble.enable(
                    function () {
                        scanBlueTooth();
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("","","蓝牙未开启");

                    }
                );
            }

            //扫描蓝牙
            function scanBlueTooth() {
                $scope.blueToothList = [];
                $scope.timer = $timeout(function () {
                    if ($scope.blueToothList.length > 0) {
                        upWindow($scope.blueToothList);
                    } else {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "未扫描到蓝牙设备");

                    }
                }, 5000);
                ble.scan([], 5, function (device) {//成功的回调函数
                        getBlueToothList(device);
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "扫描蓝牙失败");

                    }
                );
            }

            //获取蓝牙列表
            function getBlueToothList(device) {
                $http.post('ServiceName=ClockService&TransName=blueToothDetail&SN=' + device.id)
                    .then(function (res) {
                        if (res.data.code == '0') {
                            // alert(JSON.stringify(res));
                            $scope.blueToothdetail=res.data.detail;
                            // alert(res.data.detail.length);
                            for(var i=0;i<$scope.blueToothdetail.length;i++){
                                $scope.blueToothList.push($scope.blueToothdetail[i]);
                            }



                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //获取首页日期
            function getHomePageDate() {
                $http.post('ServiceName=ClockService&TransName=clockPage')
                    .then(function (res) {
                        //获取部门、姓名
                        $scope.DeptName = token.DeptName;
                        $scope.UserName = token.UserName;
                        if(res.code == '0'){
                            $scope.homePageDate = res.data;
                            if (res.data.detail.ACTUAL_START_TIME != null && res.data.detail.ACTUAL_START_TIME != '') {
                                $("#clockInid").text(res.data.detail.ACTUAL_START_TIME);
                                $scope.Go_START_TIME=res.data.detail.START_TIME_HOUR;
                                $scope.Go_END_TIME=res.data.detail.END_TIME_HOUR;
                                $scope.sbdktimeShow = false;
                                $scope.clockinBtn = true;
                            }
                            if (res.data.detail.ACTUAL_END_TIME != null && res.data.detail.ACTUAL_END_TIME != '') {
                                $("#clockOutid").text( res.data.detail.ACTUAL_END_TIME);
                                $scope.Go_START_TIME=res.data.detail.START_TIME_HOUR;
                                $scope.Go_END_TIME=res.data.detail.END_TIME_HOUR;
                                $scope.xbdktimeShow = false;
                                $scope.clockoutBtn = true;
                            }
                            if (res.data.detail.ACTUAL_END_TIME == null || res.data.detail.ACTUAL_END_TIME == '') {
                                $scope.xbdktimeShow = true;
                                $scope.clockoutBtn = false;
                                $("#xbPunchClock").attr("disabled", true);
                                $("#xbPunchClock").addClass("clockoutgreyBtn");
                                $("#xbPunchClock").removeClass("clockoutBtn");
                            }
                        }
                        if(res.code == '1'){
                            $("#sbPunchClock").attr("disabled", true);
                            $("#sbPunchClock").addClass("clockingreyBtn");
                            $("#sbPunchClock").removeClass("clockinBtn");
                            $("#xbPunchClock").attr("disabled", true);
                            $("#xbPunchClock").addClass("clockoutgreyBtn");
                            $("#xbPunchClock").removeClass("clockoutBtn");
                        }else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //截取时间字符串转换格式
            function substrDate(datetime){
                var olddatetime=datetime.substr(0,8);
                return olddatetime.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
            }
            //获取上下班时间
            function getWorkTime(SN, CONTRACT,RULE_ID) {
                $http.post('ServiceName=ClockService&TransName=clockTimeBySn&SN=' + SN + '&CONTRACT=' + CONTRACT+'&RULE_ID='+RULE_ID)
                    .then(function (res) {
                        console.log(res);
                        //alert(JSON.stringify(res));
                        if (res.data.code == '0') {
                            $scope.workTime = res.data;
                            $scope.TRANSACTION_ID = $scope.workTime.detail.TRANSACTION_ID;
                            if(!$scope.workTime.detail.START_TIME_HOUR){
                                $scope.Go_START_TIME=$scope.Go_START_TIME
                            }else{
                                $scope.Go_START_TIME=$scope.workTime.detail.START_TIME_HOUR;
                            }
                            $scope.Go_END_TIME=$scope.workTime.detail.END_TIME_HOUR;
                            if ($scope.workTime.detail.ACTUAL_START_TIME != null && $scope.workTime.detail.ACTUAL_START_TIME != '') {
                                $("#clockInid").text( $scope.workTime.detail.ACTUAL_START_TIME);
                                $scope.sbdktimeShow = false;
                                $scope.clockinBtn = true;
                            }else{
                                $scope.sbdktimeShow = true;
                                $scope.clockinBtn = false;
                            }
                            if ($scope.workTime.detail.ACTUAL_END_TIME != null && $scope.workTime.detail.ACTUAL_END_TIME != '') {
                                $("#clockOutid").text($scope.workTime.detail.ACTUAL_END_TIME);
                                $scope.xbdktimeShow = false;
                                $scope.clockoutBtn = true;
                            }else{
                                $scope.xbdktimeShow = true;
                                $scope.clockoutBtn = false;
                            }
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //判讀打卡時間
            function judgeTimes(workdate,punck){
                var t1 = workdate;
                var d1 = t1.replace(/\-/g, "/");
                var date1 = new Date(d1);
                var nowdate=new Date();
                console.log("=======");
                var chatime=Math.abs((date1 - nowdate) / 1000 / 60/60);
                if(chatime>4){
                    loadingAnimation.hideLoading();
                    $scope.data = new Object();
                    $scope.data.tishi="当前时间与计划打卡时间大约相差"+Math.round(chatime)+"小时,您确定打卡吗?"
                    // 自定义弹窗
                    var mynewPopup = $ionicPopup.show({
                        template:$scope.data.tishi,
                        title: '提示',
                        $scope:$scope,
                        buttons: [
                            {
                                text: '取消',
                                type: 'button-cancel',
                                onTap: function(e) {

                                }

                            },
                            {
                                text: '<b>确认</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if(punck=='punckTheClockOn'){
                                        $scope.sbdktimeShow = false;
                                        $scope.clockinBtn = true;
                                        punckTheClockOn()
                                    }else if(punck=='punckTheClockOff'){
                                        $scope.xbdktimeShow = false;
                                        $scope.clockoutBtn = true;
                                        punckTheClockOff()
                                    }


                                }
                            },
                        ]
                    });
                    mynewPopup.then(function (res) {
                        console.log('Tapped!', res);
                    });
                }else{
                    if(punck=='punckTheClockOn'){
                        $scope.sbdktimeShow = false;
                        $scope.clockinBtn = true;
                        punckTheClockOn()
                    }else if(punck=='punckTheClockOff'){
                        $scope.xbdktimeShow = false;
                        $scope.clockoutBtn = true;
                        punckTheClockOff()
                    }
                }
            }

            //上班打卡
            function punckTheClockOn() {
                var parmas = {
                    SN: $scope.SERIAL_NO_CODE,
                    ADDR: $scope.ADDR,
                    START_TIME:$scope.workTime.detail.START_TIME,
                    END_TIME:$scope.workTime.detail.END_TIME,
                    TRANSACTION_ID: $scope.workTime.detail.TRANSACTION_ID,
                    FLG:0
                };
                $http.post('ServiceName=ClockService&TransName=punchClock', parmas)
                    .then(function (res) {
                        if (res.data.code == '0') {
                            loadingAnimation.hideLoading();
                            $scope.punckClockOn = res.data;
                            $("#clockInid").text($scope.punckClockOn.clockTips);

                        } else {
                            showAlert.showMsg('','',res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //下班打卡
            function punckTheClockOff() {
                var parmas = {
                    SN: $scope.SERIAL_NO_CODE,
                    ADDR: $scope.ADDR,
                    START_TIME:$scope.workTime.detail.START_TIME,
                    END_TIME:$scope.workTime.detail.END_TIME,
                    TRANSACTION_ID: $scope.workTime.detail.TRANSACTION_ID,
                    FLG:1
                };
                if($scope.clockinBtn==false){
                    showAlert.showMsg('','','你还未上班打卡!');
                    $scope.xbdktimeShow = true;
                    $scope.clockoutBtn = false;
                    loadingAnimation.hideLoading();
                    return ;
                }
                $http.post('ServiceName=ClockService&TransName=punchClock', parmas)
                    .then(function (res) {
                        if (res.data.code == '0') {
                            $scope.punckClockOff = res.data;
                            $("#clockOutid").text($scope.punckClockOff.clockTips);
                            loadingAnimation.hideLoading();
                        } else {
                            showAlert.showMsg('','',res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //弹出页面，显示扫描到的设备
            var searchPopup;

            function upWindow(blueToothList) {
                // alert(JSON.stringify($scope.blueToothList));
                loadingAnimation.hideLoading();
                searchPopup = $ionicPopup.show({
                    template:'<div ng-style="closesearchequip" ng-click="closeBlueTooths()">X</div>'+ '<div>' +
                    '<ul>' +
                    '<li id="device_{{$index}}" ng-click="selectBlueTooth($index)" ng-repeat="blueTooth in blueToothList track by $index" ng-style="searchPopupli">' +
                    '{{blueTooth.DEVICE_LOCATION}}-{{blueTooth.RULE_DESC}}' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                    title: '扫描到的蓝牙设备',
                    scope: $scope,
                });
            }
            $scope.closesearchequip= {
                "width": "20px",
                "height": "20px",
                "position": "absolute",
                "top":"5px",
                "color":"#333333",
                "font-size":"15px",
                "line-height":"18px",
                "font-family":"sans-serif",
                "text-align":"center",
                "border-radius":'50%',
                "border":"1px solid #333333",
                "right":"10px"
            };
            $scope.closeBlueTooths=function () {
                searchPopup.close();
                $scope.searchBtn = false;
            }
            //点击选择蓝牙设备
            $scope.selectBlueTooth = function (index) {
                $scope.searchBtn = false;
                $("#blueToothAddress").text($("#device_" + index).text());
                searchPopup.close();
                $scope.SERIAL_NO_CODE = $scope.blueToothList[index].SERIAL_NO;
                $scope.RULE_ID = $scope.blueToothList[index].RULE_ID;
                $scope.ADDR = $scope.blueToothList[index].DEVICE_LOCATION;
                getWorkTime($scope.blueToothList[index].SN_CODE, $scope.blueToothList[index].CONTRACT,$scope.RULE_ID);
                $("#sbPunchClock").attr("disabled", false);
                $("#sbPunchClock").addClass("clockinBtn");
                $("#sbPunchClock").removeClass("clockingreyBtn");
                $("#xbPunchClock").attr("disabled", false);
                $("#xbPunchClock").addClass("clockoutBtn");
                $("#xbPunchClock").removeClass("clockoutgreyBtn");

            }
            $scope.searchPopupli = {
                "line-height": "35px",
                "font-size": "12px",
                "text-align": "center",
                "border-bottom": "1px dotted #f4f4f4",
            }

        }

    ])

angular.module('BaiYin.attenceA', [
    'BaiYin.attence',
    'BaiYin.attence.myAttence',
    'BaiYin.attence.countAttenceA',
    'BaiYin.attence.fillCause',
    'BaiYin.attence.attenceCdDetail',
    'BaiYin.attence.attenceWdDetail',
    'BaiYin.attence.attenceZtDetail',
    'BaiYin.attence.attenZcDetail',
    'BaiYin.attence.leaveEarlyDetail',
])
angular.module('BaiYin.boardA', [
    'BaiYin.bulletinBoard',
    'BaiYin.bulletinBoard.edit',
    'BaiYin.bulletinBoard.view',
])
angular.module('BaiYin.bulletinBoard', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bulletinBoard', {
            url: '/bulletinBoard',
            controller: 'bulletinBoardController',
            templateUrl: 'bulletinBoard/bulletinBoard.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])
    .controller('bulletinBoardController', ['$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$ionicTabsDelegate', '$stateParams',
        function ($scope, showAlert, loadingAnimation, $http, $state, $ionicTabsDelegate, $stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                bulletinInit();
            });

            //点击标题
            $scope.toEdit = function (line_no) {
                console.log("toEdit.line_no==="+line_no);
                $state.go('bulletinBoard/edit', {LINE_NO: line_no})
            };

            //初始化白板公告列表
            function bulletinInit() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=WhiteBoardService&TransName=listWhiteBoardNewspaper')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.tList = res.data.tList;
                        } else {
                            showAlert.showMsg('', '', res.data.msg);

                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

        }
    ])

angular.module('BaiYin.common', [
    'BaiYin.common.httpTransform',
    'BaiYin.common.httpBaseUrlSupport',
    'BaiYin.common.httpMockBaseUrlSupport',
    'BaiYin.common.login',
    'BaiYin.common.pageInit',
    'BaiYin.common.saveData',
    'BaiYin.common.cordova',
    'BaiYin.common.savePopShowFrist',
    'BaiYin.common.saveVersion',
    'BaiYin.common.eCharts',
    'BaiYin.common.loading',
    'BaiYin.common.showAlert',
    'BaiYin.agentsView',
    'BaiYin.flowDetail'

])
if (!isApp) {
    var module = angular.module('BaiYin.common.cordova', [])
    module.factory('MrCamera', [function() {
        return {
            getPicture: function() {
                //alert("没有硬件");
            },
        };
    }])
    module.factory('MrImagePicker', [function() {
        return {
            getPictures: function() {
                //  alert("没有硬件");
            },
        };
    }])
    module.factory('MrActionSheet', [function() {
        return {
            show: function() {
                //alert("没有硬件");
            },
        };
    }])
    module.factory('MrDevice', [function() {
        return {
            getDevice: function() {
                // alert("没有硬件");
            },
        };
    }])
    module.factory('MrVersion', [function() {
        return {
            getVersionNumber: function() {
                // alert("没有硬件");
            },
        };
    }])
} else {
    var module = angular.module('BaiYin.common.cordova', ['ngCordova'])
    module.factory('MrCamera', ['$cordovaCamera', function($cordovaCamera) {
        return $cordovaCamera;
    }])
    module.factory('MrImagePicker', ['$cordovaImagePicker', function($cordovaImagePicker) {
        return $cordovaImagePicker;
    }])
    module.factory('MrActionSheet', ['$ionicActionSheet', function($ionicActionSheet) {
        return $ionicActionSheet;
    }])
    module.factory('MrDevice', ['$cordovaDevice', function($cordovaDevice) {
        return $cordovaDevice;
    }])
    module.factory('MrVersion', ['$cordovaAppVersion', function($cordovaAppVersion) {
        return $cordovaAppVersion;
    }])
}

angular.module('BaiYin.common.dateFilter', [])

.filter('myFilter',[function(){
    return function(input){
    	var arr1=[];
    	arr1=input;
        var out='';
        var arr=[];
       arr=arr1.split(' ')[0].split('-');
      out=arr[0]+"年"+arr[1]+'月'+arr[2]+'日';
        return out;
    }

}])

angular.module('BaiYin.common.eCharts', [])
.factory('kpi_echarts', [function() {
    var pageInit = {};
    pageInit.kpiEcharts = function(dataInfo, idname) {
        var myChart = echarts.init(document.getElementById(idname));
        var option = {
            title: dataInfo.title,
            tooltip: {},
            grid:{
                top:'25%',
                left:'15%',
                right:'15%',
                bottom:'15%'
            },
            tooltip: {
                trigger:'axis'//显示每个点
            },
            legend: {
                data: ['销量']
            },
            xAxis: dataInfo.xAxis,
            yAxis: dataInfo.yAxis,
            series: dataInfo.series
        };
        myChart.setOption(option)
    };
    return pageInit;
}])
angular.module('BaiYin.common.httpBaseUrlSupport', [
    'ionic',
    'BaiYin.app.config'
])

.config(['$provide', 'intranetUri', 'outerNetUri', function($provide, intranetUri, outerNetUri) {
    function combineUrl(baseUrl, url) {
        while (url.indexOf('/') === 0) url = url.substring(1);
        if (token != null) {
            return baseUrl + url + '&SignToken=' + token.SignToken + '&UserID=' + token.UserID;
        } else {
            return baseUrl + url;
        }
    }

    //装饰者$http
    $provide.decorator('$http', ['$delegate', function($delegate) {
        var $http = $delegate;

        var wrapper = function() {
            return $http.apply($http, arguments);
        };

        Object.keys($http).filter(function(key) {
            return (typeof $http[key] === 'function');
        }).forEach(function(key) {
            wrapper[key] = function() {
                var url = arguments[0];
                // console.log("url==="+url);
                if (url.match('.tpl.html') || url.indexOf('http://') === 0) {
                    return $http[key].apply($http, arguments);
                } else if (localStorage.getItem('uri') != null) {
                    url = combineUrl(intranetUri, url);
                    arguments[0] = url;
                    if (token != null) {
                        arguments[0] = url+"&urlType=intra";
                    }
                    console.log("进入内网intranetUri==="+url);
                    return $http[key].apply($http, arguments);
                } else if (localStorage.getItem('uri') == null) {
                    url = combineUrl(outerNetUri, url);
                    arguments[0] = url;
                    if (token != null) {
                        arguments[0] = url+"&urlType=outer";
                    }
                    console.log("切入外网outerNetUri==="+url);
                    return $http[key].apply($http, arguments);
                }
            };
        });
        return wrapper;
    }]);
}])
angular.module('BaiYin.common.httpMockBaseUrlSupport', [
    'ionic',
    'ngMockE2E',
    'BaiYin.app.config'
])

.config(['$provide', 'intranetUri', 'outerNetUri', function($provide, intranetUri, outerNetUri) {
    function combineUrl(baseUrl, url) {
        while (url.indexOf('/') === 0) url = url.substring(1);
        if (token != null) {
            console.log(baseUrl + url + '&SignToken=' + token.SignToken + '&UserID=' + token.UserID);
            return baseUrl + url + '&SignToken=' + token.SignToken + '&UserID=' + token.UserID;
        } else {
            return baseUrl + url;
        }
    }

    //装饰者伪HTTP后台
    // $provide.decorator('$httpBackend', ['$delegate', function($delegate) {
    //     var $httpBackend = $delegate;
    //     var when = $httpBackend.when;
    //     $httpBackend.when = function() {
    //         var url = arguments[1];
    //         if (typeof url === 'string' && url.indexOf('http://') !== 0 && (url.indexOf('.tpl.html') === -1 || url.indexOf('.tpl.html') !== url.length - 9)) {
    //             if (localStorage.getItem('uri') == null) {
    //                 url = combineUrl(intranetUri, url);
    //                 arguments[1] = url;
    //             } else {
    //                 url = combineUrl(outerNetUri, url);
    //                 arguments[1] = url;
    //             }
    //             return when.apply($httpBackend, arguments);
    //         } else if (url instanceof RegExp && url.source.indexOf('http:\\/\\/') !== 0) {
    //             if (localStorage.getItem('uri') == null) {
    //                 url = new RegExp(combineUrl(intranetUri, url.source));
    //                 arguments[1] = url;
    //             } else {
    //                 url = new RegExp(combineUrl(outerNetUri, url.source));
    //                 arguments[1] = url;
    //             }
    //             return when.apply($httpBackend, arguments);
    //         } else {
    //             return when.apply($httpBackend, arguments);
    //         }
    //     }

    //     return $httpBackend;
    // }]);
}])
angular.module('BaiYin.common.httpTransform', [
    'ionic',
    'BaiYin.app.config'
])

.config(['$httpProvider', function($httpProvider) {
    //注册拦截器
    $httpProvider.interceptors.push('commonResponseParser');
    $httpProvider.defaults.withCredentials = true;
    //设置跨域访问
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; //设置请求头
}])

.factory('commonResponseParser', ['$q', 'HTTP_COMMON_ERROR_MESSAGE_INTRANET', 'HTTP_COMMON_ERROR_MESSAGE_OUTERNET', '$rootScope', function($q, HTTP_COMMON_ERROR_MESSAGE_INTRANET, HTTP_COMMON_ERROR_MESSAGE_OUTERNET, $rootScope) {
    return {
        response: function(response) {
            if (!!response.config.url.match('.tpl.html'))
                return response;
            if (response.data && response.data.code === '0' || response.data.code === 0) {
                return response.data;
            } else if (response.data.msg) {
                if (response.data.code == 0999 || response.data.code == '0999') {
                    $rootScope.$broadcast('tokenBug', [response.data.msg]);
                } else {
                    return $q.reject({
                        code: response.data.code,
                        msg: response.data.msg,
                        status: response.status,
                        headers: response.headers
                    });
                }
            } else {
                return $q.reject(response);
            }
        },
        responseError: function(rejection) {
            if (localStorage.getItem('uri') != null) {
                return $q.reject(HTTP_COMMON_ERROR_MESSAGE_INTRANET);
            } else {
                return $q.reject(HTTP_COMMON_ERROR_MESSAGE_OUTERNET);
            }
        },
        requestError: function(rejection) {
            // do something on error
            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        }
    };
}])
angular.module('BaiYin.common.loading', [])

.service('loadingAnimation', ['$ionicLoading', '$timeout', function($ionicLoading, $timeout) {

    this.showLoading = function(template, content, time) {
        $ionicLoading.show({
            template: "加载中...",
            content: content,
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: time
        });

    };
    this.hideLoading = function() {
        $ionicLoading.hide();
    }
    return this;
}])
angular.module('BaiYin.common.login', [])
    .service('Session', [function() {
        this.userInfoData = null;
        this.user = null;
        this.create = function(userInfoData, user) {
            this.userInfoData = userInfoData;
            this.user = user;
        };
        this.destroy = function() {
            this.userInfoData = null;
            this.user = null;
        }
        return this;
    }])

.factory('CurrentUserService', ['$rootScope', '$timeout', '$ionicHistory', '$http', 'Session', '$filter', '$state', '$ionicModal', '$ionicPopup', 'SavePopShowFristService', '$ionicHistory',
    function($rootScope, $timeout, $ionicHistory, $http, Session, $filter, $state, $ionicModal, $ionicPopup, SavePopShowFristService, $ionicHistory) {
        var currentUser = {};
        currentUser.userSession = function() {
            return Session;
        };
        currentUser.destroyUserSession = function() {
            Session.destroy();
            return Session;
        };
        currentUser.contains = function(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] == obj) {
                    return true;
                }
            }
            return false;
        };
        currentUser.usrAuth = function(evt, toState, toParams, fromState, fromParams) {
            console.log(toState);
            var rule = toState.authorizedRuleType;
            pageAuth(rule, evt, toState, toParams);
            if (!Session.userInfoData) {
                $ionicModal.fromTemplateUrl('userServers/login/login.tpl.html', {
                        nextState: {
                            toState: toState,
                            toParams: toParams
                        },
                        backdropClickToClose: false,
                        animation: 'slide-in-right'
                    })
                    .then(function(modal) {
                        modal.show();
                    });
                return;
            } else {
                blankPageToHomeIndex(toState);
            };
        };

        var pageAuth = function(rule, evt, toState, toParams) {
            var showConfirm = function(title, template, leftText, rightText, url) {
                var confirmPopup = $ionicPopup.confirm({
                    title: title,
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                confirmPopup.then(function(res) {
                    if (res) {
                        $ionicModal.fromTemplateUrl(url, {
                                nextState: {
                                    toState: toState,
                                    toParams: toParams
                                },
                                animation: 'slide-in-right'
                            })
                            .then(function(modal) {
                                modal.show();
                            });

                    } else {
                        $ionicHistory.nextViewOptions({ historyRoot: false });
                    }
                });
            };

            if (!Session.userInfoData) return;
            var LoginStatus = Session.userInfoData.LoginStatus;
            var isHasAuth = currentUser.contains(rule, LoginStatus);
            if (!isHasAuth) {
                // 用户未登录
                evt.preventDefault();
                showConfirm('权限不足', '非常抱歉，本功能目前仅对用户开放，来登录吧', '确定', '取消', 'userServers/login/login.tpl.html');
            }
        }

        var blankPageToHomeIndex = function(toState) {
            if (toState.name == "blankPage") {
                $state.go("tabs/homePage", {}, { location: 'replace' });
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
            }
        };
        currentUser.tokenBug = function(event, mass) {
            if (SavePopShowFristService.getPopShowBlr().popShowBlr) {
                currentUser.destroyUserSession();
                token = null;
                var user = null;
                SavePopShowFristService.setPopShowBlr(false);
                showAlert("提示", mass, "确定");
            }
        };
        currentUser.noDataInfo = function(event, msg) {
            showDataInfo("提示", msg, "确定");
        };

        var showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                $ionicModal.fromTemplateUrl('userServers/login/login.tpl.html', {
                        animation: 'slide-in-right'
                    })
                    .then(function(modal) {
                        modal.show();
                    });
            });
        };
        var showDataInfo = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                $ionicHistory.goBack();
            });
        };
        currentUser.updateSession = function(data, user) {
            Session.create(data, user);
            return Session;
        };
        return currentUser;
    }
])
var hexcase = 0;
var b64pad = "";
var chrsz = 8;

function hex_md5(s) {
    return binl2hex(core_md5(str2binl(s), s.length * chrsz)); }

function b64_md5(s) {
    return binl2b64(core_md5(str2binl(s), s.length * chrsz)); }

function str_md5(s) {
    return binl2str(core_md5(str2binl(s), s.length * chrsz)); }

function hex_hmac_md5(key, data) {
    return binl2hex(core_hmac_md5(key, data)); }

function b64_hmac_md5(key, data) {
    return binl2b64(core_hmac_md5(key, data)); }

function str_hmac_md5(key, data) {
    return binl2str(core_hmac_md5(key, data)); }

function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72"; }

function core_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd); }
    return Array(a, b, c, d);
}

function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b); }

function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t); }

function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t); }

function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t); }

function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t); }

function core_hmac_md5(key, data) {
    var bkey = str2binl(key);
    if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);
    var ipad = Array(16),
        opad = Array(16);
    for (var i = 0; i < 16; i++) { ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C; }
    var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
    return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF); }

function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt)); }

function str2binl(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
    return bin;
}

function binl2str(bin) {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
        str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
    return str;
}

function binl2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
    }
    return str;
}

function binl2b64(binarray) {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3) {
        var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F); }
    }
    return str;
}
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, ""); }
var lastInput;

function md5(text) {
    text = text.trim();
    var reg = /^[0-9a-f]{16}$|^[0-9a-f]{32}$/;
    reg.ignoreCase = true;
    if (reg.test(text.toLowerCase())) { ctl00_ContentPlaceHolder1_LabelResult.innerHTML = ''; } else {
        var ret = hex_md5(text);
        ctl00_ContentPlaceHolder1_LabelResult.innerHTML = 'MD5(' + text + ',32) = ' + ret + '<br>';
        ctl00_ContentPlaceHolder1_LabelResult.innerHTML += 'MD5(' + text + ',16) = ' + ret.substr(8, 16);
        lastInput = text; }
}

function CheckInput() {
    var text = document.all["ctl00_ContentPlaceHolder1_TextBoxq"].value;
    text = text.trim();
    var reg = /^[0-9a-f]{16}$|^[0-9a-f]{32}$/;
    if (reg.test(text.toLowerCase())) {
        if (lastInput + "" != "undefined") {
            var result = hex_md5(lastInput);
            if (result.indexOf(text) >= 0) { ctl00_ContentPlaceHolder1_LabelResult.innerHTML = lastInput;
                return false; }
        } else {
            var lastResult = ctl00_ContentPlaceHolder1_LabelResult.innerHTML;
            var result = hex_md5(lastResult);
            if (result.indexOf(text) >= 0) { ctl00_ContentPlaceHolder1_LabelResult.innerHTML = lastResult;
                return false; }
        }
        ctl00_ContentPlaceHolder1_LabelResult.innerHTML = "Wait.....";
        return true;
    } else { md5(text);
        return false; }
}
angular.module('BaiYin.common.mocksData',[
])

.factory('mocksData', [function(){
	return {
		resetData: function(data){
			var result={code:0};
			result.data=data;
				return result;
			
		}
	};
}])




angular.module('BaiYin.common.pageInit', [])

.factory('pageInitService', ['$q', 'loadingAnimation', '$http',
    function($q, loadingAnimation, $http) {
        var pageInit = {};
        pageInit.pageInit = function(apis) {
            loadingAnimation.showLoading('加载中...', 'loding', 0);
            var data = [];
            for (var i = 0; i < apis.length; i++) {
                data[i] = (function() {
                    return $http.get(apis[i]);
                })();
            };
            return $q.all(data).finally(function() {
                loadingAnimation.hideLoading();
            });
        };
        return pageInit;
    }
])
angular.module('BaiYin.common.saveData', [])

.service('addIdService', [function() {
    this.create = function(workOrderArray) {
        this.workOrderArray = workOrderArray;
    };
    this.destroy = function() {
        this.workOrderArray = [];
    };
    return this;
}])

.factory('SaveWordOrderIdService', ['addIdService', function(addIdService) {
    var saveWordOrderId = {};
    saveWordOrderId.containsBool = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return false;
            }
        }
        return true;
    }

    saveWordOrderId.containsIndexTwo = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i].accountName === obj) {
                return i;
            }
        }
    }
    saveWordOrderId.containsIndex = function(arr, obj, name) {
        var i = arr.length;
        while (i--) {
            if (arr[i].name === obj) {
                return i;
            }
        }
    }
    saveWordOrderId.isEmpty = function(arr) {
        return arr ? arr.workOrderArray.length > 0 : false;
    }

    saveWordOrderId.arrSize = function(arr) {
        return arr.workOrderArray.length;
    }

    saveWordOrderId.getId = function(arr, i) {
        return arr.workOrderArray[i];
    }

    saveWordOrderId.addArray = function(workOrderArray) {
        addIdService.create(workOrderArray);
    }

    saveWordOrderId.deleteArray = function() {
        addIdService.destroy();
    }

    saveWordOrderId.getWorkOrderArray = function() {
        return addIdService;
    };
    return saveWordOrderId;
}])
angular.module('BaiYin.common.savePopShowFrist', [])

.service('savePopShowFrist', [function() {
    this.popShowBlr = false;
    this.create = function(popShowBlr) {
        this.popShowBlr = popShowBlr;
    };
     this.destroy = function(popShowBlr) {
        this.popShowBlr = popShowBlr;
    };
    return this;
}])

.factory('SavePopShowFristService', ['savePopShowFrist', function(savePopShowFrist) {
    var savePopShowFristExample = {};

    savePopShowFristExample.setPopShowBlr = function(popShowBlr) {
        savePopShowFrist.create(popShowBlr);
    }

    savePopShowFristExample.getPopShowBlr = function() {
        return savePopShowFrist;
    };
    return savePopShowFristExample;
}])
angular.module('BaiYin.common.saveType', [])

.service('saveType', [function() {
    this.addIndexType = '0';
    this.addHistoryType = '0';
    this.createIndexType = function(addIndexType) {
        this.addIndexType = addIndexType;
    };
    this.createHistoryType = function(addHistoryType) {
        this.addHistoryType = addHistoryType;
    };

    this.distory = function() {
        this.addIndexType = '0';
        this.addHistoryType = '0';
    }
    return this;
}])

.factory('SaveTypeService', ['saveType', function(saveType) {
    var saveTypeExample = {};

    saveTypeExample.addIndexType = function(addIndexType) {
        saveType.createIndexType(addIndexType);
    }

    saveTypeExample.getIndexType = function() {
        return saveType.addIndexType;
    };

    saveTypeExample.addHistoryType = function(addHistoryType) {
        saveType.createHistoryType(addHistoryType);
    }

    saveTypeExample.getHistoryType = function() {
        return saveType.addHistoryType;
    };

    saveTypeExample.distory = function() {
        saveType.distory();
    }

    return saveTypeExample;
}])
angular.module('BaiYin.common.saveVersion', [])

.service('saveVersion', [function() {
    this.versionData = null;
    this.create = function(versionData) {
        this.versionData = versionData;
    };
    this.destroy = function() {
        this.versionData = null;
    };
    return this;
}])
angular.module('BaiYin.common.showAlert', ['ionic', 'ionic-toast'])

    .service('showAlert', ['$ionicPopup','ionicToast', function ($ionicPopup,ionicToast) {
       /* if(!isApp){*/
            this.showMsg = function (error, title, template, okText) {
                if (error.msg) {
                    ionicToast.show(error.msg,'top',false,3000);
                } else {
                    ionicToast.show(template,'top',false,3000);
                    //$cordovaToast.showShortBottom(template);
                    // showAlert(title, template, okText)
                }
            };
        /*}else{
            this.showMsg = function (error, title, template, okText) {
                var showAlert = function (title, template, okText) {
                    var alertPopup = $ionicPopup.alert({
                        title: title,
                        okText: okText,
                        template: template
                    });
                    alertPopup.then(function (res) {
                    });
                };
                if (error.msg) {
                    showAlert(title, error.msg, okText)
                } else {
                    showAlert(title, template, okText)
                }
            };
        }*/

        return this;
    }])
angular.module('BaiYin.companyNewsDetails', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('companyNewsDetails', {
            url: 'companyNewsDetails',
            controller: 'companyNewsDetailsController',
            templateUrl: 'companyNewsDetails/companyNewsDetails.tpl.html',
            cache: 'false',
            params: { 'item': null, msg: null },
            authorizedRuleType: ['1', '0']
        })
    }])

    .controller('companyNewsDetailsController', ['$scope', '$timeout', '$http', '$location', '$anchorScroll', '$stateParams', 'pageInitService', '$ionicPopup',
        function($scope, $timeout, $http, $location, $anchorScroll, $stateParams, pageInitService, $ionicPopup) {
            //评论显示隐藏
            if($stateParams.item.whichNew==7){
                $scope.reviewShow=true;
            };
            /*var apis = [
                'ServiceName=CMSService&TransName=getContentDetail&ID=' + $stateParams.item.ID,
                "ServiceName=CMSService&TransName=getPraiseList&ID=" + $stateParams.item.ID,
              "ServiceName=CMSService&TransName=getCommentsList&ID=" + $stateParams.item.ID
              ];*/
            var apis = [
                'ServiceName=CMSService&TransName=getContentDetail&ID=' + $stateParams.item.ID
              ];
            pageInitService.pageInit(apis).then(function(result) {
                $scope.data = result[0].data;

                // $scope.contMsg = result[1].data;
                // $scope.comments=result[2].data;
                $scope.data.PUBDATE = new Date($scope.data.PUBDATE)
                $scope.title = $stateParams.item;
                $scope.gsxw = $scope.title.CANAME;
            }, function(error) {
                if (error.msg) {
                    $scope.showAlert('', error.msg, '确认');
                } else {
                    $scope.showAlert('', error, '确认');
                }
            });
            $scope.showAlert = function(title, template, okText) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    okText: okText,
                    template: template
                });
                alertPopup.then(function(res) {});
            };
           /* //回复
            $scope.replyMsg = function(res) {
                $scope.pingLunMsg = false;
                $scope.backName = res;
                $scope.replyContMsg = true;
                $timeout(function() {
                    var oflel = document.getElementById("borrom");
                    oflel.scrollIntoView(false);
                })

            };
            $scope.cancleBtn2 = function() {
                $scope.replyContMsg = false;
            };
            //回复
            $scope.replyBtn2 = function(getId,getHuiMsg) {
                var huiParam={
                    ID:$stateParams.item.ID,
                    comments:getHuiMsg,
                    PingLunID:getId.id
               };
                $http.post("ServiceName=CMSService&TransName=doComments",huiParam)
                    .then(function(res) {
                        $scope.replyContMsg = false;
                        $scope.showAlert('', res.msg, '确认');
                        reviewDetail();
                    }, function(error) {
                        $scope.showAlert('', error.msg, '确认');
                    });
            };
            //查询评论的详情
            function reviewDetail() {
                $http.get("ServiceName=CMSService&TransName=getCommentsList&ID=" + $stateParams.item.ID)
                    .then(function(res) {
                        $scope.comments = res.data;
                    }, function(error) {
                        $scope.showAlert('', error.msg, '确认')
                    });
            };
            //查询点赞
            function pingDetail() {
                $http.get("ServiceName=CMSService&TransName=getPraiseList&ID=" + $stateParams.item.ID)
                    .then(function(res) {
                        $scope.contMsg = res.data;
                    }, function(error) {
                        $scope.showAlert('', error.msg, '确认')
                    });
            };
            //点赞
            $scope.likeM = function(needId) {
                console.log(needId);
                $http.get("ServiceName=CMSService&TransName=doPraise&ID="+$stateParams.item.ID)
                    .then(function(res) {
                          $scope.showAlert('', res.msg, '确认');
                          pingDetail();
                    }, function(error) {
                        $scope.showAlert('', error.msg, '确认');
                    });
            };
            //评论
            $scope.reviewM = function() {
                $scope.replyContMsg = false;
                $scope.pingLunMsg = !$scope.pingLunMsg;
            };
            //发表评论
            $scope.publishBtn = function(res) {
                var pinParam={
                    ID:$stateParams.item.ID,
                    comments:res,
                    PingLunID:"0"
                };
                 $http.post("ServiceName=CMSService&TransName=doComments",pinParam)
                     .then(function(res) {
                         $scope.pingLunMsg=false;
                         $scope.showAlert('', res.msg, '确认');
                         reviewDetail();
                     }, function(error) {
                         $scope.showAlert('', error.msg, '确认');
                     });
            };
            //发表取消
            $scope.cancleBtn1 = function() {
                $scope.pingLunMsg = false;
            };
            //锚点
            $scope.toView = function(module) {

                //移动到锚点  
            };
*/

        }
    ])
angular
    .module('BaiYin.erp', [
        'ionic',
        'BaiYin.erp.details',
        'BaiYin.erp.my'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('erp', {
            url: '/erp',
            controller: 'erpController',
            templateUrl: 'erp/erp.tpl.html',
            cache: true,
            authorizedRuleType: ['1'],
            params: { item: null }
        })
    }])
    .controller('erpController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup,  ionicDatePicker) {
            //页码
            $scope.pageIndex = 1;
            //是否还有数据可以加载
            $scope.hasMore = true;
            //待办列表
            $scope.todoList = new Array();
            //进入页面
            $scope.$on('$ionicView.enter', function () {
                $scope.pageIndex = 1;
                $scope.hasMore = true;
                $scope.todoList = new Array();
                $scope.getTodoList();
            });
            //审批
            $scope.toDetailsPage = function(data){
                $state.go('erpDetails', {item: {data: data, type: "approve"}});
            };
            //我申请的
            $scope.toMyApplyPage = function () {
                $state.go('erpMy', {item: {index: 0}}, {reload: true});
            };
            //我审批的
            $scope.toMyJudgePage = function () {
                $state.go('erpMy', {item: {index: 1}}, {reload: true});
            };
            //待办列表
            $scope.getTodoList = function(){
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                $http
                    .post("ServiceName=ErpService&TransName=getTodoList", {pageIndex: $scope.pageIndex++})
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if(res.code == 0){
                            if(res.data.length == 0){
                                $scope.hasMore = false;
                            }else{
                                $scope.todoList = $scope.todoList.concat(res.data.map(function(v, i){
                                    v.MSG_INFO = v.MSG_INFO ? v.MSG_INFO.replace(/\n/g, "<br/>") : "";
                                    return v;
                                }));
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
        }
    ]);
angular.module('BaiYin.facilityInfo', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('facilityInfo', {
            url: '/facilityInfo',
            controller: 'facilityInfoController',
            templateUrl: 'facilityInfo/facilityInfo.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('facilityInfoController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker','$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker,$cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function() {

            });
            $scope.$on('$ionicView.leave', function() {

            });
            $scope.toScanCode = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeDataText = barcodeData.text;
                        $scope.barcodeData = eval("(" + $scope.barcodeDataText + ")");
                        // localStorage.remove("scanList");
                        $scope.scanInfo($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);
                    }, function (error) {

                    });
            }
            $scope.scanInfo=function (MCH_CODE,CONTRACT) {
                var obj = {"MCH_CODE":MCH_CODE,"CONTRACT":CONTRACT}
                localStorage.setItem("scanList",JSON.stringify(obj));
                $state.go('facilityInfoScan');

            }
        }
    ])

angular.module('BaiYin.facilityInfoA', [
    'BaiYin.facilityInfo',
    'BaiYin.facilityInfoScan',
    'BaiYin.InspectionRecord',
    'BaiYin.InspectionRecordDetail',
])
angular.module('BaiYin.KPI', [
    'BaiYin.KPI.mock',
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('KPI', {
            url: '/KPI',
            controller: 'KPIController',
            templateUrl: 'KPI/KPI.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('KPIController', ['$scope', '$ionicActionSheet', 'loadingAnimation', 'showAlert', 'pageInitService', '$http', '$state',
        function ($scope, $ionicActionSheet, loadingAnimation, showAlert, pageInitService, $http, $state) {

            $scope.$on('$ionicView.afterEnter', function () {
                initLoad();
            });
            var dataText;

            //初始化指标
            var buttons = [];
            var commitDate = '';
            function initLoad() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=listOpeProgramIndexRepCompany&REPORT_ID='+commitDate)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        initChartList();
                        if (res.code == '0') {
                            $scope.dateList = res.data.dList;
                            $scope.daylist = res.data.dayList;
                            $scope.allm = res.data.allm;
                            $scope.dateStr = res.data.dateStr;
                            buttons = [];
                            for (var i = 0; i < $scope.dateList.length; i++) {
                                var dtext = {};
                                dtext.text = $scope.dateList[i];
                                buttons.push(dtext);
                            }

                        } else {
                            showAlert.showMsg(res.msg);

                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            /**
             * 初始化图数据，此时不需要加载提示
             */
            function initChartList() {
                $http.post('ServiceName=TargetService&TransName=listOpeProgramIndexRepCompanyChart&REPORT_ID='+commitDate)
                    .then(function (res) {
                        if (res.code == '0') {
                            draw(res.data.chartList);
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }


            //点击日期选择
            $scope.openPopover = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: buttons,
                    /*titleText: '选择日期',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitDate = buttons[index].text;
                        initLoad();
                        return true;
                    }
                });
            };
            //点击返回
            $scope.goBack = function () {
                $state.go('tabs/homePage');
            };

            /**
             * 绘制图
             * @param dayPower
             */
            function draw(dayPower) {
                var option = {
                    title: {
                        subtext: '万KW·h'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var date = new Date(params.value[0]);
                            data = date.getFullYear() + '-'
                                + (date.getMonth() + 1) + '-'
                                + date.getDate();
                            return data + '<br/>'
                                + params.value[1];
                        }
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
                        data: ['实际']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: [
                        {
                            type: 'time',
                            splitNumber: 10,
                            axisLabel: {
                                formatter: function (params) {
                                    var date = new Date(params);
                                    var data = date.getDate();
                                    return data;
                                }
                            }

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '实际',
                            type: 'line',
                            smooth: false,
                            /*symbol: 'none',*/
                            showAllSymbol: true,
                            /*symbolSize: function (value) {
                                return Math.round(value[2] / 10) + 2;
                            },*/
                            data: (function () {
                                var d = [];
                                for (var v in dayPower) {
                                    d.push([
                                        new Date(dayPower[v].REPORT_ID),
                                        dayPower[v].DAY_ELE_AMOUNT
                                    ]);
                                }
                                return d;
                            })()
                        }
                    ]
                };
                // console.log("$scope.id=="+$scope.id);
                var myChart = echarts.init(document.getElementById('main1'), 'macarons');
                myChart.setOption(option);
            }

        }

    ]).directive('line1', function () {
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

angular.module('BaiYin.KPI.mock', [
    'ngMockE2E', 'BaiYin.common.mocksData'
])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.KPIs', [
    'BaiYin.KPI',
    'BaiYin.KPIdetail'
])
var app = angular.module('BaiYin.load', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('load', {
            url: '/load',
            controller: 'loadController',
            templateUrl: 'load/load.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    //echarts directive

    .controller('loadController', ['$timeout','$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval','$ionicTabsDelegate',
        function ($timeout,$scope, showAlert, loadingAnimation, $http, $state, $interval,$ionicTabsDelegate) {
        var type={type:'T',name:'全厂'};
        var nrefresh=true;
        //点击近一小时数据
            $scope.$on('$ionicView.afterEnter', function () {
                nrefresh=true;
                //处理刷新
                if(localStorage.getItem("backToLoad")){
                    nrefresh=false;
                }
                localStorage.removeItem("backToLoad");
                if(nrefresh){
                    $ionicTabsDelegate.select(0);
                    initLoad();
                    startInterval();
                    type={type:'T',name:'全厂'};
                }
            });
            $scope.$on('$ionicView.leave',function () {
                stopInterval();
            });
            $scope.toNearHour = function () {
                localStorage.setItem("backToLoad","1");
                $state.go('load/nearlyHour',{'type':type});
            };
            //历史日负荷
            $scope.goHistoryInfo = function () {
                localStorage.setItem("backToLoad","1");
                $state.go('load/historyInfo',{'type':type});
            };
            //全场请求数据
            $scope.toQcData = function () {
                $ionicTabsDelegate.select(0);
                initLoad();
                startInterval();
                type={type:'T',name:'全厂'};
            }
            //甘肃数据请求
            $scope.toGsData = function (){
                type={type:'GS',name:'甘'};
                $ionicTabsDelegate.select(1);
                stopInterval();
                GSData();
            }
            //青海数据请求
            $scope.toQhData = function () {
                type={type:'QH',name:'青'};
                $ionicTabsDelegate.select(2);
                stopInterval();
                $scope.proviceChart($scope,'QH');
                // QHData();
            }
            //宁夏数据请求
            $scope.toNxData = function () {
                type={type:'NX',name:'宁'};
                $ionicTabsDelegate.select(3);
                stopInterval();
                // NXData();
                $scope.proviceChart($scope,'NX');
            }
            //新疆数据请求
            $scope.toXjData = function () {
                type={type:'XJ',name:'新'};
                $ionicTabsDelegate.select(4);
                stopInterval();
                XJData();
            }
            /**
             * 初始化负荷
             */
            function initLoad() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=totalLoad')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        initQc();
                        if (res.code == '0') {
                            $scope.fcLoad = res.data.load;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            /**
             * 开启定时器,五分钟执行一次
             */
            function startInterval() {
                $scope.timer = $interval(function(){
                    initLoad();
                },3000*60);
            }
            //关闭定时器
            function stopInterval(){
                $interval.cancel($scope.timer);
            }

            /**
             * 初始化全厂负荷
             */
            function initQc() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=getTargetIndexLoad')
                    .then(function (res) {
                        $scope.initChart($scope);
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.totalLoad = res.data;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            /**
             * 获取甘肃数据
             * @constructor
             */
            function GSData(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=gsLoad')
                    .then(function (res) {
                        $scope.proviceChart($scope,'GS');
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.gsLoad = res.data.gsLoad;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /**
             * 获取青海数据
             * @constructor
             */
            function QHData(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=qhLoad')
                    .then(function (res) {
                        $scope.proviceChart($scope,'QH');
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.qhLoad = res.data.qhLoad;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /**
             * 获取宁夏数据
             * @constructor
             */
            function NXData(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=nxLoad')
                    .then(function (res) {
                        $scope.proviceChart($scope,'NX');
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.nxLoad = res.data.nxLoad;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /**
             * 获取新疆数据
             * @constructor
             */
            function XJData(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=TargetService&TransName=xjLoad')
                    .then(function (res) {
                        $scope.proviceChart($scope,'XJ');
                        loadingAnimation.hideLoading();
                        console.log(res);
                        if (res.code == '0') {
                            $scope.xjLoad = res.data.xjLoad;
                        } else {
                            showAlert.showMsg(res.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            /**
             * 实现柱状图
             */
            $scope.initChart = function ($scope) {
                console.log("enter into ===");
                // $scope.legend = ["昨日", "今日"];
                // $scope.item = ["0","2","4","6","8","10","12","14","16","18","20","22"];
                /*$scope.data = [
                    [62.675,89.943,89.707,102.094,118.099,120.428],
                    [143.07899,156.67999,139.283,118.086,96.066,80.908]
                ];*/

                $http.get('ServiceName=TargetService&TransName=totalHoursLoad')
                    .then(function (res) {
                        if (res.code == '0') {
                            $("#tdes").text(res.data.dateStr);
                            draw($scope, res.data.yestLoad, res.data.todayLoad, res.data.dateStr,'');
                            // $scope.item = ["0","2","4","6","8","10"];
                            /* $scope.data = [
                                 [62.675,89.943,89.707,102.094,118.099,120.428],
                                 [143.07899,156.67999,139.283,118.086,96.066,80.908]
                             ];*/
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                        //进行line绘制

                    });
            };
            /**
             * 实现各个省的走势图
             */
            $scope.proviceChart = function ($scope,type) {
                console.log("enter into ===chartGqnxLoad");
                // $scope.legend = ["昨日", "今日"];
                // $scope.item = ["0","2","4","6","8","10","12","14","16","18","20","22"];
                /*$scope.data = [
                    [62.675,89.943,89.707,102.094,118.099,120.428],
                    [143.07899,156.67999,139.283,118.086,96.066,80.908]
                ];*/

                $http.get('ServiceName=TargetService&TransName=chartGqnxLoad')
                    .then(function (res) {
                        if (res.code == '0') {
                            $scope.timeDes=res.data.dateStr;
                            var yestoday = [];
                            for (var v in res.data.yestLoad) {
                                yestoday.push(res.data.yestLoad[v].TOTAL_POWER);
                            }
                            var today = [];
                            for (var v in res.data.todayLoad) {
                                today.push(res.data.todayLoad[v].TOTAL_POWER);
                            }
                            draw($scope, res.data.yestLoad, res.data.todayLoad, res.data.dateStr,type);
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                        //进行line绘制

                    });
            };
            /**
             *
             * @param $scope
             * @param yestoday
             * @param today
             * @param dateStr
             */
            function draw($scope, yestoday, today, dateStr,type) {
                dateStr=dateStr.replace(/\-/g,'/');

                console.log("dateStr=="+new Date(dateStr+" 00:00"));
                var option = {
                    title: {
                        subtext: 'MW'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            var date = new Date(params.value[0]);
                            data = date.getHours() + ':'
                                + date.getMinutes();
                            return data + '<br/>'
                                + params.value[1];
                        }
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
                        data: ['昨天', '今天']
                    },
                    grid: {
                        y2: 80
                    },
                    xAxis: [
                        {
                            type: 'time',
                            splitNumber: 12,
                            axisLabel: {
                                formatter: function (params) {
                                    var date = new Date(params);
                                    var data = date.getHours();
                                    if (data == '23') {
                                        data = '24';
                                    }
                                    return data;
                                }
                            }

                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '昨天',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            symbolSize: function (value) {
                                return Math.round(value[2] / 10) + 2;
                            },
                            data: (function () {
                                var d = [];
                                for (var v in yestoday) {
                                    d.push([
                                        new Date(dateStr + " " + yestoday[v].OCCUR_TIME),
                                        type==''||type==undefined?
                                            (((yestoday[v].TOTAL_POWER - 0) < 0 ? 0 : ((yestoday[v].TOTAL_POWER - 0) > 999) ? 999 : yestoday[v].TOTAL_POWER)):
                                            (((yestoday[v][type+'_POWER'] - 0) < 0 ? 0 : ((yestoday[v][type+'_POWER'] - 0) > 999) ? 999 : yestoday[v][type+'_POWER']))
                                    ]);
                                }
                                return d;
                            })()
                        },
                        {
                            name: '今天',
                            type: 'line',
                            smooth: false,
                            symbol: 'none',
                            showAllSymbol: false,
                            symbolSize: function (value) {
                                return Math.round(value[2] / 10) + 2;
                            },
                            data: (function () {
                                var d = [];
                                for (var v in today) {
                                    d.push([
                                        new Date(dateStr + " " + today[v].OCCUR_TIME),
                                        type==''||type==undefined?
                                            (((today[v].TOTAL_POWER - 0) < 0 ? 0 : ((today[v].TOTAL_POWER - 0) > 999) ? 999 : today[v].TOTAL_POWER)):
                                            (((today[v][type+'_POWER'] - 0) < 0 ? 0 : ((today[v][type+'_POWER'] - 0) > 999) ? 999 : today[v][type+'_POWER']))
                                    ]);
                                }
                                return d;
                            })()
                        }
                    ]
                };
                var lineId = 'main';
                if(type!=''&&type!=undefined){
                    lineId=type+'main';
                }
                var myChart = echarts.init(document.getElementById(lineId), 'macarons');
                myChart.setOption(option);
            }
        }

    ])
    .directive('line', function () {
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
angular.module('BaiYin.loadA', [
    'BaiYin.load',
    'BaiYin.load.nearlyHour',
    'BaiYin.load.historyInfo',
])
var app = angular.module('BaiYin.News', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('News', {
            url: '/News',
            controller: 'NewsController',
            templateUrl: 'News/News.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('NewsController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams) {
            var id = $stateParams.item;
            $scope.$on('$ionicView.afterEnter', function () {
                var localid = localStorage.getItem('id');
                console.log("id==" + id + "缓存localid==" + localid);
                $scope.title = '';
                if (id == null && localid != null) {
                    id = localid;
                }
                if (id != localid && localid != null) {
                    id = localid;
                }
                //获取标题名称
                if (id == 7) {
                    $scope.title = '公司新闻'
                }
                if (id == 31) {
                    $scope.title = '通知公告'
                }
                if (id == 32) {
                    $scope.title = '公司发文'
                }
                getNews(id);
            });
            $scope.$on('$ionicView.afterEnter', function () {
                localStorage.removeItem("id");
            });
            //列表文字显示的宽度
            $scope.newslistLi = {width: '' + screen.width - 110 + 'px'};

            //获取列表
            function getNews(id) {
                $scope.hasMore = false;
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                $http.post('ServiceName=CMSService&TransName=getContentlList&PageNo=1&ID=' + id + '&PageCnt=10')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.newslist = res.data;
                        //console.log("res==" + JSON.stringify(res.data));
                        for (var i = 0; i < $scope.newslist.length; i++) {
                            $scope.newslist[i].PUBDATE = new Date($scope.newslist[i].PUBDATE.replace(/-/g, "/"));
                        }
                        if ($scope.newslist.length >= 10) {
                            $scope.hasMore = true;
                        } else {
                            $scope.newslist = [];
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            };
            //加载更多
            $scope.hasMore = false;
            $scope.number = 1;
            $scope.loadMore = function () {
                $scope.number += 1;
                console.log("loadMore===" + "$scope.number==" + $scope.number);
                $http.post('ServiceName=CMSService&TransName=getContentlList&ID=7&PageNo=' + $scope.number + "&PageCnt=10")
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.newslist1 = res.data;
                        for (var i = 0; i < $scope.newslist1.length; i++) {
                            $scope.newslist1[i].PUBDATE = new Date($scope.newslist1[i].PUBDATE.replace(/-/g, "/"));
                            $scope.newslist.push($scope.newslist1[i]);
                        }
                        if ($scope.newslist.length < 10) {
                            $scope.hasMore = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            $scope.toDetail = function (item) {
                localStorage.setItem('id', id);
                $state.go('companyNewsDetails', {'item': item, 'msg': $scope.gsxw})
            }
        }

    ])

angular.module('BaiYin.OffLine', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OffLine', {
            url: '/OffLine',
            controller: 'OffLineController',
            templateUrl: 'OffLine/OffLine.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('OffLineController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker', '$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker, $cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.OffLineClocki='';
                $scope.OffLineClockj='';
                $scope.positionHide = true;/*签到*/
                $scope.inputHide = false;/*扫描设备二维码按钮*/
                $scope.searchsBlueHide=false;/*搜索按钮*/
                $scope.osiListHide=false;/*下载列表*/
                $scope.OfflineMyHide=true;/*上传列表*/
                $scope.uanddHide=false;/*下载按钮*/
                $scope.UploadHide=true;/*上传返回*/
                localStorage.setItem('notUp',0);
                $scope.notUp=localStorage.getItem('notUp');
                if(localStorage.getItem("OffList")){
                    var OffList= JSON.parse(localStorage.getItem("OffList"))
                    $scope.patrolRoteListData = OffList;
                }else{
                    $scope.patrolRoteListData=[];
                }
                if(localStorage.getItem("OffLineSignList")){
                    var OffLineSignList= JSON.parse(localStorage.getItem("OffLineSignList"))
                    $scope.OffLineSignIn= OffLineSignList;
                }else{
                    $scope.OffLineSignIn=[];
                }

                //签到样式
                $scope.identify = {
                    'padding': '5px',
                    'line-height': '35px',
                    'border-radius': '50%',
                    'display': 'inline-block',
                    'float': 'left',
                    'color': '#fff',
                    'margin-right': '10px',
                    'font-size': '12px',
                    'width': '45px',
                    'text-align': 'center'
                }
            });
            //跳转到巡检线路
            $scope.toOsiLine = function (obj) {
                var params = {
                    DESCRIPTION:obj.DESCRIPTION,
                    TEMP_ID:obj.TEMP_ID,
                    START_TIME:obj.START_TIME,
                    END_TIME:obj.END_TIME,
                    INSPECT_TYPE:obj.INSPECT_TYPE,
                    INSPECTED:obj.INSPECTED,
                    INSPECT:obj.INSPECT,
                    childList:obj.childList
                }
                console.log(obj.childList);
                $state.go('OffLine/OffLineDetail',params);
            }

            /*扫描二维码开始阶段*/

            //点击扫二维码
            $scope.toScanCode = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeDataText = barcodeData.text;
                        $scope.barcodeData = eval("(" + $scope.barcodeDataText + ")");
                        $scope.patrolHome($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);
                    }, function (error) {

                    });
            }
            //获取设备位置和名称
            $scope.patrolHome = function (MCH_CODE, CONTRACT) {
                var OffLinenumber=0;
                for(var i=0;i<$scope.patrolRoteListData.length;i++){
                    var childListOF=$scope.patrolRoteListData[i].childList;
                    for(var j=0;j<childListOF.length;j++){
                        if(childListOF[j].MCH_CODE==MCH_CODE){
                            OffLinenumber++;
                            if(childListOF[j].RECORD_TIME!='' && childListOF[j].RECORD_TIME!=null){
                                continue;
                            }else{
                                if(childListOF[j].IS_MATCH=='TRUE'){
                                    $scope.OFFlineHomeData=childListOF[j];
                                    var OffLinesClocki=i;
                                    var OffLinesClockj=j;
                                    blueToothEnable(childListOF[j].SN_CODE,OffLinesClocki,OffLinesClockj);
                                    return;
                                }else{
                                    $scope.OffLineClocki=i;
                                    $scope.OffLineClockj=j;
                                    $scope.patrolHomeData=childListOF[j];
                                    $scope.inputHide = true;
                                    $scope.osiListHide=true;
                                    $scope.positionHide = false;
                                    $scope.uanddHide=true;
                                    return;
                                }
                            }
                        }
                    }
                }
                if(OffLinenumber=0){
                    showAlert.showMsg('', '', "没有匹配到巡查路线！");
                }
            }
            //开启本机蓝牙
            function blueToothEnable(SN_CODE,OffLinesClocki,OffLinesClockj) {
                ble.enable(
                    function () {
                        // alert('开启蓝牙!');
                        scanBlueTooth(SN_CODE,OffLinesClocki,OffLinesClockj);
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("", "", "打开蓝牙失败！");
                    }
                );
            }
            //扫描蓝牙
            function scanBlueTooth(SN_CODE,OffLinesClocki,OffLinesClockj) {
                loadingAnimation.hideLoading();
                ble.scan([], 5, function (device) {
                        //成功的回调函数
                    // alert(JSON.stringify(device));
                    var SNdeviceID=device.id.replace(new RegExp(/(:)/g),"");
                    var scansccode=0;
                        if (SNdeviceID==SN_CODE) {
                            scansccode=scansccode+1;
                            $scope.OffLineClocki=OffLinesClocki;
                            $scope.OffLineClockj=OffLinesClockj;
                            $scope.patrolHomeData=$scope.OFFlineHomeData;
                            $scope.inputHide = true;
                            $scope.osiListHide=true;
                            $scope.positionHide = false;
                            $scope.uanddHide=true;
                        }
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "未扫描到有效蓝牙！");
                    }
                );
                if(scansccode==0){
                    showAlert.showMsg('', '', "该二维码无效！");
                }
            }
            /*扫描二维码结束阶段*/


            /*搜索蓝牙开始阶段*/

            //点击搜索蓝牙
            $scope.searchsBlueTooth = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                openblueToothEnable();
            }
            //开启本机蓝牙
            function openblueToothEnable() {
                ble.enable(
                    function () {
                        scansBlueToothnow();
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("","","蓝牙未开启");
                    }
                );
            }
            //扫描蓝牙
            function scansBlueToothnow() {
                $scope.OffToothList = [];
                $scope.timer = $timeout(function () {
                    loadingAnimation.hideLoading();
                    if ($scope.OffToothList.length > 0) {
                        upWindows($scope.OffToothList);
                    } else {
                        showAlert.showMsg('', '', "未扫描到蓝牙设备");
                    }
                }, 5000);
                ble.scan([], 5, function (device) {//成功的回调函数
                     getBluesToothList(device);
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "扫描蓝牙失败");

                    }
                );
            }
            //获取蓝牙列表
            function getBluesToothList(device) {
                var Offlinetooth=0;
                var SNID=device.id.replace(new RegExp(/(:)/g),"");
                for(var i=0;i<$scope.patrolRoteListData.length;i++){
                    var childListOFs=$scope.patrolRoteListData[i].childList;
                    for(var j=0;j<childListOFs.length;j++){
                        if(childListOFs[j].RECORD_TIME!='' && childListOFs[j].RECORD_TIME!=null){
                            continue;
                        }
                        else{
                            if(childListOFs[j].IS_MATCH_MCH=="FALSE" && childListOFs[j].IS_MATCH=="TRUE"){
                                if(childListOFs[j].SN_CODE==SNID){
                                    Offlinetooth++;
                                    childListOFs[j].OffLineClocki=i;
                                    childListOFs[j].OffLineClockj=j;
                                    $scope.OffToothList.push(childListOFs[j])
                                }
                            }

                        }

                    }
                }
                if(Offlinetooth=0){
                    showAlert.showMsg('', '', "未扫描到计划内的蓝牙设备");
                }
            }
            //弹出页面，显示扫描到的设备
            var searchequipPopup;
            function upWindows(OffToothList) {
                searchequipPopup = $ionicPopup.show({
                    template:'<div>' +
                    '<ul>' +
                    '<li id="devices_{{$index}}" ng-click="selectsBlueTooth($index)" ng-repeat="equipTooth in OffToothList track by $index" ng-style="searchPopupli">' +
                    '{{equipTooth.ADDRESS}}' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                    title: '扫描到的蓝牙设备',
                    scope: $scope,
                });
            }
            $scope.searchPopupli = {
                "line-height": "35px",
                "font-size": "12px",
                "text-align": "center",
                "border-bottom": "1px dotted #f4f4f4",
            };
            //点击选择蓝牙设备
            $scope.selectsBlueTooth= function (index) {
                searchequipPopup.close();
                // alert(JSON.stringify($scope.OffToothList))
                $scope.patrolHomeData=$scope.OffToothList[index];
                $scope.OffLineClocki=$scope.OffToothList[index].OffLineClocki;
                $scope.OffLineClockj=$scope.OffToothList[index].OffLineClockj;
                $scope.searchsBlueHide=true;
                $scope.osiListHide=true;
                $scope.positionHide = false;
                $scope.uanddHide=true;
            }

            /*搜索蓝牙结束阶段*/

            //首页签到 点击签到事件
            $scope.OffLineSign = function () {
                if($scope.patrolHomeData.INSPECT_TYPE=="周"){
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE=="周"){
                            var LineSignchildren=$scope.patrolRoteListData[i].childList;
                            for(var j=0;j<LineSignchildren.length;j++){
                                if(LineSignchildren[j].RECORD_TIME!='' && LineSignchildren[j].RECORD_TIME!=null){
                                    var nowdate=new Date();
                                    var month = nowdate.getMonth()+ 1;
                                    var strDate = nowdate.getDate();
                                    if (month >= 1 && month <= 9) {
                                        month = "0" + month;
                                    }
                                    if (strDate >= 0 && strDate <= 9) {
                                        strDate = "0" + strDate;
                                    }
                                    var nowdays=nowdate.getFullYear()+'-'+month+'-'+strDate;
                                    var olddate=LineSignchildren[j].RECORD_TIME.substr(0,10);
                                    if(nowdays==olddate){
                                        showAlert.showMsg('', '', "执行周巡查计划时间间隔不能小于一天!");
                                        return false;
                                    }
                                }
                            }
                        }
                    }

                }
                if($scope.patrolHomeData.INSPECT_TYPE=="月"){
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE=="月"){
                            var LineSignchildren=$scope.patrolRoteListData[i].childList;
                            for(var j=0;j<LineSignchildren.length;j++){
                                if(LineSignchildren[j].RECORD_TIME!='' && LineSignchildren[j].RECORD_TIME!=null){
                                    var nowdate=new Date();
                                    var month = nowdate.getMonth()+ 1;
                                    var strDate = nowdate.getDate();
                                    if (month >= 1 && month <= 9) {
                                        month = "0" + month;
                                    }
                                    if (strDate >= 0 && strDate <= 9) {
                                        strDate = "0" + strDate;
                                    }
                                    var nowdays=nowdate.getFullYear()+'-'+month+'-'+strDate;
                                    var olddate=LineSignchildren[j].RECORD_TIME.substr(0,10);
                                    if(nowdays==olddate){
                                        showAlert.showMsg('', '', "执行月巡查计划时间间隔不能小于一天!");
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                if($scope.patrolHomeData.INSPECT_TYPE=="季"){
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE=="季"){
                            var LineSignchildren=$scope.patrolRoteListData[i].childList;
                            for(var j=0;j<LineSignchildren.length;j++){
                                if(LineSignchildren[j].RECORD_TIME!='' && LineSignchildren[j].RECORD_TIME!=null){
                                    var nowdate=new Date();
                                    var month = nowdate.getMonth()+ 1;
                                    var strDate = nowdate.getDate();
                                    if (month >= 1 && month <= 9) {
                                        month = "0" + month;
                                    }
                                    if (strDate >= 0 && strDate <= 9) {
                                        strDate = "0" + strDate;
                                    }
                                    var nowdays=nowdate.getFullYear()+'-'+month+'-'+strDate;
                                    var olddate=LineSignchildren[j].RECORD_TIME.substr(0,10);
                                    if(nowdays==olddate){
                                        showAlert.showMsg('', '', "执行季巡查计划时间间隔不能小于一天!");
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                if($scope.patrolHomeData.INSPECT_TYPE=="日"){
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE=="日"){
                            var LineSignchildren=$scope.patrolRoteListData[i].childList;
                            for(var j=0;j<LineSignchildren.length;j++){
                                if(LineSignchildren[j].RECORD_TIME!='' && LineSignchildren[j].RECORD_TIME!=null){
                                    var olddate=LineSignchildren[j].RECORD_TIME;
                                    var timestamp =parseInt(new Date(olddate).getTime()/1000);
                                    var nowdates=parseInt(new Date().getTime()/1000);
                                    if((nowdates-timestamp)<7200){
                                        showAlert.showMsg('', '', "执行日巡查计划时间间隔不能小于两小时!");
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                var params = {
                    BLUETOOTH_SERIAL_NO:$scope.patrolHomeData.BLUETOOTH_SERIAL_NO,
                    LOCATION_DESCRIPTION:$scope.patrolHomeData.ADDRESS,
                    IS_MATCH:$scope.patrolHomeData.IS_MATCH,
                    PLAN_ID:$scope.patrolHomeData.PLAN_ID,
                    EQUIP_NO:$scope.patrolHomeData.MCH_CODE,
                    CONTRACT:$scope.patrolHomeData.CONTRACT,
                    MCH_NAME:$scope.patrolHomeData.MCH_NAME,
                    DESCRIPTION:$scope.patrolHomeData.DESCRIPTION,
                    RECORD_TIME:getNowFormatDate(),
                    IS_sign:false,
                }
                if(typeof $scope.OffLineClockj === "undefined" || $scope.OffLineClockj === null || $scope.OffLineClockj === ""){

                }else{
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE==$scope.patrolHomeData.INSPECT_TYPE){
                            $scope.patrolRoteListData[i].INSPECTED=parseInt($scope.patrolRoteListData[i].INSPECTED)+1;
                        }
                        for(var j=0;j<$scope.patrolRoteListData[$scope.OffLineClocki].childList.length;j++){
                            if(j==$scope.OffLineClockj){
                                $scope.patrolRoteListData[$scope.OffLineClocki].childList[$scope.OffLineClockj].RECORD_TIME=getNowFormatDate();
                            }
                        }
                    }
                }
                localStorage.setItem("OffList",JSON.stringify($scope.patrolRoteListData));
                $scope.OffLineSignIn.push(params);
                localStorage.setItem("OffLineSignList",JSON.stringify($scope.OffLineSignIn));
                showAlert.showMsg('', '', "离线签到成功,请及时到有网的地方上传!");
                $scope.positionHide = true;
                $scope.inputHide = false;
                $scope.searchsBlueHide=false;
                $scope.osiListHide=false;
                $scope.uanddHide=false;

            }
            /**
             * @author:Grant
             * @remark:获取当前时间
             * @return:datetime
             */
            function getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
                return currentdate;
            }
            //返回事件
            $scope.goBack = function () {
                $scope.OffLineClocki='';
                $scope.OffLineClockj='';
                $scope.positionHide = true;
                $scope.inputHide = false;
                $scope.searchsBlueHide=false;
                $scope.osiListHide=false;
                $scope.uanddHide=false;
            }
            /*点击下载*/
            $scope.OffLineDownload=function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=InspectionService&TransName=downLoadXcData')
                        .then(function (res) {
                            if (res.code == 0) {
                                loadingAnimation.hideLoading();
                                if(res.data.code==1){
                                    showAlert.showMsg('', '', res.data.msg);
                                    return false;
                                }
                                showAlert.showMsg('', '', "下载巡查路线成功");
                                var obj =res.data.deList;
                                localStorage.setItem("OffList",JSON.stringify(obj));
                                var OffList= JSON.parse(localStorage.getItem("OffList"))
                                $scope.patrolRoteListData = OffList;
                                $scope.OfflineList=new Array();
                                for(var i=0;i<OffList.length;i++){
                                    $scope.OfflineList=$scope.OfflineList.concat(res.data.deList[i].childList);
                                }
                                console.log($scope.OfflineList);
                                localStorage.setItem("OfflineList",JSON.stringify($scope.OfflineList));
                                for(var l=0;i<$scope.OfflineList.length;l++){
                                    console.log($scope.OfflineList[l].RECORD_TIME);
                                }
                            } else {
                                showAlert.showMsg('', '', res.msg);
                            }
                        }, function (error) {
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                        });
            }
            /*点击查看巡查记录*/
            $scope.OffLineLook=function () {
                if(localStorage.getItem("OffLineSignList")){
                    $state.go('OffLine/OffLineLook');
                }else{
                    showAlert.showMsg('', '', "还未有巡查记录!");
                }
            }
        }
    ])

angular.module('BaiYin.OffLineA', [
    'BaiYin.OffLine',
    'BaiYin.OffLine.OffLineDetail',
    'BaiYin.OffLine.OffLineLook',
])
angular.module('BaiYin.OSI', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OSI', {
            url: '/OSI',
            controller: 'OSIController',
            templateUrl: 'OSI/OSI.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('OSIController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker', '$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker, $cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.positionHide = true;
                $scope.inputHide = false;
                $scope.searchsBlueHide=false;
                $scope.osiListHide=false;
                $scope.patrolRoteList();
            });
            //巡查路线列表
            $scope.patrolRoteList = function () {
                $http.post('ServiceName=InspectionService&TransName=listCInspectRoute')
                    .then(function (res) {
                        if (res.data.code == 0) {
                            $scope.patrolRoteListData = res.data.dList;
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            //跳转到巡检记录
            $scope.toOsiHistory = function () {
                $state.go('OSI/OSIHistory');
            }

            //跳转到巡检线路
            $scope.toOsiLine = function (obj) {
                var params = {
                    DESCRIPTION:obj.DESCRIPTION,
                    TEMP_ID:obj.TEMP_ID,
                    START_TIME:obj.START_TIME,
                    END_TIME:obj.END_TIME,
                    INSPECT_TYPE:obj.INSPECT_TYPE,
                    INSPECTED:obj.INSPECTED,
                    INSPECT:obj.INSPECT
                }
                $state.go('OSI/OSILine',params);
            }

            /*扫描二维码开始阶段*/

            //点击扫二维码
            $scope.toScanCode = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeDataText = barcodeData.text;
                        $scope.barcodeData = eval("(" + $scope.barcodeDataText + ")");
                        $scope.patrolHome($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);
                    }, function (error) {

                    });
            }
            //获取设备位置和名称
            $scope.patrolHome = function (MCH_CODE, CONTRACT) {
                $http.post('ServiceName=InspectionService&TransName=formCBluetoothEquip&MCH_CODE=' + MCH_CODE + '&CONTRACT=' + CONTRACT)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            $scope.patrolHomeData = res.data.detail;
                            if ($scope.patrolHomeData.IS_MATCH=='TRUE') {
                                blueToothEnable($scope.patrolHomeData.SN_CODE);
                            }else{
                                    $scope.inputHide = true;
                                    $scope.osiListHide=true;
                                    $scope.positionHide = false;
                            }
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            //开启本机蓝牙
            function blueToothEnable(SN_ADDRESS) {
                ble.enable(
                    function () {
                        scanBlueTooth(SN_ADDRESS);
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("", "", "打开蓝牙失败！");
                    }
                );
            }
            //扫描蓝牙
            function scanBlueTooth(SN_ADDRESS) {
                loadingAnimation.hideLoading();
                ble.scan([], 5, function (device) {
                        //成功的回调函数
                        var SNdeviceID=device.id.replace(new RegExp(/(:)/g),"");
                        // alert(SNdeviceID);
                        if (SNdeviceID==SN_ADDRESS) {
                            $scope.$apply(function(){
                                $scope.inputHide = true;
                                $scope.osiListHide=true;
                                $scope.positionHide = false;
                            });
                        }
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "未扫描到有效蓝牙！");
                    }
                );
            }
            /*扫描二维码结束阶段*/


            /*搜索蓝牙开始阶段*/

            //点击搜索蓝牙
            $scope.searchsBlueTooth = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                openblueToothEnable();
            }
            //开启本机蓝牙
            function openblueToothEnable() {
                ble.enable(
                    function () {
                        scansBlueToothnow();
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("","","蓝牙未开启");
                    }
                );
            }
            //扫描蓝牙
            function scansBlueToothnow() {
                $scope.OSIToothList = [];
                $scope.timer = $timeout(function () {
                    loadingAnimation.hideLoading();
                    if ($scope.OSIToothList.length > 0) {
                        upWindows($scope.OSIToothList);
                    } else {
                        showAlert.showMsg('', '', "未扫描到蓝牙设备");
                    }
                }, 5000);
                ble.scan([], 5, function (device) {//成功的回调函数
                     getBluesToothList(device);
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "扫描蓝牙失败");

                    }
                );
            }
            //获取蓝牙列表
            function getBluesToothList(device) {
                $http.post('ServiceName=InspectionService&TransName=formSBluetoothEquip&SN_CODE=' + device.id)
                    .then(function (res) {
                        if (res.data.code == '0') {
                            $scope.equipToothdetail=res.data.dList;
                            for(var i=0;i<$scope.equipToothdetail.length;i++){
                                $scope.OSIToothList.push($scope.equipToothdetail[i]);
                            }
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //弹出页面，显示扫描到的设备
            var searchequipPopup;
            function upWindows(OSIToothList) {
                searchequipPopup = $ionicPopup.show({
                    template:'<div>' +
                    '<ul>' +
                    '<li id="devices_{{$index}}" ng-click="selectsBlueTooth($index)" ng-repeat="equipTooth in OSIToothList track by $index" ng-style="searchPopupli">' +
                    '{{equipTooth.ADDRESS}}' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                    title: '扫描到的蓝牙设备',
                    scope: $scope,
                });
            }
            $scope.searchPopupli = {
                "line-height": "35px",
                "font-size": "12px",
                "text-align": "center",
                "border-bottom": "1px dotted #f4f4f4",
            };
            //点击选择蓝牙设备
            $scope.selectsBlueTooth= function (index) {
                searchequipPopup.close();
                $scope.patrolHomeData=$scope.OSIToothList[index];
                $scope.searchsBlueHide=true;
                $scope.osiListHide=true;
                $scope.positionHide = false;
            }

            /*搜索蓝牙结束阶段*/

            //首页签到 点击签到事件
            $scope.patrolSign = function () {
                var params = {
                    BLUETOOTH_SERIAL_NO:$scope.patrolHomeData.BLUETOOTH_SERIAL_NO,
                    LOCATION_DESCRIPTION:$scope.patrolHomeData.ADDRESS,
                    IS_MATCH:$scope.patrolHomeData.IS_MATCH,
                    PLAN_ID:$scope.patrolHomeData.PLAN_ID,
                    EQUIP_NO:$scope.patrolHomeData.MCH_CODE,
                    CONTRACT:$scope.patrolHomeData.CONTRACT
                }
                $http.post('ServiceName=InspectionService&TransName=inspectRecord',params)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            $scope.patrolSignData = res.data;
                            showAlert.showMsg('','','签到成功！')
                            $scope.positionHide = true;
                            $scope.inputHide = false;
                            $scope.searchsBlueHide=false;
                            $scope.osiListHide=false;
                            $scope.patrolRoteList();
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            //返回事件
            $scope.goBack = function () {
                $scope.positionHide = true;
                $scope.inputHide = false;
                $scope.searchsBlueHide=false;
                $scope.osiListHide=false;
            }
        }
    ])

angular.module('BaiYin.OSIA', [
    'BaiYin.OSI',
    'BaiYin.OSI.OSIHistoryDetail',
    'BaiYin.OSI.OSIcount',
    'BaiYin.OSI.OSILine',
    'BaiYin.OSI.OSIArear',
    'BaiYin.OSI.OSIHistory',
])
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
angular.module('BaiYin.power.mock', [
    'ngMockE2E', 'BaiYin.common.mocksData'
])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.powerA', [
    'BaiYin.power',
    'BaiYin.pdDay',
    'BaiYin.pdMounth',
    'BaiYin.pdYear',
])
angular.module('BaiYin.Problems', [])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('Problems', {
        url: '/Problems',
        controller: 'ProblemsController',
        templateUrl: 'Problems/Problems.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('ProblemsController', ['$scope', 'showAlert', 'pageInitService', '$http', '$state',
    function($scope, showAlert, pageInitService, $http, $state) {
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
            ''
            ];

            pageInitService.pageInit(apis).then(function(result) {
             $scope.listsMsg = result[0];
             agentListMsg($scope.listsMsg);
            
            $scope.agentsItem = function(item) {
                $state.go('ProblemsSolving');
                var ItemCont =JSON.stringify(item);
                sessionStorage.setItem("agentsVD", ItemCont); 
            }
        }, function(error) {
             showAlert.showMsg(error,'','网络异常','确认')
        });
            $scope.loadNumber=1;
            $scope.loadMore=function(){
             $scope.loadNumber+=1;
             $http.get( '' + $scope.loadNumber)
             .then(function(res){
                 if(res.data.length>0){
                   for(var i=0;i<res.data.length;i++){
                    res.data[i].CREATED_DATE=new Date(res.data[i].CREATED_DATE.replace(/-/g,"/"));
                    $scope.items.push(res.data[i])  ;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }else if(res.data.length<=0||res.data==null||res.data==undefined){
             $scope.hasMore=false;
             $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     }
     ,function(error){
       showAlert.showMsg(error,'','网络异常','确认')
         $scope.hasMore=false;
     })
         };
    });
        $scope.newProblems=function(){
             $state.go('NewProblems')
        }
        function agentListMsg(res){
         var str = [];
         var arr = {};
         for (var i = 0; i < res.data.length; i++) {
            arr = res.data[i]
            arr.CREATED_DATE = new Date(arr.CREATED_DATE.replace(/-/g,"/"))
            str.push(arr)
        }
        $scope.items = str;
         if($scope.items.length>=10&&$scope.items!=undefined&&$scope.items!=null){
                $scope.hasMore=true;
            }
    };
    $scope.doRefresh = function() {
        $http.get('')
        .then(function(res) {
            agentListMsg(res)
            $scope.$broadcast('scroll.refreshComplete');
            if(res.data.length==10){
               $scope.loadNumber=1;
               $scope.hasMore=true;
           }else{
            $scope.hasMore=false;
        }
    }, function(error) {
        $scope.hasMore=false;
        showAlert.showMsg(error,'','网络异常','确认')
})
    }

}
])
angular.module('BaiYin.Problems.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.ProblemsA', [
   'BaiYin.Problems',
   'BaiYin.ProblemsSolving',
   'BaiYin.NewProblems',
   'BaiYin.Tracking'
])
angular
    .module('BaiYin.home', [
        'BaiYin.tabs.homePage',
        'BaiYin.tabs.mine',
        'BaiYin.tabs.message',
        'BaiYin.tabs.OMA',
        'BaiYin.tabs.porductManage'
    ])
    .controller('tabController', ['$scope', '$http', '$state', '$ionicViewSwitcher', '$ionicHistory','showAlert',
        function($scope, $http, $state, $ionicViewSwitcher, $ionicHistory,showAlert) {
            $scope.getContentTpl = function() {
                return $scope.currentTab + '/content.tpl.html';
            };
            $scope.isActived = function(tabName) {
                return tabName == $scope.currentTab;
            };
            $scope.goTab = function(tabName) {
                if (tabName != $scope.currentTab) {
                    $ionicViewSwitcher.nextDirection('none');
                    $ionicHistory.nextViewOptions({ historyRoot: true });
                    $ionicHistory.clearHistory();
                    $state.go(tabName, {}, {
                        location: 'replace'
                    });
                }
            };
            $scope.goTabJygl = function () {
                showAlert.showMsg('','','程序员正在玩命开发中……')
            };
        }
    ]);
angular
    .module('BaiYin.taskManage', [
        'ionic',
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('taskManage', {
            url: '/taskManage',
            controller: 'taskManageController',
            templateUrl: 'taskManage/taskManage.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('taskManageController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$ionicActionSheet', '$ionicScrollDelegate',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $ionicActionSheet, $ionicScrollDelegate) {
             //日常tab对应状态
             var TabState = ["New", "Excuting", "Finished"];
             //状态转换
             var StateContrast = {"New": "新建", "Excuting": "处理中", "Finished": "已完成"};

            $scope.DailyList = [new Array(), new Array(), new Array()];//日常数据
            $scope.SpeciaList = new Array();//专项数据
            //是否还有数据可以加载
            $scope.hasDaily = [true, true, true];
            $scope.hasSpecia = true;
            //分页
            var dailyIndex = [0, 0, 0],
                specialIndex = 0;
            $scope.$on('$ionicView.afterEnter', function (event, view) {
                if(view.direction == "forward"){
                    $ionicScrollDelegate.scrollTop();

                    $scope.toUsually();
                    $ionicTabsDelegate.select(0);
    
                    $scope.reDaily();
                    $scope.reSpecia();
                }
            });
            //重置日常
            $scope.reDaily = function(){
                $scope.DailyList = [new Array(), new Array(), new Array()];
                dailyIndex = [0, 0, 0];
                $scope.hasDaily = [true, true, true];

                $scope.getDailyData(0);
                $scope.getDailyData(1);
                $scope.getDailyData(2);
            };
            //重置专项
            $scope.reSpecia = function(){
                $scope.SpeciaList = new Array();
                specialIndex = 0;
                $scope.hasSpecia = true;

                $scope.getSpecialData();
            };
            //点击日常
            $scope.toUsually = function () {
                $scope.spanUsually = {
                    "color": "#3492e9",
                    "background": "#fff",
                    "padding": "5px 10px",
                    "border-top-left-radius": "10px",
                    "border-bottom-left-radius": "10px"
                };
                $scope.spanSpecial = {
                    "color": "#fff",
                    "background": "rgba(0,0,0,0.2)",
                    "padding": "5px 10px",
                    "margin-left": "-5px",
                    "border-top-right-radius": "10px",
                    "border-bottom-right-radius": "10px"
                }
                //显示日常任务数据
                $scope.rcrwHide = false;
                //隐藏专项任务数据
                $scope.specialHide = true;
            }
            //点击专项
            $scope.toSpecial = function () {
                $scope.spanUsually = {
                    "color": "#fff",
                    "background": "rgba(0,0,0,0.2)",
                    "padding": "5px 10px",
                    "border-top-left-radius": "10px",
                    "border-bottom-left-radius": "10px"
                };
                $scope.spanSpecial = {
                    "color": "#3492e9",
                    "background": "#fff",
                    "padding": "5px 10px",
                    "margin-left": "-5px",
                    "border-top-right-radius": "10px",
                    "border-bottom-right-radius": "10px"
                }
                //隐藏日常任务数据
                $scope.rcrwHide = true;
                //显示专项任务数据
                $scope.specialHide = false;
            }
            $scope.toAllData = function () {
                $ionicTabsDelegate.select(0);
            }
            $scope.toClzData = function () {
                $ionicTabsDelegate.select(1);
            }
            $scope.toYwcData = function () {
                $ionicTabsDelegate.select(2);
            }
            //点击选择项目类型
            $scope.commitStatus = '';
            var stustList = ["全部", "单独报批重大项目", "跨年度技改项目", "一般项目", "重大项目", "自控项目"].map(function(v, i){
                return {text: v};
            });
            $scope.toSelectStatus = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: stustList,
                    buttonClicked: function (index) {
                        stustList[index].text == "全部"
                            ? $scope.commitStatus = ""
                            : $scope.commitStatus = stustList[index].text;
                        $scope.reSpecia();
                        return true;
                    }
                });
            }
            //点击跳转到设备详情
            $scope.toTmDetail = function (data) {
                $state.go("taskManage/tmDetail", {item: {data: data}});
            }

            //获取日常任务数据
            $scope.getDailyData = function(state){
                if(!$scope.hasDaily[state]){
                    return;
                }
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                $http.post("ServiceName=TaskService&TransName=getDailyList", {
                    state: TabState[state],
                    pageIndex: dailyIndex[state]++
                })
                .then(function (res) {
                    loadingAnimation.hideLoading();
                    if(res.code == "0"){
                        if(!res.data.length){
                            $scope.hasDaily[state] = false;
                        }else{
                            $scope.DailyList[state] = $scope.DailyList[state].concat(res.data.map(function(v, i){
                                for(var key in v){
                                    if(key.indexOf("TIME") != -1){
                                        v[key] = v[key] && v[key] != "null" ? $filter("date")(new Date(v[key]), "yyyy-MM-dd") : "";
                                    }
                                }
                                v.STATE = StateContrast[v.STATE];
                                return v;
                            }));
                        }
                    }else{
                        showAlert.showMsg(res, '', '', '确认')
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }, function (error) {
                    loadingAnimation.hideLoading();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            };
            //获取专项任务数据
            $scope.getSpecialData = function(){
                if(!$scope.hasSpecia){
                    return;
                }
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                $http.post("ServiceName=TaskService&TransName=getSpecialList", {
                    item_catelogy: $scope.commitStatus,
                    pageIndex: specialIndex++
                })
                .then(function (res) {
                    loadingAnimation.hideLoading();
                    if(res.code == "0"){
                        if(!res.data.length){
                            $scope.hasSpecia = false;
                        }else{
                            $scope.SpeciaList = $scope.SpeciaList.concat(res.data.map(function(v, i){
                                for(var key in v){
                                    if(key.indexOf("TIME") != -1){
                                        v[key] = v[key] && v[key] != "null" ? $filter("date")(new Date(v[key]), "yyyy-MM-dd") : "";
                                    }
                                }
                                v.STATE = StateContrast[v.STATE];
                                return v;
                            }));
                        }
                    }else{
                        showAlert.showMsg(res, '', '', '确认')
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }, function (error) {
                    loadingAnimation.hideLoading();
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            };
        }
    ]);
angular.module('BaiYin.taskManageA', [
    'BaiYin.taskManage',
    'BaiYin.taskManage.tmDetail',
])
angular.module('BaiYin.userConfig', [
    'ionic',
    'BaiYin.editingUserInfo',
    'BaiYin.editingPwd',
    'BaiYin.userConfig.myDevice'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('userConfig', {
        url: '/userConfig',
        controller: 'userConfigController',
        templateUrl: 'userConfig/userConfig.tpl.html',
        authorizedRuleType: ['1']
    })
}])

.controller('userConfigController', ['pageInitService', '$scope', '$http', '$ionicPopup', '$stateParams', '$state', 'Session',
    function(pageInitService, $scope, $http, $ionicPopup, $stateParams, $state, Session) {
        $scope.UserInfo = Session.userInfoData.UserInfo;
    }
])
angular.module('BaiYin.userServers', [
    'BaiYin.blankPage',
    'BaiYin.login'
])
angular.module('BaiYin.agentsList', [])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('AgentsList', {
        url: '/AgentsList',
        controller: 'AgentsListController',
        templateUrl: 'Agents/AgentsList/AgentsList.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('AgentsListController', ['$scope', 'showAlert', 'pageInitService', '$http', '$state',
    function($scope, showAlert, pageInitService, $http, $state) {
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
            'ServiceName=ApproveService&TransName=getUnApprvedList'
            ];

            pageInitService.pageInit(apis).then(function(result) {
             $scope.listsMsg = result[0]
             console.log(result[0])
             agentListMsg($scope.listsMsg)
            
            $scope.agentsItem = function(item) {
                $state.go('agentsView')
                var ItemCont =JSON.stringify(item)
                sessionStorage.setItem("agentsVD", ItemCont); 
            }
        }, function(error) {
             showAlert.showMsg(error,'','网络异常','确认')
        });
            $scope.loadNumber=1;
            $scope.loadMore=function(){
             $scope.loadNumber+=1;
             $http.get( 'ServiceName=ApproveService&TransName=getUnApprvedList&PageNo=' + $scope.loadNumber)
             .then(function(res){
                 if(res.data.length>0){
                   for(var i=0;i<res.data.length;i++){
                    res.data[i].CREATED_DATE=new Date(res.data[i].CREATED_DATE);
                    $scope.items.push(res.data[i])  
                    console.log( res.data[i])
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }else if(res.data.length<=0||res.data==null||res.data==undefined){
             $scope.hasMore=false;
             $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     }
     ,function(error){
       showAlert.showMsg(error,'','网络异常','确认')
         $scope.hasMore=false;
     })
         };
    });
        $scope.historySearch=function(){
             $state.go('historyList')
        }
        function agentListMsg(res){
         var str = [];
         var arr = {};
         for (var i = 0; i < res.data.length; i++) {
            arr = res.data[i]
            arr.CREATED_DATE = new Date(arr.CREATED_DATE)
            str.push(arr)
        }
        $scope.items = str;
         if($scope.items.length>=10&&$scope.items!=undefined&&$scope.items!=null){
                $scope.hasMore=true;
            }
    };
    $scope.doRefresh = function() {
        $http.get('ServiceName=ApproveService&TransName=getUnApprvedList')
        .then(function(res) {
            agentListMsg(res)
            $scope.$broadcast('scroll.refreshComplete');
            if(res.data.length==10){
               $scope.loadNumber=1;
               $scope.hasMore=true;
           }else{
            $scope.hasMore=false;
        }
    }, function(error) {
        $scope.hasMore=false;
        showAlert.showMsg(error,'','网络异常','确认')
})
    }

}
])
angular.module('BaiYin.attence.attenceCdDetail', [
    'ionic',
    'ionic-datepicker',
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/attenceCdDetail', {
            url: '/attence/attenceCdDetail',
            controller: 'attenceCdDetailController',
            templateUrl: 'attence/attenceCdDetail/attenceCdDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, partName: null, partCode: null}
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
    .controller('attenceCdDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicActionSheet', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicActionSheet, ionicDatePicker) {
            var dateTimeShow, departCode;
            $scope.$on('$ionicView.enter', function () {
                //获取统计页面传来的时间和部门
                dateTimeShow = $stateParams.dateTimeShow;
                var departName = $stateParams.partName;
                departCode = $stateParams.partCode;
                console.log("dateTimeShow==" + dateTimeShow + "/departName==" + departName + "/departCode==" + departCode);
                $("#attenceCdGlassid").val(departName);
                $("#attenceCdTimeid").text(dateTimeShow);
                cdztList(dateTimeShow, departCode);
                orgList();
            });
            var date = new Date();

            //点击选择部门
            var glassName = '';
            var glassArray;

            //获取部门信息
            function orgList() {
                glassArray = [];
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ClockService&TransName=deptList')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.orgList = res.data.tList;
                            console.log("orgList==" + JSON.stringify($scope.orgList));
                            //默认部门
                            // $("#attenceCdGlassid").val($scope.orgList[0].ORG_NAME);
                            for (var i = 0; i < $scope.orgList.length; i++) {
                                var olist = {};
                                olist.orgCode = $scope.orgList[i].ORG_CODE;
                                olist.text = $scope.orgList[i].ORG_NAME;
                                glassArray.push(olist);
                            }
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.selectGlass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArray,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        glassName = glassArray[index].text;
                        departCode = glassArray[index].orgCode;
                        console.log("glassName==" + glassName + "/departCode==" + departCode);
                        $("#attenceCdGlassid").val(glassName);
                        cdztList(dateTimeShow, departCode);
                        return true;
                    }
                });
            };
            //获取迟到早退列表信息
            function cdztList(dayTime, departNo) {
                var parmas = {
                    QUERY_DATE: dayTime,
                    DEPT: departNo,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=lateAndEarly', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.cdztList = res.data.tList;
                            console.log("cdztList===" + JSON.stringify($scope.cdztList));
                        } else {
                            $scope.cdztList = '';
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    dateTimeShow = $filter("date")(val, "yyyy-MM-dd");
                    $("#attenceCdTimeid").text(dateTimeShow);
                    cdztList(dateTimeShow, departCode);
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

angular.module('BaiYin.attence.attenceWdDetail', [
    'ionic',
    'ionic-datepicker',
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/attenceWdDetail', {
            url: '/attence/attenceWdDetail',
            controller: 'attenceWdDetailController',
            templateUrl: 'attence/attenceWdDetail/attenceWdDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, partName: null, partCode: null}
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
    .controller('attenceWdDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicActionSheet', 'ionicDatePicker', '$ionicPopup',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicActionSheet, ionicDatePicker, $ionicPopup) {
            $scope.qqCause = true;
            var dateTimeShow,departCode;
            $scope.$on('$ionicView.enter', function () {
                //获取统计页面传来的时间和部门
                dateTimeShow = $stateParams.dateTimeShow;
                var departName = $stateParams.partName;
                departCode = $stateParams.partCode;
                console.log("这是"+departName,departCode);
                $("#unClockGalssId").val(departName);
                $("#wdkDetailtimeID").text(dateTimeShow);
                unClockList(dateTimeShow, departCode);


            });
            var date = new Date();
            $scope.toCause = function (obj) {
                console.log("obj==" + JSON.stringify(obj));
                $scope.qqCause = false;
            }

            //获取未打卡列表信息
            function unClockList(day, dept) {
                var parmas = {
                    QUERY_DATE: day,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=unClock',parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.unClockList = res.data.tList;
                        } else {
                            $scope.unClockList='';
                            showAlert.showMsg('','',res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            //点击选择部门
            var glassName = '';
            var glassArray;

            //获取部门信息
            function orgList() {
                glassArray = [];
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ClockService&TransName=deptList')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.orgList = res.data.tList;
                            //默认部门
                            // $("#unClockGalssId").val($scope.orgList[0].ORG_NAME);
                            for (var i = 0; i < $scope.orgList.length; i++) {
                                var olist = {};
                                olist.orgCode = $scope.orgList[i].ORG_CODE;
                                olist.text = $scope.orgList[i].ORG_NAME;
                                glassArray.push(olist);
                            }
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.selectGlass = function () {
                //获取部门列表
                orgList();
                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArray,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        glassName = glassArray[index].text;
                        departCode = glassArray[index].orgCode
                        console.log("glassName==" + glassName);
                        $("#unClockGalssId").val(glassName);
                        unClockList($scope.now, departCode);
                        return true;
                    }
                });
            };

            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    $scope.now = $filter("date")(val, "yyyy-MM-dd");
                    $("#wdkDetailtimeID").text($scope.now);
                    unClockList($scope.now, departCode);
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

angular.module('BaiYin.attence.attenceZtDetail', [
    'ionic',
    'ionic-datepicker',
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/attenceZtDetail', {
            url: '/attence/attenceZtDetail',
            controller: 'attenceZtDetailController',
            templateUrl: 'attence/attenceZtDetail/attenceZtDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, partName: null, partCode: null}
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
    .controller('attenceZtDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicActionSheet', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicActionSheet, ionicDatePicker) {
            var dateTimeShow, departCode;
            $scope.$on('$ionicView.enter', function () {
                //获取统计页面传来的时间和部门
                dateTimeShow = $stateParams.dateTimeShow;
                var departName = $stateParams.partName;
                departCode = $stateParams.partCode;
                console.log("dateTimeShow==" + dateTimeShow + "/departName==" + departName + "/departCode==" + departCode);
                $("#attenceCdGlassid").val(departName);
                $("#attenceCdTimeid").text(dateTimeShow);
                cdztList(dateTimeShow, departCode);
                orgList();
            });
            var date = new Date();

            //点击选择部门
            var glassName = '';
            var glassArray;

            //获取部门信息
            function orgList() {
                glassArray = [];
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ClockService&TransName=deptList')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.orgList = res.data.tList;
                            console.log("orgList==" + JSON.stringify($scope.orgList));
                            //默认部门
                            // $("#attenceCdGlassid").val($scope.orgList[0].ORG_NAME);
                            for (var i = 0; i < $scope.orgList.length; i++) {
                                var olist = {};
                                olist.orgCode = $scope.orgList[i].ORG_CODE;
                                olist.text = $scope.orgList[i].ORG_NAME;
                                glassArray.push(olist);
                            }
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.selectGlass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArray,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        glassName = glassArray[index].text;
                        departCode = glassArray[index].orgCode;
                        console.log("glassName==" + glassName + "/departCode==" + departCode);
                        $("#attenceCdGlassid").val(glassName);
                        cdztList(dateTimeShow, departCode);
                        return true;
                    }
                });
            };
            //获取迟到早退列表信息
            function cdztList(dayTime, departNo) {
                var parmas = {
                    QUERY_DATE: dayTime,
                    DEPT: departNo,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=lateAndEarly', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.cdztList = res.data.tList;
                            console.log("cdztList===" + JSON.stringify($scope.cdztList));
                        } else {
                            $scope.cdztList = '';
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    dateTimeShow = $filter("date")(val, "yyyy-MM-dd");
                    $("#attenceCdTimeid").text(dateTimeShow);
                    cdztList(dateTimeShow, departCode);
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

angular.module('BaiYin.attence.attenZcDetail', [
    'ionic',
    'ionic-datepicker',
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/attenZcDetail', {
            url: '/attence/attenZcDetail',
            controller: 'attenZcDetailController',
            templateUrl: 'attence/attenZcDetail/attenZcDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, partName: null, partCode: null}
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
    .controller('attenZcDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicActionSheet', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicActionSheet, ionicDatePicker) {
            var dateTimeShow, departCode;
            $scope.$on('$ionicView.enter', function () {
                //获取统计页面传来的时间和部门
                dateTimeShow = $stateParams.dateTimeShow;
                var departName = $stateParams.partName;
                departCode = $stateParams.partCode;
                console.log("dateTimeShow==" + dateTimeShow + "/departName==" + departName + "/departCode==" + departCode);
                $("#attenceCdGlassid").val(departName);
                $("#attenceCdTimeid").text(dateTimeShow);
                cdztList(dateTimeShow, departCode);
                orgList();
            });
            var date = new Date();

            //点击选择部门
            var glassName = '';
            var glassArray;

            //获取部门信息
            function orgList() {
                glassArray = [];
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ClockService&TransName=deptList')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.orgList = res.data.tList;
                            console.log("orgList==" + JSON.stringify($scope.orgList));
                            //默认部门
                            // $("#attenceCdGlassid").val($scope.orgList[0].ORG_NAME);
                            for (var i = 0; i < $scope.orgList.length; i++) {
                                var olist = {};
                                olist.orgCode = $scope.orgList[i].ORG_CODE;
                                olist.text = $scope.orgList[i].ORG_NAME;
                                glassArray.push(olist);
                            }
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.selectGlass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArray,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        glassName = glassArray[index].text;
                        departCode = glassArray[index].orgCode;
                        console.log("glassName==" + glassName + "/departCode==" + departCode);
                        $("#attenceCdGlassid").val(glassName);
                        cdztList(dateTimeShow, departCode);
                        return true;
                    }
                });
            };
            //获取正常打卡列表信息
            function cdztList(dayTime, departNo) {
                var parmas = {
                    QUERY_DATE: dayTime,
                    DEPT: departNo,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=normalPerson', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.cdztList = res.data.zList;
                            console.log("cdztList===" + JSON.stringify($scope.cdztList));
                        } else {
                            $scope.cdztList = '';
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    dateTimeShow = $filter("date")(val, "yyyy-MM-dd");
                    $("#attenceCdTimeid").text(dateTimeShow);
                    cdztList(dateTimeShow, departCode);
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

angular.module('BaiYin.attence.countAttence', [
    'ionic',
    'ionic-datepicker',
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence', {
            url: '/attence/countAttence',
            controller: 'countAttenceController',
            templateUrl: 'attence/countAttence/countAttence.tpl.html',
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
    .controller('countAttenceController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicActionSheet', 'ionicDatePicker',

        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicActionSheet, ionicDatePicker) {
            var date = new Date();
            console.log(date);
            //当前部门
            $scope.deptName = token.DeptName;
            $scope.deptNo = token.DeptNo;
            //部门变量
            var glassName = token.DeptName;
            var glassMName = token.DeptName;
            var glassMCode = '';
            var glassCode = '';
            var glassArray;
            var glassArraym;
            glassCode = $scope.deptNo;
            glassMCode = $scope.deptNo;
            $scope.num=0;
            $scope.$on('$ionicView.afterEnter', function () {
                //当前部门
                $scope.num++;
                if($scope.num==1){
                    $scope.deptName = token.DeptName;
                    $("#countgalssId").val(token.DeptName);
                }else{
                    // $scope.deptName = glassName;
                    $("#countgalssId").val(glassName);
                }

                $scope.now = $filter("date")(date, "yyyy-MM-dd");
                countByDay($scope.now, glassCode);
            });
            //点击日统计数据
            $scope.toCountDay = function () {
                $ionicTabsDelegate.select(0);
                $scope.now = $filter("date")(date, "yyyy-MM-dd");
                countByDay($scope.now, glassCode);
            }
            //点击月统计数据
            $scope.toCountMounth = function () {
                $ionicTabsDelegate.select(1);
                console.log("月当前部门==" + token.DeptName);
                //$("#glassMounthId").val(token.DeptName);
                //点击当前月的后一个月
                $(".rightSelect").attr("disabled", true);
                //获取部门
                $scope.nowMounth = $filter("date")(date, "yyyy-MM");
                $scope.newDate = $filter("date")(date, "yyyy-MM");
                countnMounth($scope.nowMounth, glassMCode);
            }

            //点击向前一个月
            $scope.getPreMonth = function (date) {
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
                $scope.nowMounth = t2;
                countnMounth(t2, glassMCode);
                //点击当前月的后一个月
                $(".rightSelect").attr("disabled", false);
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
                if ($scope.newDate <= t2) {
                    $(".rightSelect").attr("disabled", true);
                    $scope.nowMounth = t2;
                    countnMounth(t2, glassMCode);
                }
                else {
                    $scope.nowMounth = t2;
                    countnMounth(t2, glassMCode);
                    $(".rightSelect").attr("disabled", false);
                }
            }
            //获取日历插件
            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    $scope.now = $filter("date")(val, "yyyy-MM-dd");
                    countByDay($scope.now, glassCode);
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

            //获取日统计信息
            function countByDay(day, dept) {
                var parmas = {
                    QUERY_DATE: day,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=dayStatistics', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.countDayList = res.data;
                            $scope.wdkNUM = $scope.countDayList.unclockPerson;
                            $scope.dkNUM = $scope.countDayList.clockPerson;
                            $scope.allNUM = $scope.countDayList.allPerson;
                            orgList();
                            draw($scope, $scope.wdkNUM, $scope.dkNUM, $scope.allNUM);
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            //获取月统计信息
            function countnMounth(mounth, dept) {
                var parmas = {
                    QUERY_MONTH: mounth,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=monthStatistics', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.personList= res.data.tList;
                            orgList();
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            //获取部门信息
            function orgList() {
                glassArray = [];
                glassArraym = [];
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ClockService&TransName=deptList')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.orgList = res.data.tList;
                            for (var i = 0; i < $scope.orgList.length; i++) {
                                var olist = {};
                                olist.orgCode = $scope.orgList[i].ORG_CODE;
                                olist.text = $scope.orgList[i].ORG_NAME;
                                glassArray.push(olist);
                                glassArraym.push(olist);
                            }
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            //月统计选择部门
            $scope.toSelectGlass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArraym,
                    cancel: function () {

                    },
                    buttonClicked: function (index) {
                        glassMName = glassArraym[index].text;
                        glassMCode = glassArraym[index].orgCode;
                        $("#glassMounthId").val(glassMName);
                        countnMounth($scope.nowMounth, glassMCode);
                        return true;
                    }
                });
            };
            //日统计选择部门
            $scope.selectGlass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: glassArray,
                    cancel: function () {

                    },
                    buttonClicked: function (index) {
                        glassName = glassArray[index].text;
                        glassCode = glassArray[index].orgCode;
                        $("#countgalssId").val(glassName);
                        countByDay($scope.now, glassCode);
                        return true;
                    }
                });
            };

            //画饼图
            function draw($scope, wdkNum, dkNum, allNum) {
                var a = [];
                var radius = [55, 75];
                var labelTop = {
                    normal: {
                        color: '#ccc',
                        label: {
                            show: true,
                            position: 'center',
                            formatter: '打卡人数/总数',
                            textStyle: {
                                baseline: 'bottom'
                            }
                        },
                        labelLine: {
                            show: false
                        }
                    }
                };
                var labelFromatter = {
                    normal: {
                        label: {
                            formatter: function (params) {
                                return dkNum + '/' + allNum;
                            },
                            textStyle: {
                                baseline: 'top'
                            }
                        }
                    },
                }
                var labelBottom = {
                    normal: {
                        color: '#3492e9',
                        label: {
                            show: true,
                            position: 'center'
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        color: 'rgba(0,0,0,0)'
                    }
                };
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
                    // 图例
                    legend: {
                        x: 'center',
                        y: '10',
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: radius,
                            center: ['50%', '43%'],
                            label: {
                                normal: {
                                    position: 'inner' //内置文本标签
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {name: '打卡人数', value: dkNum, itemStyle: labelBottom},
                                {name: '未打卡', value: wdkNum, itemStyle: labelTop}
                            ],
                            itemStyle: labelFromatter,
                        }
                    ]
                };
                var myChart = echarts.init(document.getElementById('main'), 'macarons');
                myChart.setOption(option);
            }

            //点击跳转迟到详情
            $scope.tocdDetail = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $("#countDayId").text();
                    $scope.partName = $("#countgalssId").val();
                    $scope.partCode = glassCode;
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        partName: $scope.partName,
                        partCode: $scope.partCode,
                    }
                    $state.go('attence/attenceCdDetail', item);
                }
            }
            //点击跳转早退详情
            $scope.toZtDetail = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $("#countDayId").text();
                    $scope.partName = $("#countgalssId").val();
                    $scope.partCode = glassCode;
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        partName: $scope.partName,
                        partCode: $scope.partCode,
                    }
                    $state.go('attence/attenceZtDetail', item);
                }
            }
            //点击正常打卡详情
            $scope.tozcDetail = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $("#countDayId").text();
                    $scope.partName = $("#countgalssId").val();
                    $scope.partCode = glassCode;
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        partName: $scope.partName,
                        partCode: $scope.partCode,
                    }
                    $state.go('attence/attenZcDetail', item);
                }
            }

            //点击跳打卡详情页面
            $scope.towdDetail = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $("#countDayId").text();
                    $scope.partName = $("#countgalssId").val();
                    $scope.partCode = glassCode;
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        partName: $scope.partName,
                        partCode: $scope.partCode,
                    }
                    $state.go('attence/attenceWdDetail', item);
                }

            }
            //点击跳转到日未打卡列表
            $scope.towdkList = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $scope.nowMounth;
                    $scope.partCode = glassCode;
                    $scope.partName = $("#glassMounthId").val();
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        personNum: num,
                        partCode: $scope.partCode,
                        partName: $scope.partName,
                    }
                    $state.go('attence/countAttence/wdkList', item);
                }

            }
            //点击跳转到日迟到列表
            $scope.tocdList = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $scope.nowMounth;
                    $scope.partCode = glassCode;
                    $scope.partName = $("#glassMounthId").val();
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        personNum: num,
                        partCode: $scope.partCode,
                        partName: $scope.partName,
                    }
                    $state.go('attence/countAttence/cdList', item);
                }
            }
            //点击跳转日早退列表
            $scope.toztList = function (num) {
                if (num == 0) {
                    return;
                } else {
                    $scope.dateTimeShow = $scope.nowMounth;
                    $scope.partCode = glassCode;
                    $scope.partName = $("#glassMounthId").val();
                    var item = {
                        dateTimeShow: $scope.dateTimeShow,
                        personNum: num,
                        partCode: $scope.partCode,
                        partName: $scope.partName,
                    }
                    $state.go('attence/countAttence/ztList', item);
                }
            }

            //点击跳转个人月打卡详情
            $scope.toeveryDetail=function (obj) {
                console.log(obj);
                $scope.dateTimeShow = $scope.nowMounth;
                $scope.PERSON_ID = obj.personId;
                $scope.personName = obj.personName;
                $scope.count = obj.COUNT;
                var item = {
                    PERSON_ID: $scope.PERSON_ID,
                    QUERY_MONTH: $scope.dateTimeShow,
                    personName: $scope.personName,
                    count: $scope.count,
                }
                $state.go('attence/countAttence/wdkDetail', item);
            }
        }
    ])
    .directive('pie', function () {
        return {
            scope: {
                id: "@",
                legend: "=",
                //item: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:200px; width:200px"></div>',
            replace: true,
            link: function ($scope, element, attrs, controller) {
            }
        };
    });

angular.module('BaiYin.attence.countAttenceA', [
    'BaiYin.attence.countAttence',
    'BaiYin.attence.countAttence.wdkList',
    'BaiYin.attence.countAttence.wdkDetail',
    'BaiYin.attence.countAttence.cdList',
    'BaiYin.attence.countAttence.cdDetail',
    'BaiYin.attence.countAttence.ztList',
    'BaiYin.attence.countAttence.ztDetail',
    'BaiYin.attence.countAttence.zcList',
])
angular.module('BaiYin.attence.fillCause', [
    'ionic',
    'ionic-datepicker',

])
    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider,ionicDatePickerProvider) {
        $stateProvider.state('attence/fillCause', {
            url: '/attence/fillCause',
            controller: 'fillCauseController',
            templateUrl: 'attence/fillCause/fillCause.tpl.html',
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
    .controller('fillCauseController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup','$ionicActionSheet','ionicDatePicker',

        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup,$ionicActionSheet,ionicDatePicker) {
        var chidaoNOTE="事由:" ;
        $scope.$on('$ionicView.afterEnter', function () {
                //获取当前月份
                getNowDate();
            });
            var date = new Date();
            var number=1;
            //获取系统前一周的时间
            var oneweekdate = new Date(date-7*24*3600*1000);
            var y = oneweekdate.getFullYear();
            var m = oneweekdate.getMonth()+1;
            var d = oneweekdate.getDate();
            $scope.fromDate = y+'-'+m+'-'+d;
            function getNowDate() {
                $scope.now = $filter("date")(date, "yyyy-MM-dd");
                lateAndEarlyList();
            }
            //获取日历插件
            var ipObj1 = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    $scope.now = $filter("date")(val, "yyyy-MM-dd");
                    if($scope.tabType=='lateAndEarly'){
                        lateAndEarlyList();
                    }else if($scope.tabType=='unClock'){
                        unClockList();
                    }
                },
                from: $scope.fromDate,
                to: new Date(),
                inputDate: new Date(),
                mondayFirst: false,
                closeOnSelect: false,
                templateType: 'popup'
            };
            $scope.openDatePicker = function () {
                ipObj1.inputDate = new Date($scope.now);
                ionicDatePicker.openDatePicker(ipObj1);
            };
            //隐藏填写事由
            $scope.fillCause = true;
            $scope.blackShow = true;

            //点击向前一个月
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
            }
            //点击异常考勤查看事由
            $scope.tofillCause = function (list, index) {
                console.log(list,index)
                 chidaoNOTE=list[index].NOTE;
                weiCONFIRM_DATE=list[index].CONFIRM_DATE;
                console.log(weiCONFIRM_DATE);
                $scope.node =chidaoNOTE;
                if(weiCONFIRM_DATE == null || typeof weiCONFIRM_DATE == "undefined" ||
                    weiCONFIRM_DATE == ""){
                    //缺勤事由点击事件
                    $scope.data = new Object();
                    // 自定义弹窗
                    var myPopup = $ionicPopup.show({
                        template: '<textarea ng-style="syWidth" ng-model="node" readonly></textarea>',
                        title: '事由确认',
                        scope: $scope,
                        buttons: [
                            {
                                text: '取消',
                                type: 'button-cancel'
                            },
                            {
                                text: '<b>确认审核</b>',
                                type: 'button-positive',
                                onTap: function (e) {
                                    if (!$scope.node) {
                                        // 不允许用户关闭，除非输入数据
                                        e.preventDefault();
                                    } else {
                                        submitNote(list, index);
                                    }
                                }
                            },
                        ]
                    });
                    myPopup.then(function (res) {
                        console.log('Tapped!', res);
                    });

                }else{
                    return false;
                }

            };

            //缺勤事由编辑框样式
            $scope.syWidth = {
                "height": '100px',
                "border": '1px solid #f4f4f4',
                "margin": '0 auto',
            }
            //点击取消
            $scope.toFillCancel = function () {
                $scope.fillCause = true;
                $scope.blackShow = true;
            }

            //切换标签
            $scope.tabType = "lateAndEarly";
            $scope.changeTabType=function(tabType){
                console.log(number);
                if(number==1){

                }else{
                    $scope.tabType = tabType;
                    if(tabType=='lateAndEarly'){
                        lateAndEarlyList();
                    }else if(tabType=='unClock'){
                        unClockList();
                    }
                }
                number=2;
            }
            //获取迟到早退信息
            function lateAndEarlyList() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=lateAndEarlyReason&QUERY_DATE=' + $scope.now)
                    .then(function (res) {
                        $scope.lateAndEarlyList = new Array();
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.lateAndEarlyList = res.data.tList;
                        } else if ($scope.tabType == "lateAndEarly") {
                            showAlert.showMsg(res.data);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //未打卡数据
            function unClockList(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=unClockReason&QUERY_DATE=' + $scope.now)
                    .then(function (res) {
                        $scope.unClockList = new Array();
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            console.log(res.data.wList)
                            $scope.unClockList = res.data.wList;
                        } else if ($scope.tabType == "unClock") {
                            showAlert.showMsg(res.data);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //确认事由
            function submitNote(list, index) {
                console.log(list,index,$scope.now);
                loadingAnimation.showLoading('数据保存中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=Confirmation', {
                    "TRANSACTION_ID": list[index].TRANSACTION_ID || "",
                    "PERSON_ID": list[index].PERSON_ID,
                    "QUERY_DATE": $scope.now
                }).then(function (res) {
                    loadingAnimation.hideLoading();
                    if (res.data.code == '0') {
                        if($scope.tabType=='lateAndEarly'){
                            lateAndEarlyList();
                        }else if($scope.tabType=='unClock'){
                            unClockList();
                        }
                    } else {
                        showAlert.showMsg(res.data);
                    }
                }, function (error) {
                    loadingAnimation.hideLoading();
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });
            }
        }
    ])

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

angular.module('BaiYin.attence.myAttence', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('attence/myAttence', {
            url: '/attence/myAttence',
            controller: 'myAttenceController',
            templateUrl: 'attence/myAttence/myAttence.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('myAttenceController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup',

        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup) {

            var u = navigator.userAgent, app = navigator.appVersion;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
                $('textarea').focus(function () {
                    alert("textarea输入");
                    $(".popup").css("top", "10px");
                });
            }

            $scope.$on('$ionicView.enter', function () {
                //获取当前月份
                getNowDate();
            });
            var date = new Date();

            function getNowDate() {
                //禁止点击当前月的后一个月
                $(".rightSelect").attr("disabled", true);
                $scope.now = $filter("date")(date, "yyyy-MM");
                $scope.newDate = $filter("date")(date, "yyyy-MM");
                attenceList($scope.now);
            }

            //点击向前一个月
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
                attenceList(t2);
                //点击当前月的后一个月
                $(".rightSelect").attr("disabled", false);
            }
            //点击向后一个月
            $scope.getNextMonth = function (date) {
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
                if ($scope.newDate <= t2) {
                    $(".rightSelect").attr("disabled", true);
                    $scope.now = t2;
                    attenceList(t2);
                }
                else {
                    $scope.now = t2;
                    attenceList(t2);
                    $(".rightSelect").attr("disabled", false);
                }

            }

            //获取考勤信息
            function attenceList(mounth) {
                console.log("mounth==" + mounth);
                $scope.attenList = [];
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=myAttendence&QUERY_MONTH=' + mounth)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.attenceList = new Array();
                            res.data.dList.forEach(function (v, i) {
                                var date = [v.year, v.month, v.date].join("-");
                                $scope.attenceList.push({
                                    dates: date,
                                    year: v.year,
                                    month: v.month,
                                    date: v.date,
                                    week: v.week,
                                    list: res.data.dvalue[date].map(function (v, i) {
                                        if (v.actualStartTime == null) {
                                            v.actualStartTime = ''
                                        } else {
                                            v.actualStartTime = v.actualStartTime.substr(11, 5)
                                        }
                                        if (v.actualEndTime == null) {
                                            v.actualEndTime = ''
                                        } else {
                                            v.actualEndTime = v.actualEndTime.substr(11, 5)
                                        }
                                        return v;
                                    })
                                });
                            });
                            // $scope.attencedateList =res.data.dList;

                            console.log($scope.attenceList)
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.textareaFoucs = function () {
                var userAgent = navigator.userAgent;
                var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; //android终端
                var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是iOS
                if (isIOS) {
                    $(".popup-container").css("top", "-300px")

                }
            }

            //点击异常考勤编辑事由
            $scope.to_edit = function (obj) {

                console.log("obj==" + JSON.stringify(obj));
                if (obj.checkInState == "正常" && obj.checkOutState == "正常") {
                    return false;
                } else {

                    if (obj.confirmDate == null || typeof obj.confirmDate == "undefined" ||
                        obj.confirmDate == "") {
                        var weidakazao = obj.actualStartTime;
                        var weidakawan = obj.actualEndTime;
                        console.log('====早上打卡没?' + weidakazao + '====晚上打卡没?' + weidakawan);
                        console.log(token.UserID);
                        var months = obj.month;
                        var dates = obj.date;
                        if (months < 10) {
                            months = '0' + months;
                        }
                        if (dates < 10) {
                            dates = '0' + dates;
                        }
                        var QUERY_DATE = obj.year + '-' + months + '-' + dates;
                        var nowmonth = date.getMonth() + 1;
                        var nowdata = date.getDate();
                        if (nowmonth < 10) {
                            nowmonth = '0' + nowmonth;
                        }
                        if (nowdata < 10) {
                            nowdata = '0' + nowdata;
                        }
                        var s2 = date.getFullYear() + "-" + nowmonth + "-" + nowdata;
                        console.log(s2);
                        var d1 = new Date(QUERY_DATE.replace(/\-/g, "\/"));
                        var d2 = new Date(s2.replace(/\-/g, "\/"));
                        if (QUERY_DATE > s2) {
                            showAlert.showMsg('', '', '还未到考勤时间!')
                            return false;
                        }
                        var PERSON_ID = obj.personalId;
                        if (!obj.personalId) {
                            PERSON_ID = token.UserID;
                        }
                        var TRANSACTION_ID = obj.transactionId;
                        if (!TRANSACTION_ID) {
                            TRANSACTION_ID = '';
                        }
                        console.log(QUERY_DATE);
                        var nownote = obj.note;
                        $scope.placeholder = nownote;
                        $scope.data = new Object();
                        // 自定义弹窗

                        var myPopup = $ionicPopup.show({
                            template: '<textarea ng-style="syWidth" id="textID"  ng-model="data.node" placeholder="{{placeholder}}" ng-focus="textareaFoucs()"></textarea>',
                            title: '填写事由',
                            scope: $scope,
                            buttons: [
                                {
                                    text: '取消',
                                    type: 'button-cancel'
                                },
                                {
                                    text: '<b>确认</b>',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        console.log($scope.data.node);
                                        if (!$scope.data.node) {

                                            // 不允许用户关闭，除非输入数据

                                            e.preventDefault();
                                        } else {
                                            if (weidakazao == null && weidakawan == null || weidakazao == '' && weidakawan == '' || weidakazao == '' && weidakawan == null || weidakazao == null && weidakawan == '') {
                                                submitWNote(QUERY_DATE, PERSON_ID, $scope.data.node, TRANSACTION_ID);
                                            } else {
                                                console.log('======提交数据' + QUERY_DATE + '====' + PERSON_ID + '====' + $scope.data.node + '===' + TRANSACTION_ID);
                                                submitNote(QUERY_DATE, PERSON_ID, $scope.data.node, TRANSACTION_ID);
                                            }

                                        }
                                    }
                                },
                            ]
                        });
                        myPopup.then(function (res) {
                            console.log('Tapped!', res);
                        });

                    } else {
                        return false;
                    }

                }

            };

            //提交事由
            function submitWNote(QUERY_DATE, PERSON_ID, note, TRANSACTION_ID) {
                loadingAnimation.showLoading('数据保存中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=wClockReason', {
                    "TRANSACTION_ID": TRANSACTION_ID,
                    "PERSON_ID": PERSON_ID,
                    "NOTE": note,
                    "QUERY_DATE": QUERY_DATE
                }).then(function (res) {
                    loadingAnimation.hideLoading();
                    if (res.data.code == '0') {
                        attenceList($scope.now);

                    } else {
                        showAlert.showMsg(res.data);
                    }
                }, function (error) {
                    loadingAnimation.hideLoading();
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });
            }

            //提交事由
            function submitNote(QUERY_DATE, PERSON_ID, note, TRANSACTION_ID) {
                loadingAnimation.showLoading('数据保存中', 'loding', 0);
                $http.post('ServiceName=AttendReasonService&TransName=reason', {
                    "TRANSACTION_ID": TRANSACTION_ID,
                    "PERSON_ID": PERSON_ID,
                    "NOTE": note,
                    "QUERY_DATE": QUERY_DATE
                }).then(function (res) {
                    loadingAnimation.hideLoading();
                    if (res.data.code == '0') {
                        attenceList($scope.now);

                    } else {
                        showAlert.showMsg(res.data);
                    }
                }, function (error) {
                    loadingAnimation.hideLoading();
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });
            }

            //获取打卡位置
            $scope.toPosition = function (obj) {
                console.log("obj==" + JSON.stringify(obj));
                $scope.data = {}
                // 自定义弹窗
                if (obj.checkInAddr != null && obj.checkOutAddr != null) {
                    var myPopup = $ionicPopup.show({
                        template: '<div class="dkposition"><ul><li ng-style="myPopupLi">上班打卡位置：' + obj.checkInAddr + '</li>' +
                        '<li ng-style="myPopuplastLi">下班打卡位置：' + obj.checkOutAddr + '</li></ul></div>',
                        title: '打卡位置',
                        scope: $scope,
                    });
                    myPopup.then(function (res) {
                        console.log('Tapped!', res);
                    });
                    $timeout(function () {
                        myPopup.close(); // 2秒后关闭弹窗
                    }, 2000);
                    $scope.myPopupLi = {
                        "line-height": "35px",
                        "font-size": "12px",
                        "text-align": "center",
                        "border-bottom": "1px dotted #f4f4f4",
                    }
                    $scope.myPopuplastLi = {
                        "line-height": "35px",
                        "font-size": "12px",
                        "text-align": "center",
                    }
                }
            };


        }

    ])

angular.module('BaiYin.bulletinBoard.edit', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bulletinBoard/edit', {
            url: '/bulletinBoard/edit',
            controller: 'editController',
            templateUrl: 'bulletinBoard/edit/edit.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {LINE_NO: null}
        })
    }])
    .controller('editController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams',
        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams) {
            $scope.$on('$ionicView.enter', function () {
                // //设置 textarea 的高度随着 内容 增加 自适应
                // $scope.textareaHeight = {height: '' + screen.height - 280 + 'px'};
                //$(".ggbbcontent").height($(".ggbbcontent")[0].scrollHeight);
                //$(".ggbbcontent").on("keyup keydown", function(){
                    //$(this).height(this.scrollHeight);
                //})
                /*$scope.textareaHeight = {height: '' +280 + 'px'};*/
            });
            $scope.$on('$ionicView.afterEnter', function () {
                boardDetail($stateParams.LINE_NO);
            });
            //返回
            $scope.toBack=function(){
                console.log("back===");
                history.back();
            };
            //编辑提交
            $scope.toEdit=function(){
                subEdit();
            };

            /**
             * 编辑提交
             */
            function subEdit(){
                console.log("$scope.sortid=="+$('#sortid').val());
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var param=$scope.detail;
                param.SORT=$('#sortid').val();
                param.NEWS_TITLE=$('#news_title_id').val();
                param.NEWS_CONTENT=$('#news_content_id').val();
                $http.post('ServiceName=WhiteBoardService&TransName=FunWhiteBoardNewspaper',param)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            showAlert.showMsg('','','功能内容提交成功！');
                            history.back();
                        } else {
                            showAlert.showMsg('','',res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //白板明细
            function boardDetail(line_no){
                console.log("line_no=="+line_no);
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var param={LINE_NO:line_no};
                $http.post('ServiceName=WhiteBoardService&TransName=FormWhiteBoardNewspaper',param)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.detail = res.data.detail;
                            console.log("$scope.detail=="+JSON.stringify($scope.detail));
                            $("#sortid").val($scope.detail.SORT);
                            $("#news_title_id").val($scope.detail.NEWS_TITLE);
                            $("#news_content_id").val($scope.detail.NEWS_CONTENT);
                            //获取textarea编辑框字数
                            var content_len=$scope.detail.NEWS_CONTENT.length;
                            console.log(content_len);
                            if(content_len>=300){
                                $scope.textareaHeight = {height: '' + 200+ 'px'};
                            }else if(content_len<=20){
                                $scope.textareaHeight = {height: '' + 200+ 'px'};
                            }else{
                                $scope.textareaHeight = {height: '' + 200+ 'px'};
                            }
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])

angular.module('BaiYin.bulletinBoard.view', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bulletinBoard/view', {
            url: '/bulletinBoard/view',
            controller: 'boardViewController',
            templateUrl: 'bulletinBoard/view/boardView.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {LINE_NO: null}
        })
    }])
    .controller('boardViewController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams',
        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams) {
            $scope.$on('$ionicView.enter', function () {
            });
            $scope.$on('$ionicView.afterEnter', function () {
                boardViewDetail($stateParams.LINE_NO);
            });

            //白板明细
            function boardViewDetail(line_no){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var param={LINE_NO:line_no};
                $http.post('ServiceName=WhiteBoardService&TransName=FormWhiteBoardNewspaper',param)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.detail = res.data.detail;
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])

angular
	.module('BaiYin.erp.details', [
		'ionic',
		'BaiYin.erp.selectUser'
	])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('erpDetails', {
			url: '/erp/details',
			controller: 'erpDetailsController',
			templateUrl: 'erp/details/details.tpl.html',
			cache: true,
			authorizedRuleType: ['1'],
			params: {item: null}
		})
	}])
	.controller('erpDetailsController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', 'ionicDatePicker', '$ionicActionSheet', '$ionicScrollDelegate', '$ionicSlideBoxDelegate',
		function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, ionicDatePicker, $ionicActionSheet, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
			//申请信息
			$scope.data = new Object();
			//显示类型
			$scope.showType = "";
			//标题
			$scope.title = "";
			$scope.typeIndex = 0;
			$scope.types = ["申请单", "申请详情", "文档", "审批流程"];
			//链接超时时间设置为20S
			var timeout = {timeout: 20 * 1000};
			//进入页面
			$scope.$on('$ionicView.enter', function (event, view) {
                if(view.direction == "forward"){
					$scope.data = $stateParams.item.data;
                    $scope.data.KEY_REF = encodeURIComponent($scope.data.KEY_REF);
					$scope.showType = $stateParams.item.type;
					$scope.title = $scope.data.LU_DESCRIPTION;
					getMainTable();
                }
			});

			//滑动切换
			$scope.slideHasChanged = function (index) {
				$scope.typeIndex = index;
			};

            //切换typeIndex
            $scope.changeTypeIndex = function(type){
				var index = $scope.types.indexOf(type);
				if(index != -1){
					$scope.typeIndex = index;
					$ionicSlideBoxDelegate.slide(index);
				}
			};
			var getSendData = function(){
				if(!$scope.data.opinion){
					throw "审批意见不可为空";
				}
				return {
					lu_name: $scope.data.LU_NAME || "",
					key_ref: $scope.data.KEY_REF || "",
					line_no: $scope.data.LINE_NO || "",
					step_no: $scope.data.STEP_NO || "",
					group_id: $scope.data.GROUP_ID || "",
					person_id: $scope.data.PERSON_ID || "",
					desc: $scope.data.opinion
				};
			};

			//同意
			$scope.toSelectUser = function () {
				var data = null;
				try{
                    if(!$scope.data.opinion){
                        $scope.data.opinion =  "批准";
                    }
					data = getSendData();
				}catch(e){
					showAlert.showMsg("", "", e, "确认");
					return;
				}

				loadingAnimation.showLoading('加载中...', 'loding', 0);
				$http
                    .post("ServiceName=ErpService&TransName=startApprove", data, timeout)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if(res.data){
							showAlert.showMsg('', '', res.data, '确认');
                        }else{
							showAlert.showMsg("", "", "已通过", "确认");
							history.go(-1);
						}
                    }, function (error) {
						loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//拒绝
			$scope.toRefused = function () {
				var data = null;
				try{
					data = getSendData();
				}catch(e){
					showAlert.showMsg("", "", e, "确认");
					return;
				}

				loadingAnimation.showLoading('加载中...', 'loding', 0);
				$http
                    .post("ServiceName=ErpService&TransName=refuseApprove", data, timeout)
                    .then(function (res) {
						loadingAnimation.hideLoading();
						if(res.data){
							showAlert.showMsg('', '', res.data, '确认');
                        }else{
							showAlert.showMsg("", "", "已拒绝", "确认");
							history.go(-1);
						}
                    }, function (error) {
						loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//获取主子表主表
			$scope.MainTable = new Array();
			var getMainTable = function(){
				loadingAnimation.showLoading('加载中...', 'loding', 0);

                $http
                    .post("ServiceName=ErpService&TransName=getMainField",{
						logic_unit: $scope.data.LU_NAME,
						key_ref: $scope.data.KEY_REF
					}, timeout)
                    .then(function (res) {
                        getChildTable();
                        if(res.code == 0){
							$scope.MainTable = res.data;
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
						getChildTable();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//获取主子表子表
			$scope.ChildTable = new Array();
			var getChildTable = function(){
                $http
                    .post("ServiceName=ErpService&TransName=getChildField",{
						logic_unit: $scope.data.LU_NAME,
						key_ref: $scope.data.KEY_REF
					}, timeout)
                    .then(function (res) {
                        getDoc();
                        if(res.code == 0){
							$scope.ChildTable = res.data;
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
						getDoc();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//获取审批文档
			$scope.docList = new Array();
			var getDoc = function(){
                $http
                    .post("ServiceName=ErpService&TransName=getDoc", {
                        logic_unit: $scope.data.LU_NAME,
                        key_ref: $scope.data.KEY_REF
                    }, timeout)
                    .then(function (res) {
                        getStep();
                        if(res.code == 0){
							$scope.docList = res.data;
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
                        getStep();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//获取审批步骤
			$scope.step = {now: 0, list: new Array(), total: 0};
			var getStep = function(){
                $http
                    .post("ServiceName=ErpService&TransName=getStep", {
                        logic_unit: $scope.data.LU_NAME,
                        key_ref: $scope.data.KEY_REF
                    }, timeout)
                    .then(function (res) {
                        endLoad();
                        if(res.code == 0){
							$scope.step.total = res.data.total;
							$scope.step.list = res.data.list;
							$scope.step.list.forEach(v => {
								if(v.APP_SIGN && v.APP_DATE){
									$scope.step.now++;
								}
							});
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
						endLoad();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//加载数据结束
			var endLoad = function(){
				if($scope.ChildTable.length == 0){
					$scope.types.splice($scope.types.indexOf("申请详情"), 1);
				}
				if($scope.docList.length == 0){
					$scope.types.splice($scope.types.indexOf("文档"), 1);
				}
				$ionicSlideBoxDelegate.update();
				loadingAnimation.hideLoading();
			};
		}
	]);
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
angular.module('BaiYin.facilityInfoScan', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('facilityInfoScan', {
            url: '/facilityInfo/facilityInfoScan',
            controller: 'facilityInfoScanController',
            templateUrl: 'facilityInfo/facilityInfoScan/facilityInfoScan.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                item:null
            }
        })
    }])
    .controller('facilityInfoScanController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker','$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker,$cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function() {
                $scope.barcodeData= JSON.parse(localStorage.getItem("scanList"));
                $scope.facilityObtain($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);
            });
            /**
             * @author:Grant
             * @remark:根据二维码扫描到的信息获取设备信息
             * parameter:MCH_CODE,CONTRACT
             * request:POST{ServiceName:EquipService,TransName:equipmentInfo}
             * field:$scope.equipmentDetail
             */
            $scope.goObtain=function () {
                $ionicTabsDelegate.select(0);
                $scope.facilityObtain($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);

            }
            $scope.facilityObtain=function(MCH_CODE,CONTRACT) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params = {
                    MCH_CODE:MCH_CODE,
                    CONTRACT:CONTRACT
                }
                $http.post('ServiceName=EquipService&TransName=equipmentInfo',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            $scope.jbxxHide = false;
                            $scope.equipmentDetail=res.data.detail;
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            /**
             * @author:Grant
             * @remark:根据二维码扫描到的信息获取缺陷履历
             * @parameter:扫描到的二维码信息(MCH_CODE,CONTRACT)
             * request:POST{ServiceName:EquipService,TransName:equipmentDefect}
             * field:$scope.equipmentDefectList
             */
            $scope.goDefect=function () {
                $ionicTabsDelegate.select(1);
                facilityDefectList($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);

            }
            function facilityDefectList(MCH_CODE,CONTRACT) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params = {
                    MCH_CODE:MCH_CODE,
                    CONTRACT:CONTRACT
                }

                $http.post('ServiceName=EquipService&TransName=equipmentDefect',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            $scope.equipmentDefectList=res.data.tList;
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            /**
             * @author:Grant
             * @remark:根据缺陷履历跳转到缺陷详情
             * @parameter:
             * request:POST{ServiceName:EquipService,TransName:repairInspection}
             * field:
             */
            $scope.toDefectDetail=function (DefectList) {
                console.log(DefectList);
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params={
                    FAULT_REP_ID:DefectList.FAULT_REP_ID,
                    MCH_CODE:DefectList.FACT_MCH_CODE
                }
                $http.post('ServiceName=DefectManageService&TransName=listFaultRepMain',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            console.log(res);
                            var item=res.data.hList[0];
                            console.log(item);
                            $state.go('pm/defectFill/defectFillDetail', {item: item});
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });


            }
            /**
             * @author:Grant
             * @remark:根据二维码扫描到的信息获取工单履历
             * @parameter:扫描到的二维码信息(MCH_CODE,CONTRACT)
             * request:POST{ServiceName:EquipService,TransName:repairInspection}
             * field:$scope.equipmentWorkList
             */
            $scope.goWork=function () {
                $ionicTabsDelegate.select(2);
                facilityWorkList($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);
            }
            function facilityWorkList(MCH_CODE,CONTRACT) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params = {
                    MCH_CODE:MCH_CODE,
                    CONTRACT:CONTRACT
                }
                $http.post('ServiceName=EquipService&TransName=repairInspection',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            $scope.equipmentWorkList=res.data.rList;
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            /**
             * @author:Grant
             * @remark:根据二维码扫描到的信息获取巡查记录
             * @parameter:扫描到的二维码信息(MCH_CODE,CONTRACT)
             * request:POST{ServiceName:EquipService,TransName:inspectionRecordAsE}
             * field:$scope.equipmentPatrolList
             */
            $scope.goInspection=function () {
                $ionicTabsDelegate.select(3);
                facilityInspectionList($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);
            }

            function facilityInspectionList(MCH_CODE,CONTRACT) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params = {
                    MCH_CODE:MCH_CODE,
                    CONTRACT:CONTRACT
                }
                $http.post('ServiceName=EquipService&TransName=inspectionRecordAsE',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            console.log(res);
                            $scope.equipmentPatrolList=res.data.rList;
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            $scope.goInspectionRecord=function (PatrolList) {
                console.log(PatrolList)
                var params = {
                    MCH_CODE: PatrolList.MCH_CODE,
                    PERSON_ID:PatrolList.PERSON_ID
                }
                var obj = {"MCH_CODE":PatrolList.MCH_CODE,"PERSON_ID":PatrolList.PERSON_ID}
                localStorage.setItem("PatrolList",JSON.stringify(obj));
                $state.go('InspectionRecord', params);
            }

        }
    ])

angular.module('BaiYin.InspectionRecord', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('InspectionRecord', {
            url: '/facilityInfo/InspectionRecord',
            controller: 'InspectionRecordController',
            templateUrl: 'facilityInfo/InspectionRecord/InspectionRecord.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                MCH_CODE: null,
                PERSON_ID:null
            }
        })
    }])
    .controller('InspectionRecordController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker','$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker,$cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function() {
                console.log('=====ceshi===');
                console.log($stateParams.item);
                // $scope.MCH_CODE=$stateParams.MCH_CODE;
                // $scope.PERSON_ID=$stateParams.PERSON_ID;
                var PatrolList= JSON.parse(localStorage.getItem("PatrolList"));
                $scope.MCH_CODE=PatrolList.MCH_CODE;
                $scope.PERSON_ID=PatrolList.PERSON_ID;
                $scope.goInspection()
            });
            /**
             * @author:Grant
             * @remark:根据二维码扫描到的信息获取巡查记录
             * @parameter:扫描到的二维码信息(MCH_CODE,CONTRACT)
             * request:POST{ServiceName:EquipService,TransName:inspectionRecordAsE}
             * field:$scope.InspectiomRecordList
             */
            $scope.goInspection=function () {
                var MCH_CODE=$scope.MCH_CODE;
                var PERSON_ID=$scope.PERSON_ID;
                facilityInspectionList(MCH_CODE, PERSON_ID);
            }

            function facilityInspectionList(MCH_CODE,PERSON_ID) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params = {
                    MCH_CODE:MCH_CODE,
                    PERSON_ID:PERSON_ID
                }
                $http.post('ServiceName=EquipService&TransName=inspectionRecordAsEP',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            console.log(res);
                            $scope.InspectiomRecordList=res.data.rList;
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            $scope.goInspectionDetail=function (RecordList) {
                console.log(RecordList)
                // var params = {
                //     RecordList:RecordList
                // }
                var params = {
                    MCH_CODE:RecordList.MCH_CODE,
                    PERSON_ID:RecordList.PERSON_ID,
                    PLAN_ID:RecordList.PLAN_ID,
                }
                $state.go('InspectionRecordDetail',params);
            }

        }
    ])

angular.module('BaiYin.InspectionRecordDetail', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('InspectionRecordDetail', {
            url: '/facilityInfo/InspectionRecordDetail',
            controller: 'InspectionRecordDetailController',
            templateUrl: 'facilityInfo/InspectionRecordDetail/InspectionRecordDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                MCH_CODE: null,
                PERSON_ID: null,
                PLAN_ID: null
            }
        })
    }])
    .controller('InspectionRecordDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker','$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker,$cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function() {
                console.log($stateParams)
                $scope.MCH_CODE=$stateParams.MCH_CODE;
                $scope.PERSON_ID=$stateParams.PERSON_ID;
                $scope.PLAN_ID=$stateParams.PLAN_ID;
                $scope.goInspection()
            });
            /**
             * @author:Grant
             * @remark:根据二维码扫描到的信息获取巡查记录
             * @parameter:扫描到的二维码信息(MCH_CODE,CONTRACT)
             * request:POST{ServiceName:EquipService,TransName:inspectionRecordAsE}
             * field:$scope.InspectiomRecordList
             */
            $scope.goInspection=function () {
                var MCH_CODE=$scope.MCH_CODE;
                var PERSON_ID=$scope.PERSON_ID;
                var PLAN_ID=$scope.PLAN_ID;
                facilityInspectionList(MCH_CODE, PERSON_ID,PLAN_ID);
            }

            function facilityInspectionList(MCH_CODE,PERSON_ID,PLAN_ID) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params = {
                    MCH_CODE:MCH_CODE,
                    PERSON_ID:PERSON_ID,
                    PLAN_ID:PLAN_ID
                }
                $http.post('ServiceName=EquipService&TransName=inspectionRecordAsEPP',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            console.log(res);
                            $scope.InspectiomRecordDetailList=res.data.rList;
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            //签到样式
            $scope.identify = {
                'padding': '5px',
                'line-height': '35px',
                'border-radius': '50%',
                'display': 'inline-block',
                'float': 'left',
                'color': '#fff',
                'margin-right': '10px',
                'font-size': '12px',
                'width': '45px',
                'text-align': 'center'
            }

        }
    ])

angular.module('BaiYin.KPIdetail', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('KPIdetail', {
        url: '/KPIdetail',
        params: { 'items': null },
        controller: 'KPIdetailController',
        templateUrl: 'KPI/KPIdetail/KPIdetail.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('KPIdetailController', ['$scope', 'showAlert', 'pageInitService', '$stateParams', '$http', '$state', 'kpi_echarts',
    function($scope, showAlert, pageInitService, $stateParams, $http, $state, kpi_echarts) {
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
                'ServiceName=SDICIndexService&TransName=getIndexData&IndexID=' + $stateParams.items.indexId
            ];
            pageInitService.pageInit(apis).then(function(result) {
                resolveMessages = result[0];
                toDoRefresh(resolveMessages);
            }, function(error) {
                showAlert.showMsg(error, '', '网络异常', '确认')
            });
        });
        $scope.title = $stateParams.items.indexName;
        //进来默认第一个图表
        function toDoRefresh(resolveMessages) {
            var Arr = [];
            angular.forEach(resolveMessages.data, function(value, index) {
                Arr.push(index);
            });
            Arr.sort();
            $scope.data = Arr;
            if (Arr.length > 0) {
                kpi_echarts.kpiEcharts(resolveMessages.data[Arr[0]], 'main');
            } else if (resolveMessages.data && resolveMessages.data != null && !angular.equals({}, $scope.data)) {
                kpi_echarts.kpiEcharts(resolveMessages.data[Arr[0]], 'main');
            }
            //选择顶部tab
            $scope.seleteItem = function(val) {
                kpi_echarts.kpiEcharts(resolveMessages.data[val], 'main');
            }
        };
        $scope.doRefresh = function() {
            $http.get('ServiceName=SDICIndexService&TransName=getIndexData&IndexID=' + $stateParams.items.indexId)
                .then(function(res) {
                    resolveMessages = res;
                    $scope.$broadcast('scroll.refreshComplete');
                    toDoRefresh(resolveMessages);
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
        };

    }
])

angular.module('BaiYin.load.historyInfo', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('load/historyInfo', {
            url: '/load/historyInfo',
            controller: 'historyInfoController',
            templateUrl: 'load/historyInfo/historyInfo.tpl.html',
            cache: 'true',
            params:{type:null},
            authorizedRuleType: ['1']
        })
    }])

    .controller('historyInfoController', ['$scope', 'showAlert', '$http', '$state','$stateParams','loadingAnimation',
        function ($scope,showAlert,$http, $state,$stateParams,loadingAnimation) {
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.type=$stateParams.type.type;
                $scope.name=$stateParams.type.name;
                var url="ServiceName=TargetService&TransName=currMonthP";
                if($scope.type=='T'){
                    url="ServiceName=TargetService&TransName=currMonthT";
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post(url)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.hList = res.data.hList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            });
        }
    ])
angular.module('BaiYin.load.nearlyHour', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('load/nearlyHour', {
            url: '/load/nearlyHour',
            controller: 'nearlyHourController',
            templateUrl: 'load/nearlyHour/nearlyHour.tpl.html',
            cache: 'true',
            params:{type:null},
            authorizedRuleType: ['1']
        })
    }])

    .controller('nearlyHourController', ['$scope', 'showAlert', '$http', '$state','$stateParams','loadingAnimation',
        function ($scope, showAlert,$http, $state,$stateParams,loadingAnimation) {
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.type=$stateParams.type.type;
                $scope.name=$stateParams.type.name;
                var url="ServiceName=TargetService&TransName=nearlyOneHourP";
                if($scope.type=='T'){
                    url="ServiceName=TargetService&TransName=nearlyOneHourT";
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post(url)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == '0') {
                            $scope.hList = res.data.hList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            });

        }
    ]);
angular.module('BaiYin.OffLine.OffLineDetail', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OffLine/OffLineDetail', {
            url: '/OffLine/OffLineDetail',
            controller: 'OffLineDetailController',
            templateUrl: 'OffLine/OffLineDetail/OffLineDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                TEMP_ID: null,
                DESCRIPTION: null,
                INSPECT_TYPE: null,
                START_TIME: null,
                END_TIME: null,
                INSPECTED: null,
                INSPECT: null,
                childList: null
            }
        })
    }])
    .controller('OffLineDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function () {
                console.log($stateParams);
                /*$scope.qdTimeHide = false;
                $scope.djqdTimeHide = true;*/
                $scope.itemQdBtnhide = true;
                $scope.inputHide = true;
                $scope.positionHide = true;
                $scope.OSIDetailHide=false;
                // var OffList= JSON.parse(localStorage.getItem("OffList"));
                // console.log(OffList);
                $scope.tempID = $stateParams.TEMP_ID;
                $scope.description = $stateParams.DESCRIPTION;
                $scope.inspectType = $stateParams.INSPECT_TYPE;
                $scope.INSPECTED = $stateParams.INSPECTED;
                $scope.INSPECT = $stateParams.INSPECT;
                $scope.startTime = $stateParams.START_TIME;
                $scope.endTime = $stateParams.END_TIME;
                $scope.childList = $stateParams.childList;
                console.log($scope.childList);
                $scope.hDetail=$scope.childList;
                console.log("$scope.hDetail===" + JSON.stringify($scope.hDetail));
                for (var i = 0; i < $scope.hDetail.length; i++) {
                    if ($scope.hDetail[i].RECORD_TIME == '' || $scope.hDetail[i].RECORD_TIME == null) {
                        /*$scope.identifyShow = '未签到';*/
                        console.log('', '', 'i==' + i);
                        $("#qdIconColorid" + i).css('background', '#ccc');
                        $("#qdIconColorid" + i).text('未签到');
                    } else {
                        $("#qdIconColorid" + i).text('已签到');
                        $("#qdIconColorid" + i).css("background", "#83ecad");
                    }
                }
                $scope.amount = 0;
                //是否显示扫码
                if ($scope.INSPECTED == $scope.INSPECT) {
                    // $scope.inputHide = true;
                }
                //签到样式
                $scope.identify = {
                    'padding': '5px',
                    'line-height': '35px',
                    'border-radius': '50%',
                    'display': 'inline-block',
                    'float': 'left',
                    'color': '#fff',
                    'margin-right': '10px',
                    'font-size': '12px',
                    'width': '45px',
                    'text-align': 'center'
                }

                // HistoryDetail($scope.tempID);
            });

            function HistoryDetail(tempid) {
                console.log("tempid==" + tempid);
                var parmas = {
                    TEMP_ID: tempid
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=InspectionService&TransName=cInspectRouteDetailPage', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.hDetail = res.data.dList;
                            console.log(res.data);
                            console.log("$scope.hDetail===" + JSON.stringify($scope.hDetail));
                            for (var i = 0; i < $scope.hDetail.length; i++) {
                                if ($scope.hDetail[i].RECORD_TIME == '' || $scope.hDetail[i].RECORD_TIME == null) {
                                    /*$scope.identifyShow = '未签到';*/
                                    console.log('', '', 'i==' + i);
                                    $("#qdIconColorid" + i).css('background', '#ccc');
                                    $("#qdIconColorid" + i).text('未签到');
                                } else {
                                    $("#qdIconColorid" + i).text('已签到');
                                    $("#qdIconColorid" + i).css("background", "#83ecad");
                                }
                            }
                            console.log("$scope.hDetail==" + JSON.stringify($scope.hDetail));
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //点击扫二维码
            $scope.toScanCode = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeDataText = barcodeData.text;
                        $scope.barcodeData = eval("(" + $scope.barcodeDataText + ")");
                        $scope.patrolLine($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT, $scope.tempID);
                    }, function (error) {
                        console.log("ERROR:" + error);
                    });
            }
            var planID;
            $scope.patrolLine = function (MCH_CODE, CONTRACT, tempid) {
                var params = {
                    MCH_CODE: MCH_CODE,
                    CONTRACT: CONTRACT,
                    TEMP_ID: tempid
                }
                $http.post('ServiceName=InspectionService&TransName=formCBluetoothEquip', params)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            $scope.patrolLine = res.data.detail;
                            planID = $scope.patrolLine.PLAN_ID;
                            if ($scope.patrolLine.IS_MATCH == 'TRUE') {
                                //扫描蓝牙
                                blueToothEnable($scope.patrolLine.SN_ADDRESS);
                            }
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }

            //开启本机蓝牙
            function blueToothEnable(SN_ADDRESS) {
                ble.enable(
                    function () {
                        scanBlueTooth(SN_ADDRESS);
                    },
                    function () {
                        showAlert.showMsg("", "", "打开蓝牙失败！");
                    }
                );
            }
            //扫描蓝牙
            function scanBlueTooth(SN_ADDRESS) {
                ble.scan([], 5, function (device) {
                        //成功的回调函数
                        if (device.id == SN_ADDRESS) {
                            signedLightUp();
                            /*$scope.$apply(function(){
                                // $scope.inputHide = true;
                                $scope.positionHide = false;
                            });*/
                        }
                    }, function () {
                        //失败的回调函数
                        showAlert.showMsg('', '', "未扫描到有效蓝牙！");
                    }
                );
            }

            function signedLightUp() {

                for (var i = 0; i < $scope.hDetail.length; i++) {
                    if (planID == $scope.hDetail[i].PLAN_ID) {
                        //显示签到按钮
                        $(".itemQdBtn" + i).show();
                    }
                }
                /*if(planID == ''){
                    alert("匹配成功----");
                }*/

            }

            //点击签到
            $scope.toSigned = function (obj, num) {
                $("#recordID").attr("disabled", true);
                var params = {
                    BLUETOOTH_SERIAL_NO: $scope.patrolLine.BLUETOOTH_SERIAL_NO,
                    PLAN_ID: obj.PLAN_ID,
                    LOCATION_DESCRIPTION: $scope.patrolLine.ADDRESS,
                    IS_MATCH: $scope.patrolLine.IS_MATCH,
                    EQUIP_NO: $scope.patrolLine.MCH_CODE,
                    CONTRACT: $scope.patrolLine.CONTRACT
                };
                $http.post('ServiceName=InspectionService&TransName=inspectRecord', params)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            showAlert.showMsg('', '', '恭喜您，签到成功');
                            $("#recordTimeid" + num).hide();
                            $("#newRecordTimeid" + num).show();
                            //签到按钮隐藏
                            $scope.itemQdBtnHide = true;
                            //颜色变蓝色
                            $("#qdIconColorid" + num).css('background', '#83ecad');
                            $("#qdIconColorid" + num).text('已签到');
                            //显示签到时间
                            $scope.recordTime = res.data.RECORD_TIME;

                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });

            }

            //跳转到巡检记录
            $scope.toOsiHistory = function () {
                $state.go('OSI/OSIHistory');
                //载入缓存数据
                var obj = {
                    tempID: $scope.tempID,
                    description: $scope.description,
                    inspectType: $scope.inspectType,
                    INSPECTED: $scope.INSPECTED,
                    INSPECT: $scope.INSPECT,
                    startTime: $scope.startTime,
                    endTime: $scope.endTime
                };
                localStorage.setItem("OSI_LINE",JSON.stringify(obj));

            }
            //点击搜索蓝牙
            $scope.searchsBlueTooth = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                openblueToothEnable();
            }
            //开启本机蓝牙
            function openblueToothEnable() {
                ble.enable(
                    function () {
                        scansBlueToothnow();
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("","","蓝牙未开启");
                    }
                );
            }
            //扫描蓝牙
            function scansBlueToothnow() {
                $scope.equipToothList = [];
                $scope.timer = $timeout(function () {
                    loadingAnimation.hideLoading();
                    if ($scope.equipToothList.length > 0) {
                        upWindows($scope.equipToothList);
                    } else {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "未扫描到蓝牙设备");
                    }
                }, 5000);
                ble.scan([], 5, function (device) {//成功的回调函数
                        getBluesToothList(device);
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "扫描蓝牙失败");
                    }
                );
            }
            //弹出页面，显示扫描到的设备
            var searchequipPopup;

            function upWindows(equipToothList) {
                searchequipPopup = $ionicPopup.show({
                    template:'<div>' +
                    '<ul>' +
                    '<li id="devices_{{$index}}" ng-click="selectsBlueTooth($index)" ng-repeat="equipTooth in equipToothList track by $index" ng-style="searchPopupli">' +
                    '{{equipTooth.ADDRESS}}' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                    title: '扫描到的蓝牙设备',
                    scope: $scope,
                });
            }
            //获取蓝牙列表
            function getBluesToothList(device) {
                $http.post('ServiceName=InspectionService&TransName=formSBluetoothEquip&SN_CODE=' + device.id)
                    .then(function (res) {
                        if (res.data.code == '0') {
                            $scope.equipToothdetail=res.data.dList;
                            for(var i=0;i<$scope.equipToothdetail.length;i++){
                                $scope.equipToothList.push($scope.equipToothdetail[i]);
                            }
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            $scope.searchPopupli = {
                "line-height": "35px",
                "font-size": "12px",
                "text-align": "center",
                "border-bottom": "1px dotted #f4f4f4",
            };
            //点击选择蓝牙设备
            $scope.selectsBlueTooth = function (index) {
                searchequipPopup.close();
                var MCH_CODE= $scope.equipToothList[index].MCH_CODE;
                var CONTRACT= $scope.equipToothList[index].CONTRACT;
                $scope.patrolHome(MCH_CODE, CONTRACT);
                $scope.OSIDetailHide=true;
                $scope.positionHide = false;

            }

        }
    ])

angular.module('BaiYin.OffLine.OffLineLook', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OffLine/OffLineLook', {
            url: '/OffLine/OffLineLook',
            controller: 'OffLineLookController',
            templateUrl: 'OffLine/OffLineLook/OffLineLook.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {},
        })
    }])
    .controller('OffLineLookController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function () {
                var OffLineUpList= JSON.parse(localStorage.getItem("OffLineSignList"));
                // alert(JSON.stringify(OffLineUpList))
                $scope.hDetail=OffLineUpList;
                //签到样式
                $scope.identify = {
                    'padding': '5px',
                    'line-height': '60px',
                    'border-radius': '50%',
                    'display': 'inline-block',
                    'float': 'left',
                    'color': '#fff',
                    'margin-right': '10px',
                    'font-size': '12px',
                    'width': '71px',
                    'text-align': 'center'
                }
            });
            /*点击上传*/
            $scope.OffLineUpload=function () {
                var params = {
                    OffLineUpList:$scope.hDetail
                }
                $http.post('ServiceName=InspectionService&TransName=upLoadXcData',params)
                    .then(function (res) {
                        console.log(res);
                        if (res.code == 0) {
                            showAlert.showMsg('', '', '上传成功!');
                            $scope.hDetail=[];
                            localStorage.removeItem('OffLineSignList');
                            localStorage.removeItem('OffList');
                            $state.go('OffLine');
                        }else {
                            showAlert.showMsg('', '', '上传失败,请稍后再试!');
                            localStorage.setItem("OffLineSignList",JSON.stringify($scope.hDetail));
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            /*点击删除*/
            $scope.dealOffLine=function (detailList,index) {
                console.log(detailList,index);
                $scope.hDetail.splice(index,1);
                console.log($scope.hDetail.length);
                if($scope.hDetail.length==0){
                    localStorage.removeItem('OffLineSignList');
                    $state.go('OffLine');

                }else{
                    localStorage.setItem("OffLineSignList",JSON.stringify($scope.hDetail));
                }
            }
        }
    ])

angular.module('BaiYin.OSI.OSIArear', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OSI/OSIArear', {
            url: '/OSI/OSIArear',
            controller: 'OSIArearController',
            templateUrl: 'OSI/OSIArear/OSIArear.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('OSIArearController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout) {
            //人员信息
            $scope.user = {
                PERSON_NAME: "",//人员姓名
                qualified: 0,//合格区域
                unqualified: 0//不合格区域
            };
            //数据
            $scope.data = {
                iList: new Array(),//计划内
                oList: new Array()//计划外
            };
            $scope.$on('$ionicView.enter', function () {
                $scope.user.PERSON_NAME = $stateParams.item.PERSON_NAME;
                getList();
            });
            //获取数据
            var getList = function(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http
                    .post('ServiceName=InspectionService&TransName=inspectStatisticsRoute', {
                        START_TIME: $stateParams.item.START_TIME,
                        END_TIME: $stateParams.item.END_TIME,
                        PERSON_ID: $stateParams.item.PERSON
                    })
                    .then(function (res) {
                        $scope.data = new Object();
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.data = {
                                iList: res.data.iList,
                                oList: res.data.oList
                            };
                            $scope.data.iList.forEach(function(v, i){
                                if (v.AREA.indexOf("不合格") == -1){
                                    $scope.user.qualified++;
                                }else{
                                    $scope.user.unqualified++;
                                }
                            });
                        } else {
                            showAlert.showMsg(res.data);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])

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

angular.module('BaiYin.OSI.OSIHistory', [
    'ionic',
    'ionic-datepicker',
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('OSI/OSIHistory', {
            url: '/OSI/OSIHistory',
            controller: 'OSIHistoryController',
            templateUrl: 'OSI/OSIHistory/OSIHistory.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: new Object()}
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
    .controller('OSIHistoryController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker) {
            $scope.xclxListHide = true;
            //上页传的参数
            $scope.data = null;
            //自动进行的操作
            $scope.autoOperation = null;
            $scope.$on('$ionicView.beforeEnter', function () {
                if($stateParams.item.autoOperation){
                    $scope.data = $stateParams.item.data;
                    $scope.autoOperation = $stateParams.item.autoOperation;

                    $scope.autoQuery();
                }
                getNowDate();
            });
            //获取当前日期
            var date = new Date();

            function getNowDate() {
                $scope.timeStart = $filter("date")(date, "yyyy-MM-dd");
                $scope.timeEnd = $filter("date")(date, "yyyy-MM-dd");
            }

            //获取日历插件
            var startIpObj = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    $scope.timeStart = $filter("date")(val, "yyyy-MM-dd");
                    $("#StartHistoryID").val($scope.timeStart);
                },
                from: new Date(2012, 1, 1),
                to: new Date(),
                inputDate: new Date(),
                mondayFirst: false,
                closeOnSelect: false,
                templateType: 'popup'
            };
            var endIpObj = {
                callback: function (val) {
                    console.log('点击事件返回值 : ' + new Date(val));
                    $scope.timeEnd = $filter("date")(val, "yyyy-MM-dd");
                    $("#endHistoryID").val($scope.timeEnd);
                },
                from: new Date(2000, 1, 1),
                to: new Date(),
                inputDate: new Date(),
                mondayFirst: false,
                closeOnSelect: false,
                templateType: 'popup'
            };
            //开始时间
            $scope.openStartDatePicker = function () {
                ionicDatePicker.openDatePicker(startIpObj);
            };
            //结束时间
            $scope.openEndDatePicker = function () {
                ionicDatePicker.openDatePicker(endIpObj);
            };
            //上拉弹出搜索框
            $scope.onDragDown = function () {
                $(".selectTime").show('slow');
                $('.dragdiv').css("display",'none');
            }
            //点击查询按钮
            $scope.searchDefect = function () {
                if (validateComfirm()) {
                    $scope.xclxListHide = false;
                    $(".selectTime").hide('slow');
                    $(".content").show('slow');
                    OSIHistory($("#StartHistoryID").val(), $("#endHistoryID").val());
                }
            }

            function validateComfirm() {
                if ($("#StartHistoryID").val() == '') {
                    showAlert.showMsg('', '', '请选择开始时间');
                    return false;
                }
                if ($("#endHistoryID").val() == '') {
                    showAlert.showMsg('', '', '请选择结束时间');
                    return false;
                }
                if ($("#StartHistoryID").val() > $("#endHistoryID").val()) {
                    showAlert.showMsg('', '', '开始时间不能大于结束时间时间');
                    return false;
                }
                return true;
            }
            
            function OSIHistory(startTime, endTime, parmas) {
                var parmas = parmas || {
                    START_TIME: startTime,
                    END_TIME: endTime
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=InspectionService&TransName=listCInspectRouteHistory', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $('.dragdiv').css("display",'block');
                            $scope.hList = res.data.dList;

                        } else {
                            $('.dragdiv').css("display",'block');
                            $scope.hList = [];
                            showAlert.showMsg('', '', res.data.msg);

                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //点击巡查记录详情
            $scope.toHistoryDetail = function (obj) {
                console.log("obj==" + JSON.stringify(obj));
                //部分巡查统计用户数使用所在计划用户
                var PLAN_PERSON = null;
                //部分巡查统计页面进入，限定设备
                var MCH_CODE_Value = null;
                // 时间参数前台获取插件参数传递
                var starttime = $("#StartHistoryID").val();
                var endtime = $("#endHistoryID").val();
                if($scope.data != null) {
                	if ($scope.data.MCH_CODE != null || $scope.data.MCH_CODE != undefined) {
						MCH_CODE_Value = $scope.data.MCH_CODE;
					}
					if($scope.data.date != null) {
						// 巡查计划时间
						if ($scope.data.date.startDate != null && $scope.data.date.endDate != null) {
							starttime = $scope.data.date.startDate;
							endtime = $scope.data.date.endDate;
						}
					}
					// 巡查人的巡查计划
					if ($scope.data.PERSON_ID != undefined) {
						PLAN_PERSON = $scope.data.PERSON_ID;
					}
                } 
                var item = {
                    DESCRIPTION: obj.DESCRIPTION,
                    TEMP_ID: obj.TEMP_ID,
                    INSPECT_TYPE: obj.INSPECT_TYPE,
                    START_TIME: starttime, //obj.START_TIME,
                    PLAN_PERSON: PLAN_PERSON,
                    END_TIME: endtime, //obj.END_TIME,
                    MCH_CODE: MCH_CODE_Value
                }
                $state.go("OSI/OSIHistoryDetail", item);
            }

            /** -------- 巡查统计修改 -------- **/
            //自动查询
            $scope.autoQuery = function () {
                $scope.xclxListHide = false;
                $(".selectTime, .dragdiv").remove();
                $(".content").show('slow');
                OSIHistory(null, null, {
                    startDate: $scope.data.date.startDate,
                    endDate: $scope.data.date.endDate,
                    personId: $scope.data.PERSON_ID,
                    mchCode: $scope.data.MCH_CODE
                });
            };
        }
    ])

angular
    .module('BaiYin.OSI.OSIHistoryDetail', [
        'ionic',
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OSI/OSIHistoryDetail', {
            url: '/OSI/OSIHistoryDetail',
            controller: 'OSIHistoryDetailController',
            templateUrl: 'OSI/OSIHistoryDetail/OSIHistoryDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {TEMP_ID: null, DESCRIPTION: null, INSPECT_TYPE: null, START_TIME: null, END_TIME: null, MCH_CODE: null, PLAN_PERSON:null}
        })
    }])
    .controller('OSIHistoryDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout) {
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.tempID = $stateParams.TEMP_ID;
                $scope.description = $stateParams.DESCRIPTION;
                $scope.inspectType = $stateParams.INSPECT_TYPE;
                $scope.plan_person = $stateParams.PLAN_PERSON;
                $scope.startTime = $stateParams.START_TIME;
                $scope.endTime = $stateParams.END_TIME;
                $scope.mchCode = $stateParams.MCH_CODE;
                HistoryDetail($scope.tempID);
            });

            function HistoryDetail(tempid) {
                console.log("tempid==" + tempid);
                var parmas = {
                    TEMP_ID: tempid,
                    START_TIME: $scope.startTime,
                    END_TIME: $scope.endTime,
                    PLAN_PERSON:$scope.plan_person,
                    MCH_CODE: $scope.mchCode
                };
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=InspectionService&TransName=cInspectRouteDetailH', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.hDetail = res.data.dList;
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //签到样式
            $scope.identify = {
                'padding': '5px',
                'line-height': '35px',
                'border-radius': '50%',
                'display': 'inline-block',
                'float': 'left',
                'color': '#fff',
                'margin-right': '10px',
                'font-size': '12px',
                'width': '45px',
                'text-align': 'center'
            }
        }
    ]);
angular.module('BaiYin.OSI.OSILine', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OSI/OSILine', {
            url: '/OSI/OSILine',
            controller: 'OSILineController',
            templateUrl: 'OSI/OSILine/OSILine.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                TEMP_ID: null,
                DESCRIPTION: null,
                INSPECT_TYPE: null,
                START_TIME: null,
                END_TIME: null,
                INSPECTED: null,
                INSPECT: null
            }
        })
    }])
    .controller('OSILineController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function () {
                /*$scope.qdTimeHide = false;
                $scope.djqdTimeHide = true;*/
                $scope.itemQdBtnhide = true;
                $scope.inputHide = true;
                $scope.positionHide = true;
                $scope.OSIDetailHide=false;
                if(localStorage.getItem("OSI_LINE")){
                    console.log("localstorage====");
                    var obj = JSON.parse(localStorage.getItem("OSI_LINE"));
                    $scope.tempID = obj.tempID;
                    $scope.description = obj.description;
                    $scope.inspectType = obj.inspectType;
                    $scope.INSPECTED = obj.INSPECTED;
                    $scope.INSPECT = obj.INSPECT;
                    $scope.startTime = obj.startTime;
                    $scope.endTime = obj.endTime;
                }else{
                    console.log("params====");
                    $scope.tempID = $stateParams.TEMP_ID;
                    $scope.description = $stateParams.DESCRIPTION;
                    $scope.inspectType = $stateParams.INSPECT_TYPE;
                    $scope.INSPECTED = $stateParams.INSPECTED;
                    $scope.INSPECT = $stateParams.INSPECT;
                    $scope.startTime = $stateParams.START_TIME;
                    $scope.endTime = $stateParams.END_TIME;
                }
                localStorage.removeItem("OSI_LINE");
                $scope.amount = 0;
                //是否显示扫码
                console.log("INSPECTED==" + $scope.INSPECTED + "/INSPECT==" + $scope.INSPECT);
                if ($scope.INSPECTED == $scope.INSPECT) {
                    // $scope.inputHide = true;
                }
                //签到样式
                $scope.identify = {
                    'padding': '5px',
                    'line-height': '35px',
                    'border-radius': '50%',
                    'display': 'inline-block',
                    'float': 'left',
                    'color': '#fff',
                    'margin-right': '10px',
                    'font-size': '12px',
                    'width': '45px',
                    'text-align': 'center'
                }

                HistoryDetail($scope.tempID);
            });

            function HistoryDetail(tempid) {
                console.log("tempid==" + tempid);
                var parmas = {
                    TEMP_ID: tempid
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=InspectionService&TransName=cInspectRouteDetailPage', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.hDetail = res.data.dList;
                            console.log(res.data);
                            console.log("$scope.hDetail===" + JSON.stringify($scope.hDetail));
                            for (var i = 0; i < $scope.hDetail.length; i++) {
                                if ($scope.hDetail[i].RECORD_TIME == '' || $scope.hDetail[i].RECORD_TIME == null) {
                                    /*$scope.identifyShow = '未签到';*/
                                    console.log('', '', 'i==' + i);
                                    $("#qdIconColorid" + i).css('background', '#ccc');
                                    $("#qdIconColorid" + i).text('未签到');
                                } else {
                                    $("#qdIconColorid" + i).text('已签到');
                                    $("#qdIconColorid" + i).css("background", "#83ecad");
                                }
                            }
                            console.log("$scope.hDetail==" + JSON.stringify($scope.hDetail));
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //点击扫二维码
            $scope.toScanCode = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeDataText = barcodeData.text;
                        $scope.barcodeData = eval("(" + $scope.barcodeDataText + ")");
                        $scope.patrolLine($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT, $scope.tempID);
                    }, function (error) {
                        console.log("ERROR:" + error);
                    });
            }
            var planID;
            $scope.patrolLine = function (MCH_CODE, CONTRACT, tempid) {
                var params = {
                    MCH_CODE: MCH_CODE,
                    CONTRACT: CONTRACT,
                    TEMP_ID: tempid
                }
                $http.post('ServiceName=InspectionService&TransName=formCBluetoothEquip', params)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            $scope.patrolLine = res.data.detail;
                            planID = $scope.patrolLine.PLAN_ID;
                            if ($scope.patrolLine.IS_MATCH == 'TRUE') {
                                //扫描蓝牙
                                blueToothEnable($scope.patrolLine.SN_ADDRESS);
                            }
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }

            //开启本机蓝牙
            function blueToothEnable(SN_ADDRESS) {
                ble.enable(
                    function () {
                        scanBlueTooth(SN_ADDRESS);
                    },
                    function () {
                        showAlert.showMsg("", "", "打开蓝牙失败！");
                    }
                );
            }
            //扫描蓝牙
            function scanBlueTooth(SN_ADDRESS) {
                ble.scan([], 5, function (device) {
                        //成功的回调函数
                        if (device.id == SN_ADDRESS) {
                            signedLightUp();
                            /*$scope.$apply(function(){
                                // $scope.inputHide = true;
                                $scope.positionHide = false;
                            });*/
                        }
                    }, function () {
                        //失败的回调函数
                        showAlert.showMsg('', '', "未扫描到有效蓝牙！");
                    }
                );
            }

            function signedLightUp() {

                for (var i = 0; i < $scope.hDetail.length; i++) {
                    if (planID == $scope.hDetail[i].PLAN_ID) {
                        //显示签到按钮
                        $(".itemQdBtn" + i).show();
                    }
                }
                /*if(planID == ''){
                    alert("匹配成功----");
                }*/

            }

            //点击签到
            $scope.toSigned = function (obj, num) {
                $("#recordID").attr("disabled", true);
                var params = {
                    BLUETOOTH_SERIAL_NO: $scope.patrolLine.BLUETOOTH_SERIAL_NO,
                    PLAN_ID: obj.PLAN_ID,
                    LOCATION_DESCRIPTION: $scope.patrolLine.ADDRESS,
                    IS_MATCH: $scope.patrolLine.IS_MATCH,
                    EQUIP_NO: $scope.patrolLine.MCH_CODE,
                    CONTRACT: $scope.patrolLine.CONTRACT
                };
                $http.post('ServiceName=InspectionService&TransName=inspectRecord', params)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            showAlert.showMsg('', '', '恭喜您，签到成功');
                            $("#recordTimeid" + num).hide();
                            $("#newRecordTimeid" + num).show();
                            //签到按钮隐藏
                            $scope.itemQdBtnHide = true;
                            //颜色变蓝色
                            $("#qdIconColorid" + num).css('background', '#83ecad');
                            $("#qdIconColorid" + num).text('已签到');
                            //显示签到时间
                            $scope.recordTime = res.data.RECORD_TIME;

                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });

            }

            //跳转到巡检记录
            $scope.toOsiHistory = function () {
                $state.go('OSI/OSIHistory');
                //载入缓存数据
                var obj = {
                    tempID: $scope.tempID,
                    description: $scope.description,
                    inspectType: $scope.inspectType,
                    INSPECTED: $scope.INSPECTED,
                    INSPECT: $scope.INSPECT,
                    startTime: $scope.startTime,
                    endTime: $scope.endTime
                };
                localStorage.setItem("OSI_LINE",JSON.stringify(obj));

            }
            //点击搜索蓝牙
            $scope.searchsBlueTooth = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                openblueToothEnable();
            }
            //开启本机蓝牙
            function openblueToothEnable() {
                ble.enable(
                    function () {
                        scansBlueToothnow();
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("","","蓝牙未开启");
                    }
                );
            }
            //扫描蓝牙
            function scansBlueToothnow() {
                $scope.equipToothList = [];
                $scope.timer = $timeout(function () {
                    loadingAnimation.hideLoading();
                    if ($scope.equipToothList.length > 0) {
                        upWindows($scope.equipToothList);
                    } else {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "未扫描到蓝牙设备");
                    }
                }, 5000);
                ble.scan([], 5, function (device) {//成功的回调函数
                        getBluesToothList(device);
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "扫描蓝牙失败");
                    }
                );
            }
            //弹出页面，显示扫描到的设备
            var searchequipPopup;

            function upWindows(equipToothList) {
                searchequipPopup = $ionicPopup.show({
                    template:'<div>' +
                    '<ul>' +
                    '<li id="devices_{{$index}}" ng-click="selectsBlueTooth($index)" ng-repeat="equipTooth in equipToothList track by $index" ng-style="searchPopupli">' +
                    '{{equipTooth.ADDRESS}}' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                    title: '扫描到的蓝牙设备',
                    scope: $scope,
                });
            }
            //获取蓝牙列表
            function getBluesToothList(device) {
                $http.post('ServiceName=InspectionService&TransName=formSBluetoothEquip&SN_CODE=' + device.id)
                    .then(function (res) {
                        if (res.data.code == '0') {
                            $scope.equipToothdetail=res.data.dList;
                            for(var i=0;i<$scope.equipToothdetail.length;i++){
                                $scope.equipToothList.push($scope.equipToothdetail[i]);
                            }
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            $scope.searchPopupli = {
                "line-height": "35px",
                "font-size": "12px",
                "text-align": "center",
                "border-bottom": "1px dotted #f4f4f4",
            };
            //点击选择蓝牙设备
            $scope.selectsBlueTooth = function (index) {
                searchequipPopup.close();
                var MCH_CODE= $scope.equipToothList[index].MCH_CODE;
                var CONTRACT= $scope.equipToothList[index].CONTRACT;
                $scope.patrolHome(MCH_CODE, CONTRACT);
                $scope.OSIDetailHide=true;
                $scope.positionHide = false;

            }

        }
    ])

angular.module('BaiYin.pm.defectFillA', [
    'BaiYin.pm.defectFill.defectFill',
    'BaiYin.pm.defectFill.adddefectFill',
    'BaiYin.pm.defectFill.defectFillDetail',
])
angular.module('BaiYin.pm.journalA', [
    'BaiYin.pm.journal.journalList',
    'BaiYin.pm.journal.journalDetailList',
    'BaiYin.pm.journal.journalDetail'
])
angular.module('BaiYin.pm.troubleA', [
    'BaiYin.pm.trouble.hideTrouble',
    'BaiYin.pm.trouble.addTrouble',
    'BaiYin.pm.trouble.troubleDetail',
])
angular.module('BaiYin.pdDay', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('power/pdDay', {
            url: '/power/pdDay',
            controller: 'pdDayController',
            templateUrl: 'power/pdDay/pdDay.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('pdDayController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker) {
            $scope.$on('$ionicView.afterEnter', function () {
                drawBarGraph();
            });

            //画柱状图
            function drawBarGraph() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.get('ServiceName=TargetService&TransName=getPdDay&START_DAY=30')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        console.log("res==" + JSON.stringify(res.data));
                        $scope.pdDayPower = res.data;
                        $scope.DayDate =[];
                        $scope.DayVal = [];
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
                        for(var i=0 ;i<$scope.pdDayPower.length;i++){
                            $scope.DayDate.push($scope.pdDayPower[i].REPORT_ID.substring(5,10));
                            $scope.DayVal.push({
                                value: $scope.pdDayPower[i].DAY_ELE_AMOUNT,
                                itemStyle: labelTop});
                        }

                        var option = {
                            title: {
                                text: $scope.pdDayPower[0].REPORT_ID + ' ~ ' + $scope.pdDayPower[$scope.pdDayPower.length-1].REPORT_ID,
                                x: 'center'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            grid: {
                                left: '15%',
                            },
                            toolbox: {
                                show: true,
                            },
                            calculable: true,
                            xAxis: [
                                {
                                    type: 'category',
                                    data: $scope.DayDate,
                                }
                            ],
                            dataZoom: [{
                                type: 'inside',
                                start:80,
                                end: 100,
                                zoomLock:true,
                            }],
                            yAxis: [
                                {
                                    name: '(万KW.h)',
                                    type: 'value'
                                },
                            ],
                            series: [
                                {
                                    name: '电量',
                                    type: 'bar',
                                    data: $scope.DayVal,
                                }
                            ]
                        };
                        var myChart = echarts.init(document.getElementById('mainDay'), 'macarons');
                        myChart.setOption(option);
                        /*myChart.on('timelinechanged', function(params) {
                            fun(params.currentIndex);
                        });
                        myChart.on("click",function(params){
                            console.log(params);
                        });
                        function fun(date){
                            console.log(date);
                        }
                        myChart.on('datazoom', function(params) {
                            var xAxis = myChart.getModel().option.xAxis[0];
                            var endTime = xAxis.data[xAxis.rangeEnd];
                            fun(endTime)
                        });
                        function fun(date){
                            console.log(date);
                        }*/
                        // myChart.on('dataZoom', function (params) {
                            // console.log(JSON.stringify(params));
                            // if(params.batch[0].start<=10){
                            //     // myChart.showLoading();
                            //     console.log('======拖动====');
                            //     console.log(params);
                            // }
                            // myChart.setOption({
                            //     xAxis: {
                            //         axisLabel:{
                            //             interval:'auto',
                            //         }
                            //     },
                            // })
                        // });
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })

            }
        }
    ])
    .directive('bar', function () {
        return {
            scope: {
                id: "@",
                legend: "=",
                //item: "=",
                data: "="
            },
            restrict: 'E',
            template: '<div style="height:350px; width:350px; margin: 0 auto"></div>',
            replace: true,
            link: function () {
            }
        };
    });

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


angular.module('BaiYin.pdYear', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('power/pdYear', {
            url: '/power/pdYear',
            controller: 'pdYearController',
            templateUrl: 'power/pdYear/pdYear.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('pdYearController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker) {
            $scope.$on('$ionicView.afterEnter', function () {
                drawBarGraph();
            });

            //画柱状图
            function drawBarGraph() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.get('ServiceName=TargetService&TransName=getPdYear')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.yearPower = res.data;
                        $scope.yearDate = [];
                        $scope.yearVal = [];
                        console.log("res==" + JSON.stringify(res.data));
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
                        for(var i=0 ;i<$scope.yearPower.length;i++){
                            $scope.yearDate.push($scope.yearPower[i].YEAR);
                            $scope.yearVal.push({
                                value: $scope.yearPower[i].YEAR_ELE_AMOUNT,
                                itemStyle: labelTop});
                        }
                        var option = {
                            title: {
                                text: $scope.yearPower[0].YEAR + '~' + $scope.yearPower[$scope.yearPower.length - 1].YEAR,
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
                                    data: $scope.yearDate
                                }
                            ],
                            dataZoom: [{
                                type: 'inside',
                                start:75,
                                end: 100,
                                zoomLock:true,
                            }],
                            yAxis: [
                                {
                                    name: '(万KW·h)',
                                    type: 'value'
                                },
                            ],
                            series: [
                                {
                                    name: '电量',
                                    type: 'bar',
                                    data: $scope.yearVal,
                                }
                            ]
                        };
                        var myChart = echarts.init(document.getElementById('mainYear'), 'macarons');
                        myChart.setOption(option);
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }

        }
    ])


angular.module('BaiYin.NewProblems', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('NewProblems', {
            url: '/NewProblems',
            controller: 'NewProblemsController',
            templateUrl: 'Problems/NewProblems/newProblems.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('NewProblemsController', ['$scope', 'showAlert', 'pageInitService', '$http', '$state',
        function($scope, showAlert, pageInitService, $http, $state) {
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApproveService&TransName=getUnApprvedList'
                ];
                $scope.nowDate = new Date()
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.listsMsg = result[0]
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            })

            $scope.doRefresh = function() {
                $http.get('ServiceName=ApproveService&TransName=getUnApprvedList')
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

            $scope.valueCont = 'sie';
            $scope.selectWhich = function() {
                $scope.selectShow = !$scope.selectShow;
            }
            $scope.selectCont = function(val) {

                $scope.valueCont = val;
                console.log($scope.selectShow)
                $scope.selectShow = !$scope.selectShow;


            }
            $scope.conts = [
                { val: 'shijian ' },
                { val: 'shi' }
            ]




            function PreviewImage(imgFile) {
                var filextension = imgFile.value.substring(imgFile.value.lastIndexOf("."), imgFile.value.length);
                filextension = filextension.toLowerCase();
                if ((filextension != '.jpg') && (filextension != '.gif') && (filextension != '.jpeg') && (filextension != '.png') && (filextension != '.bmp')) {
                    alert("对不起，系统仅支持标准格式的照片，请您调整格式后重新上传，谢谢 !");
                    imgFile.focus();
                } else {
                    var path;
                    if (document.all) //IE
                    {
                        imgFile.select();
                        path = document.selection.createRange().text;

                        document.getElementById("imgPreview").innerHTML = "";
                        document.getElementById("imgPreview").style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled='true',sizingMethod='scale',src=\"" + path + "\")"; //使用滤镜效果  
                    } else //FF
                    {
                        path = imgFile.files[0].getAsDataURL();
                        document.getElementById("imgPreview").innerHTML = "<img id='img1' width='120px' height='100px' src='" + path + "'/>";
                        // document.getElementById("img1").src = path;
                    }
                }
            }



            function dochange1() {
                var thissrc;
                thissrc = this.form1.ImgFile1.value;
                strs = thissrc.toLowerCase();
                lens = strs.length;
                extname = strs.substring(lens - 4, lens);
                if (extname == ".jpg" || extname == ".gif" || extname == ".swf" || extname == ".png") {
                    document.getElementById(DoImgName1).src = thissrc;
                    console.log(thissrc)

                }
            }



        }
    ])
angular.module('BaiYin.NewProblems.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.ProblemsSolving', [])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('ProblemsSolving', {
        url: '/ProblemsSolving',
        controller: 'ProblemsSolvingController',
        templateUrl: 'Problems/ProblemSolving/ProblemsSolving.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('ProblemsSolvingController', ['$scope', 'showAlert', 'pageInitService', '$http', '$state',
    function($scope, showAlert, pageInitService, $http, $state) {
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
            'ServiceName=ApproveService&TransName=getUnApprvedList'
            ];

            pageInitService.pageInit(apis).then(function(result) {
             $scope.listsMsg = result[0]
             agentListMsg($scope.listsMsg)
            
            $scope.agentsItem = function(item) {
                $state.go('agentsView')
                var ItemCont =JSON.stringify(item)
                sessionStorage.setItem("agentsVD", ItemCont); 
            }
        }, function(error) {
             showAlert.showMsg(error,'','网络异常','确认')
        });
            $scope.loadNumber=1;
            $scope.loadMore=function(){
             $scope.loadNumber+=1;
             $http.get( 'ServiceName=ApproveService&TransName=getUnApprvedList&PageNo=' + $scope.loadNumber)
             .then(function(res){
                 if(res.data.length>0){
                   for(var i=0;i<res.data.length;i++){
                    res.data[i].CREATED_DATE=new Date(res.data[i].CREATED_DATE.replace(/-/g,"/"));
                    $scope.items.push(res.data[i])  
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }else if(res.data.length<=0||res.data==null||res.data==undefined){
             $scope.hasMore=false;
             $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     }
     ,function(error){
       showAlert.showMsg(error,'','网络异常','确认')
         $scope.hasMore=false;
     })
         };
    });
        $scope.tracking=function(){
             $state.go('Tracking')
        }
        function agentListMsg(res){
         var str = [];
         var arr = {};
         for (var i = 0; i < res.data.length; i++) {
            arr = res.data[i]
            arr.CREATED_DATE = new Date(arr.CREATED_DATE.replace(/-/g,"/"))
            str.push(arr)
        }
        $scope.items = str;
         if($scope.items.length>=10&&$scope.items!=undefined&&$scope.items!=null){
                $scope.hasMore=true;
            }
    };
    $scope.doRefresh = function() {
        $http.get('ServiceName=ApproveService&TransName=getUnApprvedList')
        .then(function(res) {
            agentListMsg(res)
            $scope.$broadcast('scroll.refreshComplete');
            if(res.data.length==10){
               $scope.loadNumber=1;
               $scope.hasMore=true;
           }else{
            $scope.hasMore=false;
        }
    }, function(error) {
        $scope.hasMore=false;
        showAlert.showMsg(error,'','网络异常','确认')
})
    }

}
])
angular.module('BaiYin.ProblemsSolving.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.tabs.companyAddressBook', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('tabs/companyAddressBook', {
        url: '/tabs/companyAddressBook',
        controller: 'companyAddressBookController',
        templateUrl: 'tabs/companyAddressBook/companyAddressBook.tpl.html',
        cache: 'true',
        authorizedRuleType: ['1']
    })
}])

.controller('companyAddressBookController', ['$scope', 'pageInitService', '$http', '$state', '$ionicTabsDelegate',
    function($scope, pageInitService, $http, $state, $ionicTabsDelegate) {
        $scope.$on('$ionicView.enter', function() {
            $scope.currentTab = 'tabs/companyAddressBook';
            $ionicTabsDelegate.select(1);
        })
        var apis = [
            'ServiceName=UserService&TransName=getOrganiztionList',
            'ServiceName=UserService&TransName=getAllAddressInfo'
        ];
        pageInitService.pageInit(apis).then(function(result) {
            $scope.items = result[0].data;
            $scope.users=result[1].data;
        }, function(error) {
            console.log(error)
        });
        $scope.addressList = function(item) {
            $state.go('employeeAddress');
            localStorage.setItem('_titleUser_', JSON.stringify(item))
        }
         $scope.listMsgShow=true;
        $scope.userMsgShow=false;
       $scope.toChange=function(changeNum){
            if(changeNum.length>0){
                $scope.listMsgShow=false;
                $scope.userMsgShow=true;
            }else if(changeNum.length<=0){
                $scope.listMsgShow=true;
                $scope.userMsgShow=false;
            }
       }
       $scope.userMsg = function(item) {
             console.log(item);
                $state.go('addressDetail');
                sessionStorage.setItem("_xiangQing_", JSON.stringify(item));
            }
       
    }
])
angular.module('BaiYin.tabs.companyAddressBooks', [
    'BaiYin.tabs.companyAddressBook',
    'BaiYin.tabs.employeeAddress',
    'BaiYin.tabs.addressDetail'
    
])
angular.module('BaiYin.tabs.homePage', [
    'ionic',
    'BaiYin.tabs.homePage.mock', 'ngCordova'
]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('tabs/homePage', {
        url: '/tabs/homePage',
        controller: 'HomeIndexController',
        templateUrl: 'tabs/homePage/homePage.tpl.html',
        resolve: {
            resolvedData: ['$http', function ($http) {
                return $http.get('getApplys');
            }]
        },
        authorizedRuleType: ['1']
    })
}])
/**
 * 隐藏tabs指令
 *
 */
    .directive('showTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $el) {
                $rootScope.hideTabs = false;
            }
        };
    })
    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $el) {
                $rootScope.hideTabs = true;
            }
        };
    })

    .controller('HomeIndexController', ['$rootScope', '$scope', '$window', 'showAlert', 'loadingAnimation', '$ionicScrollDelegate', '$http', 'resolvedData', '$state', '$ionicTabsDelegate', '$ionicPopup', '$ionicSlideBoxDelegate', 'pageInitService', 'Session', '$ionicHistory', '$ionicModal', '$cordovaGeolocation',
        function ($rootScope, $scope, $window, showAlert, loadingAnimation, $ionicScrollDelegate, $http, resolvedData, $state, $ionicTabsDelegate, $ionicPopup, $ionicSlideBoxDelegate, pageInitService, Session, $ionicHistory, $ionicModal, $cordovaGeolocation) {
            var ID = 7;
            var isMobile = false;
            //获取当前时间
            getNowDate();

            $scope.$on('$ionicView.enter', function () {
                //隐藏tabs
                $rootScope.hideTabs = true;
                $scope.currentTab = 'tabs/homePage';
                $ionicTabsDelegate.select(0);
            });
            $scope.$on('$ionicView.afterEnter', function () {
                console.log("time===");
                firstNews();
                getErpTodoCount();
            });

            //登录完成
            window.logined = function(){
                getErpTodoCount();
            };

            //插件定位开始
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var city = lng + "," + lat;
                    getThisWeather(city);
                    // showAlert.showMsg('', '', lat+'/'+long, '确认');
                }, function (err) {
                    showAlert.showMsg('', '', '定位出错', '确认');
                });
            //点击生产管理
            $scope.toSCGL = function () {
                //showAlert.showMsg('', '', '程序员正在玩命开发中……')
                $state.go('tabs/porductManage');
            };
            //点击经营管理
            $scope.toJYgl = function () {
                // showAlert.showMsg('', '', '程序员正在玩命开发中……');
                $state.go('tabs/OMA');
            };
            //点击通知公告
            $scope.toNOTICE = function () {
                $state.go('Problems')
            };
            //点击ERP审批
            $scope.toERP = function () {
                $state.go('erp');
            }
            //点击个人中心
            $scope.toMINE = function () {
                $state.go('tabs/mine')
            };
            //点击公司新闻
            $scope.toNEWS = function (item) {
                $state.go('News', {item: item})
            };
            //点击公告白板
            /*$scope.tobBoard = function () {
                var sec = token.sec;
                var noAuth = true;
                if (sec != undefined) {
                    if (sec.length > 0) {
                        for (var no in sec) {
                            if (sec[no].SEC_NO == 'G001') {
                                noAuth = false;
                                break;
                            }
                        }
                    }
                }
                if (noAuth) {
                    showAlert.showMsg('', '', '您无权操作白板公告', '确认');
                    return;
                }
                $state.go('bulletinBoard')
            };*/
            //点击考勤签到
            $scope.toAttence = function () {
                $state.go('attence')
            };
            //跳转到OA
            $scope.toOA = function () {
                //进行OA跳转
                if (isMobile) {
                    goOA();
                } else {
                    showAlert.showMsg('', '', '当前非APP模式，不能调用OA移动端程序', '确认');
                }
            };

            //跳转到OA，进行android和IOS的交互
            function goOA() {
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isAndroid) {
                    startApp.set({
                        "package": "com.seeyon.cmp"
                    }).start(function(){}, function(error) {
                        //没有安装应用会执行下面的语句
                        window.location = "http://m3.seeyon.com/index!index.xhtml#download";
                    });
                } else if (isiOS) {
                    window.location.href = "seeyonM3Phone://";
                    setTimeout(function(){
                        //没有安装应用会执行下面的语句
                        window.locaiton.href = "itms-apps://itunes.apple.com/us/app/m3-移动办公平台/id1236176492";
                    }, 300);
                }
            }

            //ERP待办数量
            $scope.erpTodoCount = null;
            function getErpTodoCount() {
                $http
                    .post("ServiceName=ErpService&TransName=getTodoCount")
                    .then(function (res) {
                        $scope.erpTodoCount = res.data.COUNT;
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            };

            //获取通知公告第一条
            function firstNews() {
                console.log("firstNews===");
                var params = {
                    ID: '7',
                    PageNo: '1',
                    PageCnt: '2'
                };
                $http.post('ServiceName=CMSService&TransName=getContentlList', params)
                    .then(function (res) {
                        getProductPageAd();
                        $scope.newslist = res.data;
                        for (var i = 0; i < $scope.newslist.length; i++) {
                            $scope.newslist[i].PUBDATE = new Date($scope.newslist[i].PUBDATE.replace(/-/g, "/"));
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }


            //获取天气情况
            function getWeather(cityDes) {
                console.log("cityDes==" + cityDes);
                var winfo = {city: cityDes};
                $http.post("ServiceName=WeatherService&TransName=weatherList", winfo)
                    .then(function (res) {
                        console.log(res);
                        $scope.temp = res.data;
                        $scope.Weather = $scope.temp;
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }

            /**
             * 获取生产管理首页广告
             */
            function getProductPageAd() {
                $http.post('ServiceName=WhiteBoardService&TransName=listWhiteBoardNewspaper')
                    .then(function (res) {
                        //自定义高度
                        // CustomHigh();
                        $scope.advert = res.data.tList;
                        console.log("$scope.advert==" + JSON.stringify($scope.advert));
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }

            /**
             * 获取当前日期
             * @constructor
             */
            function getNowDate() {
                $scope.str = '';
                $scope.now = new Date();
                $scope.week = new Date().getDay();
                if ($scope.week == 0) {
                    $scope.str = "星期日";
                } else if ($scope.week == 1) {
                    $scope.str = "星期一";
                } else if ($scope.week == 2) {
                    $scope.str = "星期二";
                } else if ($scope.week == 3) {
                    $scope.str = "星期三";
                } else if ($scope.week == 4) {
                    $scope.str = "星期四";
                } else if ($scope.week == 5) {
                    $scope.str = "星期五";
                } else if ($scope.week == 6) {
                    $scope.str = "星期六";
                }
            }

            //进行定位
            function startLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                } else {
                    showAlert.showMsg('', '', '浏览器不支持地理定位。');
                }
            }

            //定位错误提示
            function showError(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        showAlert.showMsg('', '', '定位失败,用户拒绝请求地理定位');
                        // alert("定位失败,用户拒绝请求地理定位");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        showAlert.showMsg('', '', '定位失败,位置信息是不可用');
                        // alert("定位失败,位置信息是不可用");
                        break;
                    case error.TIMEOUT:
                        showAlert.showMsg('', '', '定位失败,请求获取用户位置超时');
                        // alert("定位失败,请求获取用户位置超时");
                        break;
                    case error.UNKNOWN_ERROR:
                        showAlert.showMsg('', '', '定位失败,定位系统失效');
                        // alert("定位失败,定位系统失效");
                        break;
                }
            }

            //定位成功提示
            function showPosition(position) {
                var lat = position.coords.latitude; //纬度
                var lng = position.coords.longitude; //经度
                var city = lng + "," + lat;
                getThisWeather(city);
            }

            //获取天气情况
            function getThisWeather(cityDes) {
                console.log("cityDes==" + cityDes);
                var winfo = {city: cityDes};
                $http.post("ServiceName=WeatherService&TransName=weatherList", winfo)
                    .then(function (res) {
                        // getKPI();
                        console.log(res);
                        // $scope.temp = res.data;
                        $scope.frontW = res.data;
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }

            function CustomHigh() {
                //屏幕的高度
                $scope.wHeight = $window.innerHeight;
                //列表文字显示的宽度
                $scope.newslistLi = {width: '' + screen.width - 150 + 'px'};
                //公告白板中标题的显示
                $scope.titleShow = {width: '' + screen.width - 180 + 'px'};
            }

            //版本更新
            document.addEventListener("deviceready", function () {
                isMobile = true;
                var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是iOS
                //开始定位
                // startLocation();
                //版本更新
                if (Session.userInfoData.LoginStatus == '1' && Session.user.DeviceType == 'Android') {
                    $http.get('ServiceName=SysManageService&TransName=getNewVersion&APP_VERSION=' + appVersion)
                        .then(function (res) {
                            if (res.data.exist == 'Y') {
                                showVersionPop('发现新版本是否更新？', '更新', '取消', res.data.url, 1);
                            }
                        }, function (err) {
                        });
                }
                if (isIOS){
                    $http.get('ServiceName=SysManageService&TransName=getNewVersion&APP_VERSION=' + appVersion)
                        .then(function (res) {
                            var iosUrl=res.data.iosUrl;
                            if (res.data.exist == 'Y') {
                                showiosVersionPop('发现新版本是否更新？', '更新', '取消', res.data.iosUrl, 1);
                            }
                        }, function (err) {
                        });
                }
            }, false);
            // function UpdateForIOS(iosUrl){
            //     var winRef = window.open(iosUrl);
            //     winRef.location =iosUrl;
            // }

            var showVersionPop = function (template, leftText, rightText, downUrl, num) {
                var messagePopup = $ionicPopup.confirm({
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                messagePopup.then(function (res) {
                    if (res) {
                        if (num == 1) {
                            console.log(downUrl);
                            MRUpdateVersion.updateVersion(function success() {
                            }, function failed(message) {
                            }, downUrl);
                        }
                    }
                })
            }
            var showiosVersionPop = function (template, leftText, rightText, downUrl, num) {
                var messageiosPopup = $ionicPopup.confirm({
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                messageiosPopup.then(function (res) {
                    if (res) {
                        if (num == 1) {
                            var winRef = window.open(downUrl);
                            winRef.location =downUrl;
                        }
                    }
                })
            }

            $scope.goNewsDatil = function (item) {
                /*localStorage.setItem("newsId", ID);
                item.whichNew = ID;*/
                $state.go('companyNewsDetails', {'item': item})
            };
            //访问白板公告详情
            $scope.boardDetail = function (lno) {
                $state.go('bulletinBoard/view', {LINE_NO: lno})
            };
        }
    ])


angular.module('BaiYin.tabs.homePage.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    // var data = {
    //     handImage: '../images/homePage/index1.png', //图片列表
    //     companyImg: [{
    //         src: '../images/homePage/newscenter.png'
    //     }, {
    //         src: '../images/homePage/companyNews.png'
    //     }, {
    //         src: '../images/homePage/Notice.png'
    //     }]
    // };

    //打包使用数据
    var data = {
        handImage: 'file:///android_asset/www/images/homePage/banner.png', //图片列表
        companyImg: //图标列表
            [{
            src: 'file:///android_asset/www/images/homePage/newsCenter.png'
        }, {
            src: 'file:///android_asset/www/images/homePage/companyNews.png'
        }, {
            src: 'file:///android_asset/www/images/homePage/Notice.png'
        }],
    };

    var result = mocksData.resetData(data);
    // $httpBackend.whenPOST(/\/getApplys/).passThrough();

    $httpBackend.whenGET(/\?getApplys/).respond(result);
    // $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenGET('ServiceName=CMSService&TransName=getContentDetail&UserID=IFSAPP&SignToken=99cdad8d4b1c9149f64b6ead21f9275d1a94534ece24e405331b28a6eca92cb4&ID=10').passThrough();
}])
angular.module('BaiYin.tabs.message', [
        'BaiYin.tabs.message.mock',
        'BaiYin.messageDetail',
        'BaiYin.message.othersInfo',
        'BaiYin.message.myInfo',
        'BaiYin.groupDetail',
        'BaiYin.message.groupInfo'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('tabs/message', {
            url: '/tabs/message',
            controller: 'messageController',
            templateUrl: 'tabs/message/message.tpl.html',
            cache: false,
            authorizedRuleType: ['1']
        })
    }])

.controller('messageController', ['$scope', '$http', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', '$state', 'Session', '$ionicLoading',
    function($scope, $http, $ionicTabsDelegate, $ionicHistory, $ionicPopup, $state, Session, $ionicLoading) {
        $scope.$on('$ionicView.enter', function() {
            $scope.currentTab = 'tabs/message';
            $ionicTabsDelegate.select(2);
        });

        //判断登录平台
        if (Session.user.DeviceType) {
            $scope.DeviceType = Session.user.DeviceType;
        }

        $scope.closePop = function() {
            $scope.popup.close();
        }

        $scope.sortShow = 0;
        $scope.changeItem = function(numType) {
            $scope.sortShow = numType;
        };

        $scope.doRefresh = function() {
            $scope.inintData();
        };

        $scope.groupList = [];
        if (isApp) {
            $ionicLoading.show({
                template: '正在连接聊天服务器...'
            });
            window.JMessage.getMyInfo(function(response) {
                console.log("user is login" + response);
                if ($scope.DeviceType == 'Android') {
                    var myInfo = JSON.parse(response);
                } else {
                    var myInfo = response;
                }
                window.JMessage.username = myInfo.userName;
                window.JMessage.nickname = myInfo.nickname;
                window.JMessage.gender = myInfo.mGender;
                $scope.inintData();
            }, function(response) {
                console.log("User is not login.");
                window.JMessage.username = "";
                window.JMessage.nickname = "";
                window.JMessage.gender = "unknown";
                if (Session.userInfoData) {
                    window.JMessage.login(Session.userInfoData.JMUserID, Session.userInfoData.JMPassWord,
                        function(response) {
                            window.JMessage.username = Session.userInfoData.JMUserID;
                            console.log("login ok");
                            $scope.inintData();
                        },
                        function(errorMsg) {
                            $ionicLoading.hide();
                            showAlert('', '连接聊天服务器失败', '确认');
                            console.log('JMessage.login: ' + errorMsg);
                        });
                }
            });

            $scope.inintData = function() {
                //获取当前用户的所有会话列表
                if ($scope.DeviceType == 'Android') {
                    window.JMessage.getConversationList(function(response) {
                        $scope.conversations = JSON.parse(response);
                        $scope.$digest();
                        $ionicLoading.hide();
                    }, function(errorMsg) {
                        $ionicLoading.hide();
                        console.log('getConversationList: ' + errorMsg);
                    });
                } else {
                    window.JMessage.getAllConversation(function(response) {
                        $scope.conversations = response;
                        $scope.$digest();
                        $ionicLoading.hide();
                    }, function(errorMsg) {
                        $ionicLoading.hide();
                        console.log('getAllConversation: ' + errorMsg);
                    });
                }

                //得到当前用户加入的所有群
                if ($scope.DeviceType == 'Android') {
                    window.JMessage.getGroupIDList(function(response) {
                        $scope.groupIDList = JSON.parse(response);
                        for (var i = 0; i < $scope.groupIDList.length; i++) {
                            window.JMessage.getGroupInfo($scope.groupIDList[i], function(response) {
                                $scope.groupList.push(JSON.parse(response));
                                $scope.$digest();
                            }, function(errorMsg) {
                                console.log('getGroupIDList: ' + errorMsg);
                            })
                        };
                    }, function(errorMsg) {
                        console.log(errorMsg);
                    });
                } else {
                    window.JMessage.myGroupArray(function(response) {
                        $scope.groupIDList = response;
                        for (var i = 0; i < $scope.groupIDList.length; i++) {
                            window.JMessage.getGroupInfo($scope.groupIDList[i], function(response) {
                                $scope.groupList.push(response);
                                $scope.$digest();
                            }, function(errorMsg) {
                                console.log('getGroupIDList: ' + errorMsg);
                            })
                        };
                    }, function(errorMsg) {
                        console.log('myGroupArray: ' + errorMsg);
                    });
                }

                //获取当前登录用户的好友列表
                window.JMessage.getFriendList(function(response) {
                    if ($scope.DeviceType == 'Android') {
                        $scope.friendList = JSON.parse(response);
                    } else {
                        $scope.friendList = response;
                    }
                    $scope.$digest();
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(errorMsg) {
                    $scope.$broadcast('scroll.refreshComplete');
                    console.log('getFriendList: ' + errorMsg);
                });

            }
        }

        $scope.goMyInfo = function() {
            $state.go('message/myInfo');
        }

        var showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {});
        };

        //长按显示操作内容
        $scope.popupMessageOpthins = function(conversation) {
            $scope.item = conversation;
            $scope.popup = $ionicPopup.show({
                templateUrl: "tabs/message/popup.tpl.html",
                scope: $scope,
            });

            $scope.addFriend = function() {
                window.JMessage.sendInvitationRequest($scope.item.targetId, null, '',
                    function(response) {
                        $scope.popup.close();
                        showAlert('', '发送成功,等待确认', '确认');
                    },
                    function(errorStr) {
                        $scope.popup.close();
                        showAlert('', '暂无此用户或已添加', '确认');
                    });
            };
            $scope.deleteMessage = function() {
                if ($scope.item.type == 'single') {
                    window.JMessage.deleteSingleConversation($scope.item.targetId, null,
                        function() {
                            console.log('删除个人聊天成功');
                            //获取当前用户的所有会话列表
                            window.JMessage.getConversationList(function(response) {
                                $scope.conversations = JSON.parse(response);
                                $scope.popup.close();
                            }, function(errorMsg) {
                                console.log(errorMsg); // 输出错误信息。
                            });
                        },
                        function(errorMsg) {
                            $scope.popup.close();
                            console.log(errorMsg);
                        });
                } else {
                    window.JMessage.deleteGroupConversation($scope.item.targetId,
                        function() {
                            console.log('删除组聊天成功');
                            //获取当前用户的所有会话列表
                            window.JMessage.getConversationList(function(response) {
                                $scope.conversations = JSON.parse(response);
                                $scope.popup.close();
                            }, function(errorMsg) {
                                console.log(errorMsg); // 输出错误信息。
                            });
                        },
                        function(errorMsg) {
                            $scope.popup.close();
                            console.log(errorMsg);
                        });
                }
            }
        };
        $scope.deleteFrient = function(id, index) {
            showConfirmPop('确定要删除该好友吗？', '确定', '取消', '1', id, index);
        }
        $scope.deleteGroup = function(id, index) {
            showConfirmPop('确定要退出该群吗？', '确定', '取消', '2', id, index);
        }

        var showConfirmPop = function(template, leftText, rightText, num, id, index) {
            var messagePopup = $ionicPopup.confirm({
                template: template,
                okText: leftText,
                cancelText: rightText
            });
            messagePopup.then(function(res) {
                if (res && num == '1') {
                    window.JMessage.removeFromFriendList(id, null,
                        function(res) {
                            showAlert('', '删除好友成功', '确认');
                            $scope.friendList.splice(index, 1);
                        },
                        function(err) {
                            console.log(err);
                            showAlert('', '删除好友失败', '确认');
                        })
                } else if (num == '2') {
                    window.JMessage.exitGroup(id,
                        function(res) {
                            $scope.groupList.splice(index, 1);
                            showAlert('', '退群成功', '确认');
                        },
                        function(err) {
                            showAlert('', '退群成功', '确认');
                            console.log(err);
                        })
                }
            });
        }
    }
]);
angular.module('BaiYin.tabs.message.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{
    }, ];

    var result = mocksData.resetData(data);
    // $httpBackend.whenGET('/report/reportList?type=户内&pageIndex=0&pageSize=10').respond(result);
    $httpBackend.whenGET(/\/AgriculturlWeb\/moneyApplication/).passThrough();

}])
angular.module('BaiYin.tabs.mine', [
    'BaiYin.tabs.mine.mock',
    'BaiYin.mine.netWork',
    'BaiYin.APPfeedback'
])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('tabs/mine', {
            url: '/tabs/mine',
            controller: 'mineController',
            templateUrl: 'tabs/mine/mine.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])
    
    .directive('closePopupBackDrop', ['$ionicGesture',function($ionicGesture) {  
        return {  
            scope: false,//共享父scope  
            restrict: 'EA',  
            replace: false,  
            link: function(scope, element, attrs, controller) {  
                //要在html上添加点击事件, 试了很久- -!  
                var  $htmlEl= angular.element(document.querySelector('html')); 
                $ionicGesture.on("touch", function(event) { 
                    if (event.target.nodeName === "HTML" && scope.myPopup.isPopup) {
                        scope.optionsPopup.close();  
                        scope.myPopup.isPopup = false;  
                    }  
                },$htmlEl);  
            }  
        };  
    }]) 

    .controller('mineController', ['$rootScope','$scope', '$ionicLoading', '$location', '$ionicHistory', '$http', '$ionicTabsDelegate', 'CurrentUserService', '$ionicPopup', '$state', '$timeout', 'Session', 'SavePopShowFristService',
        function($rootScope,$scope, $ionicLoading, $location, $ionicHistory, $http, $ionicTabsDelegate, CurrentUserService, $ionicPopup, $state, $timeout, Session, SavePopShowFristService) {
            $scope.$on('$ionicView.enter', function() {
                //显示tabs
                $rootScope.hideTabs = false;
                $scope.currentTab = 'tabs/mine';
                $ionicTabsDelegate.select(3);
            })

            //判断登录平台
            if (Session.user.DeviceType) {
                $scope.DeviceType = Session.user.DeviceType;
            }

            $scope.showLoadingToast = function() {
                // Setup the loader
                $ionicLoading.show({
                    template: '正在清除...',
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 300,
                    showDelay: 0
                });
            }
            $scope.hideLoadingToast = function() {
                $ionicLoading.hide();
            };
            //点击公告白板
            $scope.tobBoard = function () {
                var sec = token.sec;
                var noAuth = true;
                if (sec != undefined) {
                    if (sec.length > 0) {
                        for (var no in sec) {
                            if (sec[no].SEC_NO == 'G001') {
                                noAuth = false;
                                break;
                            }
                        }
                    }
                }
                if (noAuth) {
                    showAlert('', '您无权操作白板公告', '确认');
                    return;
                }
                $state.go('bulletinBoard')
            };
            $scope.cleaHistory = function() {
                $scope.showLoadingToast();
                $ionicHistory.clearHistory();
                sessionStorage.clear();
                $ionicHistory.clearCache();
                var cookies = document.cookie;
                console.log(cookies, $ionicHistory.clearHistory(), sessionStorage.clear(), $ionicHistory.clearCache());
                //这里使用定时器是为了缓存一下加载过程，防止加载过快
                $timeout(function() {
                    //停止缓冲提示
                    $scope.hideLoadingToast();
                    var alertYo = $ionicPopup.alert({
                        template: '清除成功',
                        okText: "确定"
                    })
                }, 1500);

            }

            //显示当前登录人
            if (Session.userInfoData.UserInfo) {
                if (Session.userInfoData.UserInfo.INTERNAL_DISPLAY_NAME || Session.userInfoData.UserInfo.INTERNAL_DISPLAY_NAME != '') {
                    $scope.userName = Session.userInfoData.UserInfo.INTERNAL_DISPLAY_NAME;
                } else {
                    $scope.userName = Session.userInfoData.UserInfo.PERSON_ID;
                }
            } else {
                $scope.userName = Session.userInfoData.USER_NAME;
            }

            $scope.appVersion = appVersion;
            // 记录弹出框是否弹出的状态，isPopup默认是false  
            $scope.myPopup = {  
              'isPopup':false  
            }; 
            //版本更新
            $scope.checkVersion = function() {
            	$scope.optionsPopup  = $ionicPopup.show({
            		template:'<div ng-style="popupDiv">' +
		            			'<ul>' +
		                        '<li ng-style="searchPopupli">魏刚、王良科</li>' +
		                        '</ul>' +
	            			  '</div>',
            		title: '主创人员',
            		scope: $scope,
            	});
            	$scope.searchPopupli = {
                        "line-height": "30px",
                        "font-size": "12px",
                        "text-align": "center",
                        "border-bottom": "1px dotted #f4f4f4",
                    };
//                document.addEventListener("deviceready", function() {
//                    $http.get('ServiceName=SysManageService&TransName=getNewVersion&APP_VERSION=' + appVersion).then(function(res) {
//                        if (res.data.exist == 'Y') {
//                            showVersionPop('发现新版本是否更新？', '更新', '取消', res.data.url, 1);
//                        } else {
//                            showAlert('', '已是最新版本', '确认');
//                        }
//                    }, function(err) {
//                        showAlert('', '版本检测失败', '确认');
//                    });
//                }, false);
            	//弹出框弹出后，isPopup标志为true状态。  
            	$scope.myPopup = {  
            		'isPopup':true  
            	};  
            }

            var showVersionPop = function(template, leftText, rightText, downUrl, num) {
                var messagePopup = $ionicPopup.confirm({
                    template: template,
                    okText: leftText,
                    cancelText: rightText
                });
                messagePopup.then(function(res) {
                    if (res) {
                        if (num == 1) {
                            console.log(downUrl);
                            MRUpdateVersion.updateVersion(function success() {}, function failed(message) {}, downUrl);
                        }
                    }
                })
            }
            var showAlert = function(title, template, okText) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    okText: okText,
                    template: template
                });
                alertPopup.then(function(res) {});
            };

            $scope.logout = function() {
                showMessage('您确定要退出登录？', '确定', '取消');
                // if (localStorage.getItem('promptMsg') && localStorage.getItem('promptMsg') != 'false') {
                //     showMessage('您确定要退出登录？', '确定', '取消');
                // } else {
                //     showpromptMsg();
                // }
            };

            //提示客户退出后无法收到推送消息
            $scope.isChecked = false;
            var showpromptMsg = function() {
                $scope.popup = $ionicPopup.show({
                    templateUrl: "tabs/mine/showpromptMsg.tpl.html",
                    scope: $scope,
                });
            };

            $scope.seleteShowpromptMsg = function(isChecked) {
                if (isChecked) {
                    localStorage.setItem('promptMsg', true);
                } else {
                    localStorage.setItem('promptMsg', false);
                }
            }

            $scope.closePop = function() {
                $scope.popup.close();
                showMessage('您确定要退出登录？', '确定', '取消');
            }

            // 消息提示
            var showMessage = function(content, leftText, rightText) {
                var messagePopup = $ionicPopup.confirm({
                    template: content,
                    okText: leftText,
                    cancelText: rightText
                }).then(function(res) {
                    if (res) {
                        $http.get('ServiceName=UserService&TransName=logout').then(function(res) {
                            $ionicHistory.clearHistory();
                            $ionicHistory.clearCache().then(function() {
                                $ionicHistory.nextViewOptions({
                                    disableAnimate: true,
                                    disableBack: true,
                                    historyRoot: true
                                });
                                token = null;
                                var user = null;
                                CurrentUserService.destroyUserSession();
                                SavePopShowFristService.setPopShowBlr(false);
                                if (isApp) {
                                    window.plugins.jPushPlugin.setTags(''); //设置tag为空
                                    window.plugins.jPushPlugin.stopPush(); //停止推送
                                    //退出jmessage
                                    window.JMessage.logout(function(response) {
                                        console.log("退出成功");
                                    }, function(response) {
                                        console.log(response);
                                    });
                                }
                                //清理缓存
                                console.log('清理缓存');
                                localStorage.removeItem("autoLogin",'0');
                                $state.go("blankPage", {}, { location: 'replace' });
                            });

                        }, function(err) {
                            showAlert('', '退出失败', '确认');
                        });
                    }
                })
            };
        }
    ])

angular.module('BaiYin.tabs.mine.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        src: '../images/tabs/mine/banner_home.png'
    };

    var result = mocksData.resetData(data);
    // $httpBackend.whenPOST(/\/getApplys/).passThrough();
    $httpBackend.whenGET(/.*/).passThrough();
}])
angular
    .module('BaiYin.tabs.OMA', [
        'ionic',
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('tabs/OMA', {
            url: '/tabs/OMA',
            controller: 'OMAController',
            templateUrl: 'tabs/OMA/OMA.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    .controller('OMAController', ['$interval', '$scope','$rootScope', '$http', 'showAlert', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', '$state', 'Session', '$ionicLoading','$ionicActionSheet',
        function ($interval, $scope,$rootScope, $http, showAlert, $ionicTabsDelegate, $ionicHistory, $ionicPopup, $state, Session, $ionicLoading,$ionicActionSheet) {
            $scope.myActiveSlide = 1;
            $scope.$on('$ionicView.enter', function () {
                //显示tabs
                $rootScope.hideTabs = false;
                $scope.currentTab = 'tabs/OMA';
                $ionicTabsDelegate.select(2);
            });
            $scope.$on('$ionicView.afterEnter', function () {
                // getPowerPlantList();
            });
            $scope.totask=function () {
                showAlert.showMsg('','','开发中……')
            }
        }]);
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
                // showAlert.showMsg('', '', '开发中……')
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


angular
    .module('BaiYin.taskManage.tmDetail', [
        'ionic',
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('taskManage/tmDetail', {
            url: '/taskManage/tmDetail',
            controller: 'tmDetailController',
            templateUrl: 'taskManage/tmDetail/tmDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('tmDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$ionicActionSheet',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $ionicActionSheet) {
            //标题
            $scope.title = "专项详情";
            //详情数据
            $scope.data = new Object();
            $scope.$on('$ionicView.enter', function () {
                $scope.data = $stateParams.item.data;
            });
        }
    ]);
angular.module('BaiYin.editingPwd', [
    'ionic',
    'BaiYin.editingPwd.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('editingPwd', {
        url: '/editingPwd',
        controller: 'editingPwdController',
        templateUrl: 'userConfig/editingPwd/editingPwd.tpl.html',
        cache: false,
        authorizedRuleType: ['1']
    })
}])

.controller('editingPwdController', ['$scope', '$http', '$ionicPopup', '$ionicHistory',

    function($scope, $http, $ionicPopup, $ionicHistory) {

        $scope.userPwd = {
            'password': '', //原密码
            'newPassword': '', //新密码
            'repeatPwd': '' //重新新密码
        };

        $scope.editPwd = {
            'username': '',
            'password': '', //输入的原密码
            'newPassword': '', //新密码
        }

        // 修改信息方法
        $scope.updateUserInfor = function() {

        }
        var showConfirm = function(template, okText, num) {
            var confirmPopup = $ionicPopup.alert({
                template: template,
                okText: okText
            });
            confirmPopup.then(function(res) {
                if (res && num == 2) {
                    $ionicHistory.clearCache().then(function() {
                        $ionicHistory.goBack();
                    });
                }
            });
        };
    }
])
angular.module('BaiYin.editingPwd.mock',[
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    $httpBackend.whenPOST('/editUserPassword').passThrough();
}])

angular.module('BaiYin.editingUserInfo', [
    'ionic',
    'BaiYin.editingUserInfo.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('editingUserInfo', {
        url: '/editingUserInfo',
        controller: 'editingUserInfoController',
        templateUrl: 'userConfig/editingUserInfo/editingUserInfo.tpl.html',
        cache: false,
        authorizedRuleType: ['1']
    })
}])

.controller('editingUserInfoController', ['$scope', '$http', '$ionicPopup',

    function($scope, $http, $ionicPopup) {

    }
])
angular.module('BaiYin.editingUserInfo.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenPOST('/editUserinfo').passThrough();
}])
angular.module('BaiYin.userConfig.myDevice', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('userConfig/myDevice', {
        url: '/userConfig/myDevice',
        controller: 'myDeviceController',
        templateUrl: 'userConfig/myDevice/myDevice.tpl.html',
        cache: false,
        authorizedRuleType: ['1']
    })
}])

.controller('myDeviceController', ['$scope', 'Session',
    function($scope, Session) {
        if (Session.user.DeviceID) {
            $scope.deviceID = Session.user.DeviceID;
        }
    }
])
angular.module('BaiYin.blankPage', [
    'ionic',
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('blankPage', {
        url: '/blankPage',
        controller: 'blankPageController',
        templateUrl: 'userServers/blankPage/blankPage.tpl.html',
        authorizedRuleType: ['1', '0']
    })
}])

.controller('blankPageController', ['$scope', '$http', '$ionicListDelegate', '$ionicHistory',
    function($scope, $http, $ionicListDelegate, $ionicHistory) {}
])
angular.module('BaiYin.login', [
    'ionic',
    'BaiYin.login.mock'
]).controller('LoginController', ['$ionicHistory', 'showAlert', '$http', '$ionicModal', '$rootScope', '$scope', '$state', '$stateParams', 'Session', '$ionicLoading', '$ionicScrollDelegate', 'SavePopShowFristService', 'loadingAnimation', 'MrDevice', 'intranetUri', 'outerNetUri', '$cordovaBarcodeScanner',

    function ($ionicHistory, showAlert, $http, $ionicModal, $rootScope, $scope, $state, $stateParams, Session, $ionicLoading, $ionicScrollDelegate, SavePopShowFristService, loadingAnimation, MrDevice, intranetUri, outerNetUri, $cordovaBarcodeScanner) {
        var loginUrl = 'UserService/login';
        $scope.empty = {height: '' + screen.height/2 -120 + 'px'}
        if (isApp) {
            var viewScroll = $ionicScrollDelegate.$getByHandle('loginScroll');
            window.addEventListener("native.keyboardshow", function (e) {
                viewScroll.scrollBottom([true]);
            });
            window.addEventListener("native.keyboardhide", function (e) {
                viewScroll.scrollBottom([true]);
            });
        }
        localStorage.removeItem("newsId");//这个玩意必须在这里清理
        if ((localStorage.getItem('PassWord') != 'null') && localStorage.getItem('PassWord') && localStorage.getItem('UserID') && (localStorage.getItem('UserID')) != 'null') {
            $scope.isChecked = true;
            $scope.UserID = localStorage.getItem('UserID');
            $scope.PassWord = localStorage.getItem('PassWord');
        } else {
            $scope.isChecked = false;
            $scope.UserID = null;
            $scope.PassWord = null;
        }
        if (localStorage.getItem('autoLogin') && localStorage.getItem('autoLogin') == '1') {
            $scope.isAuto = true;
        }
        $scope.seletePwd = function (seletePwd) {
            $scope.isChecked = seletePwd;
        };
        $scope.autoLogin = function (autoLogin) {
            $scope.isAuto = autoLogin;
            $scope.isChecked = autoLogin;
        };

        $scope.credentials = {
            UserID: $scope.UserID ? $scope.UserID : '',
            PassWord: $scope.PassWord ? $scope.PassWord : '',
            DeviceID: "",
            APP_VERSION: appVersion,
            DeviceType: ''
        };

        if (false) {
            MRDeviceId.getDeviceId(function success(message) {
                $scope.credentials.DeviceID = message;
            }, function failed() {
            });
        }

        var login = function (credentials, formName) {
            if (formName.$valid) {
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                var loginInfor = {
                    UserID: $scope.credentials.UserID,
                    PassWord: encodeURIComponent(encode($scope.credentials.PassWord)),
                    DeviceID: $scope.credentials.DeviceID,
                    APP_VERSION: appVersion,
                    DeviceType: $scope.credentials.DeviceType
                };

                //正式
                $http.post(loginUrl, loginInfor)
                    .then(
                        function (res) {
                            loadingAnimation.hideLoading();
                            if (res) {
                                setToken(res.data);
                                if ($scope.isChecked) {
                                    localStorage.setItem('UserID', credentials.UserID);
                                    localStorage.setItem('PassWord', $scope.credentials.PassWord);
                                } else {
                                    localStorage.setItem('UserID', null);
                                    localStorage.setItem('PassWord', null);
                                }
                                if ($scope.isAuto) {
                                    localStorage.setItem('UserID', credentials.UserID);
                                    localStorage.setItem('PassWord', $scope.credentials.PassWord);
                                    localStorage.setItem("autoLogin", "1");//1为自动登录
                                } else {
                                    localStorage.setItem("autoLogin", "0");//1为自动登录
                                }
                                Session.create(res.data, $scope.credentials);
                                $scope.modal.remove();
                                if(isApp){
                                   // JMessage();
                                }
                                SavePopShowFristService.setPopShowBlr(true);
                                $state.go("tabs/homePage", {}, {location: 'replace'});
                                if (res.msg != '成功') {
                                    showAlert.showMsg(res, '', '', '确认')
                                }
                                window.logined != null ? window.logined() : "";
                            } else {
                                formName.$submitted = false;
                            }

                        },
                        function (res) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(res, '', res, '确认')
                            formName.$submitted = false;
                        });
            } else {
                showAlert.showMsg('', '', '请输入用户名或密码', '确认')
                formName.$submitted = false;
            }
        };
        if(!isApp){
            $scope.login = login;
         }

        /**
         * 基础数据设置
         * @param data
         */
        function setToken(data){
            token = {
                SignToken: data.SignToken,
                UserID: data.UserID,
                UserName: data.USER_NAME,
                DeptNo: data.DEPT_NO,
                DeptName: data.DEPT_NAME,
                Contract: data.CONTRACT,
                ContractName: data.CONTRACT_NAME,
                attendenceReasonDay: data.attendenceReasonDay,
                sec:data.sec
            };
            console.log("data.sec=="+JSON.stringify(data.sec));
            localStorage.removeItem("ATTENDENCE_FLG");
        }

        var encode = function (code) {
            var key = CryptoJS.enc.Latin1.parse('ipacsbj.ipacsbj.');
            var iv = CryptoJS.enc.Latin1.parse('ipacsbj.ipacsbj.');
            //加密
            return CryptoJS.AES.encrypt(code, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            });
        };
        var checkConnection = function (callBack) {
            var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN] = '未知网络';
            states[Connection.ETHERNET] = '网络连通，以太网网络！';
            states[Connection.WIFI] = '网络连通，WIFI网络！';
            states[Connection.CELL_2G] = '网络连通，2G网络！';
            states[Connection.CELL_3G] = '网络连通，3G网络！';
            states[Connection.CELL_4G] = '网络连通，4G网络！';
            states[Connection.CELL] = '网络数据链接！';
            states[Connection.NONE] = '网络不通，没有可用的链接！';
            console.log("states[networkState]=="+states[networkState]);
            showAlert.showMsg('','',states[networkState],'');//网络提醒
            localStorage.removeItem("uri");
            networkinterface.getIPAddress(function (ip) {
                var exp=/^(10)\.(0)\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                var reg = ip.match(exp);
                if (reg==null) {
                    showAlert.showMsg('','','当前已切入外网环境','');//网络提醒
                    localStorage.removeItem("uri");
                }else{
                    showAlert.showMsg('','','当前已切入内网环境','');//网络提醒
                    localStorage.setItem('uri', '1');
                }
                //如果4G网络、2G、3G必须是外网
                if('Connection.CELL_2G'==networkState|| 'Connection.CELL_3G'==networkState
                    ||'Connection.CELL_4G'==networkState ||'Connection.CELL'==networkState){
                    showAlert.showMsg('','','当前已切入外网环境','');//网络提醒
                    localStorage.removeItem("uri");
                }
                console.log("localStorage.getItem('uri')==="+localStorage.getItem("uri"));

                if(typeof callBack == "function"){
                    callBack();
                }
            });
        };

        //var deviceInfo = window.navigator;//获取浏览器信息
        //极光服务
        var JMessage = function () {
            var iniPush = function () {
                showAlert.showMsg('', '', '开启消息推送', '确认');
                var tags = [];
                tags.push($scope.credentials.UserID.toUpperCase());
                window.plugins.jPushPlugin.isPushStopped(function (result) { //判断用户是否停止推送
                    if (result != 0) {
                        window.plugins.jPushPlugin.resumePush();
                        window.plugins.jPushPlugin.setTags(tags); //设置tag
                    } else {
                        window.plugins.jPushPlugin.setTags(tags); //设置tag
                    }
                });
            };
            iniPush();
            //初始化监听
            //document.addEventListener("deviceready", iniPush, false);
        }
        
        var judgeAutoLogin = function(){
            if (localStorage.getItem('autoLogin') && localStorage.getItem('autoLogin') == '1') {
                //此处需要自动登录
                $scope.UserID = localStorage.getItem('UserID');
                $scope.PassWord = localStorage.getItem('PassWord');
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                var loginInfor = {
                    UserID: $scope.credentials.UserID,
                    PassWord: encodeURIComponent(encode($scope.credentials.PassWord)),
                    DeviceID: $scope.credentials.DeviceID,
                    APP_VERSION: appVersion,
                    DeviceType: $scope.credentials.DeviceType
                };
                //正式
                $http.post(loginUrl, loginInfor)
                //测试
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res) {
                            setToken(res.data);
                            Session.create(res.data, $scope.credentials);
                            $scope.modal.remove();
                            if(isApp){
                                //JMessage();
                            }
                            SavePopShowFristService.setPopShowBlr(true);
                            $state.go("tabs/homePage", {}, {location: 'replace'});
                            if (res.msg != '成功') {
                                showAlert.showMsg(res, '', '', '确认')
                            }
                            window.logined != null ? window.logined() : "";
                        }
                    }, function (res) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(res, '', res, '确认');
                    });
            }
        };
        
        document.addEventListener("deviceready", function () {
            $scope.credentials.DeviceID = MrDevice.getUUID();
            $scope.credentials.DeviceType = MrDevice.getPlatform();
            $scope.login = login;
            $rootScope.$on('$cordovaNetwork:online', checkConnection);
            checkConnection(judgeAutoLogin);
        }, false);
    }
]);
angular.module('BaiYin.login.mock', [
    'ngMockE2E', 'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenPOST(/.*/).passThrough();
}])
angular.module('BaiYin.agentsView', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('agentsView', {
        url: '/agentsView',
        controller: 'agentsViewController',
        templateUrl: 'Agents/AgentsList/agentsView/agentsView.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1'] //登录权限
    })
}])

.controller('agentsViewController', ['$scope', '$state', 'showAlert', 'pageInitService', '$timeout', '$ionicHistory', '$stateParams', '$http', '$ionicPopup', 'MrActionSheet', 'MrImagePicker', 'MrCamera', 'loadingAnimation', 'Session',
    function($scope, $state, showAlert, pageInitService, $timeout, $ionicHistory, $stateParams, $http, $ionicPopup, MrActionSheet, MrImagePicker, MrCamera, loadingAnimation, Session) {

        $scope.imageList = [];

        var valKey = JSON.parse(sessionStorage.getItem("agentsVD"));;
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
                'ServiceName=ApproveService&TransName=getUnApprvedDetail' + '&LU_NAME=' + valKey.LU_NAME + '&KEY_REF=' + valKey.KEY_REF + '&LINE_NO=' + valKey.LINE_NO + '&STEP_NO=' + valKey.STEP_NO
            ];
            pageInitService.pageInit(apis).then(function(result) {
                agentViewMsg(result[0])
            }, function(error) {
                showAlert.showMsg(error, '', '网络异常', '确认')
            })
        });
        $scope.doRefresh = function() {
            $http.get('ServiceName=ApproveService&TransName=getUnApprvedDetail' + '&LU_NAME=' + valKey.LU_NAME + '&KEY_REF=' + valKey.KEY_REF + '&LINE_NO=' + valKey.LINE_NO + '&STEP_NO=' + valKey.STEP_NO)
                .then(function(res) {
                    agentViewMsg(res)
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
        };
        var displayFile = false;
        $scope.accessoryCont = function() {
            $scope.displayFile = !$scope.displayFile
        };

        var resolveMsg;

        function agentViewMsg(res) {
            resolveMsg = res;
            var str = {};
            str = res.data
            str.CREATED_DATE = new Date(str.CREATED_DATE)
            str.SUBMIT_DATE = new Date(str.SUBMIT_DATE)

            $scope.item = str
            console.log(str)
            if (str.ATTACHMENT == null || str.ATTACHMENT.length <= 0) {
                $scope.disFile = false
            } else {
                $scope.disFile = true
            }
        }
        $scope.Toflow = function(item) {
            $state.go('flowDetail', { 'item': item })
        }

        $scope.doApproval = function(status, FORM_INFO) {
            var infoMeseage = {
                ServiceName: 'ApproveService',
                TransName: 'doApprvedDetail',
                GROUP_ID: resolveMsg.data.GROUP_ID,
                LU_NAME: resolveMsg.data.LU_NAME,
                KEY_REF: resolveMsg.data.KEY_REF,
                LINE_NO: resolveMsg.data.LINE_NO,
                STEP_NO: resolveMsg.data.STEP_NO,
                APP_FORM_INFO: FORM_INFO ? encodeURIComponent(FORM_INFO) : '',
                APPROVAL_STATUS: '',
                imageList: encodeURIComponentImg($scope.imageList)
            };

            var confirmfalse = $ionicPopup.confirm({
                okText: '是',
                cancelText: '否',
                template: '请您确认？'
            }).then(function(res) {
                if (res) {
                    loadingAnimation.showLoading('处理中...', 'loding', 0);
                    infoMeseage.APPROVAL_STATUS = status;
                    $http.post('', infoMeseage)
                        .then(function(res) {
                            loadingAnimation.hideLoading();
                            showAlertGo('', '处理成功', '确认')
                        }, function(error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常', '确认')
                        });
                }
            });
        }
        $scope.openUrl = function(URL) {
            console.log(URL);
            document.addEventListener("deviceready", function() {
                if (Session.user.DeviceType == 'Android') {
                    MRUpdateVersion.updateVersion(function success() {}, function failed(message) {}, URL);
                } else {
                    cordova.InAppBrowser.open(URL, '_system', 'zoom=yes');
                }
            }, false);
        }

        // 启动选择图片方法
        $scope.addAttachment = function() {
            if ($scope.imageList.length < 10) {
                MrActionSheet.show({
                    buttons: [
                        { text: '相机' },
                        { text: '相册' }
                    ],
                    cancelText: '取消',
                    cancel: function() {
                        return true;
                    },
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0:
                                takePicture();

                                break;
                            case 1:
                                pickImage();
                                break;
                            default:
                                break;
                        }
                        return true;
                    }
                });
            } else {
                showAlert("最多可选择10张图片！", "确定", 2);
            }
        };

        // 相机照相方法
        var takePicture = function() {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 450,
                targetHeight: 450,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };
            MrCamera.getPicture(options).then(function(imageData) {
                var contentUrl = "data:image/*;charset=utf-8;base64," + imageData;
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                $scope.imageList.push(contentUrl);
                if (!$scope.$$phase) {
                    $scope.$digest();
                } else {
                    loadingAnimation.showLoading('加载中...', 'loding', 0);
                }
            }, function(err) {
                loadingAnimation.hideLoading();
            });
        };

        // 相册选择图片方法
        var pickImage = function() {
            var options = {
                maximumImagesCount: 10 - $scope.imageList.length,
                width: 450,
                height: 450,
                quality: 100
            };
            MrImagePicker.getPictures(options).then(
                function(results) {
                    loadingAnimation.showLoading('加载中...', 'loding', 1000);
                    convertToDataStream(results);
                },
                function(error) {
                    console.log(error);
                    loadingAnimation.hideLoading();
                });
        };

        // 相机选择照片后转流方法
        var convertToDataStream = function(picturesUrl) {
            for (var i = 0; i < picturesUrl.length; i++) {
                window.plugins.Base64.encodeFile(picturesUrl[i], function(imageData) {
                    $scope.imageList.push(imageData);
                    if (!$scope.$$phase) {
                        $scope.$digest();
                        loadingAnimation.hideLoading();
                    } else {
                        loadingAnimation.hideLoading();
                    }
                });
            }
        };

        $scope.deletePicture = function($index) {
            /*点击哪张图片，删除哪张图片*/
            showConfirmTwo("删除此图片？", "确定", "取消", $index);
        };

        var showConfirmTwo = function(template, leftText, rightText, index) {
            var confirmPopup = $ionicPopup.confirm({
                template: template,
                okText: leftText,
                cancelText: rightText
            });
            confirmPopup.then(function(res) {
                if (res) {
                    loadingAnimation.showLoading('加载中...', 'loding', 0);
                    $scope.imageList.splice(index, 1);
                    if (!$scope.$$phase) {
                        $scope.$digest();
                        loadingAnimation.hideLoading();
                    } else {
                        loadingAnimation.hideLoading();
                    }
                }
            });
        };

        var encodeURIComponentImg = function(arr) {
            var array = [];
            for (var i = 0; i < arr.length; i++) {
                array.push(encodeURIComponent(arr[i]))
            }
            return array;
        }

        var showAlertGo = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                $ionicHistory.goBack();
            });
        };
        $scope.back = function() {
            var confirmfalse = $ionicPopup.confirm({
                okText: '是',
                cancelText: '否',
                template: '确定返回？'
            }).then(function(res) {
                if (res) {
                    $ionicHistory.goBack();
                }
            });
        };
    }
])

angular.module('BaiYin.agentsView.mock', [
	'ngMockE2E', 'BaiYin.common.mocksData'
	])
.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
	var data = {

	}
	var result = mocksData.resetData(data);
	$httpBackend.whenGET(/.*/).passThrough();
}]);
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
angular.module('BaiYin.LeavesDetail', [
        'BaiYin.LeavesDetail.mock'
    ])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('LeavesDetail', {
            url: '/LeavesDetail',
            controller: 'LeavesDetailController',
            templateUrl: 'AllLeave/Leave/leavesDetail/LeavesDetail.tpl.html',
            //params: { 'detailParam': null },
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    .controller('LeavesDetailController', ['$scope', 'pageInitService', '$stateParams', '$http', '$state', 'showAlert','$ionicHistory',
        function($scope, pageInitService, $stateParams, $http, $state, showAlert,$ionicHistory) {
            var delParam = JSON.parse(sessionStorage.getItem("detailParam"));
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveDetail&APPLY_NO=' + delParam.APPLY_NO,
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.item = result[0].data;
                    if (result[0].data.APPLYFORLEAVESTATE == "新建") {
                        $scope.submitL = true;
                        $scope.editL = true;
                        $scope.deleL = true;
                    } 
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            $scope.doRefresh = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveDetail&APPLY_NO=' + delParam.APPLY_NO)
                    .then(function(res) {
                        $scope.item = res.data;
                        $scope.$broadcast('scroll.refreshComplete');
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };

            //提交
            $scope.submit = function() {
                $http.get('ServiceName=ApplyForLeaveService&ACTION_TYPE=submit&TransName=doApplyForLeaveDetail&APPLY_NO=' + delParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
           
            //编辑
            $scope.edit = function(item) {
                var editParam = angular.copy(item);
                editParam.numTT = 1;
                $state.go("newLeaves", { "newParam": editParam });
            };
            //删除
            $scope.dele = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=doApplyForLeaveDetail&ACTION_TYPE=delete&APPLY_NO=' + delParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
        }
    ])
angular.module('BaiYin.LeavesDetail.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
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
angular.module('BaiYin.LeavesList.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.newLeaves', [
        'BaiYin.newLeaves.mock'
    ])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('newLeaves', {
            url: '/newLeaves',
            controller: 'newLeavesController',
            templateUrl: 'AllLeave/Leave/newLeaves/newLeaves.tpl.html',
            params: { 'newParam': null },
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('newLeavesController', ['$scope', '$timeout', '$stateParams', '$ionicHistory', '$filter', 'loadingAnimation', 'ionicDatePicker', 'pageInitService', '$http', '$state', '$ionicPopup', 'showAlert',
        function($scope, $timeout, $stateParams, $ionicHistory, $filter, loadingAnimation, ionicDatePicker, pageInitService, $http, $state, $ionicPopup, showAlert) {
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveFurloughType',
                    'ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveEmployeeType'
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.item3s = result[0].data;
                    $scope.item4s = result[1].data;
                    $timeout(function() {
                        if ($stateParams.newParam.numTT == 1) {
                            $scope.contN = "编辑";
                            $scope.newLeavePara = $stateParams.newParam;
                            $scope.filterDate1 = $filter('date')($stateParams.newParam.APPLY_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.filterDate2 = $filter('date')($stateParams.newParam.BEGIN_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.filterDate3 = $filter('date')($stateParams.newParam.END_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.DAYS = $stateParams.newParam.DAYS;
                        } else {
                            $scope.contN = "新增";
                        };
                    })

                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            $scope.filterDate1 = $filter('date')(new Date(), "yyyy-MM-dd");
            $scope.filterDate2 = $filter('date')(new Date(), "yyyy-MM-dd");
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
                            $scope.filterDate1 = $filter('date')(val, "yyyy-MM-dd")
                        } else if (tesr == 2) {
                            $scope.filterDate2 = $filter('date')(val, "yyyy-MM-dd")
                        } else if (tesr == 3) {
                            $scope.filterDate3 = $filter('date')(val, "yyyy-MM-dd");
                            var date1 = $scope.filterDate2;
                            var date2 = $scope.filterDate3;

                            function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
                                var aDate, oDate1, oDate2, iDays
                                aDate = sDate1.split("-")
                                oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2006格式  
                                aDate = sDate2.split("-")
                                oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
                                iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
                                return iDays
                            }
                            $scope.DAYS = DateDiff(date1, date2) + 1;
                        }
                        datePickerCallback(val);
                    },
                    dateFormat: 'yyyy-MM-dd', //Optional
                    closeOnSelect: false, //Optional
                };
            };
            //开始结束日期
            $scope.chooseTime = function(tesr) {
                dateList(tesr)
                ionicDatePicker.openDatePicker($scope.datepickerObject);
                dateList(tesr)
            };
            //提交/保存
            $scope.doApproval = function(num, param) {
                var subParam = angular.copy(param);
                subParam.APPLY_DATE = $scope.filterDate1;
                subParam.BEGIN_DATE = $scope.filterDate2;
                subParam.END_DATE = $scope.filterDate3;
                subParam.DAYS = $scope.DAYS + '';
                var dat1 = (new Date(subParam.END_DATE.replace(/-/g, '/'))).getTime();
                var dat2 = (new Date(subParam.BEGIN_DATE.replace(/-/g, '/'))).getTime();
                var dat3 = (new Date(subParam.APPLY_DATE.replace(/-/g, '/'))).getTime();
                var dat = dat1 - dat2;
                var dat4 = dat2 - dat3;
                var dat = dat1 - dat2;
                function reqSub() {
                    $http.post('ServiceName=ApplyForLeaveService&TransName=doApplyForLeaveDetail', subParam)
                        .then(function(res) {
                            showAlert.showMsg(res, '', '网络异常', '确认');
                            $state.go("LeavesList");
                        }, function(error) {
                            showAlert.showMsg(error, '', '网络异常', '确认');
                            $scope.hasMore = false;
                        });
                };
                function resSub() {
                    $http.post('ServiceName=ApplyForLeaveService&TransName=doApplyForLeaveDetail', subParam1)
                        .then(function(res) {
                            subParam.APPLY_NO = res.data.APPLY_NO;
                            console.log(subParam);
                            $http.post('ServiceName=ApplyForLeaveService&TransName=doApplyForLeaveDetail', subParam)
                                .then(function(res) {
                                    showAlert.showMsg(res, '', '网络异常', '确认');
                                    $state.go("LeavesList");
                                }, function(error) {
                                    showAlert.showMsg(error, '', '网络异常', '确认');
                                    $scope.hasMore = false;
                                });
                        }, function(error) {
                            showAlert.showMsg(error, '', '网络异常', '确认');
                            $scope.hasMore = false;
                        });
                };
                if (dat >= 0 && dat4 >= 0) {
                    if ($stateParams.newParam.numTT == 1) {
                        if (num == 1) {
                            var subParam1 = angular.copy(subParam);
                            subParam1.ACTION_TYPE = "edit";
                            subParam.ACTION_TYPE = "submit";
                            resSub();
                        } else {
                            subParam.ACTION_TYPE = "edit";
                            reqSub();
                        };
                    } else {
                        if (num == 1) {
                            var subParam1 = angular.copy(subParam);
                            subParam1.ACTION_TYPE = "save";
                            subParam.ACTION_TYPE = "submit";
                            resSub();
                        } else {
                            subParam.ACTION_TYPE = "save";
                            reqSub();
                        };
                    };
                } else {
                    showAlert.showMsg("", '', '请选择正确日期', '确认');
                };
            };
            //返回
            $scope.back = function() {
                var confirmfalse = $ionicPopup.confirm({
                    okText: '是',
                    cancelText: '否',
                    template: '确定返回？'
                }).then(function(res) {
                    if (res) {
                        $ionicHistory.goBack();
                    }
                });
            };
            //回到首页
            $scope.backHomePage = function() {
                $state.go("tabs/homePage");
            };

        }
    ])
angular.module('BaiYin.newLeaves.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.newVacation', [
        'BaiYin.newVacation.mock'
    ])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('newVacation', {
            url: '/newVacation',
            controller: 'newVacationController',
            templateUrl: 'AllLeave/Vacation/newVacation/newVacation.tpl.html',
            params: { 'newParam': null },
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('newVacationController', ['$scope', '$timeout', '$stateParams', '$ionicHistory', '$filter', 'loadingAnimation', 'ionicDatePicker', 'pageInitService', '$http', '$state', '$ionicPopup', 'showAlert',
        function($scope, $timeout, $stateParams, $ionicHistory, $filter, loadingAnimation, ionicDatePicker, pageInitService, $http, $state, $ionicPopup, showAlert) {
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelEmployeeType',
                    'ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelTransprtation'
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.item4s = result[0].data;
                    $scope.item5s = result[1].data;
                    $timeout(function() {
                        if ($stateParams.newParam.numTT == 1) {
                            $scope.contN = "编辑";
                            $stateParams.newParam.EMPLOYEE_TYPE = $stateParams.newParam.EMPLOYEE_TYPE + '';
                            $scope.newLeavePara = $stateParams.newParam;
                            $scope.filterDate1 = $filter('date')($stateParams.newParam.APPLY_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.filterDate2 = $filter('date')($stateParams.newParam.BEGIN_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.filterDate3 = $filter('date')($stateParams.newParam.END_DATE.substring(0, 10), "yyyy-MM-dd");
                            $scope.DAYS = $stateParams.newParam.DAYS;
                        } else {
                            $scope.contN = "新增";
                        };
                    })

                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            //日期计算
            function DateDiff(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式  
                var aDate, oDate1, oDate2, iDays
                aDate = sDate1.split("-")
                oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2006格式  
                aDate = sDate2.split("-")
                oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
                iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数  
                return iDays
            };
            $scope.filterDate1 = $filter('date')(new Date(), "yyyy-MM-dd");
            $scope.filterDate2 = $filter('date')(new Date(), "yyyy-MM-dd");
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
                            $scope.filterDate1 = $filter('date')(val, "yyyy-MM-dd")
                        } else if (tesr == 2) {
                            $scope.filterDate2 = $filter('date')(val, "yyyy-MM-dd")
                        } else if (tesr == 3) {
                            $scope.filterDate3 = $filter('date')(val, "yyyy-MM-dd");
                            var date1 = $scope.filterDate2;
                            var date2 = $scope.filterDate3;


                            $scope.DAYS = DateDiff(date1, date2) + 1;
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
            //提交/保存
            $scope.doApproval = function(num, param) {
                var subParam = angular.copy(param);
                subParam.APPLY_DATE = $scope.filterDate1;
                subParam.BEGIN_DATE = $scope.filterDate2;
                subParam.END_DATE = $scope.filterDate3;
                subParam.DAYS = $scope.DAYS + '';
                var dat1 = (new Date(subParam.END_DATE.replace(/-/g, '/'))).getTime();
                var dat2 = (new Date(subParam.BEGIN_DATE.replace(/-/g, '/'))).getTime();
                var dat3 = (new Date(subParam.APPLY_DATE.replace(/-/g, '/'))).getTime();
                var dat = dat1 - dat2;
                var dat4 = dat2 - dat3;
                function reqSub() {
                    $http.post('ServiceName=ApplyForBusinessTravelService&TransName=doApplyForBusinessTravelDetail', subParam)
                        .then(function(res) {
                            showAlert.showMsg(res, '', '网络异常', '确认');
                            $state.go("VacationList");
                        }, function(error) {
                            showAlert.showMsg(error, '', '网络异常', '确认');
                            $scope.hasMore = false;
                        });
                };

                function resSub() {
                    $http.post('ServiceName=ApplyForBusinessTravelService&TransName=doApplyForBusinessTravelDetail', subParam1)
                        .then(function(res) {
                            subParam.APPLY_NO=res.data.APPLY_NO;
                            $http.post('ServiceName=ApplyForBusinessTravelService&TransName=doApplyForBusinessTravelDetail', subParam)
                                .then(function(res) {
                                    showAlert.showMsg(res, '', '网络异常', '确认');
                                    $state.go("VacationList");
                                }, function(error) {
                                    showAlert.showMsg(error, '', '网络异常', '确认');
                                    $scope.hasMore = false;
                                });
                        }, function(error) {
                            showAlert.showMsg(error, '', '网络异常', '确认');
                            $scope.hasMore = false;
                        });
                };
                if (dat >= 0 && dat4 >= 0) {
                    if ($stateParams.newParam.numTT == 1) {
                        if (num == 1) {
                            var subParam1 = angular.copy(subParam);
                            subParam1.ACTION_TYPE = "edit";
                            subParam.ACTION_TYPE = "submit";
                            console.log(subParam1);
                            resSub();
                        } else {
                            subParam.ACTION_TYPE = "edit";
                            reqSub();
                        };
                    } else {
                        if (num == 1) {
                            var subParam1 = angular.copy(subParam);
                            subParam1.ACTION_TYPE = "save";
                            subParam.ACTION_TYPE = "submit";
                            resSub();
                        } else {
                            subParam.ACTION_TYPE = "save";
                            reqSub();
                        };
                    };

                } else {
                    showAlert.showMsg("", '', '请选择正确日期', '确认');
                };
            };
            //返回
            $scope.back = function() {
                var confirmfalse = $ionicPopup.confirm({
                    okText: '是',
                    cancelText: '否',
                    template: '确定返回？'
                }).then(function(res) {
                    if (res) {
                        $ionicHistory.goBack();
                    };
                });
            };
            //回到首页
            $scope.backHomePage=function(){
                $state.go("tabs/homePage");
            };

        }
    ])
angular.module('BaiYin.newVacation.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.VacationDetail', [
        'BaiYin.VacationDetail.mock'
    ])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('VacationDetail', {
            url: '/VacationDetail',
            controller: 'VacationDetailController',
            templateUrl: 'AllLeave/Vacation/VacationDetail/VacationDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('VacationDetailController', ['$scope','$ionicHistory', 'pageInitService', '$stateParams', '$http', '$state', 'showAlert',
        function($scope,$ionicHistory, pageInitService, $stateParams, $http, $state, showAlert) {
            var vacParam = JSON.parse(sessionStorage.getItem("vacationParam"));
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelDetail&APPLY_NO=' + vacParam.APPLY_NO,
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.item = result[0].data;
                    if (result[0].data.APPROVE_STATUS == "未定义"||result[0].data.APPROVE_STATUS == "新建") {
                        $scope.submitL = true;
                        $scope.editL = true;
                        $scope.deleL = true;
                    } else if (result[0].data.APPROVE_STATUS == "审批通过" || result[0].data.APPROVE_STATUS == "审批中") {
                        $scope.backLeaveL = true;
                    };
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            $scope.doRefresh = function() {
                $http.get('ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelDetail&APPLY_NO=' + vacParam.APPLY_NO)
                    .then(function(res) {
                        $scope.item = res.data;
                        $scope.$broadcast('scroll.refreshComplete');
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
            //提交
            $scope.submit = function() {
                $http.get('ServiceName=ApplyForBusinessTravelService&TransName=doApplyForBusinessTravelDetail&ACTION_TYPE=submit&APPLY_NO=' + vacParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
            //销假
            $scope.backLeave = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveDetail&APPLY_NO=' + vacParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
            //编辑
            $scope.edit = function(item) {
                var editParam = item;
                editParam.numTT = 1;
                $state.go("newVacation", { "newParam": editParam });
            };
            //删除
            $scope.dele = function() {
                $http.get('ServiceName=ApplyForLeaveService&TransName=getApplyForLeaveDetail&APPLY_NO=' + vacParam.APPLY_NO)
                    .then(function(res) {
                        showAlert.showMsg(res, '', '提交成功', '确认');
                        $ionicHistory.goBack();
                    }, function(error) {
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            };
        }
    ])
angular.module('BaiYin.VacationDetail.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.VacationList', [
        'BaiYin.VacationList.mock'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('VacationList', {
            url: '/VacationList',
            controller: 'VacationListController',
            templateUrl: 'AllLeave/Vacation/VacationList/VacationList.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])
    .controller('VacationListController', ['$scope', '$ionicPopup', 'loadingAnimation', '$ionicLoading', 'ionicDatePicker', 'pageInitService', '$http', '$state', 'showAlert',
        function($scope, $ionicPopup, loadingAnimation, $ionicLoading, ionicDatePicker, pageInitService, $http, $state, showAlert) {
            $scope.$on('$ionicView.afterEnter', function() {
                var apis = [
                    'ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelList&PageNo=1',
                    'ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelState'
                ];
                pageInitService.pageInit(apis).then(function(result) {
                    $scope.items = result[0].data;
                    $scope.item3s = result[1].data;
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
            });
            //刷新
            $scope.doRefresh = function() {
                $http.get('ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelList&PageNo=1')
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
                $http.get('ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelList&PageNo=' + $scope.loadNumber)
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
                    $scope.filterDate2 = ""
                };
                loadingAnimation.showLoading();
                $scope.trueStr = false;
                var subParam = {
                    START_CREATED_DATE: $scope.filterDate + '',
                    END_CREATED_DATE: $scope.filterDate2 + '',
                    STATE: res,
                    APPLY_DESC: req
                };
                $http.post('ServiceName=ApplyForBusinessTravelService&TransName=getApplyForBusinessTravelList&PageNo=1', subParam)
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
            //新增
            $scope.newVacation=function(){
                $state.go("newVacation",{"newParam":2})
            };
            //详情
            $scope.leavesDetail = function(res) {
                $state.go("VacationDetail");
                sessionStorage.setItem("vacationParam",JSON.stringify(res));
            };
            //清空
            $scope.listAll = function() {
                $scope.filterDate = ""
                $scope.filterDate2 = ""
            };
        }
    ])
angular.module('BaiYin.VacationList.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.attence.countAttence.cdDetail', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/cdDetail', {
            url: '/attence/countAttence/cdDetail',
            controller: 'cdDetailController',
            templateUrl: 'attence/countAttence/cdDetail/cdDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('cdDetailController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state) {
            $scope.$on('$ionicView.enter', function () {

            });
        }
    ])

angular.module('BaiYin.attence.countAttence.cdList', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/cdList', {
            url: '/attence/countAttence/cdList',
            controller: 'cdListController',
            templateUrl: 'attence/countAttence/cdList/cdList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, personNum: null, partCode: null, partName: null}
        })
    }])
    .controller('cdListController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$stateParams',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $stateParams) {
            $scope.$on('$ionicView.enter', function () {
                if(!localStorage.getItem("ATTENDENCE_FLG")){
                    console.log("3333");
                    $scope.dateTimeShow = $stateParams.dateTimeShow;
                    $scope.personNum = $stateParams.personNum;
                    $scope.partCode = $stateParams.partCode;
                    $scope.partName = $stateParams.partName;
                    console.log("partName==" + $scope.partName + "/personNum==" + $scope.personNum);
                    localStorage.setItem("dateTimeShow",$stateParams.dateTimeShow);
                    localStorage.setItem("personNum",$stateParams.personNum);
                    localStorage.setItem("partCode",$stateParams.partCode);
                    localStorage.setItem("partName",$stateParams.partName);
                }else{
                    $scope.dateTimeShow = localStorage.getItem("dateTimeShow");
                    $scope.personNum = localStorage.getItem("personNum");
                    $scope.partCode = localStorage.getItem("partCode");
                    $scope.partName = localStorage.getItem("partName");
                }
                //获取迟到人员列表
                cdPersonList($scope.dateTimeShow, $scope.partCode);
                localStorage.removeItem("ATTENDENCE_FLG");
            });

            function cdPersonList(mounth, dept) {
                console.log("mounth==" + mounth + "/dept==" + dept);
                var parmas = {
                    QUERY_MONTH: mounth,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=monthStatisticsLate', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.cdList = res.data.tList;
                            console.log("cdList.length==" + $scope.cdList.length);
                            console.log("cdList==="+JSON.stringify($scope.cdList));
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.towdkDetail = function (obj) {
                localStorage.setItem("ATTENDENCE_FLG","1");
                console.log("dateTimeShow==" + $scope.dateTimeShow + "/obj==" + JSON.stringify(obj));
                $scope.PERSON_ID = obj.PERSON_ID;
                $scope.personName = obj.PERSON_NAME;
                $scope.count = obj.COUNT;
                var item = {
                    PERSON_ID: $scope.PERSON_ID,
                    QUERY_MONTH: $scope.dateTimeShow,
                    personName: $scope.personName,
                    count: $scope.count,
                }
                $state.go('attence/countAttence/wdkDetail', item);
            }
        }
    ])

angular.module('BaiYin.attence.countAttence.wdkDetail', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/wdkDetail', {
            url: '/attence/countAttence/wdkDetail',
            controller: 'wdkDetailController',
            templateUrl: 'attence/countAttence/wdkDetail/wdkDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {PERSON_ID: null, QUERY_MONTH: null, personName: null, count: null}
        })
    }])
    .controller('wdkDetailController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$stateParams', '$ionicPopup','$filter',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $stateParams, $ionicPopup,$filter) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取统计页面传来人员id和查询月份
                $scope.dateTimeShow = $stateParams.QUERY_MONTH;
                $scope.personNo = $stateParams.PERSON_ID;
                $scope.personName = $stateParams.personName;
                $scope.count = $stateParams.count;
                console.log("dateTimeShow==" + $scope.dateTimeShow + "personNo==" + $scope.personNo);
                wdkPersonList($scope.dateTimeShow, $scope.personNo);
            });

            //获取未打卡人员详情列表
            function wdkPersonList(mounth, personNo) {
                var parmas = {
                    QUERY_MONTH: mounth,
                    PERSON_ID: personNo,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=monthStatisticsPerson', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.wdkPersonList = new Array();
                            res.data.dList.forEach(function(v, i){
                                var date = [v.year, v.month, v.date].join("-");
                                $scope.wdkPersonList.push({
                                    dates: date,
                                    year: v.year,
                                    month: v.month,
                                    date: v.date,
                                    week: v.week,
                                    list: res.data.dvalue[date].map(function(v, i){
                                        if(v.actualStartTime==null){
                                            v.actualStartTime=''
                                        }else{
                                            v.actualStartTime=v.actualStartTime.substr(11,5)
                                        }
                                        if(v.actualEndTime==null){
                                            v.actualEndTime=''
                                        }else{
                                            v.actualEndTime=v.actualEndTime.substr(11,5)
                                        }
                                        return v;
                                    })
                                });
                            });

                            console.log($scope.wdkPersonList)
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //获取打卡位置
            $scope.toPositions = function (obj) {
                console.log("obj==" + JSON.stringify(obj));
                $scope.data = {}
                // 自定义弹窗
                if (obj.checkInAddr != null && obj.checkOutAddr != null) {
                    var myPopup = $ionicPopup.show({
                        template: '<div class="dkposition"><ul><li ng-style="myPopupLi">上班打卡位置：' + obj.checkInAddr + '</li>' +
                        '<li ng-style="myPopuplastLi">下班打卡位置：' + obj.checkOutAddr + '</li></ul></div>',
                        title: '打卡位置',
                        scope: $scope,
                    });
                    myPopup.then(function (res) {
                        console.log('Tapped!', res);
                    });
                    $timeout(function () {
                        myPopup.close(); // 2秒后关闭弹窗
                    }, 2000);
                    $scope.myPopupLi = {
                        "line-height": "35px",
                        "font-size": "12px",
                        "text-align": "center",
                        "border-bottom": "1px dotted #f4f4f4",
                    }
                    $scope.myPopuplastLi = {
                        "line-height": "35px",
                        "font-size": "12px",
                        "text-align": "center",
                    }
                }
            };

            //改变时间
            $scope.changeDateTime = function(changeNumber){
                var date = $scope.dateTimeShow.split("-");
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
                if(new Date(date).getTime() < new Date().getTime()){
                    $scope.dateTimeShow = date;
                    wdkPersonList($scope.dateTimeShow, $scope.personNo);
                }
            };
        }
    ])

angular.module('BaiYin.attence.countAttence.zcList', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/zcList', {
            url: '/attence/countAttence/zcList',
            controller: 'zcListController',
            templateUrl: 'attence/countAttence/zcList/zcList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, personNum: null, partCode: null, partName: null}
        })
    }])
    .controller('zcListController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$stateParams',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $stateParams) {
            $scope.$on('$ionicView.enter', function () {
                if(!localStorage.getItem("ATTENDENCE_FLG")){
                    console.log("3333");
                    $scope.dateTimeShow = $stateParams.dateTimeShow;
                    $scope.personNum = $stateParams.personNum;
                    $scope.partCode = $stateParams.partCode;
                    $scope.partName = $stateParams.partName;
                    console.log("partName==" + $scope.partName + "/personNum==" + $scope.personNum);
                    localStorage.setItem("dateTimeShow",$stateParams.dateTimeShow);
                    localStorage.setItem("personNum",$stateParams.personNum);
                    localStorage.setItem("partCode",$stateParams.partCode);
                    localStorage.setItem("partName",$stateParams.partName);
                }else{
                    $scope.dateTimeShow = localStorage.getItem("dateTimeShow");
                    $scope.personNum = localStorage.getItem("personNum");
                    $scope.partCode = localStorage.getItem("partCode");
                    $scope.partName = localStorage.getItem("partName");
                }
                //获取正常人员列表
                ztPersonList($scope.dateTimeShow, $scope.partCode);
                localStorage.removeItem("ATTENDENCE_FLG");
            });
            function ztPersonList(mounth, dept) {
                console.log("正常李彪");
                console.log("mounth==" + mounth + "/dept==" + dept);
                var parmas = {
                    QUERY_MONTH: mounth,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=monthStatisticsNormal', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.zcList = res.data.tList;
                            console.log("zcList.length==" + $scope.zcList.length);
                            console.log("zcList==="+JSON.stringify($scope.zcList));
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }
            $scope.towdDetail = function (obj) {
                localStorage.setItem("ATTENDENCE_FLG","1");
                console.log("dateTimeShow==" + $scope.dateTimeShow + "/obj==" + JSON.stringify(obj));
                $scope.PERSON_ID = obj.PERSON_ID;
                $scope.personName = obj.PERSON_NAME;
                $scope.count = obj.COUNT;
                var item = {
                    PERSON_ID: $scope.PERSON_ID,
                    QUERY_MONTH: $scope.dateTimeShow,
                    personName: $scope.personName,
                    count: $scope.count,
                }
                $state.go('attence/countAttence/wdkDetail', item);
            }
                //$state.go('attence/countAttence/ztDetail');
        }
    ])

angular.module('BaiYin.attence.countAttence.ztDetail', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/ztDetail', {
            url: '/attence/countAttence/ztDetail',
            controller: 'ztDetailController',
            templateUrl: 'attence/countAttence/ztDetail/ztDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('ztDetailController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state) {
            $scope.$on('$ionicView.enter', function () {

            });
        }
    ])

angular.module('BaiYin.attence.countAttence.wdkList', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/wdkList', {
            url: '/attence/countAttence/wdkList',
            controller: 'wdkListController',
            templateUrl: 'attence/countAttence/wdkList/wdkList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, personNum: null, partCode: null, partName: null}
        })
    }])
    .controller('wdkListController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$stateParams',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取统计页面传来的日期和人数
                if(!localStorage.getItem("ATTENDENCE_FLG")){
                    console.log("3333");
                    $scope.dateTimeShow = $stateParams.dateTimeShow;
                    $scope.personNum = $stateParams.personNum;
                    $scope.partCode = $stateParams.partCode;
                    $scope.partName = $stateParams.partName;
                    console.log("partName==" + $scope.partName + "/personNum==" + $scope.personNum);
                    localStorage.setItem("dateTimeShow",$stateParams.dateTimeShow);
                    localStorage.setItem("personNum",$stateParams.personNum);
                    localStorage.setItem("partCode",$stateParams.partCode);
                    localStorage.setItem("partName",$stateParams.partName);
                }else{
                    $scope.dateTimeShow = localStorage.getItem("dateTimeShow");
                    $scope.personNum = localStorage.getItem("personNum");
                    $scope.partCode = localStorage.getItem("partCode");
                    $scope.partName = localStorage.getItem("partName");
                }

                //获取未打卡人员列表
                wdkPersonList($scope.dateTimeShow, $scope.partCode);
                localStorage.removeItem("ATTENDENCE_FLG");

            });

            function wdkPersonList(mounth, dept) {
                console.log("mounth==" + mounth + "/dept==" + dept);
                var parmas = {
                    QUERY_MONTH: mounth,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=monthStatisticsUnclock', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.wdkList = res.data.tList;
                            console.log("wdkList.length==" + $scope.wdkList.length);
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }

            $scope.towdkDetail = function (obj) {
                localStorage.setItem("ATTENDENCE_FLG","1");
                console.log("dateTimeShow==" + $scope.dateTimeShow + "/obj==" + JSON.stringify(obj));
                $scope.PERSON_ID = obj.PERSON_ID;
                $scope.personName = obj.PERSON_NAME;
                $scope.count = obj.COUNT;
                var item = {
                    PERSON_ID: $scope.PERSON_ID,
                    QUERY_MONTH: $scope.dateTimeShow,
                    personName: $scope.personName,
                    count: $scope.count,
                }
                $state.go('attence/countAttence/wdkDetail', item);
            }
        }
    ])

angular.module('BaiYin.attence.countAttence.ztList', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/ztList', {
            url: '/attence/countAttence/ztList',
            controller: 'ztListController',
            templateUrl: 'attence/countAttence/ztList/ztList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {dateTimeShow: null, personNum: null, partCode: null, partName: null}
        })
    }])
    .controller('ztListController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$stateParams',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $stateParams) {
            $scope.$on('$ionicView.enter', function () {
                if(!localStorage.getItem("ATTENDENCE_FLG")){
                    console.log("3333");
                    $scope.dateTimeShow = $stateParams.dateTimeShow;
                    $scope.personNum = $stateParams.personNum;
                    $scope.partCode = $stateParams.partCode;
                    $scope.partName = $stateParams.partName;
                    console.log("partName==" + $scope.partName + "/personNum==" + $scope.personNum);
                    localStorage.setItem("dateTimeShow",$stateParams.dateTimeShow);
                    localStorage.setItem("personNum",$stateParams.personNum);
                    localStorage.setItem("partCode",$stateParams.partCode);
                    localStorage.setItem("partName",$stateParams.partName);
                }else{
                    $scope.dateTimeShow = localStorage.getItem("dateTimeShow");
                    $scope.personNum = localStorage.getItem("personNum");
                    $scope.partCode = localStorage.getItem("partCode");
                    $scope.partName = localStorage.getItem("partName");
                }
                //获取早退人员列表
                ztPersonList($scope.dateTimeShow, $scope.partCode);
                localStorage.removeItem("ATTENDENCE_FLG");
            });
            function ztPersonList(mounth, dept) {
                console.log("mounth==" + mounth + "/dept==" + dept);
                var parmas = {
                    QUERY_MONTH: mounth,
                    DEPT: dept,
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=AttendStatisticsService&TransName=monthStatisticsEarly', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.ztList = res.data.tList;
                            console.log("ztList.length==" + $scope.ztList.length);
                            console.log("ztList==="+JSON.stringify($scope.ztList));
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }
            $scope.towdDetail = function (obj) {
                localStorage.setItem("ATTENDENCE_FLG","1");
                console.log("dateTimeShow==" + $scope.dateTimeShow + "/obj==" + JSON.stringify(obj));
                $scope.PERSON_ID = obj.PERSON_ID;
                $scope.personName = obj.PERSON_NAME;
                $scope.count = obj.COUNT;
                var item = {
                    PERSON_ID: $scope.PERSON_ID,
                    QUERY_MONTH: $scope.dateTimeShow,
                    personName: $scope.personName,
                    count: $scope.count,
                }
                $state.go('attence/countAttence/wdkDetail', item);
            }
                //$state.go('attence/countAttence/ztDetail');
        }
    ])

angular
    .module('BaiYin.erp.selectUser', [
        'ionic'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('erpSelectUser', {
            url: '/erp/select/user',
            controller: 'erpSelectUserController',
            templateUrl: 'erp/select/user/user.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: { item: null }
        })
    }])
    .controller('erpSelectUserController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', 'ionicDatePicker',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, ionicDatePicker) {
            //进入页面
            $scope.$on('$ionicView.enter', function () {
                console.log("进入人员选择页面");
            });
            //选择下一步联系人
            $scope.selectUser = function(){
                history.go(-2);
            };
        }
    ]);
angular
	.module('BaiYin.OSI.OSIDepartmentEquipment', [
        'ionic',
        'BaiYin.OSI.OSIDepartmentEquipmentPersonnel'
	])
	.config(['$stateProvider', 'ionicDatePickerProvider', function($stateProvider, ionicDatePickerProvider) {
		$stateProvider.state('OSI/OSIDepartmentEquipment', {
			url: '/OSI/OSIDepartmentEquipment',
			controller: 'OSIDepartmentEquipmentController',
			templateUrl: 'OSI/OSIcount/OSIDepartmentEquipment/OSIDepartmentEquipment.tpl.html',
			cache: 'true',
			authorizedRuleType: ['1'],
			params: {item: new Object()}
		});
	}])
	.controller('OSIDepartmentEquipmentController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$ionicActionSheet', 'ionicDatePicker',
		function($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $ionicActionSheet, ionicDatePicker) {
            //上页传过来的数据
            $scope.data = new Object();
            //查询条件的时间集合
            $scope.date = new Object();
            $scope.$on('$ionicView.beforeEnter', function() {
				$scope.date = JSON.parse(JSON.stringify($stateParams.item.date));
				$scope.changeDateTime = function(){
					if($stateParams.item.changeDateTime.apply($scope.date, arguments))
						$scope.reload();
				};
				$scope.data = $stateParams.item.data;
				$scope.reload();
			});
			
			//分页页码
			$scope.pageIndex = 1;
			$scope.hasMore = true;
			//数据
			$scope.list = new Array();
			$scope.reload = function(){
				$scope.pageIndex = 1;
				$scope.list = new Array();
				$scope.getInspectStatisticalData();
			};

			//获取巡查统计数据
            $scope.getInspectStatisticalData = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http
                    .post('ServiceName=InspectionService&TransName=getInspectStatisticalData', {
                        restrict: "equipment",
						pageIndex: $scope.pageIndex++,
						org_code: $scope.data.ORG_CODE,
                        startTime: $scope.date.departmentStart,
                        endTime: $scope.date.departmentEnd
                    })
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        
                        if(res.data.list.length != 10){
                            $scope.hasMore = false;
                        }

                        $scope.list = $scope.list.concat(res.data.list.map(function(v, i){
                            v.percentage = Math.round(v.PLAN_INSPECTED/(v.PLAN_INSPECT == 0 ? 1 : v.PLAN_INSPECT) * 1000) / 10;
                            return v;
                        }));
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            
            //单位设备人员列表视图
            $scope.openDepartmentEquipmentPersonnel = function(data) {
                data.ORG_NAME = $scope.data.ORG_NAME;
                data.ORG_CODE = $scope.data.ORG_CODE;
                $state.go('OSI/OSIDepartmentEquipmentPersonnel', {item: {
                    date: $scope.date,
                    changeDateTime: $stateParams.item.changeDateTime,
                    data: data
                }});
            };
		}
	]);
angular
	.module('BaiYin.OSI.OSIDepartmentEquipmentPersonnel', [
		'ionic',
	])
	.config(['$stateProvider', 'ionicDatePickerProvider', function($stateProvider, ionicDatePickerProvider) {
		$stateProvider.state('OSI/OSIDepartmentEquipmentPersonnel', {
			url: '/OSI/OSIDepartmentEquipmentPersonnel',
			controller: 'OSIDepartmentEquipmentPersonnelController',
			templateUrl: 'OSI/OSIcount/OSIDepartmentEquipmentPersonnel/OSIDepartmentEquipmentPersonnel.tpl.html',
			cache: 'true',
			authorizedRuleType: ['1'],
			params: {item: new Object()}
		});
	}])
	.controller('OSIDepartmentEquipmentPersonnelController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$ionicActionSheet', 'ionicDatePicker',
		function($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $ionicActionSheet, ionicDatePicker) {
            //上页传过来的数据
            $scope.data = new Object();
            //查询条件的时间集合
            $scope.date = new Object();
            $scope.$on('$ionicView.beforeEnter', function() {
				$scope.date = JSON.parse(JSON.stringify($stateParams.item.date));
				$scope.changeDateTime = function(){
					if($stateParams.item.changeDateTime.apply($scope.date, arguments))
						$scope.reload();
				};
				$scope.data = $stateParams.item.data;
				$scope.reload();
			});
			
			//分页页码
			$scope.pageIndex = 1;
			$scope.hasMore = true;
			//数据
			$scope.list = new Array();
			$scope.reload = function(){
				$scope.pageIndex = 1;
				$scope.list = new Array();
				$scope.getInspectStatisticalData();
			};

			//获取巡查统计数据
            $scope.getInspectStatisticalData = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http
                    .post('ServiceName=InspectionService&TransName=getInspectStatisticalData', {
                        restrict: "personnel",
						pageIndex: $scope.pageIndex++,
						org_code: $scope.data.ORG_CODE,
						mch_code: $scope.data.MCH_CODE,
                        startTime: $scope.date.departmentStart,
                        endTime: $scope.date.departmentEnd
                    })
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        
                        if(res.data.list.length != 10){
                            $scope.hasMore = false;
                        }

                        $scope.list = $scope.list.concat(res.data.list.map(function(v, i){
                            v.percentage = Math.round(v.PLAN_INSPECTED/(v.PLAN_INSPECT == 0 ? 1 : v.PLAN_INSPECT) * 1000) / 10;
                            return v;
                        }));
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
			}

            //巡查记录视图
            $scope.openRecord = function(data) {
				data.MCH_CODE = $scope.data.MCH_CODE;
				data.MCH_NAME = $scope.data.MCH_NAME;
				data.date = {
                    startDate: $scope.date.departmentStart,
                    endDate:$scope.date.departmentEnd
                };
                $state.go('OSI/OSIHistory', {item: {autoOperation: "personnel", data: data}});
            };
		}
	]);
angular
	.module('BaiYin.OSI.OSIDepartmentPersonnel', [
		'ionic',
	])
	.config(['$stateProvider', 'ionicDatePickerProvider', function($stateProvider, ionicDatePickerProvider) {
		$stateProvider.state('OSI/OSIDepartmentPersonnel', {
			url: '/OSI/OSIDepartmentPersonnel',
			controller: 'OSIDepartmentPersonnelController',
			templateUrl: 'OSI/OSIcount/OSIDepartmentPersonnel/OSIDepartmentPersonnel.tpl.html',
			cache: 'true',
			authorizedRuleType: ['1'],
			params: {item: new Object()}
		});
	}])
	.controller('OSIDepartmentPersonnelController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$ionicActionSheet', 'ionicDatePicker',
		function($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $ionicActionSheet, ionicDatePicker) {
            //上页传过来的数据
            $scope.data = new Object();
            //查询条件的时间集合
            $scope.date = new Object();
            $scope.$on('$ionicView.beforeEnter', function() {
				$scope.date = JSON.parse(JSON.stringify($stateParams.item.date));
				$scope.changeDateTime = function(){
					if($stateParams.item.changeDateTime.apply($scope.date, arguments))
						$scope.reload();
				};
				$scope.data = $stateParams.item.data;
				$scope.reload();
			});
			
			//分页页码
			$scope.pageIndex = 1;
			$scope.hasMore = true;
			//数据
			$scope.list = new Array();
			$scope.reload = function(){
				$scope.pageIndex = 1;
				$scope.list = new Array();
				$scope.getInspectStatisticalData();
			};

			//获取巡查统计数据
            $scope.getInspectStatisticalData = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http
                    .post('ServiceName=InspectionService&TransName=getInspectStatisticalData', {
                        restrict: "personnel",
						pageIndex: $scope.pageIndex++,
						org_code: $scope.data.ORG_CODE,
                        startTime: $scope.date.departmentStart,
                        endTime: $scope.date.departmentEnd
                    })
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        
                        if(res.data.list.length != 10){
                            $scope.hasMore = false;
                        }

                        $scope.list = $scope.list.concat(res.data.list.map(function(v, i){
                            v.percentage = Math.round(v.PLAN_INSPECTED/(v.PLAN_INSPECT == 0 ? 1 : v.PLAN_INSPECT) * 1000) / 10;
                            return v;
                        }));
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
			}

            //巡查记录视图
            $scope.openRecord = function(data) {
				data.date = {
                    startDate: $scope.date.departmentStart,
                    endDate:$scope.date.departmentEnd
                };
                $state.go('OSI/OSIHistory', {item: {autoOperation: "personnel", data: data}});
            };
		}
	]);
angular
	.module('BaiYin.OSI.OSIPersonnelEquipment', [
		'ionic',
	])
	.config(['$stateProvider', 'ionicDatePickerProvider', function($stateProvider, ionicDatePickerProvider) {
		$stateProvider.state('OSI/OSIPersonnelEquipment', {
			url: '/OSI/OSIPersonnelEquipment',
			controller: 'OSIPersonnelEquipmentController',
			templateUrl: 'OSI/OSIcount/OSIPersonnelEquipment/OSIPersonnelEquipment.tpl.html',
			cache: 'true',
			authorizedRuleType: ['1'],
			params: {item: new Object()}
		});
	}])
	.controller('OSIPersonnelEquipmentController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$ionicActionSheet', 'ionicDatePicker',
		function($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $ionicActionSheet, ionicDatePicker) {
            //上页传过来的数据
            $scope.data = new Object();
            //查询条件的时间集合
            $scope.date = new Object();
            $scope.$on('$ionicView.beforeEnter', function() {
				$scope.date = JSON.parse(JSON.stringify($stateParams.item.date));
				$scope.changeDateTime = function(){
					if($stateParams.item.changeDateTime.apply($scope.date, arguments))
						$scope.reload();
				};
				$scope.data = $stateParams.item.data;
				$scope.reload();
			});
			//分页页码
			$scope.pageIndex = 1;
			$scope.hasMore = true;
			//数据
			$scope.list = new Array();
			$scope.reload = function(){
				$scope.pageIndex = 1;
				$scope.list = new Array();
				$scope.getInspectStatisticalData();
			};

			//获取巡查统计数据
            $scope.getInspectStatisticalData = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http
                    .post('ServiceName=InspectionService&TransName=getInspectStatisticalData', {
                        restrict: "equipment",
						pageIndex: $scope.pageIndex++,
						person_id: $scope.data.PERSON_ID,
                        startTime: $scope.date.personalStart,
                        endTime: $scope.date.personalEnd
                    })
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        
                        if(res.data.list.length != 10){
                            $scope.hasMore = false;
                        }

                        $scope.list = $scope.list.concat(res.data.list.map(function(v, i){
                            v.percentage = Math.round(v.PLAN_INSPECTED/(v.PLAN_INSPECT == 0 ? 1 : v.PLAN_INSPECT) * 1000) / 10;
                            return v;
                        }));
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
			}
			
            //巡查记录视图
            $scope.openRecord = function(data) {
				data.PERSON_ID = $scope.data.PERSON_ID;
				data.PERSON_NAME = $scope.data.PERSON_NAME;
				data.ORG_NAME = $scope.data.ORG_NAME;
				data.date = {
                    startDate: $scope.date.personalStart,
                    endDate:$scope.date.personalEnd
                };
                $state.go('OSI/OSIHistory', {item: {autoOperation: "personnel", data: data}});
			};
		}
	]);
angular.module('BaiYin.pm.defectFill.adddefectFill', [
    'ionic',
    'ngCordova',
    'base64',
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/defectFill/adddefectFill', {
            url: '/pm/defectFill/adddefectFill',
            controller: 'adddefectFillController',
            templateUrl: 'pm/defectFill/adddefectFill/adddefectFill.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('adddefectFillController', ['$scope', '$ionicActionSheet', 'showAlert', '$http', '$state', 'loadingAnimation', '$cordovaBarcodeScanner', 'pageInitService', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', '$cordovaCamera', '$cordovaImagePicker', '$log', '$base64',
        function ($scope, $ionicActionSheet, showAlert, $http, $state, loadingAnimation, $cordovaBarcodeScanner, pageInitService, $ionicScrollDelegate, $ionicSlideBoxDelegate, $cordovaCamera, $cordovaImagePicker, $log, $base64) {
            var mydate = new Date();
            var month = mydate.getMonth() + 1;
            $scope.UserName = token.UserName;
            $scope.DEPT_NAME = token.DeptName;
            $scope.CONTRACT_NAME = token.ContractName;
            $scope.nowDate = mydate.getFullYear() + '-' + month + '-' + mydate.getDate();
            //查询 状态，分类，专业
            $scope.sbzt = [];
            $scope.qxfl = [];
            $scope.qxzy = [];
            $scope.sbztObj = {};
            $scope.qxzyObj = {};
            $scope.bmlist = [];
            $scope.xxlist = [];
            $scope.images_list = [];
            $scope.images_update = [];
            $scope.image = {     //用于绑定提交内容，图片或其他数据
            };
            $scope.$on('$ionicView.afterEnter', function () {
                $ionicScrollDelegate.scrollTop()
                $ionicSlideBoxDelegate.next();
            });
            var sbztValue, qxflValue, qxzyValue;
            $http.get("ServiceName=DefectManageService&TransName=listCustLovConf")
                .then(function (result) {
                    loadingAnimation.hideLoading();
                    $scope.zt = result.data.ztList;
                    $scope.fl = result.data.flList;
                    $scope.zy = result.data.zyList;
                    console.log("zt==" + JSON.stringify($scope.zt));
                    console.log("fl==" + JSON.stringify($scope.fl));
                    console.log("zy==" + JSON.stringify($scope.zy));

                    /*for(z in $scope.zt.length){
                        $scope.sbztObj.text = $scope.zt[z].LOV_VALUE;
                        console.log('ztObj=='+JSON.stringify($scope.sbztObj));
                        $scope.sbzt.push($scope.sbztObj);
                    }*/
                    for (var i = 0; i < $scope.zt.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.zt[i].LOV_VALUE;
                        $scope.sbzt.push(dtext);
                    }
                    for (var i = 0; i < $scope.fl.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.fl[i].LOV_VALUE;
                        $scope.qxfl.push(dtext);
                    }
                    for (var i = 0; i < $scope.fl.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.zy[i].LOV_VALUE;
                        $scope.qxzy.push(dtext);
                    }
                }, function (error) {
                    loadingAnimation.hideLoading();
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                })

            //设备状态
            $scope.toSbzt = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.sbzt,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        sbztValue = $scope.sbzt[index].text;
                        console.log("sbztValue=" + sbztValue);
                        $("#sbztid").val(sbztValue);
                        return true;
                    }
                });
            };
            //缺陷分类
            $scope.toQxfl = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.qxfl,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        qxflValue = $scope.qxfl[index].text;
                        console.log("qxflValue=" + qxflValue);
                        $("#qxflid").val(qxflValue);
                        return true;
                    }
                });
            };
            //缺陷专业
            $scope.toQxzy = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.qxzy,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        qxzyValue = $scope.qxzy[index].text;
                        $("#qxzyid").val(qxzyValue);
                        return true;
                    }
                });
            };
            //右滑设备名称
            $scope.selectSb = function () {
                $(".bg").show();
                $(".sliderightShow").show('slow');
                $(".sliderightShow").css("display", "inline-block");
                $(".sliderightShow").css("width", "95%");
                $(".sliderightShow").css("right", "0");
                $(".sliderightShow").css("top", "-10px");
                $(".sliderightShow").css("position", "absolute");
                $(".sliderightShow").css("z-index", "999999");
            }
            //扫描二维码
            $scope.scanStart = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeData = barcodeData.text;
                        var sbxx = $scope.barcodeData.split(',');
                        //设备编码和设备名称
                        $("#sbcodeid").val(sbxx[0]);
                        $("#sbmcValue").val(sbxx[1]);
                        // showAlert.showMsg('', '', "barcodeData==" + $scope.barcodeData);
                    }, function (error) {
                        console.log("ERROR:" + error);
                    });

            };

            //设备名称和编码查询
            $scope.searchSblist = function () {
                $(".sblist").show();
                refreshMsg();
            }
            $scope.number = 1;
            $scope.hasMore = false;
            $scope.loadMore = function () {
                console.log("hasMore==" + $scope.number);
                $scope.number += 1;
                var parms={
                    MCH_NAME:$("#sbmcid").val(),
                    MCH_CODE:$("#sbbmid").val()
                }
                $http.post('ServiceName=DefectManageService&TransName=listEquipmentFunctionalUiv&PageCnt=10&PageNo=' + $scope.number,parms)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        console.log("res===" + JSON.stringify(res.data))
                        $scope.sbxx1 = res.data.hList;
                        for (var i = 0; i < $scope.sbxx1.length; i++) {
                            $scope.sbxx.push($scope.sbxx1[i]);
                        }
                        if ($scope.sbxx1.length <10) {
                            $scope.hasMore = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete')
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }

            //加载
            function refreshMsg() {
                console.log("hasMore==" + $scope.hasMore);
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                var params = {
                    PageNo: '' + 1,
                    PageCnt: '' + 10,
                    MCH_CODE: $("#sbbmid").val(),
                    MCH_NAME: $("#sbmcid").val()
                };
                $http.post('ServiceName=DefectManageService&TransName=listEquipmentFunctionalUiv', params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.sbxx = res.data.hList;
                        $(".sblist").show();
                        console.log("hListlengtn==" + res.data.hList.length);
                        if (res.data.hList.length >= 10) {
                            $scope.hasMore = true;
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            };
            //获取设备名称
            $scope.toSbmx = function (sbmx) {
                $(".sliderightShow").hide('slow');
                $(".bg").hide('slow');
                $scope.sbxx = [];
                $scope.hasMore = false;
                var sbmxValue = sbmx.MCH_NAME;
                var sbmxCode = sbmx.MCH_CODE;
                console.log("sbmx==" + sbmxValue);
                $("#sbmcValue").val(sbmxValue);
                $("#sbcodeid").val(sbmxCode);
            }
            //执行部门查询
            $http.get("ServiceName=DefectManageService&TransName=listOrgCodeAllowedSiteLov")
                .then(function (result) {
                    $scope.bm = result.data.hList;
                    for (var i = 0; i < $scope.bm.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.bm[i].DESCRIPTION;
                        dtext.code = $scope.bm[i].ORG_CODE;
                        $scope.bmlist.push(dtext);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                })
            //执行部门
            var zxbmValue, zxbmCode;
            $scope.toZxbm = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.bmlist,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        zxbmValue = $scope.bmlist[index].text;
                        zxbmCode = $scope.bmlist[index].code;
                        $("#zxbmid").val(zxbmValue);
                        return true;
                    }
                });
            };
            //现象查询
            $http.get("ServiceName=DefectManageService&TransName=listWorkOrderSymptCode")
                .then(function (result) {
                    $scope.xx = result.data.hList;
                    for (var i = 0; i < $scope.xx.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.xx[i].DESCRIPTION;
                        dtext.code = $scope.xx[i].ERR_SYMPTOM;
                        $scope.xxlist.push(dtext);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                })
            //现象选择
            var xxValue, xxCode;
            $scope.toXianx = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.xxlist,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        xxValue = $scope.xxlist[index].text;
                        xxCode = $scope.xxlist[index].code;
                        $("#xianxid").val(xxValue);
                        return true;
                    }
                });
            };
            //上传图片文件
            $scope.toUploadImg = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        {text: '拍照'},
                        {text: '从手机相册选择'}
                    ],
                    cancelText: '取消',
                    cancel: function () {
                    },
                    buttonClicked: function (index) {
                        console.log(index);
                        if (index == '0') {
                            $scope.camera();

                        } else if (index == '1') {
                            $scope.tokePhoto();
                        }
                        return true;
                    }
                })

            };
            //删除图片
            $scope.img_del = function (key) {    //删除，删除的时候images_list和form里面的图片数据都要删除，避免提交不必要的
                var guidArr = [];
                for (var p in $scope.images_list) {
                    guidArr.push(p);
                }
                $scope.images_list.splice(guidArr[key], 1);
                $scope.images_update.splice(guidArr[key], 1);

            };
            //隐藏搜索设备编码和名称框
            $scope.hideSearch = function () {
                $(".sliderightShow").hide();
                $(".bg").hide();
            }
            $scope.reader = new FileReader();  //创建一个FileReader接口
            //图片转为数据流
            $scope.imgTransform = function () {
                /*if ($scope.images_list.length > 0) {*/
                $scope.images_update[0] = $scope.images_update[0] == undefined ? '' : $scope.images_update[0];
                $scope.images_update[1] = $scope.images_update[1] == undefined ? '' : $scope.images_update[1];
                $scope.images_update[2] = $scope.images_update[2] == undefined ? '' : $scope.images_update[2];
                //}
            };
            //提交验证
            $scope.validateComfirm = function () {
                if($("#ERR_DESCR").val() == ''){
                    showAlert.showMsg('','','请输入缺陷名称');
                    return false;
                }
                if($("#sbztid").val() == ''){
                    showAlert.showMsg('','','请选择设备状态');
                    return false;
                }
                if($("#qxflid").val() == ''){
                    showAlert.showMsg('','','请选择缺陷分类');
                    return false;
                }
                if($("#qxzyid").val() == ''){
                    showAlert.showMsg('','','请选择缺陷专业');
                    return false;
                }
                if($("#sbcodeid").val() == ''){
                    showAlert.showMsg('','','请扫描设备');
                    return false;
                }
                /*if($("#sbmcValue").val() == ''){
                    showAlert.showMsg('','','请选择设备');
                    return false;
                }*/
                if($("#zxbmid").val() == ''){
                    showAlert.showMsg('','','请选择设备部门');
                    return false;
                }
                if($("#xianxid").val() == ''){
                    showAlert.showMsg('','','请选择现象');
                    return false;
                }
                if($("#qxmsid").val() == ''){
                    showAlert.showMsg('','','请输入缺陷描述');
                    return false;
                }
                return true;
            }
            //提交缺陷
            $scope.commitdefectfill = function () {//提交新缺陷
                if ($scope.validateComfirm()) {
                    var fList = $scope.images_list;
                    var fileName = '';
                    if (fList.length > 0) {
                        fileName = "hasFile";
                    }
                    $scope.imgTransform();
                    loadingAnimation.showLoading('数据载入中', 'loding', 0);
                    var params = {
                        ERR_DESCR: $("#ERR_DESCR").val(),//缺陷名称
                        SYSTEM_STATUS: $("#sbztid").val(),//设备状态
                        QX_TYPE: $("#qxflid").val(),//缺陷分类
                        FAULT_DEPARTMENT: $("#qxzyid").val(),//缺陷专业
                        MCH_CODE: $("#sbcodeid").val(),//设备编号
                        ORG_CODE: zxbmCode,//执行部门
                        ERR_SYMPTOM: xxCode,//现象
                        ERR_DESCR_LO: $("#qxmsid").val(),//缺陷描述
                        FILE_NAME: fileName,//图片流文件
                        FILE0: $scope.images_update[0].replace(/=/g, '!fs!'),
                        FILE1: $scope.images_update[1].replace(/=/g, '!fs!'),
                        FILE2: $scope.images_update[2].replace(/=/g, '!fs!'),
                        COUNT: '' + $scope.images_list.length
                    };
                    console.log("params==="+JSON.stringify(params));
                    $http.post('ServiceName=DefectManageService&TransName=funCreateFaultMainFromApp', params)
                        .then(function (res) {
                            showAlert.showMsg('', '', '恭喜您，添加新缺陷成功');
                            //清空input值
                            $("input").val('');
                            $('textarea').val('');
                            $scope.images_list = [];
                            loadingAnimation.hideLoading();
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }
                /*else {
                    showAlert.showMsg('','','请输入缺陷属性字段！');
                }*/
            };
            //将图片URL转换为dataurl
            function convertFileToDataURLviaFileReader(url) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        $scope.images_update.push(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.send();
            }

            //设备准备好以后载入属性
            document.addEventListener("deviceready", function () {
                //拍照
                var options = {
                    quality: 50,
                    // destinationType: Camera.DestinationType.DATA_URL,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    /*targetWidth: 500,
                    targetHeight: 100,*/
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true,
                    correctOrientation: true
                };
                $scope.camera = function () {
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        // console.log("imageData==" + imageData);
                        // $scope.images_list.push("data:image/jpeg;base64," + imageData);
                        $scope.images_list.push(imageData);
                        convertFileToDataURLviaFileReader(imageData);
                        // $scope.images_update.push(imageData);
                    }, function (err) {
                        showAlert.showMsg('', '', '调用摄像头出错');
                    });
                };
                var options2 = {
                    maximumImagesCount: 3, //最大选择图片数量
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: 0,      //设为0或2，调用的就是系统的图库
                    quality: 50,
                    allowEdit: true
                    /*targetWidth: 200,
                    targetHeight: 200*/
                };
                $scope.tokePhoto = function () {
                    $cordovaImagePicker.getPictures(options2).then(function (imageURI) {
                        //showAlert.showMsg('', '', 'imageURI==' + imageURI);
                        try {
                            for (var image in imageURI) {
                                $scope.images_list.push(imageURI[image]);
                                convertFileToDataURLviaFileReader(imageURI[image]);
                                /*$scope.reader.readAsDataURL(imageURI[image]);  //FileReader的方法，把图片转成base64
                                $scope.reader.onload = function (ev) {
                                    $scope.$apply(function () {
                                        $scope.images_list.push(ev.target.result);   //接收base64
                                    });
                                };*/
                            }
                        } catch (e) {
                            showAlert.showMsg('', '', 'imageURI==' + e);
                        }
                    }, function (err) {
                        showAlert.showMsg('', '', '调用相册图片出错');
                    });
                }
            }, false);
        }
    ]);

angular.module('BaiYin.pm.defectFill.defectFill', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/defectFill/defectFill', {
            url: '/pm/defectFill/defectFill',
            controller: 'defectFillController',
            templateUrl: 'pm/defectFill/defectFill/defectFill.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('defectFillController', ['$scope', 'showAlert', '$http', '$state', 'loadingAnimation', 'pageInitService', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', '$ionicActionSheet',
        function ($scope, showAlert, $http, $state, loadingAnimation, pageInitService, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicActionSheet) {
            //通知域选择滚动框的宽度
            $scope.yuWidth = {width: '' + screen.width - 130 + 'px'};
            var dianchanglist = [];
            var yunum;
            $scope.statusValue = '';
            $scope.yuValue = '';
            $scope.$on('$ionicView.afterEnter', function () {
                $ionicScrollDelegate.scrollTop()
                $ionicSlideBoxDelegate.next();
            });
            $scope.statusColor = function (status) {
                var c = "";
                if ('A类缺陷' == status) {
                    c = '#3492e9';
                }
                if ('B类缺陷' == status) {
                    c = '#33cd5f';
                }
                if ('C类缺陷' == status) {
                    c = '#ff0000';
                }
                return {"background": c};
            };
            //查找域列表
            $http.post('ServiceName=TargetService&TransName=listCompanySiteAddress&type=sel')
                .then(function (res) {
                    if (res.code == '0') {
                        $scope.yuList = res.data;
                        dianchanglist.push({text: '全部', CONTRACT: ''});
                        for (var i = 0; i < $scope.yuList.length; i++) {
                            var dlist = {};
                            dlist.text = $scope.yuList[i].DESCRIPTION;
                            dlist.CONTRACT = $scope.yuList[i].CONTRACT;
                            dianchanglist.push(dlist);
                        }
                    } else {
                        showAlert.showMsg(res.msg);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });
            //域选择
            $scope.toSelectYu = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: dianchanglist,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitYu = dianchanglist[index].text;
                        yunum = dianchanglist[index].CONTRACT;
                        $("#defectYuId").val(commitYu);
                        return true;
                    }
                });
            };
            var buttons = [
                {text: '全部'},
                {text: '新建'},
                {text: '接收'},
                {text: '确认'},
                {text: '取消'},
                {text: '取消中'},
                {text: '已遗留'},
                {text: '工作完成'},
                {text: '生成工作票'},
                {text: '缺陷已消除'}
            ];
            //状态选择
            $scope.toSelectStatus = function () {
                var hideSheet = $ionicActionSheet.show({
                        buttons: buttons,
                        cancel: function () {
                            // add cancel code..
                        }
                        ,
                        buttonClicked: function (index) {
                            console.log("index==" + index);
                            $scope.statusValue = buttons[index].text;
                            $("#statusid").val($scope.statusValue);
                            return true;
                        }
                    })
                ;
            };
            $scope.onDragDown = function () {
                //清空
                //$("input").val('');
                $(".troubleTop").show('slow');
            }
            //点击添加隐患排查
            $scope.addTrouble = function () {
                $state.go('pm/defectFill/adddefectFill');
            }
            //点击跳转到详情页面
            $scope.toDetail = function (item) {
                console.log(item);
                $state.go('pm/defectFill/defectFillDetail', {item: item});
            }
            $scope.hasMore = false;
            $scope.number = 1;
            $scope.loadMore = function () {
                if ($scope.statusValue == '全部') {
                    $scope.statusValue='';
                }
                if(yunum == undefined){
                    yunum='';
                }
                console.log("状态==="+$scope.statusValue+"/域=="+yunum);
                $scope.number += 1;
                var params = {
                    STATE: $scope.statusValue,
                    CONTRACT: yunum
                }
                $http.post('ServiceName=DefectManageService&TransName=listFaultRepMain&PageCnt=10&PageNo=' + $scope.number, params)
                    .then(function (result) {
                        loadingAnimation.hideLoading();
                        console.log(result)
                        $scope.defectArr1 = result.data.hList;
                        for (var i = 0; i < $scope.defectArr1.length; i++) {
                            $scope.defectArr.push($scope.defectArr1[i]);
                        }
                        if ($scope.defectArr.length < 10) {
                            $scope.hasMore = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            $scope.searchDefect = function () {
                //清空查询列表
                $scope.defectArr = [];
                if ($scope.statusValue == '全部') {
                    $scope.statusValue='';
                }
                if(yunum == undefined){
                    yunum='';
                }
                //如果状态是全部，则为空
                console.log("状态==="+$scope.statusValue+"/域=="+yunum);
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $scope.hasMore = false;
                var params = {
                    STATE: $scope.statusValue,
                    CONTRACT: yunum
                }
                $http.post("ServiceName=DefectManageService&TransName=listFaultRepMain&PageNo=1&PageCnt=10", params)
                    .then(function (result) {
                        loadingAnimation.hideLoading();
                        $scope.defectArr = result.data.hList;
                        $scope.listShow = true;
                        $(".troubleTop").hide('slow');
                        if (result.data.hList.length >= 10) {
                            $scope.hasMore = true;
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    })
            }
        }
    ])

angular.module('BaiYin.pm.defectFill.defectFillDetail', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/defectFill/defectFillDetail', {
            url: '/pm/defectFill/defectFillDetail',
            controller: 'defectFillDetailController',
            templateUrl: 'pm/defectFill/defectFillDetail/defectFillDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item:null}
        })
    }])

    .controller('defectFillDetailController', ['$scope', 'showAlert', '$http', '$state','loadingAnimation','$stateParams',
        function ($scope, showAlert, $http, $state,loadingAnimation,$stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取列表页对象
                $scope.defectDetail = $stateParams.item;
                queryDoc();
            });

            //查询附件列表
            function queryDoc(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.get('ServiceName=DefectManageService&TransName=listEdmFile&FAULT_REP_ID='
                    + $scope.defectDetail.FAULT_REP_ID)
                    .then(function (res) {
                        console.log("list==="+JSON.stringify(res.data.fList));
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {//如果存在附件则显示
                            $scope.isShow=true;
                            $scope.docList=res.data.fList;

                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])
angular.module('BaiYin.pm.journal.journalDetail', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/journal/journalDetail', {
            url: '/pm/journal/journalDetail',
            controller: 'journalDetailController',
            templateUrl: 'pm/journal/journalDetail/journalDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item:null}
        })
    }])

    .controller('journalDetailController', ['$scope','loadingAnimation','showAlert', 'showAlert', '$http', '$state','$ionicTabsDelegate','$stateParams',
        function ($scope,loadingAnimation,showAlert, $showAlert, $http, $state,$ionicTabsDelegate,$stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取列表页对象
                console.log("item=="+JSON.stringify($stateParams.item));
                $scope.obj = $stateParams.item;
                //默认第一个选项卡
                $ionicTabsDelegate.select(0);
                $scope.listcenterOperRecordLine();
            });

            //运行日志
            $scope.toYxrzData = function () {
                $ionicTabsDelegate.select(0);
                $scope.listcenterOperRecordLine();
            }
            //运行方式
            $scope.toYxfsData = function () {
                $ionicTabsDelegate.select(1);
                $scope.listcenterOperMode();
            }
            //交接班
            $scope.toJjbData = function () {
                $ionicTabsDelegate.select(2);
                $scope.listcenterOperRecord();
            }
            //接地线
            $scope.toJdxData = function () {
                $ionicTabsDelegate.select(3);
                $scope.listcenterGroupWire();
            }
            //运行日志详情
            $scope.listcenterOperRecordLine = function() {
                $http.get("ServiceName=JournalService&TransName=listOperRecordLine&EVENT_NO=" + $scope.obj.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.list1 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //运行方式
            $scope.listcenterOperMode = function() {
                $http.get("ServiceName=JournalService&TransName=listopeMode&EVENT_NO=" + $scope.obj.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.list2 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //交接班
            $scope.listcenterOperRecord = function() {
                $http.get("ServiceName=JournalService&TransName=listteamChange&EVENT_NO=" + $scope.obj.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.list3 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //接地线
            $scope.listcenterGroupWire = function() {
                $http.get("ServiceName=JournalService&TransName=listgroupWire&EVENT_NO=" + $scope.obj.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.list4 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
                //生产运行日志详情
            $scope.listOper = function(EVENT_NO){
                $http.get("ServiceName=JournalService&TransName=listopeMode&EVENT_NO="+EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0'){
                            $scope.listoper = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    },function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])
angular.module('BaiYin.pm.journal.journalDetailList', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/journal/journalDetailList', {
            url: '/pm/journal/journalDetailList',
            controller: 'journalDetailListController',
            templateUrl: 'pm/journal/journalDetailList/journalDetailList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])

    .controller('journalDetailListController', ['$scope', 'loadingAnimation', 'showAlert', 'showAlert', '$http', '$state', '$ionicTabsDelegate', '$stateParams',
        function ($scope, loadingAnimation, showAlert, $showAlert, $http, $state, $ionicTabsDelegate, $stateParams) {
            $scope.$on('$ionicView.afterEnter', function () {
                console.log("objCenteritem==" + $stateParams.item);
                //获取列表页对象
                $scope.objCenter = $stateParams.item;
                //默认第一个选项卡
                $ionicTabsDelegate.select(0);
                $scope.listcenterOperRecordLine();
            });

            //运行日志
            $scope.toYxrzData = function () {
                $ionicTabsDelegate.select(0);
                $scope.listcenterOperRecordLine();
            }
            //运行方式
            $scope.toYxfsData = function (x) {
                $ionicTabsDelegate.select(1);
                $scope.listcenterOperMode();
            }
            //交接班
            $scope.toJjbData = function () {
                $ionicTabsDelegate.select(2);
                $scope.listcenterOperRecord();
            }
            //接地线
            $scope.toJdxData = function () {
                $ionicTabsDelegate.select(3);
                $scope.listcenterGroupWire();
            }
            //集控中心运行日志详情
            $scope.myDiv = false;
            $scope.listcenterOperRecordLine = function () {
                $http.get("ServiceName=JournalService&TransName=listcenterOperRecordLine&EVENT_NO=" + $scope.objCenter.EVENT_NO)
                    .then(function (result) {
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listcenter1 = result.data.rList;
                            if ($scope.listcenter1 == '' || $scope.listcenter1 == undefined) {
                                $scope.myDiv = true;
                            }
                            console.log("listcenter1==" + JSON.stringify(result.data.rList));
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //集控中心运行方式
            $scope.listcenterOperMode = function () {
                $http.get("ServiceName=JournalService&TransName=listcenterOperMode&EVENT_NO=" + $scope.objCenter.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listcenter2 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //集控中心交接班
            $scope.listcenterOperRecord = function () {
                $http.get("ServiceName=JournalService&TransName=listcenterOperRecord&EVENT_NO=" + $scope.objCenter.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listcenter3 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //集控中心接地线
            $scope.listcenterGroupWire = function () {
                $http.get("ServiceName=JournalService&TransName=listcenterGroupWire&EVENT_NO=" + $scope.objCenter.EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listcenter4 = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //生产运行日志详情
            $scope.listOper = function (EVENT_NO) {
                $http.get("ServiceName=JournalService&TransName=listopeMode&EVENT_NO=" + EVENT_NO)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        if (result.code == '0') {
                            $scope.listoper = result.data.rList;
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])
angular.module('BaiYin.pm.journal.journalList', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/journal/journalList', {
            url: '/pm/journal/journalList',
            controller: 'journalListController',
            templateUrl: 'pm/journal/journalList/journalList.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })

    }])
    .controller('journalListController', ['$scope', 'loadingAnimation', 'showAlert', '$http', '$state', '$ionicActionSheet',
        function ($scope, loadingAnimation, showAlert, $http, $state, $ionicActionSheet) {

            $scope.$on('$ionicView.afterEnter', function () {
                // $(".journalList ul").hide()
                $scope.flag2 = false;
                $scope.flag = false;
                var status = false;

            });
            $scope.getBackground = function (status) {
                var c = "";
                if (status) {
                    c = '#f4f4f4';
                } else {
                    c = '#f4f4f4';
                }
                return {"background": c};
            };
            //日期选择
            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#select_date_please', //标签id
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                'minDate': (new Date().getFullYear() - 10) + '-' + 1 + '-' + 1, //最小日期
                'maxDate': (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()) //最大日期
            });
            $scope.dateChangeEvent = function(){
                $scope.RECORD_DATE = $('#select_date_please').val();
                console.log("到这里来了不空$scope.RECORD_DATE===" + $scope.RECORD_DATE);
                $scope.listCenter($scope.WORK_SEQ, $scope.RECORD_DATE);
            }
            $scope.RECORD_DATE = '';
            $scope.WORK_SEQ = '';
            //input框显示位置
            $("input").width($(window).width() - 120);
            $scope.toDetailListCenter = function (item) {
                $state.go('pm/journal/journalDetailList', {item: item})
            }
            $scope.toDetailList = function (item) {
                $state.go('pm/journal/journalDetail', {item: item})
            }
            //选择班次
            $scope.arr = [
                {text: '全部'},
                {text: '白班'},
                {text: '中班'},
                {text: '夜班'}];
            $scope.toSelectClass = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.arr,
                    //destructiveText: 'Delete',
                    /*titleText: '选择班次',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        $('#selectclass').val($scope.arr[index].text);
                        //取班次的值
                        $scope.WORK_SEQ = $scope.arr[index].text;
                        if ($scope.WORK_SEQ == '全部') {
                            $scope.WORK_SEQ = '';
                        }
                        $scope.listCenter($scope.WORK_SEQ, $scope.RECORD_DATE);
                        return true;
                    }
                });
            };
            $scope.listCenter = function (WORK_SEQ, RECORD_DATE) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                //集控中心运行日志概览
                var params = {
                    WORK_SEQ: WORK_SEQ,
                    RECORD_DATE: RECORD_DATE
                };

                $http.post("ServiceName=JournalService&TransName=listCenterOperRecorde", params)
                    .then(function (result) {
                        $scope.listOper(WORK_SEQ, RECORD_DATE);
                        console.log(result);
                        loadingAnimation.hideLoading();
                        $scope.flag2 = false;
                        if (result.data.code == '0') {
                            $scope.journal2 = result.data.rList;
                            console.log("journal2===" + JSON.stringify($scope.journal2));
                            $scope.listcenter_EVENT_NO = $scope.journal2;
                            if($scope.journal2.length == 0){
                                showAlert.showMsg('','','没有查询到集控中心运行日志数据...');
                            }
                        } else if (result.data.coce == '1' || result.data.rList.length == 0) {
                            $scope.flag2 = true;//不显示
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            $scope.listOper = function (WORK_SEQ, RECORD_DATE) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                //生产运行日志概览
                var params = {
                    WORK_SEQ: WORK_SEQ,
                    RECORD_DATE: RECORD_DATE
                };
                $http.post("ServiceName=JournalService&TransName=listOperRecorde",params)
                    .then(function (result) {
                        console.log(result);
                        loadingAnimation.hideLoading();
                        $scope.flag = false;
                        if (result.data.code == '0') {
                            $scope.journal = result.data.rList;
                            $scope.listoper_EVENT_NO = $scope.journal;
                            if($scope.journal.length == 0){
                                showAlert.showMsg('','','没有查询到生产运行日志数据...');
                            }
                        } else if (result.data.coce == '1' || result, data.rList.length == 0) {
                            $scope.flag = true;//不显示
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

        }
    ])

angular.module('BaiYin.pm.trouble.addTrouble', [
    'ionic',
    'ngCordova',
    'ngCordova.plugins.camera'
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/trouble/addTrouble', {
            url: '/pm/trouble/addTrouble',
            controller: 'addTroubleController',
            templateUrl: 'pm/trouble/addTrouble/addTrouble.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('addTroubleController', ['$scope', 'showAlert', '$http', '$state', 'loadingAnimation', '$ionicActionSheet', '$cordovaCamera', '$cordovaImagePicker', '$log', '$window',
        function ($scope, showAlert, $http, $state, loadingAnimation, $ionicActionSheet, $cordovaCamera, $cordovaImagePicker, $log, $window) {
            var mydate = new Date();
            var month = mydate.getMonth() + 1;
            $scope.UserName = token.UserName;
            $scope.DEPT_NAME = token.DeptName;
            $scope.CONTRACT_NAME = token.ContractName;
            $scope.nowDate = mydate.getFullYear() + '-' + month + '-' + mydate.getDate();
            $scope.images_list = [];
            $scope.images_update = [];
            $scope.image = {     //用于绑定提交内容，图片或其他数据
            };
            $scope.$on('$ionicView.afterEnter', function () {
                //$scope.imageSrc='../../../../../images/addCarema.png';
            });
            var commitImg = 0;
            var yhdjList = [];
            // var commitYhdj = '';
            var yhdjnum;
            //查询隐患等级
            $http.post('ServiceName=HiddenDangerService&TransName=listSehHiddenDangerLevel')
                .then(function (res) {
                    if (res.code == '0') {
                        $scope.yhdjList = res.data.hList;
                        for (var i = 0; i < $scope.yhdjList.length; i++) {
                            var ylist = {};
                            ylist.text = $scope.yhdjList[i].DESCRIPTION;
                            ylist.HIDDEN_DANGER_LEVEL = $scope.yhdjList[i].HIDDEN_DANGER_LEVEL;
                            yhdjList.push(ylist);
                        }

                    } else {
                        showAlert.showMsg(res.msg);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });
            //获取隐患等级
            $scope.toTroubleStyle = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: yhdjList,
                    //destructiveText: 'Delete',
                    /*titleText: '隐患等级',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        // commitYhdj = yhdjList[index].text;
                        yhdjnum = yhdjList[index].HIDDEN_DANGER_LEVEL;
                        $scope.dangerLevel = yhdjList[index].text;
                        //$("#dengjiid").val(commitYhdj);
                        return true;
                    }
                });
            };
            $scope.imgwidth = function () {
                return {'margin-bottom': '10px'};
            }


            //上传图片文件
            $scope.toUploadImg = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: [
                        {text: '拍照'},
                        {text: '从手机相册选择'}
                    ],
                    cancelText: '取消',
                    cancel: function () {
                    },
                    buttonClicked: function (index) {
                        console.log(index);
                        if (index == '0') {
                            $scope.camera();
                        } else if (index == '1') {
                            $scope.tokePhoto();
                        }
                        return true;
                    }
                })
            };
            //删除图片
            $scope.img_del = function (key) {    //删除，删除的时候images_list和form里面的图片数据都要删除，避免提交不必要的
                var guidArr = [];
                for (var p in $scope.images_list) {
                    guidArr.push(p);
                }
                $scope.images_list.splice(guidArr[key], 1);
                $scope.images_update.splice(guidArr[key], 1);

            };
            $scope.reader = new FileReader();  //创建一个FileReader接口
            //图片转为数据流
            $scope.imgTransform = function () {
                // if ($scope.images_list.length > 0) {
                $scope.images_update[0] = $scope.images_update[0] == undefined ? '' : $scope.images_update[0];
                $scope.images_update[1] = $scope.images_update[1] == undefined ? '' : $scope.images_update[1];
                $scope.images_update[2] = $scope.images_update[2] == undefined ? '' : $scope.images_update[2];
                // }
                //
                // var data = new FormData();   //以下为像后台提交图片数据
                // data.append('image', files);
            };
            /*function getBase64Image(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
                var dataURL = canvas.toDataURL("image/"+ext);
                return dataURL;
            }*/
            //提交隐患
            $scope.commitTrouble = function () {//提交新隐患
                var fList = $scope.images_list;
                var fileName = '';
                if (fList.length > 0) {
                    fileName = "hasFile";
                }
                //提交验证
                if ($("#DANGER_CONTENT").val() == '') {
                    showAlert.showMsg('', '', '请输入隐患内容再提交')
                } else {
                    $scope.imgTransform();
                    loadingAnimation.showLoading('数据载入中', 'loding', 0);
                    var params = {
                        DANGER_CONTENT: $("#DANGER_CONTENT").val(),
                        DANGER_LEVEL: yhdjnum,
                        FILE_NAME: fileName,
                        FILE0: $scope.images_update[0].replace(/=/g, '!fs!'),
                        FILE1: $scope.images_update[1].replace(/=/g, '!fs!'),
                        FILE2: $scope.images_update[2].replace(/=/g, '!fs!'),
                        COUNT: '' + $scope.images_list.length
                    };
                    /*console.log(params);*/
                    $http.post('ServiceName=HiddenDangerService&TransName=funCreateSehHiddenDanger', params)
                        .then(function (res) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg('', '', '恭喜您，新的隐患添加成功！');
                            //刷新页面
                            clearThisPage();
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }

            };

            /**
             * 清空当前页面
             */
            function clearThisPage() {
                $scope.images_list = [];
                $scope.dangerLevel = '';
                $("#DANGER_CONTENT").val('');
            }

            //将图片URL转换为dataurl
            function convertFileToDataURLviaFileReader(url) {
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = function () {
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        $scope.images_update.push(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.send();
            }

            //设备准备好以后载入属性
            document.addEventListener("deviceready", function () {
                //拍照
                var options = {
                    quality: 50,
                    // destinationType: Camera.DestinationType.DATA_URL,
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    /*targetWidth: 500,
                    targetHeight: 100,*/
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true,
                    correctOrientation: true
                };
                $scope.camera = function () {
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        // console.log("imageData==" + imageData);
                        // $scope.images_list.push("data:image/jpeg;base64," + imageData);
                        $scope.images_list.push(imageData);
                        convertFileToDataURLviaFileReader(imageData);
                        // $scope.images_update.push(imageData);
                    }, function (err) {
                        showAlert.showMsg('', '', '调用摄像头出错');
                    });
                };

                var options2 = {
                    maximumImagesCount: 3, //最大选择图片数量
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: 0,      //设为0或2，调用的就是系统的图库
                    quality: 50,
                    allowEdit: true
                    /*targetWidth: 200,
                    targetHeight: 200*/
                };
                $scope.tokePhoto = function () {
                    $cordovaImagePicker.getPictures(options2).then(function (imageURI) {
                        //showAlert.showMsg('', '', 'imageURI==' + imageURI);
                        try {
                            for (var image in imageURI) {
                                $scope.images_list.push(imageURI[image]);
                                convertFileToDataURLviaFileReader(imageURI[image]);
                                /*$scope.reader.readAsDataURL(imageURI[image]);  //FileReader的方法，把图片转成base64
                                $scope.reader.onload = function (ev) {
                                    $scope.$apply(function () {
                                        $scope.images_list.push(ev.target.result);   //接收base64
                                    });
                                };*/
                            }
                        } catch (e) {
                            showAlert.showMsg('', '', 'imageURI==' + e);
                        }
                    }, function (err) {
                        showAlert.showMsg('', '', '调用相册图片出错');
                    });
                }
            }, false);
        }

    ]);

angular.module('BaiYin.pm.trouble.hideTrouble', [
    'ionic',
    'ngAnimate',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/trouble/hideTrouble', {
            url: '/pm/trouble/hideTrouble',
            controller: 'hideTroubleController',
            templateUrl: 'pm/trouble/hideTrouble/hideTrouble.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('hideTroubleController', ['$scope', 'showAlert', '$http', '$state', 'loadingAnimation', '$ionicActionSheet',
        function ($scope, showAlert, $http, $state, loadingAnimation, $ionicActionSheet) {
            //$scope.myTrouble = true;

            $scope.$on('$ionicView.afterEnter', function () {
                // showAlert.showMsg("隐患排查页面");
                // var kycz=localStorage.getItem("trouble_detail_back")||'';
                if (!localStorage.getItem("trouble_detail_back")) {
                    $(".searchTrouble").show('slow');
                    $scope.troubleList = [];
                }
                localStorage.removeItem("trouble_detail_back");
            });


            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#start_date', //标签id
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                'minDate': (new Date().getFullYear() - 10) + '-' + 1 + '-' + 1, //最小日期
                'maxDate': (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()) //最大日期
            });
            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#end_date', //标签id
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                'minDate': (new Date().getFullYear() - 10) + '-' + 1 + '-' + 1, //最小日期
                'maxDate': (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()) //最大日期
            });
            $scope.onDragDown = function () {
                //$scope.myTrouble = false;
                //清空
                emptyInput();
                $(".searchTrouble").show('slow');
            }
            $scope.setColor = function (status) {
                var c = "";
                if ('一般隐患' == status) {
                    c = '#3492e9';
                } else {
                    c = '#ff0000';
                }
                return {"color": c};
            };
            $scope.setbgColor = function (status) {
                var c = "";
                if ('一般隐患' == status) {
                    c = '#3492e9';
                } else {
                    c = '#ff0000';
                }
                return {"background": c};
            };
            var dianchanglist = [];
            var stustList = [{"text": "全部"}, {"text": "开始整改"}, {"text": "确认"}, {"text": "审批中"}, {"text": "完成"}, {"text": "新建"}, {"text": "准备整改"}];
            var yhdjList = [];
            var commitYu = '';
            var commitStuts = '';
            var commitYhdj = '';
            var yunum, yhdjnum;

            //获取电厂列表
            $http.post('ServiceName=TargetService&TransName=listCompanySiteAddress&type=sel')
                .then(function (res) {
                    if (res.code == '0') {
                        $scope.powerPlantList = res.data;
                        dianchanglist.push({text: '全部', CONTRACT: ''});
                        //console.log("powerPlantList==" + JSON.stringify(res.data));
                        for (var i = 0; i < $scope.powerPlantList.length; i++) {
                            var dlist = {};
                            dlist.text = $scope.powerPlantList[i].DESCRIPTION;
                            dlist.CONTRACT = $scope.powerPlantList[i].CONTRACT;
                            dianchanglist.push(dlist);
                        }
                    } else {
                        showAlert.showMsg(res.msg);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });

            //域选择
            $scope.toSelectYu = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: dianchanglist,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitYu = dianchanglist[index].text;
                        yunum = dianchanglist[index].CONTRACT;
                        console.log("yunum==" + yunum);
                        $("#yuid").val(commitYu);
                        return true;
                    }
                });
            };
            //状态选择
            $scope.toSelectStuts = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: stustList,
                    //destructiveText: 'Delete',
                    /*titleText: '状态',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitStuts = stustList[index].text;
                        //console.log("stuts==" + yhdjnum);
                        $("#stutsid").val(commitStuts);
                        return true;
                    }
                });
            };

            //获取隐患等级
            $http.post('ServiceName=HiddenDangerService&TransName=listSehHiddenDangerLevel')
                .then(function (res) {
                    if (res.code == '0') {
                        $scope.yhdjList = res.data.hList;
                        yhdjList.push({text: '全部', HIDDEN_DANGER_LEVEL: ''});
                        for (var i = 0; i < $scope.yhdjList.length; i++) {
                            var ylist = {};
                            ylist.text = $scope.yhdjList[i].DESCRIPTION;
                            ylist.HIDDEN_DANGER_LEVEL = $scope.yhdjList[i].HIDDEN_DANGER_LEVEL;
                            yhdjList.push(ylist);
                        }

                    } else {
                        showAlert.showMsg(res.msg);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });

            //隐患等级
            $scope.toSelectYhdj = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: yhdjList,
                    //destructiveText: 'Delete',
                    /*titleText: '隐患等级',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitYhdj = yhdjList[index].text;
                        yhdjnum = yhdjList[index].HIDDEN_DANGER_LEVEL;
                        //console.log("yhdjnum===" + yhdjnum);
                        $("#yhdjid").val(commitYhdj);
                        return true;
                    }
                });
            };
            $scope.toCommit = function () {
                $scope.hasMore = false;
                if (validateComfirm()) {
                    troubleList();
                    $(".searchTrouble").hide('slow');
                    $(".troubleList").show('slow');
                } /*else {
                    showAlert.showMsg('', '', '请至少输入一个查询条件');
                }*/
            }
            //验证必须有个条件选择
            function validateComfirm() {
                if ($("#yuid").val() == '' && $("#stutsid").val() == '' && $("#start_date").val() == ''
                    && $("#end_date").val() == '' && $("#yhdjid").val() == '') {
                    showAlert.showMsg('', '', '请至少输入一个查询条件');
                    return false;
                }
                if($("#end_date").val() < $("#start_date").val()){
                    showAlert.showMsg('','','结束日期不能小于起始日期，请重新选择');
                    return false;
                }
                return true;
            }

            $scope.hasMore = false;
            $scope.number = 1;
            $scope.loadMore = function () {
                console.log("loadMore===");
                $scope.number += 1;
                var params = {
                    STATE: commitStuts,
                    DANGER_LEVEL: yhdjnum,
                    START_DATE: $("#start_date").val(),
                    END_DATE: $("#end_date").val(),
                    CONTRACT: yunum
                };
                $http.post('ServiceName=HiddenDangerService&TransName=listSehHiddenDanger&PageNo=' + $scope.number + "&PageCnt=10",params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        console.log(res)
                        $scope.troubleList1 = res.data.hList;
                        for (var i = 0; i < $scope.troubleList1.length; i++) {
                            $scope.troubleList.push($scope.troubleList1[i]);
                        }
                        if ($scope.troubleList1.length <10) {
                            $scope.hasMore = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            //查询隐患排查列表开始
            function troubleList() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                if (yunum == undefined) {
                    yunum = '';
                }
                if (yhdjnum == undefined) {
                    yhdjnum = '';
                }
                if (commitStuts == '全部') {
                    commitStuts = '';
                }
                $scope.hasMore = false;
                var params = {
                    STATE: commitStuts,
                    DANGER_LEVEL: yhdjnum,
                    START_DATE: $("#start_date").val(),
                    END_DATE: $("#end_date").val(),
                    CONTRACT: yunum
                };
                $http.post('ServiceName=HiddenDangerService&TransName=listSehHiddenDanger&PageNo=1&PageCnt=10',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.troubleList = res.data.hList;
                            if ($scope.troubleList.length >= 10) {
                                $scope.hasMore = true;
                            }
                        } else {
                            $scope.troubleList = [];
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            function emptyInput() {
                $("input").val('');
            }

            //点击添加隐患排查
            $scope.addTrouble = function () {
                $state.go('pm/trouble/addTrouble');
            }
            //点击跳转到详情页面
            $scope.toDetail = function (item) {
                localStorage.setItem("trouble_detail_back", "1");
                $state.go('pm/trouble/troubleDetail', {item: item});
            }
            /*$scope.goNewsDatil = function (item, gsxw, msg) {
                localStorage.setItem("newsId", ID);
                item.whichNew = ID;
                $state.go('companyNewsDetails', {'item': item, 'msg': $scope.gsxw})
            };*/
            //搜索框的宽度
            $scope.input_width = {width: '' + screen.width - 190 + 'px'};


        }

    ])

angular.module('BaiYin.pm.trouble.troubleDetail', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/trouble/troubleDetail', {
            url: '/pm/trouble/troubleDetail',
            controller: 'troubleDetailController',
            templateUrl: 'pm/trouble/troubleDetail/troubleDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item:null}
        })
    }])

    .controller('troubleDetailController', ['$scope', 'showAlert', '$http', '$state','$stateParams','loadingAnimation',

        function ($scope, showAlert, $http, $state,$stateParams,loadingAnimation) {
            $scope.$on('$ionicView.afterEnter', function () {
                //获取列表页对象
                $scope.title = $stateParams.item;
                //查询附件列表
                queryDoc();
            });
            $scope.setColor = function (status) {
                var c = "";
                if ('一般隐患' == status) {
                    c = '#3492e9';
                } else {
                    c = '#ff0000';
                }
                return {"color": c};
            };
            //查询附件列表
            function queryDoc(){
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.get('ServiceName=HiddenDangerService&TransName=listEdmFile&HIDDEN_DANGER_NO='
                    + $scope.title.HIDDEN_DANGER_NO+'&CONTRACT='+$scope.title.CONTRACT)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {//如果存在附件则显示
                            $scope.isShow=true;
                            $scope.docList=res.data.fList;
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])
angular.module('BaiYin.Tracking', [])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('Tracking', {
        url: '/Tracking',
        controller: 'TrackingController',
        templateUrl: 'Problems/ProblemSolving/Tracking/Tracking.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('TrackingController', ['$scope', 'showAlert', 'pageInitService', '$http', '$state',
    function($scope, showAlert, pageInitService, $http, $state) {
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
            'ServiceName=ApproveService&TransName=getUnApprvedList'
            ];

            pageInitService.pageInit(apis).then(function(result) {
             $scope.listsMsg = result[0]
             agentListMsg($scope.listsMsg)
            
            $scope.agentsItem = function(item) {
                $state.go('agentsView')
                var ItemCont =JSON.stringify(item)
                sessionStorage.setItem("agentsVD", ItemCont); 
            }
        }, function(error) {
             showAlert.showMsg(error,'','网络异常','确认')
        });
            $scope.loadNumber=1;
            $scope.loadMore=function(){
             $scope.loadNumber+=1;
             $http.get( 'ServiceName=ApproveService&TransName=getUnApprvedList&PageNo=' + $scope.loadNumber)
             .then(function(res){
                 if(res.data.length>0){
                   for(var i=0;i<res.data.length;i++){
                    res.data[i].CREATED_DATE=new Date(res.data[i].CREATED_DATE.replace(/-/g,"/"));
                    $scope.items.push(res.data[i])  
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }else if(res.data.length<=0||res.data==null||res.data==undefined){
             $scope.hasMore=false;
             $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     }
     ,function(error){
       showAlert.showMsg(error,'','网络异常','确认')
         $scope.hasMore=false;
     })
         };
    });
        $scope.historySearch=function(){
             $state.go('historyList')
        }
        function agentListMsg(res){
         var str = [];
         var arr = {};
         for (var i = 0; i < res.data.length; i++) {
            arr = res.data[i]
            arr.CREATED_DATE = new Date(arr.CREATED_DATE.replace(/-/g,"/"))
            str.push(arr)
        }
        $scope.items = str;
         if($scope.items.length>=10&&$scope.items!=undefined&&$scope.items!=null){
                $scope.hasMore=true;
            }
    };
    $scope.doRefresh = function() {
        $http.get('ServiceName=ApproveService&TransName=getUnApprvedList')
        .then(function(res) {
            agentListMsg(res)
            $scope.$broadcast('scroll.refreshComplete');
            if(res.data.length==10){
               $scope.loadNumber=1;
               $scope.hasMore=true;
           }else{
            $scope.hasMore=false;
        }
    }, function(error) {
        $scope.hasMore=false;
        showAlert.showMsg(error,'','网络异常','确认')
})
    }

}
])
angular.module('BaiYin.Tracking.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);
angular.module('BaiYin.tabs.employeeAddress', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('employeeAddress', {
            url: '/employeeAddress',
            controller: 'employeeAddressController',
            templateUrl: 'tabs/companyAddressBook/employeeAddress/employeeAddress.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('employeeAddressController', ['$scope', 'pageInitService', '$state', '$http',
        function($scope, pageInitService, $state, $http) {
            var listUser = JSON.parse(localStorage.getItem('_titleUser_'));
            $scope.title = listUser.ORG_NAME;
            var apis = [
                'ServiceName=UserService&TransName=getAddressList&ORG_CODE=' + listUser.ORG_CODE
            ];
            pageInitService.pageInit(apis).then(function(result) {
                $scope.items = result[0].data;
                console.log(JSON.stringify(result[0].data))

            }, function(error) {
                console.log(error);
            })
            $scope.addressDetail = function(item) {
                sessionStorage.setItem("_xiangQing_", JSON.stringify(item));
                $state.go('addressDetail');

            }
        }
    ])
angular.module('BaiYin.groupDetail', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('message/groupDetail', {
        url: '/message/groupDetail/:groupId',
        controller: 'groupDetailController',
        templateUrl: 'tabs/message/groupDetail/groupDetail.tpl.html',
        authorizedRuleType: ['1']
    })
}])

.controller('groupDetailController', ['$scope', '$http', '$ionicHistory', '$ionicPopup', '$timeout', '$stateParams', '$ionicScrollDelegate', 'MrActionSheet', 'MrImagePicker', 'MrCamera', '$state', 'Session',
    function($scope, $http, $ionicHistory, $ionicPopup, $timeout, $stateParams, $ionicScrollDelegate, MrActionSheet, MrImagePicker, MrCamera, $state, Session) {
        $scope.$on('$ionicView.leave', function() {
            if (Session.user.DeviceType == 'Android') {
                window.JMessage.exitConversation(function() {
                    // 退出成功。
                }, function(errorMsg) {
                    console.log(errorMsg); // 输出错误信息。
                });
            }
        });
        $scope.$on('$ionicView.beforeEnter', function() {
            if (isApp) {
                window.JMessage.getGroupInfo($stateParams.groupId, function(response) {
                    if (Session.user.DeviceType == 'Android') {
                        $scope.groupInfo = JSON.parse(response);
                    } else {
                        $scope.groupInfo = response;
                    }
                    $scope.$digest();
                }, function(errorMsg) {
                    console.log(errorMsg);
                })
            }
        });

        $scope.doRefresh = function() {
            $timeout(function() {
                $scope.$broadcast('scroll.refreshComplete');
            }, 200);
        };

        $scope.messageArray = [];
        var viewScroll = $ionicScrollDelegate.$getByHandle('groupDetailsScroll');
        var goButton = function() {
            $timeout(function() {
                viewScroll.scrollBottom([true]);
            }, 400);
        }

        window.addEventListener("native.keyboardshow", function(e) {
            viewScroll.scrollBottom([true]);
        });
        window.addEventListener("native.keyboardhide", function(e) {
            viewScroll.scrollBottom([true]);
        });

        if (Session.user.DeviceType == 'Android') {
            window.JMessage.enterGroupConversation($stateParams.groupId,
                function() {
                    // 进入会话成功。
                    //读取的是从 0 开始的 50 条聊天记录，可按实现需求传不同的值。
                    window.JMessage.getHistoryMessages("group", $stateParams.groupId,
                        '', 0, 50,
                        function(response) {
                            console.log("getMessageHistory ok: " + response);
                            var msg = JSON.parse(response);
                            $scope.messageArray = msg.reverse();
                            goButton();
                        },
                        function(errorMsg) {
                            console.log("getMessageHistory fail" + errorMsg);
                        }
                    );

                },
                function(errorMsg) {
                    console.log(errorMsg);
                });
        } else {
            window.JMessage.getGroupConversationHistoryMessage($stateParams.groupId, 0, 50,
                function(response) {
                    $scope.messageArray = response.reverse();
                    goButton();
                },
                function(errorMsg) {

                });
        }

        document.addEventListener("jmessage.onReceiveMessage", onReceiveMessage, false);
        // 在收到消息后将消息对象加入到消息数组的开头。
        function onReceiveMessage(message) {
            $scope.messageArray.push(message);
            $scope.$digest();
            goButton();
        }

        // 启动选择图片方法
        $scope.addAttachment = function() {
            // takePicture();
            MrActionSheet.show({
                buttons: [
                    { text: '相机' },
                    { text: '相册' }
                ],
                cancelText: '取消',
                cancel: function() {
                    return true;
                },
                buttonClicked: function(index) {
                    switch (index) {
                        case 0:
                            takePicture();

                            break;
                        case 1:
                            pickImage();
                            break;
                    }
                    return true;
                }
            });
        };

        // 相机照相方法
        var takePicture = function() {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };
            MrCamera.getPicture(options).then(function(imageData) {
                window.JMessage.sendGroupImageMessage($stateParams.groupId, imageData,
                    function(response) {
                        if (Session.user.DeviceType == 'Android') {
                            var msg = JSON.parse(response);
                        } else {
                            var msg = response;
                        }
                        $scope.messageArray.push(msg);
                        $scope.$digest();
                        goButton();
                    },
                    function(errorMsg) {
                        console.log('图片错误发送：' + errorMsg); // 输出错误信息。
                    });
            }, function(err) {
                // alert(err);
            });
        };


        // 相册选择图片方法
        var pickImage = function() {
            var options = {
                maximumImagesCount: 10,
                width: 300,
                height: 300,
                quality: 100
            };
            MrImagePicker.getPictures(options).then(
                function(results) {
                    for (var i = results.length - 1; i >= 0; i--) {
                        window.JMessage.sendGroupImageMessage($stateParams.groupId, results[i],
                            function(response) {
                                if (Session.user.DeviceType == 'Android') {
                                    var msg = JSON.parse(response);
                                } else {
                                    var msg = response;
                                }
                                $scope.messageArray.push(msg);
                                $scope.$digest();
                                goButton();
                            },
                            function(errorMsg) {
                                console.log('图片错误发送：' + errorMsg); // 输出错误信息。
                                showAlert('', '消息发送失败,您已不再该群', '确认');
                            });
                    };
                },
                function(error) {
                    console.log(error);
                });
        };

        $scope.goOthersInfo = function() {
            $state.go('message/groupInfo', { 'groupId': $stateParams.groupId });
        }

        var showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {});
        };

        //发送消息
        $scope.sendContent = function(send_content) {
            if ($scope.send_content || $scope.send_content == '') {
                window.JMessage.sendGroupTextMessage($stateParams.groupId, send_content,
                    function(response) {
                        if (Session.user.DeviceType == 'Android') {
                            var msg = JSON.parse(response);
                        } else {
                            var msg = response;
                        }
                        $scope.messageArray.push(msg);
                        $scope.$digest();
                        $scope.send_content = '';
                        goButton();
                    },
                    function(errorMsg) {
                        console.log("send message fail" + errorMsg);
                        showAlert('', '消息发送失败', '确认');
                    });
            } else {
                showAlert('', '发送内容不能为空', '确认');
            }
        }
    }
])
angular.module('BaiYin.message.groupInfo', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('message/groupInfo', {
        url: '/message/groupInfo/:groupId',
        controller: 'groupInfoController',
        templateUrl: 'tabs/message/groupInfo/groupInfo.tpl.html',
        cache: false,
        authorizedRuleType: ['1']
    })
}])

.controller('groupInfoController', ['$scope', '$http', '$ionicPopup', '$stateParams', '$state', 'Session',

    function($scope, $http, $ionicPopup, $stateParams, $state, Session) {
        if (isApp) {
            //获取群组信息
            window.JMessage.getGroupInfo($stateParams.groupId,
                function(response) {
                    if (Session.user.DeviceType == 'Android') {
                        $scope.groupInfo = JSON.parse(response);
                    } else {
                        $scope.groupInfo = response;
                    }
                },
                function(errorMsg) {
                    console.log(errorMsg); // 输出错误信息。
                });

            //获取群成员
            if (Session.user.DeviceType == 'Android') {
                window.JMessage.getGroupMembers($stateParams.groupId,
                    function(response) {
                        $scope.members = JSON.parse(response);
                    },
                    function(errorMsg) {
                        console.log(errorMsg); // 输出错误信息。
                    })
            } else {
                window.JMessage.memberArray($stateParams.groupId,
                    function(response) {
                        $scope.members = response;
                    },
                    function(errorMsg) {
                        console.log(errorMsg); // 输出错误信息。
                    })
            }
        };

        //显示群成员列表
        $scope.showMembers = function() {
            $scope.popup = $ionicPopup.show({
                templateUrl: "tabs/message/groupInfo/showMembers.tpl.html",
                scope: $scope,
            });
        };

        //显示输入成员框
        $scope.showGroupMember = function() {
            $scope.popup = $ionicPopup.show({
                templateUrl: "tabs/message/groupInfo/addGroupMember.tpl.html",
                scope: $scope,
            });
        };
        $scope.closePop = function() {
            $scope.popup.close();
        }

        //添加成员
        $scope.addGroupMember = function(userName) {
            $scope.popup.close();
            if (Session.user.DeviceType == 'Android') {
                window.JMessage.addGroupMembers($stateParams.groupId, userName,
                    function(response) {
                        window.JMessage.getGroupMembers($stateParams.groupId,
                            function(json) {
                                $scope.members = JSON.parse(json);
                                showAlert('', '添加成功', '确认', '0');
                            },
                            function(errorMsg) {
                                console.log(errorMsg); // 输出错误信息。
                            });
                    },
                    function(errorMsg) {
                        showAlert('', '暂无此用户或已添加', '确认', '0');
                    })
            } else {
                var addMemberArray = [];
                addMemberArray.push(userName);
                window.JMessage.addMembers($stateParams.groupId, addMemberArray,
                    function(response) {
                        window.JMessage.memberArray($stateParams.groupId,
                            function(response) {
                                $scope.members = response;
                                showAlert('', '添加成功', '确认', '0');
                            },
                            function(errorMsg) {
                                console.log(errorMsg); // 输出错误信息。
                            })
                    },
                    function(errorMsg) {
                        showAlert('', '暂无此用户或已添加', '确认', '0');
                    });
            }
        };

        $scope.deleteMember = function(index, userName) {
            if (Session.user.DeviceType == 'Android') {
                window.JMessage.removeGroupMembers($stateParams.groupId, userName,
                    function(response) {
                        window.JMessage.getGroupMembers($stateParams.groupId,
                            function(response) {
                                $scope.members = JSON.parse(response);
                                showAlert('', '删除成功', '确认', '0');
                            },
                            function(errorMsg) {
                                console.log(errorMsg); // 输出错误信息。
                            })
                    },
                    function(errorMsg) {
                        showAlert('', '权限不足，无法删除', '确认', '0');
                    })
            } else {
                var rmMemberArray = [];
                rmMemberArray.push(userName);
                window.JMessage.removeMembers($stateParams.groupId, rmMemberArray,
                    function(response) {
                        window.JMessage.memberArray($stateParams.groupId,
                            function(response) {
                                $scope.members = response;
                                showAlert('', '添加成功', '确认', '0');
                            },
                            function(errorMsg) {
                                console.log(errorMsg); // 输出错误信息。
                            })
                    },
                    function(errorMsg) {
                        showAlert('', '权限不足，无法删除', '确认', '0');
                    });
            }
        }

        $scope.goMessageDetails = function(member) {
            $scope.popup.close();
            $state.go('message/messageDetail', { 'targetId': member.userName });
        }

        var showAlert = function(title, template, okText, num) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {});
        };
    }
])
angular.module('BaiYin.messageDetail', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('message/messageDetail', {
        url: '/message/messageDetail/:targetId',
        controller: 'messageDetailController',
        templateUrl: 'tabs/message/messageDetail/messageDetail.tpl.html',
        authorizedRuleType: ['1']
    })
}])

.controller('messageDetailController', ['$scope', '$http', '$ionicHistory', '$ionicPopup', '$timeout', '$stateParams', '$ionicScrollDelegate', 'MrActionSheet', 'MrImagePicker', 'MrCamera', '$state', 'Session',
    function($scope, $http, $ionicHistory, $ionicPopup, $timeout, $stateParams, $ionicScrollDelegate, MrActionSheet, MrImagePicker, MrCamera, $state, Session) {

        //判断平台
        if (Session.user.DeviceType) {
            $scope.DeviceType = Session.user.DeviceType;
        }

        //保存发送者信息
        var senderInfo = {
            create_time: new Date().getTime(),
            msg_type: '',
            set_from_name: '',
            from_name: '',
            from_id: '',
            msg_body: { text: '' },
            resourcePath: ''
        };

        $scope.$on('$ionicView.leave', function() {
            if ($scope.DeviceType == 'Android') {
                window.JMessage.exitConversation(function() {
                    // 退出成功。
                }, function(errorMsg) {
                    console.log(errorMsg); // 输出错误信息。
                });
            }
        });
        $scope.$on('$ionicView.beforeEnter', function() {
            if (isApp) {

                //获取用户信息
                window.JMessage.getUserInfo($stateParams.targetId, null,
                    function(response) {
                        if ($scope.DeviceType == 'Android') {
                            $scope.userInfo = JSON.parse(response);
                        } else {
                            $scope.userInfo = response;
                        }
                        $scope.$digest();
                    },
                    function(errorStr) {
                        console.log(errorStr); // 输出错误信息。
                    });
            }

            //获取个人信息
            window.JMessage.getMyInfo(function(response) {
                if (Session.user.DeviceType != 'Android') {
                    $scope.myInfo = response;
                }
            }, function(errorStr) {
                console.log(errorStr); // 输出错误信息。
            });

            //清除单聊会话未读数
            if ($scope.DeviceType != 'Android') {
                window.JMessage.clearSingleUnreadCount($stateParams.targetId,
                    function(response) {
                        console.log('单聊未读消息清除成功' + response);
                    },
                    function(errorStr) {
                        console.log('单聊未读消息清除失败' + errorStr);
                    });
            }
        });

        $scope.doRefresh = function() {
            $timeout(function() {
                $scope.$broadcast('scroll.refreshComplete');
            }, 200);
        };

        $scope.messageArray = [];
        var viewScroll = $ionicScrollDelegate.$getByHandle('messageDetailsScroll');
        var goButton = function() {
            $timeout(function() {
                viewScroll.scrollBottom([true]);
            }, 500);
        }

        window.addEventListener("native.keyboardshow",
            function(e) {
                viewScroll.scrollBottom([true]);
            });
        window.addEventListener("native.keyboardhide",
            function(e) {
                viewScroll.scrollBottom([true]);
            });

        if (isApp) {
            if ($scope.DeviceType == 'Android') {
                window.JMessage.enterSingleConversation($stateParams.targetId, null,
                    function() {
                        // 进入会话成功。
                        //读取的是从 0 开始的 50 条聊天记录，可按实现需求传不同的值。
                        window.JMessage.getHistoryMessages("single", $stateParams.targetId,
                            '', 0, 50,
                            function(response) {
                                console.log("getMessageHistory ok: " + response);
                                var msg = JSON.parse(response);
                                $scope.messageArray = msg.reverse();
                                goButton();
                            },
                            function(response) {
                                console.log("getMessageHistory fail" + response);
                            }
                        );

                    },
                    function(errorMsg) {
                        console.log(errorMsg);
                    });
            } else {
                window.JMessage.getSingleConversationHistoryMessage($stateParams.targetId, 0, 50,
                    function(response) {
                        $scope.messageArray = response.reverse();
                        goButton();
                    },
                    function(errorMsg) {

                    });
            }

            document.addEventListener("jmessage.onReceiveMessage", onReceiveMessage, false);
            // 在收到消息后将消息对象加入到消息数组的开头。
            function onReceiveMessage(message) {
                if ($scope.DeviceType == 'Android') {
                    $scope.messageArray.push(message);
                } else {
                    $scope.messageArray.push(message.content);
                }
                $scope.$digest();
                goButton();
            }

            document.addEventListener("jmessage.onReceiveImageData", onReceiveImageData, false);
            // 在收到消息后将消息对象加入到消息数组的开头。
            function onReceiveImageData(message) {
                if ($scope.DeviceType == 'Android') {
                    $scope.messageArray.push(message);
                } else {
                    $scope.messageArray.push(message.content);
                }
                $scope.$digest();
                goButton();
            }
        }

        // 启动选择图片方法
        $scope.addAttachment = function() {
            // takePicture();
            MrActionSheet.show({
                buttons: [
                    { text: '相机' },
                    { text: '相册' }
                ],
                cancelText: '取消',
                cancel: function() {
                    return true;
                },
                buttonClicked: function(index) {
                    switch (index) {
                        case 0:
                            takePicture();

                            break;
                        case 1:
                            pickImage();
                            break;
                    }
                    return true;
                }
            });
        };

        // 相机照相方法
        var takePicture = function() {
            var options = {
                quality: 100,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };
            MrCamera.getPicture(options).then(function(imageData) {
                window.JMessage.sendSingleImageMessage($stateParams.targetId, imageData, null,
                    function(response) {
                        if ($scope.DeviceType == 'Android') {
                            var msg = JSON.parse(response);
                        } else {
                            var msg = response;
                        }
                        $scope.messageArray.push(msg);
                        $scope.$digest();
                        goButton();
                    },
                    function(errorMsg) {
                        console.log('图片错误发送：' + errorMsg); // 输出错误信息。
                    });
            }, function(err) {
                // alert(err);
            });
        };


        // 相册选择图片方法
        var pickImage = function() {
            var options = {
                maximumImagesCount: 10,
                width: 300,
                height: 300,
                quality: 100
            };
            MrImagePicker.getPictures(options).then(
                function(results) {
                    for (var i = results.length - 1; i >= 0; i--) {
                        window.JMessage.sendSingleImageMessage($stateParams.targetId, results[i], null,
                            function(response) {
                                if ($scope.DeviceType == 'Android') {
                                    var msg = JSON.parse(response);
                                } else {
                                    var msg = response;
                                }
                                $scope.messageArray.push(msg);
                                $scope.$digest();
                                goButton();
                            },
                            function(errorMsg) {
                                console.log('图片错误发送：' + errorMsg); // 输出错误信息。
                            });
                    };
                },
                function(error) {
                    console.log(error);
                });
        };

        $scope.goOthersInfo = function() {
            $state.go('message/othersInfo', { 'targetId': $stateParams.targetId });
        }

        //发送消息
        $scope.sendContent = function(send_content) {
            var send_content = send_content;
            window.JMessage.sendSingleTextMessage($stateParams.targetId, send_content, null,
                function(response) {
                    if ($scope.DeviceType == 'Android') {
                        var msg = JSON.parse(response);
                    } else {
                        senderInfo.msg_type = 'text';
                        senderInfo.set_from_name = 0;
                        senderInfo.from_name = $scope.myInfo.nickname;
                        senderInfo.from_id = $scope.myInfo.username;
                        senderInfo.msg_body.text = send_content;
                        var msg = senderInfo;
                        send_content = '';
                    }
                    $scope.messageArray.push(msg);
                    $scope.$digest();
                    $scope.send_content = '';
                    goButton();
                },
                function(errorMsg) {
                    console.log("send message fail" + response);
                    showAlert('', '消息发送失败', '确认');
                });
        }
        var showAlert = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {});
        };
    }
])
angular.module('BaiYin.messageDetail.mock', [
    'ngMockE2E', 'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        "messages": {
            "id": 8,
            "name": "李明",
            "pic": "img/adam.jpg",
            "lastMessage": {
                "originalTime": "2015-11-27 06:34:55",
                "time": "",
                "timeFrome1970": 0,
                "content": "你在干什么?",
                "isFromeMe": false
            },
            "noReadMessages": 2,
            "showHints": true,
            "isTop": 0,
            "message": [{
                "isFromeMe": false,
                "content": "你好!",
                "time": "2015-11-22 08:50:22"
            }, {
                "isFromeMe": true,
                "content": "你好, 你是谁?",
                "time": "2015-11-22 08:51:02"
            }, {
                "isFromeMe": false,
                "content": "你在干什么?",
                "time": "2015-11-27 06:34:55"
            }, {
                "isFromeMe": true,
                "content": "知道怎么搞的吗?",
                "time": "2015-11-22 08:51:02"
            }, {
                "isFromeMe": false,
                "content": "这是一道可以测出一个人有没有商业头脑的数学题",
                "time": "2015-11-27 06:34:55"
            }, {
                "isFromeMe": false,
                "content": "喝咖啡对身体好吗?",
                "time": "2015-11-22 08:51:02"
            }, {
                "isFromeMe": false,
                "content": "在澳洲申请新西兰签证",
                "time": "2015-11-27 06:34:55"
            }, {
                "isFromeMe": true,
                "content": "说走就走的旅行",
                "time": "2015-11-22 08:51:02"
            }, {
                "isFromeMe": false,
                "content": "ok",
                "time": "2015-11-27 06:34:55"
            }, {
                "isFromeMe": true,
                "content": "拉玛西亚",
                "time": "2015-11-22 08:51:02"
            }, {
                "isFromeMe": true,
                "content": "拉玛西亚影视学院招生简章",
                "time": "2015-11-27 06:34:55"
            }, {
                "isFromeMe": true,
                "content": "去黑头产品排行榜",
                "time": "2015-11-22 08:51:02"
            }, {
                "isFromeMe": false,
                "content": "美国大使馆 北京",
                "time": "2015-11-27 06:34:55"
            }, {
                "isFromeMe": false,
                "content": "被开水烫伤怎么办?",
                "time": "2015-11-22 08:51:02"
            }, {
                "isFromeMe": false,
                "content": "谁说菜鸟不会数据分析?",
                "time": "2015-11-27 06:34:55"
            }, {
                "isFromeMe": true,
                "content": "谁念西风独自凉",
                "time": "2015-11-22 08:51:02"
            }, {
                "isFromeMe": false,
                "content": "被酒莫惊春睡重，赌书消得泼茶香，当时只道是寻常",
                "time": "2015-11-27 06:34:55"
            }]
        }
    };
    var result = mocksData.resetData(data);
    $httpBackend.whenGET(/\?messageList/).respond(result);
}]);
angular.module('BaiYin.message.myInfo', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('message/myInfo', {
        url: '/message/myInfo',
        controller: 'myInfoController',
        templateUrl: 'tabs/message/myInfo/myInfo.tpl.html',
        authorizedRuleType: ['1']
    })
}])

.controller('myInfoController', ['$scope', '$http', '$ionicPopup', '$stateParams', '$ionicHistory', '$state', 'Session',

    function($scope, $http, $ionicPopup, $stateParams, $ionicHistory, $state, Session) {
        //判断平台
        if (Session.user.DeviceType) {
            $scope.DeviceType = Session.user.DeviceType;
        }
        if (isApp) {
            //获取个人信息
            window.JMessage.getMyInfo(function(response) {
                if (Session.user.DeviceType == 'Android') {
                    $scope.myInfo = JSON.parse(response);
                } else {
                    $scope.myInfo = response;
                }
            }, function(errorStr) {
                console.log(errorStr); // 输出错误信息。
            });
        }

        //显示创建群组输入框
        $scope.showCreateGroupPop = function() {
            $scope.popup = $ionicPopup.show({
                templateUrl: "tabs/message/myInfo/inputCreatGroup.tpl.html",
                scope: $scope,
            });
        }

        //显示添加好友输入框
        $scope.showAddFriends = function() {
            $scope.popup = $ionicPopup.show({
                templateUrl: "tabs/message/myInfo/addFriend.tpl.html",
                scope: $scope,
            });
        }
        $scope.closePop = function() {
            $scope.popup.close();
        }

        $scope.addFriends = function(userName, reason) {
            $scope.closePop();
            window.JMessage.sendInvitationRequest(userName, null, reason,
                function(response) {
                    showAlert('', '发送成功,等待确认', '确认', '1');
                },
                function(errorStr) {
                    showAlert('', '暂无此用户', '确认', '0');
                });
        }

        $scope.createGroup = function(groupName, groupDesc) {
            $scope.closePop();
            if (Session.user.DeviceType == 'Android') {
                window.JMessage.createGroup(groupName, groupDesc, function(response) {
                    showAlert('', '创建成功', '确认', '1');
                }, function(errorMsg) {
                    showAlert('', '创建失败，请重试或已存在', '确认', '0');
                })
            } else {
                var memebersArray = [];
                window.JMessage.createGroupIniOS(groupName, groupDesc, memebersArray, function(response) {
                    showAlert('', '创建成功', '确认', '1');
                }, function(errorMsg) {
                    showAlert('', '创建失败，请重试或已存在', '确认', '0');
                });
            }
        }
        $scope.goAddressBook = function() {
            $scope.closePop();
            $state.go('tabs/companyAddressBook');
        }
        var showAlert = function(title, template, okText, num) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                if (num == '1') {
                    $ionicHistory.goBack();
                }
            });
        };
    }
])
angular.module('BaiYin.message.othersInfo', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('message/othersInfo', {
        url: '/message/othersInfo:targetId',
        controller: 'othersInfoController',
        templateUrl: 'tabs/message/othersInfo/othersInfo.tpl.html',
        authorizedRuleType: ['1']
    })
}])

.controller('othersInfoController', ['$scope', '$http', '$ionicPopup', '$stateParams', 'Session',

    function($scope, $http, $ionicPopup, $stateParams, Session) {
        $scope.$on('$ionicView.beforeEnter', function() {
            if (isApp) {
                //获取用户信息
                if (Session.user.DeviceType == 'Android') {
                    window.JMessage.getUserInfo($stateParams.targetId, null,
                        function(response) {
                            $scope.userInfo = JSON.parse(response);
                        },
                        function(errorStr) {
                            console.log(errorStr); // 输出错误信息。
                        });
                } else {
                    window.JMessage.getUserInfo($stateParams.targetId, null,
                        function(response) {
                            $scope.userInfo = response;
                        },
                        function(errorStr) {
                            console.log(errorStr); // 输出错误信息。
                        });
                }

            }
        });
    }
])
angular.module('BaiYin.APPfeedback', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('APPfeedback', {
        url: '/APPfeedback',
        controller: 'APPfeedbackController',
        templateUrl: 'tabs/mine/APPfeedback/APPfeedback.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1', '0']
    })
}])

.controller('APPfeedbackController', ['$scope', '$http', '$ionicHistory', '$ionicPopup',
    function($scope, $http, $ionicHistory, $ionicPopup) {

        // 提交反馈
        $scope.appFeedback2 = function(opinion, phone) {
            $scope.upData = {
                CONTENT: encodeURIComponent(opinion),
                PHONE: phone,
            }
            $http.post('ServiceName=SuggestionService&TransName=doSuggestion&SUBJECT=subject1', $scope.upData).then(function(res) {
                var alertPopup = $ionicPopup.alert({
                    template: res.msg,
                    okText: '确认',
                });
                alertPopup.then(function(res) {
                    $ionicHistory.goBack();
                });
            }, function(msg) {
                var alertPopup = $ionicPopup.alert({
                    template: '提交信息失败请重试',
                    okText: '确认'
                });
                alertPopup.then(function(res) {});
            });
        };
    }
])
angular.module('BaiYin.ListOfBluetooth', [
		'BaiYin.EditBluetooth'
	])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('ListOfBluetooth', {
			url: '/ListOfBluetooth',
			controller: 'ListOfBluetoothController',
			templateUrl: 'tabs/mine/ListOfBluetooth/ListOfBluetooth.tpl.html',
			cache: 'false',
			authorizedRuleType: ['1', '0']
		})
	}])
	.controller('ListOfBluetoothController', ['$scope', '$http', '$ionicHistory', '$ionicPopup', 'loadingAnimation', 'showAlert', '$state',
		function($scope, $http, $ionicHistory, $ionicPopup, loadingAnimation, showAlert, $state) {
			//按钮内容
			$scope.bottonText = "搜索";
			//已知蓝牙列表
			$scope.known = new Array();
			//未知蓝牙列表
			$scope.unknown = new Array();
			//初始化数据
			var initPage = function(){
				$scope.bottonText = "搜索";
				$scope.known = new Array();
				$scope.unknown = new Array();
			};

			$scope.$on('$ionicView.enter', function () {
				initPage();
			});
			//点击搜索按钮
			$scope.bluetooth = function(){
				if($scope.bottonText == "搜索"){
					initPage();

					ble.enable(function () {
						startScan();
					}, function () {
						showAlert.showMsg("", "", "未打开蓝牙");
					} );
				}
			};
			//改变按钮内容
			var changeBotton = function(){
				$scope.$apply(function(){
                    if($scope.bottonText == "搜索"){
                        $scope.bottonText = "<i class='icon ion-load-c'></i>";
                    }else{
                        $scope.bottonText = "搜索";
                    }
                });
			};
			//开始搜素蓝牙
			var startScan = function(){
				changeBotton();

				setTimeout(function(){
					endScan();
				}, 5000);

				ble.scan([], 5,function(device){
					device.distance = Math.round(device.distance * 10) / 10;
					matching(device);
				}, function(){
					endScan();
					showAlert.showMsg("", "", "扫描蓝牙出错");
				});
			};
			//结束搜索蓝牙
			var endScan = function(){
				ble.stopScan(changeBotton, changeBotton);
			};
			//查询蓝牙信息
			var matching = function(device){
				$http.post('ServiceName=ClockService&TransName=bluetoothInSystem&SN=' + device.id.replace(/:/g, ""))
                    .then(function (res) {
                        if (res.data.code == '0') {
							res.data.detail[0].device = device;
							$scope.known.push(res.data.detail[0]);
                        } else {
							$scope.unknown.push(device);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
			}
			//去录入页面
			$scope.toEdit = function(data){
				$state.go("EditBluetooth", {item: data});
			};
        }
	]);
angular.module('BaiYin.mine.netWork', [
    'BaiYin.mine.netWork.mock',
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('mine/netWork', {
        url: '/mine/netWork',
        controller: 'netWorkController',
        templateUrl: 'tabs/mine/netWork/netWork.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1', '0']
    })
}])

.controller('netWorkController', ['$scope', '$http', '$ionicHistory',
    function($scope, $http, $ionicHistory) {

        if (localStorage.getItem('uri') == null) {
            $scope.choice = 'B';
        } else {
            $scope.choice = 'A';
        }

        $scope.seleteNet = function(seleteNet) {
            if (seleteNet == 'A') {
                localStorage.setItem('uri', '1');
                $ionicHistory.goBack();
            } else {
                localStorage.removeItem('uri');
                $ionicHistory.goBack();
            }
        }
    }
])
angular.module('BaiYin.mine.netWork.mock', [
    'ngMockE2E', 'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {}]);
angular.module('BaiYin.flowDetail', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('flowDetail', {
        url: '/flowDetail',
        params: { 'item': null },
        controller: 'flowDetailController',
        templateUrl: 'Agents/AgentsList/agentsView/Flow/flowDetail.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('flowDetailController', ['$scope', '$state', 'showAlert', 'pageInitService', '$timeout', '$ionicHistory', '$stateParams', '$http', '$ionicPopup', 'Session',
    function($scope, $state, showAlert, pageInitService, $timeout, $ionicHistory, $stateParams, $http, $ionicPopup, Session) {
        var valKey = $stateParams.item;
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
                'ServiceName=ApproveService&TransName=getApprvedStream&LU_NAME=' + valKey.LU_NAME + '&KEY_REF=' + valKey.KEY_REF
            ];
            pageInitService.pageInit(apis).then(function(result) {
                agentViewMsg(result[0])
            }, function(error) {
                showAlert.showMsg(error, '', '网络异常', '确认')
            })
        });
        $scope.doRefresh = function() {
            $http.get('ServiceName=ApproveService&TransName=getApprvedStream&LU_NAME=' + valKey.LU_NAME + '&KEY_REF=' + valKey.KEY_REF)
                .then(function(res) {
                    agentViewMsg(res)
                    $scope.$broadcast('scroll.refreshComplete');
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
        };

        function agentViewMsg(res) {
            console.log(res)
            var str = [];
            var arr = {};
            for (var i = 0; i < res.data.length; i++) {
                arr = res.data[i];
                if (arr.APP_DATE == 'null') {
                    arr.APP_DATE = '无'
                } else {
                    arr.APP_DATE = new Date(arr.APP_DATE)
                }
                str.push(arr)
            }
            $scope.items = str;
            console.log(str)

        }

        $scope.openUrl = function(URL) {
            document.addEventListener("deviceready", function() {
                if (Session.user.DeviceType == 'Android') {
                    MRUpdateVersion.updateVersion(function success() {}, function failed(message) {}, URL);
                } else {
                    cordova.InAppBrowser.open(URL, '_system', 'zoom=yes');
                }
            }, false);
        }

    }
])

angular.module('BaiYin.historyDetail', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('historyDetail', {
        url: '/historyDetail',
        params: { 'item': null },
        controller: 'historyDetailController',
        templateUrl: 'Agents/AgentsList/operatingHistory/historyDetails/historyDetail.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1'] //登录权限
    })
}])

.controller('historyDetailController', ['$scope','showAlert','pageInitService', '$timeout', '$ionicHistory', '$stateParams', '$http', '$ionicPopup', 
    function($scope,showAlert,pageInitService, $timeout, $ionicHistory, $stateParams, $http, $ionicPopup) {
      var valKey = $stateParams.item;
      $scope.$on('$ionicView.afterEnter', function() { 
        var apis = [
        'ServiceName=ApproveService&TransName=getDoneApprvedDetail&LogNo='+valKey.LOG_NO
        ];
        pageInitService.pageInit(apis).then(function(result) {
           agentViewMsg(result[0])
       }, function(error) {
        showAlert.showMsg(error,'','网络异常','确认')
    })
});
    $scope.doRefresh = function() {
            $http.get('ServiceName=ApproveService&TransName=getDoneApprvedDetail&LogNo='+valKey.LOG_NO)
            .then(function(res) {
             agentViewMsg(res)
             $scope.$broadcast('scroll.refreshComplete');
         }, function(error) {
            showAlert.showMsg(error,'','网络异常','确认')
       });
    };
    var displayFile = false;
    $scope.accessoryCont = function() {
            $scope.displayFile = !$scope.displayFile
        };
    function agentViewMsg(res){
           var str = {};
           str = res.data
           str.CREATED_DATE = new Date(str.CREATED_DATE)
           str.SUBMIT_DATE = new Date(str.SUBMIT_DATE)
           str.COMPLETED_DATE = new Date(str.COMPLETED_DATE)
           $scope.item = str
           
           if (str.ATTACHMENT == null || str.ATTACHMENT.length <= 0) {
            $scope.disFile = false
        } else {
            $scope.disFile = true
        }
    }


    $scope.openUrl = function(URL) {
        if (isApp) {
            MRUpdateVersion.updateVersion(function success() {}, function failed(message) {}, URL);
        }
    }
      var showAlertGo = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                 $ionicHistory.goBack();
            });
        };
   
  }
  ])
angular.module('BaiYin.tabs.addressDetail', [
        'BaiYin.tabs.addressDetail.mock',
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('addressDetail', {
            url: '/addressDetail',
            controller: 'addressDetailController',
            templateUrl: 'tabs/companyAddressBook/employeeAddress/addressDetail/addressDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('addressDetailController', ['$scope', '$state', '$http', '$ionicPopup', 'Session', '$ionicLoading',
        function($scope, $state, $http, $ionicPopup, Session, $ionicLoading) {
            var addresDetail = JSON.parse(sessionStorage.getItem("_xiangQing_"))
            $scope.user = addresDetail;
            console.log(addresDetail);
            //跳转到聊天页
            $scope.goMessageDetail = function() {
                if (isApp) {
                    $ionicLoading.show({
                        template: '正在连接聊天服务器...'
                    });
                    window.JMessage.getMyInfo(function(response) {
                        console.log("user is login" + response);
                        var myInfo = JSON.parse(response);
                        window.JMessage.username = myInfo.userName;
                        window.JMessage.nickname = myInfo.nickname;
                        window.JMessage.gender = myInfo.mGender;
                        $scope.goMessageDetails();
                    }, function(response) {
                        console.log("User is not login.");
                        window.JMessage.username = "";
                        window.JMessage.nickname = "";
                        window.JMessage.gender = "unknown";
                        window.JMessage.login(Session.userInfoData.JMUserID, Session.userInfoData.JMPassWord,
                            function(response) {
                                window.JMessage.username = Session.userInfoData.JMUserID;
                                console.log("login ok");
                                $scope.goMessageDetails();
                            },
                            function(errorMsg) {
                                $ionicLoading.hide();
                                showAlert('', '连接聊天服务器失败', '确认');
                            });
                    });

                    $scope.goMessageDetails = function() {
                        window.JMessage.getUserInfo($scope.user.PERSON_ID, null,
                            function(response) {
                                $ionicLoading.hide();
                                $state.go('message/messageDetail', { 'targetId': $scope.user.PERSON_ID });
                            },
                            function(errorStr) {
                                console.log(errorStr);
                                $ionicLoading.hide();
                                showAlert('', '聊天系统暂无此人', '确认');
                            });
                    }
                }
            }
            var showAlert = function(title, template, okText) {
                var alertPopup = $ionicPopup.alert({
                    title: title,
                    okText: okText,
                    template: template
                });
                alertPopup.then(function(res) {});
            };
            //显示添加好友输入框
            $scope.showAddFriends1 = function() {
                if (isApp) {
                    $ionicLoading.show({
                        template: '正在连接聊天服务器...'
                    });
                    window.JMessage.getMyInfo(function(response) {
                        console.log("user is login" + response);
                        var myInfo = JSON.parse(response);
                        window.JMessage.username = myInfo.userName;
                        window.JMessage.nickname = myInfo.nickname;
                        window.JMessage.gender = myInfo.mGender;
                        $scope.getMessageDetails();
                    }, function(response) {
                        console.log("User is not login.");
                        window.JMessage.username = "";
                        window.JMessage.nickname = "";
                        window.JMessage.gender = "unknown";
                        window.JMessage.login(Session.userInfoData.JMUserID, Session.userInfoData.JMPassWord,
                            function(response) {
                                window.JMessage.username = Session.userInfoData.JMUserID;
                                $scope.getMessageDetails();

                            },
                            function(errorMsg) {
                                $ionicLoading.hide();
                                showAlert('', '连接聊天服务器失败', '确认');
                            });
                    });

                    $scope.getMessageDetails = function() {
                        window.JMessage.getUserInfo($scope.user.PERSON_ID, null,
                            function(response) {
                                $ionicLoading.hide();
                                $scope.popup = $ionicPopup.show({
                                    templateUrl: "tabs/companyAddressBook/employeeAddress/addressDetail/addFriendaddressDetail.tpl.html",
                                    scope: $scope,
                                });
                                $scope.friendsName1 = $scope.user.PERSON_ID;
                            },
                            function(errorStr) {
                                console.log(errorStr);
                                $ionicLoading.hide();
                                showAlert('', '聊天系统暂无此人', '确认');
                            });
                    };
                }

            }
            $scope.closePop1 = function() {
                $scope.popup.close();
            };
            $scope.addFriends1 = function(userName, reason) {
                $scope.closePop1();
                window.JMessage.sendInvitationRequest(userName, null, reason,
                    function(response) {
                        showAlert('', '发送成功,等待确认', '确认', '1');
                    },
                    function(errorStr) {
                        showAlert('', '暂无此用户', '确认', '0');
                    });
            }

        }
    ])
angular.module('BaiYin.tabs.addressDetail.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{}];
    var result = mocksData.resetData(data);
     $httpBackend.whenGET(/.*/).passThrough();
}])
angular.module('BaiYin.EditBluetooth', [])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('EditBluetooth', {
			url: '/editBluetooth',
			controller: 'EditBluetoothController',
			templateUrl: 'tabs/mine/ListOfBluetooth/editBluetooth/editBluetooth.tpl.html',
			cache: 'false',
            authorizedRuleType: ['1', '0'],
            params: {item: null}
		})
	}])
	.controller('EditBluetoothController', ['$scope', '$http', '$ionicHistory', '$ionicPopup', 'loadingAnimation', 'showAlert', '$stateParams',
		function($scope, $http, $ionicHistory, $ionicPopup, loadingAnimation, showAlert, $stateParams) {
            $scope.device = new Object();
            $scope.$on('$ionicView.enter', function () {
				$scope.device = $stateParams.item.device ? $stateParams.item.device : new Object();
			});

			//保存数据
			$scope.save = function(){
				$http.post("ServiceName=ClockService&TransName=entryBluetooth", {
					address: $scope.device.address,
					sn_code: $scope.device.id.replace(/:/g, ""),
					bluetooth_desc: $scope.device.bluetooth_desc
				}).then(function (res) {
					showAlert.showMsg("", '', '录入成功', '确认')
				}, function (error) {
					showAlert.showMsg(error, '', '', '确认')
				});
			};

			//取消
			$scope.back = function(){
				history.go(-1);
			};
        }
	]);
//# sourceMappingURL=../maps/BaiYin.js.map
