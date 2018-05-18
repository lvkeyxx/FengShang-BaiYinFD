angular.module('BaiYin.editingUserInfo.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenPOST('/editUserinfo').passThrough();
}])