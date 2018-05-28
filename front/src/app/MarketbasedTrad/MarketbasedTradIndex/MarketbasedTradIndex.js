angular.module('BaiYin.MarketbasedTradIndex', [
    'ionic',
])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('MarketbasedTradIndex', {
            url: '/MarketbasedTrad/MarketbasedTradIndex',
            controller: 'MarketbasedTradIndexController',
            templateUrl: 'MarketbasedTrad/MarketbasedTradIndex/MarketbasedTradIndex.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1']
        })
    }])
    .controller('MarketbasedTradIndexController', ['$interval', '$scope','$rootScope', '$http', 'showAlert', '$ionicTabsDelegate', '$ionicHistory', '$ionicPopup', '$state', 'Session', '$ionicLoading','$ionicActionSheet','loadingAnimation',
        function ($interval, $scope,$rootScope, $http, showAlert, $ionicTabsDelegate, $ionicHistory, $ionicPopup, $state, Session, $ionicLoading,$ionicActionSheet,loadingAnimation) {

            $scope.$on('$ionicView.enter', function () {


            });
            $scope.$on('$ionicView.afterEnter', function () {
                $scope.getElecMarketNotice();
            });
            /*获取列表数据*/
            $scope.getElecMarketNotice=function (TITLE,CONTENT) {
                var parmas = {
                    TITLE:TITLE,
                    CONTENT:CONTENT
                }
                loadingAnimation.showLoading('数据载入中', 'loding', 0);
                $http.post('ServiceName=ElecMarketService&&TransName=elecMarketNotice', parmas)
                    .then(function (res) {
                        loadingAnimation.hideLoading();
                        if (res.data.code == '0') {
                            console.log(res);
                            $scope.marketNoticeList=res.data.eList;
                            $(".MarketbasedShow").hide('slow');
                            $(".bg").hide('slow');
                        } else {
                            showAlert.showMsg('', '', res.data.msg);
                        }

                    }, function (error) {
                        loadingAnimation.hideLoading();
                        showAlert.showMsg(error, '', '网络异常,请检查网络', '确认')
                    });

            }
            $scope.goMarketbasedTradDetail=function (obj) {
                console.log(obj);
                var params = {
                    TITLE:obj.TITLE,
                    CONTENT:obj.CONTENT,
                    BILLING_CHARGE_PRICE:obj.BILLING_CHARGE_PRICE,
                    TRADE_NO:obj.TRADE_NO,
                }

                $state.go('MarketbasedTradDetail',params);
            }
            $scope.toMarketbasedSearch=function () {
                $(".bg").show();
                $(".MarketbasedShow").show('slow');
                $(".MarketbasedShow").css("display", "inline-block");
                $(".MarketbasedShow").css("width", "95%");
                $(".MarketbasedShow").css("right", "0");
                $(".MarketbasedShow").css("top", "-10px");
                $(".MarketbasedShow").css("position", "absolute");
                $(".MarketbasedShow").css("z-index", "999999");
            }
            $scope.noticeSearchSblist=function () {
                $scope.Noticenameid=$('#Noticenameid').val();
                $scope.Noticecontentid=$('#Noticecontentid').val();
                $scope.getElecMarketNotice($scope.Noticenameid,$scope.Noticecontentid)
            }






        }]);

