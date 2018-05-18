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