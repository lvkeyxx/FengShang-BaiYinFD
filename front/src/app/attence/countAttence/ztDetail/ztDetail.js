angular.module('BaiYin.attence.countAttence.ztDetail', [
    'ionic'
])

    .config(['$stateProvider', 'ionicDatePickerProvider', function ($stateProvider, ionicDatePickerProvider) {
        $stateProvider.state('attence/countAttence/ztDetail', {
            url: '/attence/countAttence/ztDetail',
            controller: 'ztDetailController',
            templateUrl: 'attence/countAttence/ztDetail/ztDetail.tpl.html',
            cache: 'true',
            authorizedRuleType: ['1'],
            params: {item: null}
        })
    }])
    .controller('ztDetailController', ['$timeout', '$scope', 'showAlert', 'loadingAnimation', '$http', '$state',

        function ($timeout, $scope, showAlert, loadingAnimation, $http, $state) {
            $scope.$on('$ionicView.enter', function () {

            });
        }
    ])
