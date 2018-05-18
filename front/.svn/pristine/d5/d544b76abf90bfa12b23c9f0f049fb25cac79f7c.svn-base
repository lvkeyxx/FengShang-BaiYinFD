angular.module('BaiYin.pm.trouble.hideTrouble', [
    'ionic',
    'ngAnimate',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('pm/trouble/hideTrouble', {
            url: '/pm/trouble/hideTrouble',
            controller: 'hideTroubleController',
            templateUrl: 'pm/trouble/hideTrouble/hideTrouble.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])

    .controller('hideTroubleController', ['$scope', 'showAlert', '$http', '$state', 'loadingAnimation', '$ionicActionSheet',
        function ($scope, showAlert, $http, $state, loadingAnimation, $ionicActionSheet) {
            //$scope.myTrouble = true;

            $scope.$on('$ionicView.afterEnter', function () {
                // showAlert.showMsg("隐患排查页面");
                // var kycz=localStorage.getItem("trouble_detail_back")||'';
                if (!localStorage.getItem("trouble_detail_back")) {
                    $(".searchTrouble").show('slow');
                    $scope.troubleList = [];
                }
                localStorage.removeItem("trouble_detail_back");
            });


            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#start_date', //标签id
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                'minDate': (new Date().getFullYear() - 10) + '-' + 1 + '-' + 1, //最小日期
                'maxDate': (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()) //最大日期
            });
            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#end_date', //标签id
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                'minDate': (new Date().getFullYear() - 10) + '-' + 1 + '-' + 1, //最小日期
                'maxDate': (new Date().getFullYear()) + '-' + (new Date().getMonth() + 1) + '-' + (new Date().getDate()) //最大日期
            });
            $scope.onDragDown = function () {
                //$scope.myTrouble = false;
                //清空
                emptyInput();
                $(".searchTrouble").show('slow');
            }
            $scope.setColor = function (status) {
                var c = "";
                if ('一般隐患' == status) {
                    c = '#3492e9';
                } else {
                    c = '#ff0000';
                }
                return {"color": c};
            };
            $scope.setbgColor = function (status) {
                var c = "";
                if ('一般隐患' == status) {
                    c = '#3492e9';
                } else {
                    c = '#ff0000';
                }
                return {"background": c};
            };
            var dianchanglist = [];
            var stustList = [{"text": "全部"}, {"text": "开始整改"}, {"text": "确认"}, {"text": "审批中"}, {"text": "完成"}, {"text": "新建"}, {"text": "准备整改"}];
            var yhdjList = [];
            var commitYu = '';
            var commitStuts = '';
            var commitYhdj = '';
            var yunum, yhdjnum;

            //获取电厂列表
            $http.post('ServiceName=TargetService&TransName=listCompanySiteAddress&type=sel')
                .then(function (res) {
                    if (res.code == '0') {
                        $scope.powerPlantList = res.data;
                        dianchanglist.push({text: '全部', CONTRACT: ''});
                        //console.log("powerPlantList==" + JSON.stringify(res.data));
                        for (var i = 0; i < $scope.powerPlantList.length; i++) {
                            var dlist = {};
                            dlist.text = $scope.powerPlantList[i].DESCRIPTION;
                            dlist.CONTRACT = $scope.powerPlantList[i].CONTRACT;
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
                        console.log("yunum==" + yunum);
                        $("#yuid").val(commitYu);
                        return true;
                    }
                });
            };
            //状态选择
            $scope.toSelectStuts = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: stustList,
                    //destructiveText: 'Delete',
                    /*titleText: '状态',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitStuts = stustList[index].text;
                        //console.log("stuts==" + yhdjnum);
                        $("#stutsid").val(commitStuts);
                        return true;
                    }
                });
            };

            //获取隐患等级
            $http.post('ServiceName=HiddenDangerService&TransName=listSehHiddenDangerLevel')
                .then(function (res) {
                    if (res.code == '0') {
                        $scope.yhdjList = res.data.hList;
                        yhdjList.push({text: '全部', HIDDEN_DANGER_LEVEL: ''});
                        for (var i = 0; i < $scope.yhdjList.length; i++) {
                            var ylist = {};
                            ylist.text = $scope.yhdjList[i].DESCRIPTION;
                            ylist.HIDDEN_DANGER_LEVEL = $scope.yhdjList[i].HIDDEN_DANGER_LEVEL;
                            yhdjList.push(ylist);
                        }

                    } else {
                        showAlert.showMsg(res.msg);
                    }
                }, function (error) {
                    showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                });

            //隐患等级
            $scope.toSelectYhdj = function () {
                var hideSheet = $ionicActionSheet.show({
                    buttons: yhdjList,
                    //destructiveText: 'Delete',
                    /*titleText: '隐患等级',
                    cancelText: '取消',*/
                    cancel: function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {
                        commitYhdj = yhdjList[index].text;
                        yhdjnum = yhdjList[index].HIDDEN_DANGER_LEVEL;
                        //console.log("yhdjnum===" + yhdjnum);
                        $("#yhdjid").val(commitYhdj);
                        return true;
                    }
                });
            };
            $scope.toCommit = function () {
                $scope.hasMore = false;
                if (validateComfirm()) {
                    troubleList();
                    $(".searchTrouble").hide('slow');
                    $(".troubleList").show('slow');
                } /*else {
                    showAlert.showMsg('', '', '请至少输入一个查询条件');
                }*/
            }
            //验证必须有个条件选择
            function validateComfirm() {
                if ($("#yuid").val() == '' && $("#stutsid").val() == '' && $("#start_date").val() == ''
                    && $("#end_date").val() == '' && $("#yhdjid").val() == '') {
                    showAlert.showMsg('', '', '请至少输入一个查询条件');
                    return false;
                }
                if($("#end_date").val() < $("#start_date").val()){
                    showAlert.showMsg('','','结束日期不能小于起始日期，请重新选择');
                    return false;
                }
                return true;
            }

            $scope.hasMore = false;
            $scope.number = 1;
            $scope.loadMore = function () {
                console.log("loadMore===");
                $scope.number += 1;
                var params = {
                    STATE: commitStuts,
                    DANGER_LEVEL: yhdjnum,
                    START_DATE: $("#start_date").val(),
                    END_DATE: $("#end_date").val(),
                    CONTRACT: yunum
                };
                $http.post('ServiceName=HiddenDangerService&TransName=listSehHiddenDanger&PageNo=' + $scope.number + "&PageCnt=10",params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        console.log(res)
                        $scope.troubleList1 = res.data.hList;
                        for (var i = 0; i < $scope.troubleList1.length; i++) {
                            $scope.troubleList.push($scope.troubleList1[i]);
                        }
                        if ($scope.troubleList1.length <10) {
                            $scope.hasMore = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            //查询隐患排查列表开始
            function troubleList() {
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                if (yunum == undefined) {
                    yunum = '';
                }
                if (yhdjnum == undefined) {
                    yhdjnum = '';
                }
                if (commitStuts == '全部') {
                    commitStuts = '';
                }
                $scope.hasMore = false;
                var params = {
                    STATE: commitStuts,
                    DANGER_LEVEL: yhdjnum,
                    START_DATE: $("#start_date").val(),
                    END_DATE: $("#end_date").val(),
                    CONTRACT: yunum
                };
                $http.post('ServiceName=HiddenDangerService&TransName=listSehHiddenDanger&PageNo=1&PageCnt=10',params)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.troubleList = res.data.hList;
                            if ($scope.troubleList.length >= 10) {
                                $scope.hasMore = true;
                            }
                        } else {
                            $scope.troubleList = [];
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }

            function emptyInput() {
                $("input").val('');
            }

            //点击添加隐患排查
            $scope.addTrouble = function () {
                $state.go('pm/trouble/addTrouble');
            }
            //点击跳转到详情页面
            $scope.toDetail = function (item) {
                localStorage.setItem("trouble_detail_back", "1");
                $state.go('pm/trouble/troubleDetail', {item: item});
            }
            /*$scope.goNewsDatil = function (item, gsxw, msg) {
                localStorage.setItem("newsId", ID);
                item.whichNew = ID;
                $state.go('companyNewsDetails', {'item': item, 'msg': $scope.gsxw})
            };*/
            //搜索框的宽度
            $scope.input_width = {width: '' + screen.width - 190 + 'px'};


        }

    ])
