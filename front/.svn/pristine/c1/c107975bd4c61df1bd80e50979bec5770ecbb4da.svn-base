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