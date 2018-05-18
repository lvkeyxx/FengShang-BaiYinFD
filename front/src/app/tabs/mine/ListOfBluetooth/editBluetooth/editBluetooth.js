angular.module('BaiYin.EditBluetooth', [])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('EditBluetooth', {
			url: '/editBluetooth',
			controller: 'EditBluetoothController',
			templateUrl: 'tabs/mine/ListOfBluetooth/editBluetooth/editBluetooth.tpl.html',
			cache: 'false',
            authorizedRuleType: ['1', '0'],
            params: {item: null}
		})
	}])
	.controller('EditBluetoothController', ['$scope', '$http', '$ionicHistory', '$ionicPopup', 'loadingAnimation', 'showAlert', '$stateParams',
		function($scope, $http, $ionicHistory, $ionicPopup, loadingAnimation, showAlert, $stateParams) {
            $scope.device = new Object();
            $scope.$on('$ionicView.enter', function () {
				$scope.device = $stateParams.item.device ? $stateParams.item.device : new Object();
			});

			//保存数据
			$scope.save = function(){
				$http.post("ServiceName=ClockService&TransName=entryBluetooth", {
					address: $scope.device.address,
					sn_code: $scope.device.id.replace(/:/g, ""),
					bluetooth_desc: $scope.device.bluetooth_desc
				}).then(function (res) {
					showAlert.showMsg("", '', '录入成功', '确认')
				}, function (error) {
					showAlert.showMsg(error, '', '', '确认')
				});
			};

			//取消
			$scope.back = function(){
				history.go(-1);
			};
        }
	]);