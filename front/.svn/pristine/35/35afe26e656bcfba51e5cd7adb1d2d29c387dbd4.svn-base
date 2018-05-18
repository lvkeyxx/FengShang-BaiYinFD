angular.module('BaiYin.Tracking', [])
.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('Tracking', {
        url: '/Tracking',
        controller: 'TrackingController',
        templateUrl: 'Problems/ProblemSolving/Tracking/Tracking.tpl.html',
        cache: 'false',
        authorizedRuleType: ['1']
    })
}])

.controller('TrackingController', ['$scope', 'showAlert', 'pageInitService', '$http', '$state',
    function($scope, showAlert, pageInitService, $http, $state) {
        $scope.$on('$ionicView.afterEnter', function() {
            var apis = [
            'ServiceName=ApproveService&TransName=getUnApprvedList'
            ];

            pageInitService.pageInit(apis).then(function(result) {
             $scope.listsMsg = result[0]
             agentListMsg($scope.listsMsg)
            
            $scope.agentsItem = function(item) {
                $state.go('agentsView')
                var ItemCont =JSON.stringify(item)
                sessionStorage.setItem("agentsVD", ItemCont); 
            }
        }, function(error) {
             showAlert.showMsg(error,'','网络异常','确认')
        });
            $scope.loadNumber=1;
            $scope.loadMore=function(){
             $scope.loadNumber+=1;
             $http.get( 'ServiceName=ApproveService&TransName=getUnApprvedList&PageNo=' + $scope.loadNumber)
             .then(function(res){
                 if(res.data.length>0){
                   for(var i=0;i<res.data.length;i++){
                    res.data[i].CREATED_DATE=new Date(res.data[i].CREATED_DATE.replace(/-/g,"/"));
                    $scope.items.push(res.data[i])  
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            }else if(res.data.length<=0||res.data==null||res.data==undefined){
             $scope.hasMore=false;
             $scope.$broadcast('scroll.infiniteScrollComplete');
         }
     }
     ,function(error){
       showAlert.showMsg(error,'','网络异常','确认')
         $scope.hasMore=false;
     })
         };
    });
        $scope.historySearch=function(){
             $state.go('historyList')
        }
        function agentListMsg(res){
         var str = [];
         var arr = {};
         for (var i = 0; i < res.data.length; i++) {
            arr = res.data[i]
            arr.CREATED_DATE = new Date(arr.CREATED_DATE.replace(/-/g,"/"))
            str.push(arr)
        }
        $scope.items = str;
         if($scope.items.length>=10&&$scope.items!=undefined&&$scope.items!=null){
                $scope.hasMore=true;
            }
    };
    $scope.doRefresh = function() {
        $http.get('ServiceName=ApproveService&TransName=getUnApprvedList')
        .then(function(res) {
            agentListMsg(res)
            $scope.$broadcast('scroll.refreshComplete');
            if(res.data.length==10){
               $scope.loadNumber=1;
               $scope.hasMore=true;
           }else{
            $scope.hasMore=false;
        }
    }, function(error) {
        $scope.hasMore=false;
        showAlert.showMsg(error,'','网络异常','确认')
})
    }

}
])