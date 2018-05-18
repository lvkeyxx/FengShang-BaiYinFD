angular.module('BaiYin.InspectionRecord', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('InspectionRecord', {
            url: '/facilityInfo/InspectionRecord',
            controller: 'InspectionRecordController',
            templateUrl: 'facilityInfo/InspectionRecord/InspectionRecord.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                MCH_CODE: null,
                PERSON_ID:null
            }
        })
    }])
    .controller('InspectionRecordController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker','$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker,$cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function() {
                console.log('=====ceshi===');
                console.log($stateParams.item);
                // $scope.MCH_CODE=$stateParams.MCH_CODE;
                // $scope.PERSON_ID=$stateParams.PERSON_ID;
                var PatrolList= JSON.parse(localStorage.getItem("PatrolList"));
                $scope.MCH_CODE=PatrolList.MCH_CODE;
                $scope.PERSON_ID=PatrolList.PERSON_ID;
                $scope.goInspection()
            });
            /**
             * @author:Grant
             * @remark:根据二维码扫描到的信息获取巡查记录
             * @parameter:扫描到的二维码信息(MCH_CODE,CONTRACT)
             * request:POST{ServiceName:EquipService,TransName:inspectionRecordAsE}
             * field:$scope.InspectiomRecordList
             */
            $scope.goInspection=function () {
                var MCH_CODE=$scope.MCH_CODE;
                var PERSON_ID=$scope.PERSON_ID;
                facilityInspectionList(MCH_CODE, PERSON_ID);
            }

            function facilityInspectionList(MCH_CODE,PERSON_ID) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params = {
                    MCH_CODE:MCH_CODE,
                    PERSON_ID:PERSON_ID
                }
                $http.post('ServiceName=EquipService&TransName=inspectionRecordAsEP',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            console.log(res);
                            $scope.InspectiomRecordList=res.data.rList;
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            $scope.goInspectionDetail=function (RecordList) {
                console.log(RecordList)
                // var params = {
                //     RecordList:RecordList
                // }
                var params = {
                    MCH_CODE:RecordList.MCH_CODE,
                    PERSON_ID:RecordList.PERSON_ID,
                    PLAN_ID:RecordList.PLAN_ID,
                }
                $state.go('InspectionRecordDetail',params);
            }

        }
    ])
