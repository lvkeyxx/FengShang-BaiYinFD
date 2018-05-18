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
