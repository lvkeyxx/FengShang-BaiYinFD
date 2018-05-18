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
