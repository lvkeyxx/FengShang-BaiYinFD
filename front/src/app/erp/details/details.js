angular
	.module('BaiYin.erp.details', [
		'ionic',
		'BaiYin.erp.selectUser'
	])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider.state('erpDetails', {
			url: '/erp/details',
			controller: 'erpDetailsController',
			templateUrl: 'erp/details/details.tpl.html',
			cache: true,
			authorizedRuleType: ['1'],
			params: {item: null}
		})
	}])
	.controller('erpDetailsController', ['$timeout', '$filter', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams', '$ionicPopup', 'ionicDatePicker', '$ionicActionSheet', '$ionicScrollDelegate', '$ionicSlideBoxDelegate',
		function ($timeout, $filter, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams, $ionicPopup, ionicDatePicker, $ionicActionSheet, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
			//申请信息
			$scope.data = new Object();
			//显示类型
			$scope.showType = "";
			//标题
			$scope.title = "";
			$scope.typeIndex = 0;
			$scope.types = ["申请单", "申请详情", "文档", "审批流程"];
			//链接超时时间设置为20S
			var timeout = {timeout: 20 * 1000};
			//进入页面
			$scope.$on('$ionicView.enter', function (event, view) {
                if(view.direction == "forward"){
					$scope.data = $stateParams.item.data;
                    $scope.data.KEY_REF = encodeURIComponent($scope.data.KEY_REF);
					$scope.showType = $stateParams.item.type;
					$scope.title = $scope.data.LU_DESCRIPTION;
					getMainTable();
                }
			});

			//滑动切换
			$scope.slideHasChanged = function (index) {
				$scope.typeIndex = index;
			};

            //切换typeIndex
            $scope.changeTypeIndex = function(type){
				var index = $scope.types.indexOf(type);
				if(index != -1){
					$scope.typeIndex = index;
					$ionicSlideBoxDelegate.slide(index);
				}
			};
			var getSendData = function(){
				if(!$scope.data.opinion){
					throw "审批意见不可为空";
				}
				return {
					lu_name: $scope.data.LU_NAME || "",
					key_ref: $scope.data.KEY_REF || "",
					line_no: $scope.data.LINE_NO || "",
					step_no: $scope.data.STEP_NO || "",
					group_id: $scope.data.GROUP_ID || "",
					person_id: $scope.data.PERSON_ID || "",
					desc: $scope.data.opinion
				};
			};

			//同意
			$scope.toSelectUser = function () {
				var data = null;
				try{
                    if(!$scope.data.opinion){
                        $scope.data.opinion =  "同意.";
                    }
					data = getSendData();
				}catch(e){
					showAlert.showMsg("", "", e, "确认");
					return;
				}

				loadingAnimation.showLoading('加载中...', 'loding', 0);
				$http
                    .post("ServiceName=ErpService&TransName=startApprove", data, timeout)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if(res.data){
							showAlert.showMsg('', '', res.data, '确认');
                        }else{
							showAlert.showMsg("", "", "已通过", "确认");
							history.go(-1);
						}
                    }, function (error) {
						loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//拒绝
			$scope.toRefused = function () {
				var data = null;
				try{
					data = getSendData();
				}catch(e){
					showAlert.showMsg("", "", e, "确认");
					return;
				}

				loadingAnimation.showLoading('加载中...', 'loding', 0);
				$http
                    .post("ServiceName=ErpService&TransName=refuseApprove", data, timeout)
                    .then(function (res) {
						loadingAnimation.hideLoading();
						if(res.data){
							showAlert.showMsg('', '', res.data, '确认');
                        }else{
							showAlert.showMsg("", "", "已拒绝", "确认");
							history.go(-1);
						}
                    }, function (error) {
						loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//获取主子表主表
			$scope.MainTable = new Array();
			var getMainTable = function(){
				loadingAnimation.showLoading('加载中...', 'loding', 0);

                $http
                    .post("ServiceName=ErpService&TransName=getMainField",{
						logic_unit: $scope.data.LU_NAME,
						key_ref: $scope.data.KEY_REF
					}, timeout)
                    .then(function (res) {
                        getChildTable();
                        if(res.code == 0){
							$scope.MainTable = res.data;
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
						getChildTable();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//获取主子表子表
			$scope.ChildTable = new Array();
			var getChildTable = function(){
                $http
                    .post("ServiceName=ErpService&TransName=getChildField",{
						logic_unit: $scope.data.LU_NAME,
						key_ref: $scope.data.KEY_REF
					}, timeout)
                    .then(function (res) {
                        getDoc();
                        if(res.code == 0){
							$scope.ChildTable = res.data;
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
						getDoc();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//获取审批文档
			$scope.docList = new Array();
			var getDoc = function(){
                $http
                    .post("ServiceName=ErpService&TransName=getDoc", {
                        logic_unit: $scope.data.LU_NAME,
                        key_ref: $scope.data.KEY_REF
                    }, timeout)
                    .then(function (res) {
                        getStep();
                        if(res.code == 0){
							$scope.docList = res.data;
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
                        getStep();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//获取审批步骤
			$scope.step = {now: 0, list: new Array(), total: 0};
			var getStep = function(){
                $http
                    .post("ServiceName=ErpService&TransName=getStep", {
                        logic_unit: $scope.data.LU_NAME,
                        key_ref: $scope.data.KEY_REF
                    }, timeout)
                    .then(function (res) {
                        endLoad();
                        if(res.code == 0){
							$scope.step.total = res.data.total;
							$scope.step.list = res.data.list;
							$scope.step.list.forEach(v => {
								if(v.APP_SIGN && v.APP_DATE){
									$scope.step.now++;
								}
							});
                        }else{
                            showAlert.showMsg(res, '', '', '确认');
                        }
                    }, function (error) {
						endLoad();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认');
                    });
			};

			//加载数据结束
			var endLoad = function(){
				if($scope.ChildTable.length == 0){
					$scope.types.splice($scope.types.indexOf("申请详情"), 1);
				}
				if($scope.docList.length == 0){
					$scope.types.splice($scope.types.indexOf("文档"), 1);
				}
				$ionicSlideBoxDelegate.update();
				loadingAnimation.hideLoading();
			};
		}
	]);