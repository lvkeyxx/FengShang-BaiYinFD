angular.module('BaiYin.bulletinBoard.edit', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('bulletinBoard/edit', {
            url: '/bulletinBoard/edit',
            controller: 'editController',
            templateUrl: 'bulletinBoard/edit/edit.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {LINE_NO: null}
        })
    }])
    .controller('editController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams',
        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams) {
            $scope.$on('$ionicView.enter', function () {
                // //设置 textarea 的高度随着 内容 增加 自适应
                // $scope.textareaHeight = {height: '' + screen.height - 280 + 'px'};
                //$(".ggbbcontent").height($(".ggbbcontent")[0].scrollHeight);
                //$(".ggbbcontent").on("keyup keydown", function(){
                    //$(this).height(this.scrollHeight);
                //})
                /*$scope.textareaHeight = {height: '' +280 + 'px'};*/
            });
            $scope.$on('$ionicView.afterEnter', function () {
                boardDetail($stateParams.LINE_NO);
            });
            //返回
            $scope.toBack=function(){
                console.log("back===");
                history.back();
            };
            //编辑提交
            $scope.toEdit=function(){
                subEdit();
            };

            /**
             * 编辑提交
             */
            function subEdit(){
                console.log("$scope.sortid=="+$('#sortid').val());
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var param=$scope.detail;
                param.SORT=$('#sortid').val();
                param.NEWS_TITLE=$('#news_title_id').val();
                param.NEWS_CONTENT=$('#news_content_id').val();
                $http.post('ServiceName=WhiteBoardService&TransName=FunWhiteBoardNewspaper',param)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            showAlert.showMsg('','','功能内容提交成功！');
                            history.back();
                        } else {
                            showAlert.showMsg('','',res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
            //白板明细
            function boardDetail(line_no){
                console.log("line_no=="+line_no);
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                var param={LINE_NO:line_no};
                $http.post('ServiceName=WhiteBoardService&TransName=FormWhiteBoardNewspaper',param)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            $scope.detail = res.data.detail;
                            console.log("$scope.detail=="+JSON.stringify($scope.detail));
                            $("#sortid").val($scope.detail.SORT);
                            $("#news_title_id").val($scope.detail.NEWS_TITLE);
                            $("#news_content_id").val($scope.detail.NEWS_CONTENT);
                            //获取textarea编辑框字数
                            var content_len=$scope.detail.NEWS_CONTENT.length;
                            console.log(content_len);
                            if(content_len>=300){
                                $scope.textareaHeight = {height: '' + 200+ 'px'};
                            }else if(content_len<=20){
                                $scope.textareaHeight = {height: '' + 200+ 'px'};
                            }else{
                                $scope.textareaHeight = {height: '' + 200+ 'px'};
                            }
                        } else {
                            showAlert.showMsg(res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });
            }
        }
    ])
