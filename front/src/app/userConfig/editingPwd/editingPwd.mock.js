angular.module('BaiYin.editingPwd.mock',[
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend','mocksData',function($httpBackend,mocksData) {
    $httpBackend.whenPOST('/editUserPassword').passThrough();
}])
