angular.module('BaiYin.login.mock', [
    'ngMockE2E', 'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenPOST(/.*/).passThrough();
}])