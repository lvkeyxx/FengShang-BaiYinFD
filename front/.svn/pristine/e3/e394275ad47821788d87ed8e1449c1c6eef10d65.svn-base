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