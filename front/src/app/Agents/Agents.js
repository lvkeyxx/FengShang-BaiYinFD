angular.module('BaiYin.Agents', [
    'BaiYin.Agents.mock'
])

.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('Agents', {
        url: '/Agents',
        controller: 'AgentsController',
        templateUrl: 'Agents/Agents.tpl.html',
        cache: 'false',
        resolve: {
            resolvedData: ['$http', function($http) {
                return $http.get('ServiceName=ApproveService&TransName=getUnApprvedList');
            }]
        },
        authorizedRuleType: ['1']
    })
}])

.controller('AgentsController', ['$scope', '$http', 'resolvedData', '$state',
    function($scope, $http, resolvedData, $state) {
        $scope.listLength = resolvedData.data.length
        $scope.erpAgents = function() {
            $state.go('AgentsList', {})
        }
    }
])