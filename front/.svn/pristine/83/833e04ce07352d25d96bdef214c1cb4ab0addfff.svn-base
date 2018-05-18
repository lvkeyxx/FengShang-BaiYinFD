angular.module('BaiYin.KPIdetail', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('KPIdetail', {
        url: '/KPIdetail',
        params: { 'items': null },
        controller: 'KPIdetailController',
        templateUrl: 'KPI/KPIdetail/KPIdetail.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('KPIdetailController', ['$scope', 'showAlert', 'pageInitService', '$stateParams', '$http', '$state', 'kpi_echarts',
    function($scope, showAlert, pageInitService, $stateParams, $http, $state, kpi_echarts) {
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
                'ServiceName=SDICIndexService&TransName=getIndexData&IndexID=' + $stateParams.items.indexId
            ];
            pageInitService.pageInit(apis).then(function(result) {
                resolveMessages = result[0];
                toDoRefresh(resolveMessages);
            }, function(error) {
                showAlert.showMsg(error, '', '网络异常', '确认')
            });
        });
        $scope.title = $stateParams.items.indexName;
        //进来默认第一个图表
        function toDoRefresh(resolveMessages) {
            var Arr = [];
            angular.forEach(resolveMessages.data, function(value, index) {
                Arr.push(index);
            });
            Arr.sort();
            $scope.data = Arr;
            if (Arr.length > 0) {
                kpi_echarts.kpiEcharts(resolveMessages.data[Arr[0]], 'main');
            } else if (resolveMessages.data && resolveMessages.data != null && !angular.equals({}, $scope.data)) {
                kpi_echarts.kpiEcharts(resolveMessages.data[Arr[0]], 'main');
            }
            //选择顶部tab
            $scope.seleteItem = function(val) {
                kpi_echarts.kpiEcharts(resolveMessages.data[val], 'main');
            }
        };
        $scope.doRefresh = function() {
            $http.get('ServiceName=SDICIndexService&TransName=getIndexData&IndexID=' + $stateParams.items.indexId)
                .then(function(res) {
                    resolveMessages = res;
                    $scope.$broadcast('scroll.refreshComplete');
                    toDoRefresh(resolveMessages);
                }, function(error) {
                    showAlert.showMsg(error, '', '网络异常', '确认')
                });
        };

    }
])
