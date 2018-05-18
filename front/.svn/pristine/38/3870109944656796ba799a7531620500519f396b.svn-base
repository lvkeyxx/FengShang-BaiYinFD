angular.module('BaiYin.Leaves', [
        'BaiYin.Leaves.mock'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('Leaves', {
            url: '/Leaves',
            controller: 'LeavesController',
            templateUrl: 'AllLeave/Leaves.tpl.html',
            cache: 'false',
            authorizedRuleType: ['1']
        })
    }])
    .controller('LeavesController', ['$scope', '$http', '$state',
        function($scope, $http, $state) {
            $scope.goLeaves = function(res) {
                if (res == 1) {
                    $state.go("LeavesList");
                } else {
                    $state.go("VacationList");
                };
            };
        }
    ])