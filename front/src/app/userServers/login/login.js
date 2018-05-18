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