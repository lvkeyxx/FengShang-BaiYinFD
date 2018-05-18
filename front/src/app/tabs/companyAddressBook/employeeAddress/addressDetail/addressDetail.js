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