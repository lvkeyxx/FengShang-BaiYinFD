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