angular.module('BaiYin.OSI.OSILine', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OSI/OSILine', {
            url: '/OSI/OSILine',
            controller: 'OSILineController',
            templateUrl: 'OSI/OSILine/OSILine.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                TEMP_ID: null,
                DESCRIPTION: null,
                INSPECT_TYPE: null,
                START_TIME: null,
                END_TIME: null,
                INSPECTED: null,
                INSPECT: null
            }
        })
    }])
    .controller('OSILineController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function () {
                /*$scope.qdTimeHide = false;
                $scope.djqdTimeHide = true;*/
                $scope.itemQdBtnhide = true;
                $scope.inputHide = true;
                $scope.positionHide = true;
                $scope.OSIDetailHide=false;
                if(localStorage.getItem("OSI_LINE")){
                    console.log("localstorage====");
                    var obj = JSON.parse(localStorage.getItem("OSI_LINE"));
                    $scope.tempID = obj.tempID;
                    $scope.description = obj.description;
                    $scope.inspectType = obj.inspectType;
                    $scope.INSPECTED = obj.INSPECTED;
                    $scope.INSPECT = obj.INSPECT;
                    $scope.startTime = obj.startTime;
                    $scope.endTime = obj.endTime;
                }else{
                    console.log("params====");
                    $scope.tempID = $stateParams.TEMP_ID;
                    $scope.description = $stateParams.DESCRIPTION;
                    $scope.inspectType = $stateParams.INSPECT_TYPE;
                    $scope.INSPECTED = $stateParams.INSPECTED;
                    $scope.INSPECT = $stateParams.INSPECT;
                    $scope.startTime = $stateParams.START_TIME;
                    $scope.endTime = $stateParams.END_TIME;
                }
                localStorage.removeItem("OSI_LINE");
                $scope.amount = 0;
                //是否显示扫码
                console.log("INSPECTED==" + $scope.INSPECTED + "/INSPECT==" + $scope.INSPECT);
                if ($scope.INSPECTED == $scope.INSPECT) {
                    // $scope.inputHide = true;
                }
                //签到样式
                $scope.identify = {
                    'padding': '5px',
                    'line-height': '35px',
                    'border-radius': '50%',
                    'display': 'inline-block',
                    'float': 'left',
                    'color': '#fff',
                    'margin-right': '10px',
                    'font-size': '12px',
                    'width': '45px',
                    'text-align': 'center'
                }

                HistoryDetail($scope.tempID);
            });

            function HistoryDetail(tempid) {
                console.log("tempid==" + tempid);
                var parmas = {
                    TEMP_ID: tempid
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=InspectionService&TransName=cInspectRouteDetailPage', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.hDetail = res.data.dList;
                            console.log(res.data);
                            console.log("$scope.hDetail===" + JSON.stringify($scope.hDetail));
                            for (var i = 0; i < $scope.hDetail.length; i++) {
                                if ($scope.hDetail[i].RECORD_TIME == '' || $scope.hDetail[i].RECORD_TIME == null) {
                                    /*$scope.identifyShow = '未签到';*/
                                    console.log('', '', 'i==' + i);
                                    $("#qdIconColorid" + i).css('background', '#ccc');
                                    $("#qdIconColorid" + i).text('未签到');
                                } else {
                                    $("#qdIconColorid" + i).text('已签到');
                                    $("#qdIconColorid" + i).css("background", "#83ecad");
                                }
                            }
                            console.log("$scope.hDetail==" + JSON.stringify($scope.hDetail));
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            //点击扫二维码
            $scope.toScanCode = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeDataText = barcodeData.text;
                        $scope.barcodeData = eval("(" + $scope.barcodeDataText + ")");
                        $scope.patrolLine($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT, $scope.tempID);
                    }, function (error) {
                        console.log("ERROR:" + error);
                    });
            }
            var planID;
            $scope.patrolLine = function (MCH_CODE, CONTRACT, tempid) {
                var params = {
                    MCH_CODE: MCH_CODE,
                    CONTRACT: CONTRACT,
                    TEMP_ID: tempid
                }
                $http.post('ServiceName=InspectionService&TransName=formCBluetoothEquip', params)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            $scope.patrolLine = res.data.detail;
                            planID = $scope.patrolLine.PLAN_ID;
                            if ($scope.patrolLine.IS_MATCH == 'TRUE') {
                                //扫描蓝牙
                                blueToothEnable($scope.patrolLine.SN_ADDRESS);
                            }
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }

            //开启本机蓝牙
            function blueToothEnable(SN_ADDRESS) {
                ble.enable(
                    function () {
                        scanBlueTooth(SN_ADDRESS);
                    },
                    function () {
                        showAlert.showMsg("", "", "打开蓝牙失败！");
                    }
                );
            }
            //扫描蓝牙
            function scanBlueTooth(SN_ADDRESS) {
                ble.scan([], 5, function (device) {
                        //成功的回调函数
                        if (device.id == SN_ADDRESS) {
                            signedLightUp();
                            /*$scope.$apply(function(){
                                // $scope.inputHide = true;
                                $scope.positionHide = false;
                            });*/
                        }
                    }, function () {
                        //失败的回调函数
                        showAlert.showMsg('', '', "未扫描到有效蓝牙！");
                    }
                );
            }

            function signedLightUp() {

                for (var i = 0; i < $scope.hDetail.length; i++) {
                    if (planID == $scope.hDetail[i].PLAN_ID) {
                        //显示签到按钮
                        $(".itemQdBtn" + i).show();
                    }
                }
                /*if(planID == ''){
                    alert("匹配成功----");
                }*/

            }

            //点击签到
            $scope.toSigned = function (obj, num) {
                $("#recordID").attr("disabled", true);
                var params = {
                    BLUETOOTH_SERIAL_NO: $scope.patrolLine.BLUETOOTH_SERIAL_NO,
                    PLAN_ID: obj.PLAN_ID,
                    LOCATION_DESCRIPTION: $scope.patrolLine.ADDRESS,
                    IS_MATCH: $scope.patrolLine.IS_MATCH,
                    EQUIP_NO: $scope.patrolLine.MCH_CODE,
                    CONTRACT: $scope.patrolLine.CONTRACT
                };
                $http.post('ServiceName=InspectionService&TransName=inspectRecord', params)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            showAlert.showMsg('', '', '恭喜您，签到成功');
                            $("#recordTimeid" + num).hide();
                            $("#newRecordTimeid" + num).show();
                            //签到按钮隐藏
                            $scope.itemQdBtnHide = true;
                            //颜色变蓝色
                            $("#qdIconColorid" + num).css('background', '#83ecad');
                            $("#qdIconColorid" + num).text('已签到');
                            //显示签到时间
                            $scope.recordTime = res.data.RECORD_TIME;

                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });

            }

            //跳转到巡检记录
            $scope.toOsiHistory = function () {
                $state.go('OSI/OSIHistory');
                //载入缓存数据
                var obj = {
                    tempID: $scope.tempID,
                    description: $scope.description,
                    inspectType: $scope.inspectType,
                    INSPECTED: $scope.INSPECTED,
                    INSPECT: $scope.INSPECT,
                    startTime: $scope.startTime,
                    endTime: $scope.endTime
                };
                localStorage.setItem("OSI_LINE",JSON.stringify(obj));

            }
            //点击搜索蓝牙
            $scope.searchsBlueTooth = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                openblueToothEnable();
            }
            //开启本机蓝牙
            function openblueToothEnable() {
                ble.enable(
                    function () {
                        scansBlueToothnow();
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("","","蓝牙未开启");
                    }
                );
            }
            //扫描蓝牙
            function scansBlueToothnow() {
                $scope.equipToothList = [];
                $scope.timer = $timeout(function () {
                    loadingAnimation.hideLoading();
                    if ($scope.equipToothList.length > 0) {
                        upWindows($scope.equipToothList);
                    } else {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "未扫描到蓝牙设备");
                    }
                }, 5000);
                ble.scan([], 5, function (device) {//成功的回调函数
                        getBluesToothList(device);
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "扫描蓝牙失败");
                    }
                );
            }
            //弹出页面，显示扫描到的设备
            var searchequipPopup;

            function upWindows(equipToothList) {
                searchequipPopup = $ionicPopup.show({
                    template:'<div>' +
                    '<ul>' +
                    '<li id="devices_{{$index}}" ng-click="selectsBlueTooth($index)" ng-repeat="equipTooth in equipToothList track by $index" ng-style="searchPopupli">' +
                    '{{equipTooth.ADDRESS}}' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                    title: '扫描到的蓝牙设备',
                    scope: $scope,
                });
            }
            //获取蓝牙列表
            function getBluesToothList(device) {
                $http.post('ServiceName=InspectionService&TransName=formSBluetoothEquip&SN_CODE=' + device.id)
                    .then(function (res) {
                        if (res.data.code == '0') {
                            $scope.equipToothdetail=res.data.dList;
                            for(var i=0;i<$scope.equipToothdetail.length;i++){
                                $scope.equipToothList.push($scope.equipToothdetail[i]);
                            }
                        } else {
                            showAlert.showMsg(res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            $scope.searchPopupli = {
                "line-height": "35px",
                "font-size": "12px",
                "text-align": "center",
                "border-bottom": "1px dotted #f4f4f4",
            };
            //点击选择蓝牙设备
            $scope.selectsBlueTooth = function (index) {
                searchequipPopup.close();
                var MCH_CODE= $scope.equipToothList[index].MCH_CODE;
                var CONTRACT= $scope.equipToothList[index].CONTRACT;
                $scope.patrolHome(MCH_CODE, CONTRACT);
                $scope.OSIDetailHide=true;
                $scope.positionHide = false;

            }

        }
    ])
