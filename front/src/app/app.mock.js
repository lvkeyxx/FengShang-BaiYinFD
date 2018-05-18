angular.module('BaiYin.app.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    $httpBackend.whenGET('/workbench/staffVersion/1').passThrough();
    $httpBackend.whenGET('/workbench/staffVersion/2').passThrough();
}])