angular.module('BaiYin.OffLine.OffLineLook', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('OffLine/OffLineLook', {
            url: '/OffLine/OffLineLook',
            controller: 'OffLineLookController',
            templateUrl: 'OffLine/OffLineLook/OffLineLook.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {},
        })
    }])
    .controller('OffLineLookController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$cordovaBarcodeScanner',
        function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $cordovaBarcodeScanner) {
            $scope.$on('$ionicView.afterEnter', function () {
                var OffLineUpList= JSON.parse(localStorage.getItem("OffLineSignList"));
                // alert(JSON.stringify(OffLineUpList))
                $scope.hDetail=OffLineUpList;
                //签到样式
                $scope.identify = {
                    'padding': '5px',
                    'line-height': '60px',
                    'border-radius': '50%',
                    'display': 'inline-block',
                    'float': 'left',
                    'color': '#fff',
                    'margin-right': '10px',
                    'font-size': '12px',
                    'width': '71px',
                    'text-align': 'center'
                }
            });
            /*点击上传*/
            $scope.OffLineUpload=function () {
                var params = {
                    OffLineUpList:$scope.hDetail
                }
                $http.post('ServiceName=InspectionService&TransName=upLoadXcData',params)
                    .then(function (res) {
                        console.log(res);
                        if (res.code == 0) {
                            showAlert.showMsg('', '', '上传成功!');
                            $scope.hDetail=[];
                            localStorage.removeItem('OffLineSignList');
                            localStorage.removeItem('OffList');
                            $state.go('OffLine');
                        }else {
                            showAlert.showMsg('', '', '上传失败,请稍后再试!');
                            localStorage.setItem("OffLineSignList",JSON.stringify($scope.hDetail));
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
            }
            /*点击删除*/
            $scope.dealOffLine=function (detailList,index) {
                console.log(detailList,index);
                $scope.hDetail.splice(index,1);
                console.log($scope.hDetail.length);
                if($scope.hDetail.length==0){
                    localStorage.removeItem('OffLineSignList');
                    $state.go('OffLine');

                }else{
                    localStorage.setItem("OffLineSignList",JSON.stringify($scope.hDetail));
                }
            }
        }
    ])
