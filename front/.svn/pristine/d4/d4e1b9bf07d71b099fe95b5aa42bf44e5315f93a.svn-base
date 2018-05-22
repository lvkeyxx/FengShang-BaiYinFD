angular.module('BaiYin.ListOfBluetooth', [
		'BaiYin.EditBluetooth'
	])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('ListOfBluetooth', {
			url: '/ListOfBluetooth',
			controller: 'ListOfBluetoothController',
			templateUrl: 'tabs/mine/ListOfBluetooth/ListOfBluetooth.tpl.html',
			cache: 'false',
			authorizedRuleType: ['1', '0']
		})
	}])
	.controller('ListOfBluetoothController', ['$scope', '$http', '$ionicHistory', '$ionicPopup', 'loadingAnimation', 'showAlert', '$state',
		function($scope, $http, $ionicHistory, $ionicPopup, loadingAnimation, showAlert, $state) {
			//按钮内容
			$scope.bottonText = "搜索";
			//已知蓝牙列表
			$scope.known = new Array();
			//未知蓝牙列表
			$scope.unknown = new Array();
			//初始化数据
			var initPage = function(){
				$scope.bottonText = "搜索";
				$scope.known = new Array();
				$scope.unknown = new Array();
			};

			$scope.$on('$ionicView.enter', function () {
				initPage();
			});
			//点击搜索按钮
			$scope.bluetooth = function(){
				if($scope.bottonText == "搜索"){
					initPage();

					ble.enable(function () {
						startScan();
					}, function () {
						showAlert.showMsg("", "", "未打开蓝牙");
					} );
				}
			};
			//改变按钮内容
			var changeBotton = function(){
				$scope.$apply(function(){
                    if($scope.bottonText == "搜索"){
                        $scope.bottonText = "<i class='icon ion-load-c'></i>";
                    }else{
                        $scope.bottonText = "搜索";
                    }
                });
			};
			//开始搜素蓝牙
			var startScan = function(){
				changeBotton();

				setTimeout(function(){
					endScan();
				}, 5000);

				ble.scan([], 5,function(device){
					device.distance = Math.round(device.distance * 10) / 10;
					matching(device);
				}, function(){
					endScan();
					showAlert.showMsg("", "", "扫描蓝牙出错");
				});
			};
			//结束搜索蓝牙
			var endScan = function(){
				ble.stopScan(changeBotton, changeBotton);
			};
			//查询蓝牙信息
			var matching = function(device){
				$http.post('ServiceName=ClockService&TransName=bluetoothInSystem&SN=' + device.id.replace(/:/g, ""))
                    .then(function (res) {
                        if (res.data.code == '0') {
							res.data.detail[0].device = device;
							$scope.known.push(res.data.detail[0]);
                        } else {
							$scope.unknown.push(device);
                        }
                    }, function (error) {
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
			}
			//去录入页面
			$scope.toEdit = function(data){
				$state.go("EditBluetooth", {item: data});
			};
        }
	]);