angular.module('BaiYin.tabs.companyAddressBook', [
    'ionic'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('tabs/companyAddressBook', {
        url: '/tabs/companyAddressBook',
        controller: 'companyAddressBookController',
        templateUrl: 'tabs/companyAddressBook/companyAddressBook.tpl.html',
        cache: 'true',
        authorizedRuleType: ['1']
    })
}])

.controller('companyAddressBookController', ['$scope', 'pageInitService', '$http', '$state', '$ionicTabsDelegate',
    function($scope, pageInitService, $http, $state, $ionicTabsDelegate) {
        $scope.$on('$ionicView.enter', function() {
            $scope.currentTab = 'tabs/companyAddressBook';
            $ionicTabsDelegate.select(1);
        })
        var apis = [
            'ServiceName=UserService&TransName=getOrganiztionList',
            'ServiceName=UserService&TransName=getAllAddressInfo'
        ];
        pageInitService.pageInit(apis).then(function(result) {
            $scope.items = result[0].data;
            $scope.users=result[1].data;
        }, function(error) {
            console.log(error)
        });
        $scope.addressList = function(item) {
            $state.go('employeeAddress');
            localStorage.setItem('_titleUser_', JSON.stringify(item))
        }
         $scope.listMsgShow=true;
        $scope.userMsgShow=false;
       $scope.toChange=function(changeNum){
            if(changeNum.length>0){
                $scope.listMsgShow=false;
                $scope.userMsgShow=true;
            }else if(changeNum.length<=0){
                $scope.listMsgShow=true;
                $scope.userMsgShow=false;
            }
       }
       $scope.userMsg = function(item) {
             console.log(item);
                $state.go('addressDetail');
                sessionStorage.setItem("_xiangQing_", JSON.stringify(item));
            }
       
    }
])