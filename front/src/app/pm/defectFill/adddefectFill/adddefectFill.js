angular.module('BaiYin.pm.defectFill.adddefectFill', [
    'ionic',
    'ngCordova',
    'base64',
])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/defectFill/adddefectFill', {
            url: '/pm/defectFill/adddefectFill',
            controller: 'adddefectFillController',
            templateUrl: 'pm/defectFill/adddefectFill/adddefectFill.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('adddefectFillController', ['$scope', '$ionicActionSheet', 'showAlert', '$http', '$state', 'loadingAnimation', '$cordovaBarcodeScanner', 'pageInitService', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', '$cordovaCamera', '$cordovaImagePicker', '$log', '$base64',
        function ($scope, $ionicActionSheet, showAlert, $http, $state, loadingAnimation, $cordovaBarcodeScanner, pageInitService, $ionicScrollDelegate, $ionicSlideBoxDelegate, $cordovaCamera, $cordovaImagePicker, $log, $base64) {
            var mydate = new Date();
            var month = mydate.getMonth() + 1;
            $scope.UserName = token.UserName;
            $scope.DEPT_NAME = token.DeptName;
            $scope.CONTRACT_NAME = token.ContractName;
            $scope.nowDate = mydate.getFullYear() + '-' + month + '-' + mydate.getDate();
            //查询 状态，分类，专业
            $scope.sbzt = [];
            $scope.qxfl = [];
            $scope.qxzy = [];
            $scope.sbztObj = {};
            $scope.qxzyObj = {};
            $scope.bmlist = [];
            $scope.xxlist = [];
            $scope.images_list = [];
            $scope.images_update = [];
            $scope.image = {     //用于绑定提交内容，图片或其他数据
            };
            $scope.$on('$ionicView.afterEnter', function () {
                $ionicScrollDelegate.scrollTop()
                $ionicSlideBoxDelegate.next();
            });
            var sbztValue, qxflValue, qxzyValue;
            $http.get("ServiceName=DefectManageService&TransName=listCustLovConf")
                .then(function (result) {
                    loadingAnimation.hideLoading();
                    $scope.zt = result.data.ztList;
                    $scope.fl = result.data.flList;
                    $scope.zy = result.data.zyList;
                    console.log("zt==" + JSON.stringify($scope.zt));
                    console.log("fl==" + JSON.stringify($scope.fl));
                    console.log("zy==" + JSON.stringify($scope.zy));

                    /*for(z in $scope.zt.length){
                        $scope.sbztObj.text = $scope.zt[z].LOV_VALUE;
                        console.log('ztObj=='+JSON.stringify($scope.sbztObj));
                        $scope.sbzt.push($scope.sbztObj);
                    }*/
                    for (var i = 0; i < $scope.zt.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.zt[i].LOV_VALUE;
                        $scope.sbzt.push(dtext);
                    }
                    for (var i = 0; i < $scope.fl.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.fl[i].LOV_VALUE;
                        $scope.qxfl.push(dtext);
                    }
                    for (var i = 0; i < $scope.fl.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.zy[i].LOV_VALUE;
                        $scope.qxzy.push(dtext);
                    }
                }, function (error) {
                    loadingAnimation.hideLoading();
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                })

            //设备状态
            $scope.toSbzt = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.sbzt,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        sbztValue = $scope.sbzt[index].text;
                        console.log("sbztValue=" + sbztValue);
                        $("#sbztid").val(sbztValue);
                        return true;
                    }
                });
            };
            //缺陷分类
            $scope.toQxfl = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.qxfl,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        qxflValue = $scope.qxfl[index].text;
                        console.log("qxflValue=" + qxflValue);
                        $("#qxflid").val(qxflValue);
                        return true;
                    }
                });
            };
            //缺陷专业
            $scope.toQxzy = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.qxzy,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        qxzyValue = $scope.qxzy[index].text;
                        $("#qxzyid").val(qxzyValue);
                        return true;
                    }
                });
            };
            //右滑设备名称
            $scope.selectSb = function () {
                $(".bg").show();
                $(".sliderightShow").show('slow');
                $(".sliderightShow").css("display", "inline-block");
                $(".sliderightShow").css("width", "95%");
                $(".sliderightShow").css("right", "0");
                $(".sliderightShow").css("top", "-10px");
                $(".sliderightShow").css("position", "absolute");
                $(".sliderightShow").css("z-index", "999999");
            }
            //扫描二维码
            $scope.scanStart = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeData = barcodeData.text;
                        var sbxx = $scope.barcodeData.split(',');
                        //设备编码和设备名称
                        $("#sbcodeid").val(sbxx[0]);
                        $("#sbmcValue").val(sbxx[1]);
                        // showAlert.showMsg('', '', "barcodeData==" + $scope.barcodeData);
                    }, function (error) {
                        console.log("ERROR:" + error);
                    });

            };

            //设备名称和编码查询
            $scope.searchSblist = function () {
                $(".sblist").show();
                refreshMsg();
            }
            $scope.number = 1;
            $scope.hasMore = false;
            $scope.loadMore = function () {
                console.log("hasMore==" + $scope.number);
                $scope.number += 1;
                var parms={
                    MCH_NAME:$("#sbmcid").val(),
                    MCH_CODE:$("#sbbmid").val()
                }
                $http.post('ServiceName=DefectManageService&TransName=listEquipmentFunctionalUiv&PageCnt=10&PageNo=' + $scope.number,parms)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        console.log("res===" + JSON.stringify(res.data))
                        $scope.sbxx1 = res.data.hList;
                        for (var i = 0; i < $scope.sbxx1.length; i++) {
                            $scope.sbxx.push($scope.sbxx1[i]);
                        }
                        if ($scope.sbxx1.length <10) {
                            $scope.hasMore = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete')
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }

            //加载
            function refreshMsg() {
                console.log("hasMore==" + $scope.hasMore);
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                var params = {
                    PageNo: '' + 1,
                    PageCnt: '' + 10,
                    MCH_CODE: $("#sbbmid").val(),
                    MCH_NAME: $("#sbmcid").val()
                };
                $http.post('ServiceName=DefectManageService&TransName=listEquipmentFunctionalUiv', params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.sbxx = res.data.hList;
                        $(".sblist").show();
                        console.log("hListlengtn==" + res.data.hList.length);
                        if (res.data.hList.length >= 10) {
                            $scope.hasMore = true;
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            };
            //获取设备名称
            $scope.toSbmx = function (sbmx) {
                $(".sliderightShow").hide('slow');
                $(".bg").hide('slow');
                $scope.sbxx = [];
                $scope.hasMore = false;
                var sbmxValue = sbmx.MCH_NAME;
                var sbmxCode = sbmx.MCH_CODE;
                console.log("sbmx==" + sbmxValue);
                $("#sbmcValue").val(sbmxValue);
                $("#sbcodeid").val(sbmxCode);
            }
            //执行部门查询
            $http.get("ServiceName=DefectManageService&TransName=listOrgCodeAllowedSiteLov")
                .then(function (result) {
                    $scope.bm = result.data.hList;
                    for (var i = 0; i < $scope.bm.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.bm[i].DESCRIPTION;
                        dtext.code = $scope.bm[i].ORG_CODE;
                        $scope.bmlist.push(dtext);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                })
            //执行部门
            var zxbmValue, zxbmCode;
            $scope.toZxbm = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.bmlist,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        zxbmValue = $scope.bmlist[index].text;
                        zxbmCode = $scope.bmlist[index].code;
                        $("#zxbmid").val(zxbmValue);
                        return true;
                    }
                });
            };
            //现象查询
            $http.get("ServiceName=DefectManageService&TransName=listWorkOrderSymptCode")
                .then(function (result) {
                    $scope.xx = result.data.hList;
                    for (var i = 0; i < $scope.xx.length; i++) {
                        var dtext = {};
                        dtext.text = $scope.xx[i].DESCRIPTION;
                        dtext.code = $scope.xx[i].ERR_SYMPTOM;
                        $scope.xxlist.push(dtext);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                })
            //现象选择
            var xxValue, xxCode;
            $scope.toXianx = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: $scope.xxlist,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        xxValue = $scope.xxlist[index].text;
                        xxCode = $scope.xxlist[index].code;
                        $("#xianxid").val(xxValue);
                        return true;
                    }
                });
            };
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
            //隐藏搜索设备编码和名称框
            $scope.hideSearch = function () {
                $(".sliderightShow").hide();
                $(".bg").hide();
            }
            $scope.reader = new FileReader();  //创建一个FileReader接口
            //图片转为数据流
            $scope.imgTransform = function () {
                /*if ($scope.images_list.length > 0) {*/
                $scope.images_update[0] = $scope.images_update[0] == undefined ? '' : $scope.images_update[0];
                $scope.images_update[1] = $scope.images_update[1] == undefined ? '' : $scope.images_update[1];
                $scope.images_update[2] = $scope.images_update[2] == undefined ? '' : $scope.images_update[2];
                //}
            };
            //提交验证
            $scope.validateComfirm = function () {
                if($("#ERR_DESCR").val() == ''){
                    showAlert.showMsg('','','请输入缺陷名称');
                    return false;
                }
                if($("#sbztid").val() == ''){
                    showAlert.showMsg('','','请选择设备状态');
                    return false;
                }
                if($("#qxflid").val() == ''){
                    showAlert.showMsg('','','请选择缺陷分类');
                    return false;
                }
                if($("#qxzyid").val() == ''){
                    showAlert.showMsg('','','请选择缺陷专业');
                    return false;
                }
                if($("#sbcodeid").val() == ''){
                    showAlert.showMsg('','','请扫描设备');
                    return false;
                }
                /*if($("#sbmcValue").val() == ''){
                    showAlert.showMsg('','','请选择设备');
                    return false;
                }*/
                if($("#zxbmid").val() == ''){
                    showAlert.showMsg('','','请选择设备部门');
                    return false;
                }
                if($("#xianxid").val() == ''){
                    showAlert.showMsg('','','请选择现象');
                    return false;
                }
                if($("#qxmsid").val() == ''){
                    showAlert.showMsg('','','请输入缺陷描述');
                    return false;
                }
                return true;
            }
            //提交缺陷
            $scope.commitdefectfill = function () {//提交新缺陷
                if ($scope.validateComfirm()) {
                    var fList = $scope.images_list;
                    var fileName = '';
                    if (fList.length > 0) {
                        fileName = "hasFile";
                    }
                    $scope.imgTransform();
                    loadingAnimation.showLoading('数据载入中', 'loding', 0);
                    var params = {
                        ERR_DESCR: $("#ERR_DESCR").val(),//缺陷名称
                        SYSTEM_STATUS: $("#sbztid").val(),//设备状态
                        QX_TYPE: $("#qxflid").val(),//缺陷分类
                        FAULT_DEPARTMENT: $("#qxzyid").val(),//缺陷专业
                        MCH_CODE: $("#sbcodeid").val(),//设备编号
                        ORG_CODE: zxbmCode,//执行部门
                        ERR_SYMPTOM: xxCode,//现象
                        ERR_DESCR_LO: $("#qxmsid").val(),//缺陷描述
                        FILE_NAME: fileName,//图片流文件
                        FILE0: $scope.images_update[0].replace(/=/g, '!fs!'),
                        FILE1: $scope.images_update[1].replace(/=/g, '!fs!'),
                        FILE2: $scope.images_update[2].replace(/=/g, '!fs!'),
                        COUNT: '' + $scope.images_list.length
                    };
                    console.log("params==="+JSON.stringify(params));
                    $http.post('ServiceName=DefectManageService&TransName=funCreateFaultMainFromApp', params)
                        .then(function (res) {
                            showAlert.showMsg('', '', '恭喜您，添加新缺陷成功');
                            //清空input值
                            $("input").val('');
                            $('textarea').val('');
                            $scope.images_list = [];
                            loadingAnimation.hideLoading();
                        }, function (error) {
                            loadingAnimation.hideLoading();
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                        });
                }
                /*else {
                    showAlert.showMsg('','','请输入缺陷属性字段！');
                }*/
            };
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
