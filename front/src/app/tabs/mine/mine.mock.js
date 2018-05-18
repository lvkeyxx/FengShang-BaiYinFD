angular.module('BaiYin.tabs.mine.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = {
        src: '../images/tabs/mine/banner_home.png'
    };

    var result = mocksData.resetData(data);
    // $httpBackend.whenPOST(/\/getApplys/).passThrough();
    $httpBackend.whenGET(/.*/).passThrough();
}])