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

