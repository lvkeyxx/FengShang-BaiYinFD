angular.module('BaiYin.tabs.employeeAddress', [])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('employeeAddress', {
            url: '/employeeAddress',
            controller: 'employeeAddressController',
            templateUrl: 'tabs/companyAddressBook/employeeAddress/employeeAddress.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])

    .controller('employeeAddressController', ['$scope', 'pageInitService', '$state', '$http',
        function($scope, pageInitService, $state, $http) {
            var listUser = JSON.parse(localStorage.getItem('_titleUser_'));
            $scope.title = listUser.ORG_NAME;
            var apis = [
                'ServiceName=UserService&TransName=getAddressList&ORG_CODE=' + listUser.ORG_CODE
            ];
            pageInitService.pageInit(apis).then(function(result) {
                $scope.items = result[0].data;
                console.log(JSON.stringify(result[0].data))

            }, function(error) {
                console.log(error);
            })
            $scope.addressDetail = function(item) {
                sessionStorage.setItem("_xiangQing_", JSON.stringify(item));
                $state.go('addressDetail');

            }
        }
    ])