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