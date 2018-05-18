angular.module('BaiYin.InspectionRecordDetail', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('InspectionRecordDetail', {
            url: '/facilityInfo/InspectionRecordDetail',
            controller: 'InspectionRecordDetailController',
            templateUrl: 'facilityInfo/InspectionRecordDetail/InspectionRecordDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {
                MCH_CODE: null,
                PERSON_ID: null,
                PLAN_ID: null
            }
        })
    }])
    .controller('InspectionRecordDetailController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker','$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker,$cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function() {
                console.log($stateParams)
                $scope.MCH_CODE=$stateParams.MCH_CODE;
                $scope.PERSON_ID=$stateParams.PERSON_ID;
                $scope.PLAN_ID=$stateParams.PLAN_ID;
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
                var PLAN_ID=$scope.PLAN_ID;
                facilityInspectionList(MCH_CODE, PERSON_ID,PLAN_ID);
            }

            function facilityInspectionList(MCH_CODE,PERSON_ID,PLAN_ID) {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var params = {
                    MCH_CODE:MCH_CODE,
                    PERSON_ID:PERSON_ID,
                    PLAN_ID:PLAN_ID
                }
                $http.post('ServiceName=EquipService&TransName=inspectionRecordAsEPP',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.code == 0) {
                            console.log(res);
                            $scope.InspectiomRecordDetailList=res.data.rList;
                        } else {
                            showAlert.showMsg('', '', res.msg);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
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

        }
    ])
