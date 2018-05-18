var app = angular.module('BaiYin.News', [
    'ionic'
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('News', {
            url: '/News',
            controller: 'NewsController',
            templateUrl: 'News/News.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('NewsController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state', '$interval', '$ionicTabsDelegate', '$stateParams',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state, $interval, $ionicTabsDelegate, $stateParams) {
            var id = $stateParams.item;
            $scope.$on('$ionicView.afterEnter', function () {
                var localid = localStorage.getItem('id');
                console.log("id==" + id + "缓存localid==" + localid);
                $scope.title = '';
                if (id == null && localid != null) {
                    id = localid;
                }
                if (id != localid && localid != null) {
                    id = localid;
                }
                //获取标题名称
                if (id == 7) {
                    $scope.title = '公司新闻'
                }
                if (id == 31) {
                    $scope.title = '通知公告'
                }
                if (id == 32) {
                    $scope.title = '公司发文'
                }
                getNews(id);
            });
            $scope.$on('$ionicView.afterEnter', function () {
                localStorage.removeItem("id");
            });
            //列表文字显示的宽度
            $scope.newslistLi = {width: '' + screen.width - 110 + 'px'};

            //获取列表
            function getNews(id) {
                $scope.hasMore = false;
                loadingAnimation.showLoading('加载中...', 'loding', 0);
                $http.post('ServiceName=CMSService&TransName=getContentlList&PageNo=1&ID=' + id + '&PageCnt=10')
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.newslist = res.data;
                        //console.log("res==" + JSON.stringify(res.data));
                        for (var i = 0; i < $scope.newslist.length; i++) {
                            $scope.newslist[i].PUBDATE = new Date($scope.newslist[i].PUBDATE.replace(/-/g, "/"));
                        }
                        if ($scope.newslist.length >= 10) {
                            $scope.hasMore = true;
                        } else {
                            $scope.newslist = [];
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            };
            //加载更多
            $scope.hasMore = false;
            $scope.number = 1;
            $scope.loadMore = function () {
                $scope.number += 1;
                console.log("loadMore===" + "$scope.number==" + $scope.number);
                $http.post('ServiceName=CMSService&TransName=getContentlList&ID=7&PageNo=' + $scope.number + "&PageCnt=10")
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        $scope.newslist1 = res.data;
                        for (var i = 0; i < $scope.newslist1.length; i++) {
                            $scope.newslist1[i].PUBDATE = new Date($scope.newslist1[i].PUBDATE.replace(/-/g, "/"));
                            $scope.newslist.push($scope.newslist1[i]);
                        }
                        if ($scope.newslist.length < 10) {
                            $scope.hasMore = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function (error) {
                        loadingAnimation.hideLoading();
                        $scope.hasMore = false;
                        showAlert.showMsg(error, '', '网络异常', '确认')
                    })
            }
            $scope.toDetail = function (item) {
                localStorage.setItem('id', id);
                $state.go('companyNewsDetails', {'item': item, 'msg': $scope.gsxw})
            }
        }

    ])
