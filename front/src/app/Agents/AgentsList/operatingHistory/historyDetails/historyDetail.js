angular.module('BaiYin.historyDetail', [])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('historyDetail', {
        url: '/historyDetail',
        params: { 'item': null },
        controller: 'historyDetailController',
        templateUrl: 'Agents/AgentsList/operatingHistory/historyDetails/historyDetail.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1'] //登录权限
    })
}])

.controller('historyDetailController', ['$scope','showAlert','pageInitService', '$timeout', '$ionicHistory', '$stateParams', '$http', '$ionicPopup', 
    function($scope,showAlert,pageInitService, $timeout, $ionicHistory, $stateParams, $http, $ionicPopup) {
      var valKey = $stateParams.item;
      $scope.$on('$ionicView.afterEnter', function() { 
        var apis = [
        'ServiceName=ApproveService&TransName=getDoneApprvedDetail&LogNo='+valKey.LOG_NO
        ];
        pageInitService.pageInit(apis).then(function(result) {
           agentViewMsg(result[0])
       }, function(error) {
        showAlert.showMsg(error,'','网络异常','确认')
    })
});
    $scope.doRefresh = function() {
            $http.get('ServiceName=ApproveService&TransName=getDoneApprvedDetail&LogNo='+valKey.LOG_NO)
            .then(function(res) {
             agentViewMsg(res)
             $scope.$broadcast('scroll.refreshComplete');
         }, function(error) {
            showAlert.showMsg(error,'','网络异常','确认')
       });
    };
    var displayFile = false;
    $scope.accessoryCont = function() {
            $scope.displayFile = !$scope.displayFile
        };
    function agentViewMsg(res){
           var str = {};
           str = res.data
           str.CREATED_DATE = new Date(str.CREATED_DATE)
           str.SUBMIT_DATE = new Date(str.SUBMIT_DATE)
           str.COMPLETED_DATE = new Date(str.COMPLETED_DATE)
           $scope.item = str
           
           if (str.ATTACHMENT == null || str.ATTACHMENT.length <= 0) {
            $scope.disFile = false
        } else {
            $scope.disFile = true
        }
    }


    $scope.openUrl = function(URL) {
        if (isApp) {
            MRUpdateVersion.updateVersion(function success() {}, function failed(message) {}, URL);
        }
    }
      var showAlertGo = function(title, template, okText) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                okText: okText,
                template: template
            });
            alertPopup.then(function(res) {
                 $ionicHistory.goBack();
            });
        };
   
  }
  ])