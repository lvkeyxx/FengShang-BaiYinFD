angular.module('BaiYin.OffLine', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OffLine', {
            url: '/OffLine',
            controller: 'OffLineController',
            templateUrl: 'OffLine/OffLine.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('OffLineController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker', '$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker, $cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.OffLineClocki='';
                $scope.OffLineClockj='';
                $scope.positionHide = true;/*签到*/
                $scope.inputHide = false;/*扫描设备二维码按钮*/
                $scope.searchsBlueHide=false;/*搜索按钮*/
                $scope.osiListHide=false;/*下载列表*/
                $scope.OfflineMyHide=true;/*上传列表*/
                $scope.uanddHide=false;/*下载按钮*/
                $scope.UploadHide=true;/*上传返回*/
                localStorage.setItem('notUp',0);
                $scope.notUp=localStorage.getItem('notUp');
                if(localStorage.getItem("OffList")){
                    var OffList= JSON.parse(localStorage.getItem("OffList"))
                    $scope.patrolRoteListData = OffList;
                }else{
                    $scope.patrolRoteListData=[];
                }
                if(localStorage.getItem("OffLineSignList")){
                    var OffLineSignList= JSON.parse(localStorage.getItem("OffLineSignList"))
                    $scope.OffLineSignIn= OffLineSignList;
                }else{
                    $scope.OffLineSignIn=[];
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
            });
            //跳转到巡检线路
            $scope.toOsiLine = function (obj) {
                var params = {
                    DESCRIPTION:obj.DESCRIPTION,
                    TEMP_ID:obj.TEMP_ID,
                    START_TIME:obj.START_TIME,
                    END_TIME:obj.END_TIME,
                    INSPECT_TYPE:obj.INSPECT_TYPE,
                    INSPECTED:obj.INSPECTED,
                    INSPECT:obj.INSPECT,
                    childList:obj.childList
                }
                console.log(obj.childList);
                $state.go('OffLine/OffLineDetail',params);
            }

            /*扫描二维码开始阶段*/

            //点击扫二维码
            $scope.toScanCode = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeDataText = barcodeData.text;
                        $scope.barcodeData = eval("(" + $scope.barcodeDataText + ")");
                        $scope.patrolHome($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);
                    }, function (error) {

                    });
            }
            //获取设备位置和名称
            $scope.patrolHome = function (MCH_CODE, CONTRACT) {
                var OffLinenumber=0;
                for(var i=0;i<$scope.patrolRoteListData.length;i++){
                    var childListOF=$scope.patrolRoteListData[i].childList;
                    for(var j=0;j<childListOF.length;j++){
                        if(childListOF[j].MCH_CODE==MCH_CODE){
                            OffLinenumber++;
                            if(childListOF[j].RECORD_TIME!='' && childListOF[j].RECORD_TIME!=null){
                                continue;
                            }else{
                                if(childListOF[j].IS_MATCH=='TRUE'){
                                    $scope.OFFlineHomeData=childListOF[j];
                                    var OffLinesClocki=i;
                                    var OffLinesClockj=j;
                                    blueToothEnable(childListOF[j].SN_CODE,OffLinesClocki,OffLinesClockj);
                                    return;
                                }else{
                                    $scope.OffLineClocki=i;
                                    $scope.OffLineClockj=j;
                                    $scope.patrolHomeData=childListOF[j];
                                    $scope.inputHide = true;
                                    $scope.osiListHide=true;
                                    $scope.positionHide = false;
                                    $scope.uanddHide=true;
                                    return;
                                }
                            }
                        }
                    }
                }
                if(OffLinenumber=0){
                    showAlert.showMsg('', '', "没有匹配到巡查路线！");
                }
            }
            //开启本机蓝牙
            function blueToothEnable(SN_CODE,OffLinesClocki,OffLinesClockj) {
                ble.enable(
                    function () {
                        // alert('开启蓝牙!');
                        scanBlueTooth(SN_CODE,OffLinesClocki,OffLinesClockj);
                    },
                    function () {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg("", "", "打开蓝牙失败！");
                    }
                );
            }
            //扫描蓝牙
            function scanBlueTooth(SN_CODE,OffLinesClocki,OffLinesClockj) {
                loadingAnimation.hideLoading();
                ble.scan([], 5, function (device) {
                        //成功的回调函数
                    // alert(JSON.stringify(device));
                    var SNdeviceID=device.id.replace(new RegExp(/(:)/g),"");
                    var scansccode=0;
                        if (SNdeviceID==SN_CODE) {
                            scansccode=scansccode+1;
                            $scope.OffLineClocki=OffLinesClocki;
                            $scope.OffLineClockj=OffLinesClockj;
                            $scope.patrolHomeData=$scope.OFFlineHomeData;
                            $scope.inputHide = true;
                            $scope.osiListHide=true;
                            $scope.positionHide = false;
                            $scope.uanddHide=true;
                        }
                    }, function () {
                        //失败的回调函数
                        loadingAnimation.hideLoading();
                        showAlert.showMsg('', '', "未扫描到有效蓝牙！");
                    }
                );
                if(scansccode==0){
                    showAlert.showMsg('', '', "该二维码无效！");
                }
            }
            /*扫描二维码结束阶段*/


            /*搜索蓝牙开始阶段*/

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
                $scope.OffToothList = [];
                $scope.timer = $timeout(function () {
                    loadingAnimation.hideLoading();
                    if ($scope.OffToothList.length > 0) {
                        upWindows($scope.OffToothList);
                    } else {
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
            //获取蓝牙列表
            function getBluesToothList(device) {
                var Offlinetooth=0;
                var SNID=device.id.replace(new RegExp(/(:)/g),"");
                for(var i=0;i<$scope.patrolRoteListData.length;i++){
                    var childListOFs=$scope.patrolRoteListData[i].childList;
                    for(var j=0;j<childListOFs.length;j++){
                        if(childListOFs[j].RECORD_TIME!='' && childListOFs[j].RECORD_TIME!=null){
                            continue;
                        }
                        else{
                            if(childListOFs[j].IS_MATCH_MCH=="FALSE" && childListOFs[j].IS_MATCH=="TRUE"){
                                if(childListOFs[j].SN_CODE==SNID){
                                    Offlinetooth++;
                                    childListOFs[j].OffLineClocki=i;
                                    childListOFs[j].OffLineClockj=j;
                                    $scope.OffToothList.push(childListOFs[j])
                                }
                            }

                        }

                    }
                }
                if(Offlinetooth=0){
                    showAlert.showMsg('', '', "未扫描到计划内的蓝牙设备");
                }
            }
            //弹出页面，显示扫描到的设备
            var searchequipPopup;
            function upWindows(OffToothList) {
                searchequipPopup = $ionicPopup.show({
                    template:'<div>' +
                    '<ul>' +
                    '<li id="devices_{{$index}}" ng-click="selectsBlueTooth($index)" ng-repeat="equipTooth in OffToothList track by $index" ng-style="searchPopupli">' +
                    '{{equipTooth.ADDRESS}}' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                    title: '扫描到的蓝牙设备',
                    scope: $scope,
                });
            }
            $scope.searchPopupli = {
                "line-height": "35px",
                "font-size": "12px",
                "text-align": "center",
                "border-bottom": "1px dotted #f4f4f4",
            };
            //点击选择蓝牙设备
            $scope.selectsBlueTooth= function (index) {
                searchequipPopup.close();
                // alert(JSON.stringify($scope.OffToothList))
                $scope.patrolHomeData=$scope.OffToothList[index];
                $scope.OffLineClocki=$scope.OffToothList[index].OffLineClocki;
                $scope.OffLineClockj=$scope.OffToothList[index].OffLineClockj;
                $scope.searchsBlueHide=true;
                $scope.osiListHide=true;
                $scope.positionHide = false;
                $scope.uanddHide=true;
            }

            /*搜索蓝牙结束阶段*/

            //首页签到 点击签到事件
            $scope.OffLineSign = function () {
                if($scope.patrolHomeData.INSPECT_TYPE=="周"){
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE=="周"){
                            var LineSignchildren=$scope.patrolRoteListData[i].childList;
                            for(var j=0;j<LineSignchildren.length;j++){
                                if(LineSignchildren[j].RECORD_TIME!='' && LineSignchildren[j].RECORD_TIME!=null){
                                    var nowdate=new Date();
                                    var month = nowdate.getMonth()+ 1;
                                    var strDate = nowdate.getDate();
                                    if (month >= 1 && month <= 9) {
                                        month = "0" + month;
                                    }
                                    if (strDate >= 0 && strDate <= 9) {
                                        strDate = "0" + strDate;
                                    }
                                    var nowdays=nowdate.getFullYear()+'-'+month+'-'+strDate;
                                    var olddate=LineSignchildren[j].RECORD_TIME.substr(0,10);
                                    if(nowdays==olddate){
                                        showAlert.showMsg('', '', "执行周巡查计划时间间隔不能小于一天!");
                                        return false;
                                    }
                                }
                            }
                        }
                    }

                }
                if($scope.patrolHomeData.INSPECT_TYPE=="月"){
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE=="月"){
                            var LineSignchildren=$scope.patrolRoteListData[i].childList;
                            for(var j=0;j<LineSignchildren.length;j++){
                                if(LineSignchildren[j].RECORD_TIME!='' && LineSignchildren[j].RECORD_TIME!=null){
                                    var nowdate=new Date();
                                    var month = nowdate.getMonth()+ 1;
                                    var strDate = nowdate.getDate();
                                    if (month >= 1 && month <= 9) {
                                        month = "0" + month;
                                    }
                                    if (strDate >= 0 && strDate <= 9) {
                                        strDate = "0" + strDate;
                                    }
                                    var nowdays=nowdate.getFullYear()+'-'+month+'-'+strDate;
                                    var olddate=LineSignchildren[j].RECORD_TIME.substr(0,10);
                                    if(nowdays==olddate){
                                        showAlert.showMsg('', '', "执行月巡查计划时间间隔不能小于一天!");
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                if($scope.patrolHomeData.INSPECT_TYPE=="季"){
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE=="季"){
                            var LineSignchildren=$scope.patrolRoteListData[i].childList;
                            for(var j=0;j<LineSignchildren.length;j++){
                                if(LineSignchildren[j].RECORD_TIME!='' && LineSignchildren[j].RECORD_TIME!=null){
                                    var nowdate=new Date();
                                    var month = nowdate.getMonth()+ 1;
                                    var strDate = nowdate.getDate();
                                    if (month >= 1 && month <= 9) {
                                        month = "0" + month;
                                    }
                                    if (strDate >= 0 && strDate <= 9) {
                                        strDate = "0" + strDate;
                                    }
                                    var nowdays=nowdate.getFullYear()+'-'+month+'-'+strDate;
                                    var olddate=LineSignchildren[j].RECORD_TIME.substr(0,10);
                                    if(nowdays==olddate){
                                        showAlert.showMsg('', '', "执行季巡查计划时间间隔不能小于一天!");
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                if($scope.patrolHomeData.INSPECT_TYPE=="日"){
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE=="日"){
                            var LineSignchildren=$scope.patrolRoteListData[i].childList;
                            for(var j=0;j<LineSignchildren.length;j++){
                                if(LineSignchildren[j].RECORD_TIME!='' && LineSignchildren[j].RECORD_TIME!=null){
                                    var olddate=LineSignchildren[j].RECORD_TIME;
                                    var timestamp =parseInt(new Date(olddate).getTime()/1000);
                                    var nowdates=parseInt(new Date().getTime()/1000);
                                    if((nowdates-timestamp)<7200){
                                        showAlert.showMsg('', '', "执行日巡查计划时间间隔不能小于两小时!");
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                var params = {
                    BLUETOOTH_SERIAL_NO:$scope.patrolHomeData.BLUETOOTH_SERIAL_NO,
                    LOCATION_DESCRIPTION:$scope.patrolHomeData.ADDRESS,
                    IS_MATCH:$scope.patrolHomeData.IS_MATCH,
                    PLAN_ID:$scope.patrolHomeData.PLAN_ID,
                    EQUIP_NO:$scope.patrolHomeData.MCH_CODE,
                    CONTRACT:$scope.patrolHomeData.CONTRACT,
                    MCH_NAME:$scope.patrolHomeData.MCH_NAME,
                    DESCRIPTION:$scope.patrolHomeData.DESCRIPTION,
                    RECORD_TIME:getNowFormatDate(),
                    IS_sign:false,
                }
                if(typeof $scope.OffLineClockj === "undefined" || $scope.OffLineClockj === null || $scope.OffLineClockj === ""){

                }else{
                    for(var i=0;i<$scope.patrolRoteListData.length;i++){
                        if($scope.patrolRoteListData[i].INSPECT_TYPE==$scope.patrolHomeData.INSPECT_TYPE){
                            $scope.patrolRoteListData[i].INSPECTED=parseInt($scope.patrolRoteListData[i].INSPECTED)+1;
                        }
                        for(var j=0;j<$scope.patrolRoteListData[$scope.OffLineClocki].childList.length;j++){
                            if(j==$scope.OffLineClockj){
                                $scope.patrolRoteListData[$scope.OffLineClocki].childList[$scope.OffLineClockj].RECORD_TIME=getNowFormatDate();
                            }
                        }
                    }
                }
                localStorage.setItem("OffList",JSON.stringify($scope.patrolRoteListData));
                $scope.OffLineSignIn.push(params);
                localStorage.setItem("OffLineSignList",JSON.stringify($scope.OffLineSignIn));
                showAlert.showMsg('', '', "离线签到成功,请及时到有网的地方上传!");
                $scope.positionHide = true;
                $scope.inputHide = false;
                $scope.searchsBlueHide=false;
                $scope.osiListHide=false;
                $scope.uanddHide=false;

            }
            /**
             * @author:Grant
             * @remark:获取当前时间
             * @return:datetime
             */
            function getNowFormatDate() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
                return currentdate;
            }
            //返回事件
            $scope.goBack = function () {
                $scope.OffLineClocki='';
                $scope.OffLineClockj='';
                $scope.positionHide = true;
                $scope.inputHide = false;
                $scope.searchsBlueHide=false;
                $scope.osiListHide=false;
                $scope.uanddHide=false;
            }
            /*点击下载*/
            $scope.OffLineDownload=function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=InspectionService&TransName=downLoadXcData')
                        .then(function (res) {
                            if (res.code == 0) {
                                loadingAnimation.hideLoading();
                                if(res.data.code==1){
                                    showAlert.showMsg('', '', res.data.msg);
                                    return false;
                                }
                                showAlert.showMsg('', '', "下载巡查路线成功");
                                var obj =res.data.deList;
                                localStorage.setItem("OffList",JSON.stringify(obj));
                                var OffList= JSON.parse(localStorage.getItem("OffList"))
                                $scope.patrolRoteListData = OffList;
                                $scope.OfflineList=new Array();
                                for(var i=0;i<OffList.length;i++){
                                    $scope.OfflineList=$scope.OfflineList.concat(res.data.deList[i].childList);
                                }
                                console.log($scope.OfflineList);
                                localStorage.setItem("OfflineList",JSON.stringify($scope.OfflineList));
                                for(var l=0;i<$scope.OfflineList.length;l++){
                                    console.log($scope.OfflineList[l].RECORD_TIME);
                                }
                            } else {
                                showAlert.showMsg('', '', res.msg);
                            }
                        }, function (error) {
                            showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                        });
            }
            /*点击查看巡查记录*/
            $scope.OffLineLook=function () {
                if(localStorage.getItem("OffLineSignList")){
                    $state.go('OffLine/OffLineLook');
                }else{
                    showAlert.showMsg('', '', "还未有巡查记录!");
                }
            }
        }
    ])
