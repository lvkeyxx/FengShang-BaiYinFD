angular
	.module('BaiYin.OSI.OSIPersonnelEquipment', [
		'ionic',
	])
	.config(['$stateProvider', 'ionicDatePickerProvider', function($stateProvider, ionicDatePickerProvider) {
		$stateProvider.state('OSI/OSIPersonnelEquipment', {
			url: '/OSI/OSIPersonnelEquipment',
			controller: 'OSIPersonnelEquipmentController',
			templateUrl: 'OSI/OSIcount/OSIPersonnelEquipment/OSIPersonnelEquipment.tpl.html',
			cache: 'true',
			authorizedRuleType: ['1'],
			params: {item: new Object()}
		});
	}])
	.controller('OSIPersonnelEquipmentController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', '$timeout', '$ionicActionSheet', 'ionicDatePicker',
		function($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, $timeout, $ionicActionSheet, ionicDatePicker) {
            //上页传过来的数据
            $scope.data = new Object();
            //查询条件的时间集合
            $scope.date = new Object();
            $scope.$on('$ionicView.beforeEnter', function() {
				$scope.date = JSON.parse(JSON.stringify($stateParams.item.date));
				$scope.changeDateTime = function(){
					if($stateParams.item.changeDateTime.apply($scope.date, arguments))
						$scope.reload();
				};
				$scope.data = $stateParams.item.data;
				$scope.reload();
			});
			//分页页码
			$scope.pageIndex = 1;
			$scope.hasMore = true;
			//数据
			$scope.list = new Array();
			$scope.reload = function(){
				$scope.pageIndex = 1;
				$scope.list = new Array();
				$scope.getInspectStatisticalData();
			};

			//获取巡查统计数据
            $scope.getInspectStatisticalData = function () {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http
                    .post('ServiceName=InspectionService&TransName=getInspectStatisticalData', {
                        restrict: "equipment",
						pageIndex: $scope.pageIndex++,
						person_id: $scope.data.PERSON_ID,
                        startTime: $scope.date.personalStart,
                        endTime: $scope.date.personalEnd
                    })
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        
                        if(res.data.list.length != 10){
                            $scope.hasMore = false;
                        }

                        $scope.list = $scope.list.concat(res.data.list.map(function(v, i){
                            v.percentage = Math.round(v.PLAN_INSPECTED/(v.PLAN_INSPECT == 0 ? 1 : v.PLAN_INSPECT) * 1000) / 10;
                            return v;
                        }));
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
			}
			
            //巡查记录视图
            $scope.openRecord = function(data) {
				data.PERSON_ID = $scope.data.PERSON_ID;
				data.PERSON_NAME = $scope.data.PERSON_NAME;
				data.ORG_NAME = $scope.data.ORG_NAME;
				data.date = {
                    startDate: $scope.date.personalStart,
                    endDate:$scope.date.personalEnd
                };
                $state.go('OSI/OSIHistory', {item: {autoOperation: "personnel", data: data}});
			};
		}
	]);