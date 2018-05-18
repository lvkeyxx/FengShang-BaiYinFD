angular.module('BaiYin.facilityInfo', [
    'ionic',
])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('facilityInfo', {
            url: '/facilityInfo',
            controller: 'facilityInfoController',
            templateUrl: 'facilityInfo/facilityInfo.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('facilityInfoController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', 'ionicDatePicker','$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, ionicDatePicker,$cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function() {

            });
            $scope.$on('$ionicView.leave', function() {

            });
            $scope.toScanCode = function () {
                $cordovaBarcodeScanner.scan()
                    .then(function (barcodeData) {
                        $scope.barcodeDataText = barcodeData.text;
                        $scope.barcodeData = eval("(" + $scope.barcodeDataText + ")");
                        // localStorage.remove("scanList");
                        $scope.scanInfo($scope.barcodeData.MCH_CODE, $scope.barcodeData.CONTRACT);
                    }, function (error) {

                    });
            }
            $scope.scanInfo=function (MCH_CODE,CONTRACT) {
                var obj = {"MCH_CODE":MCH_CODE,"CONTRACT":CONTRACT}
                localStorage.setItem("scanList",JSON.stringify(obj));
                $state.go('facilityInfoScan');

            }
        }
    ])
