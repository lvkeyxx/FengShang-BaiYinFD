angular.module('BaiYin.pm.defectFill.defectFill', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/defectFill/defectFill', {
            url: '/pm/defectFill/defectFill',
            controller: 'defectFillController',
            templateUrl: 'pm/defectFill/defectFill/defectFill.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('defectFillController', ['$scope', 'showAlert', '$http', '$state', 'loadingAnimation', 'pageInitService', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', '$ionicActionSheet',
        function ($scope, showAlert, $http, $state, loadingAnimation, pageInitService, $ionicScrollDelegate, $ionicSlideBoxDelegate, $ionicActionSheet) {
            //通知域选择滚动框的宽度
            $scope.yuWidth = {width: '' + screen.width - 130 + 'px'};
            var dianchanglist = [];
            var yunum;
            $scope.statusValue = '';
            $scope.yuValue = '';
            $scope.$on('$ionicView.afterEnter', function () {
                $ionicScrollDelegate.scrollTop()
                $ionicSlideBoxDelegate.next();
            });
            $scope.statusColor = function (status) {
                var c = "";
                if ('A类缺陷' == status) {
                    c = '#3492e9';
                }
                if ('B类缺陷' == status) {
                    c = '#33cd5f';
                }
                if ('C类缺陷' == status) {
                    c = '#ff0000';
                }
                return {"background": c};
            };
            //查找域列表
            $http.post('ServiceName=TargetService&TransName=listCompanySiteAddress&type=sel')
                .then(function (res) {
                    if (res.code == '0') {
                        $scope.yuList = res.data;
                        dianchanglist.push({text: '全部', CONTRACT: ''});
                        for (var i = 0; i < $scope.yuList.length; i++) {
                            var dlist = {};
                            dlist.text = $scope.yuList[i].DESCRIPTION;
                            dlist.CONTRACT = $scope.yuList[i].CONTRACT;
                            dianchanglist.push(dlist);
                        }
                    } else {
                        showAlert.showMsg(res.msg);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });
            //域选择
            $scope.toSelectYu = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: dianchanglist,
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitYu = dianchanglist[index].text;
                        yunum = dianchanglist[index].CONTRACT;
                        $("#defectYuId").val(commitYu);
                        return true;
                    }
                });
            };
            var buttons = [
                {text: '全部'},
                {text: '新建'},
                {text: '接收'},
                {text: '确认'},
                {text: '取消'},
                {text: '取消中'},
                {text: '已遗留'},
                {text: '工作完成'},
                {text: '生成工作票'},
                {text: '缺陷已消除'}
            ];
            //状态选择
            $scope.toSelectStatus = function () {
                var hideSheet = $ionicActionSheet.show({
                        buttons: buttons,
                        cancel: function () {
                            // add cancel code..
                        }
                        ,
                        buttonClicked: function (index) {
                            console.log("index==" + index);
                            $scope.statusValue = buttons[index].text;
                            $("#statusid").val($scope.statusValue);
                            return true;
                        }
                    })
                ;
            };
            $scope.onDragDown = function () {
                //清空
                //$("input").val('');
                $(".troubleTop").show('slow');
            }
            //点击添加隐患排查
            $scope.addTrouble = function () {
                $state.go('pm/defectFill/adddefectFill');
            }
            //点击跳转到详情页面
            $scope.toDetail = function (item) {
                console.log(item);
                $state.go('pm/defectFill/defectFillDetail', {item: item});
            }
            $scope.hasMore = false;
            $scope.number = 1;
            $scope.loadMore = function () {
                if ($scope.statusValue == '全部') {
                    $scope.statusValue='';
                }
                if(yunum == undefined){
                    yunum='';
                }
                console.log("状态==="+$scope.statusValue+"/域=="+yunum);
                $scope.number += 1;
                var params = {
                    STATE: $scope.statusValue,
                    CONTRACT: yunum
                }
                $http.post('ServiceName=DefectManageService&TransName=listFaultRepMain&PageCnt=10&PageNo=' + $scope.number, params)
                    .then(function (result) {
                        loadingAnimation.hideLoading();
                        console.log(result)
                        $scope.defectArr1 = result.data.hList;
                        for (var i = 0; i < $scope.defectArr1.length; i++) {
                            $scope.defectArr.push($scope.defectArr1[i]);
                        }
                        if ($scope.defectArr.length < 10) {
                            $scope.hasMore = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            $scope.searchDefect = function () {
                //清空查询列表
                $scope.defectArr = [];
                if ($scope.statusValue == '全部') {
                    $scope.statusValue='';
                }
                if(yunum == undefined){
                    yunum='';
                }
                //如果状态是全部，则为空
                console.log("状态==="+$scope.statusValue+"/域=="+yunum);
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $scope.hasMore = false;
                var params = {
                    STATE: $scope.statusValue,
                    CONTRACT: yunum
                }
                $http.post("ServiceName=DefectManageService&TransName=listFaultRepMain&PageNo=1&PageCnt=10", params)
                    .then(function (result) {
                        loadingAnimation.hideLoading();
                        $scope.defectArr = result.data.hList;
                        $scope.listShow = true;
                        $(".troubleTop").hide('slow');
                        if (result.data.hList.length >= 10) {
                            $scope.hasMore = true;
                        }
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    })
            }
        }
    ])
