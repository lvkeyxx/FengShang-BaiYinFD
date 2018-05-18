angular.module('BaiYin.tabs.message.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    var data = [{
    }, ];

    var result = mocksData.resetData(data);
    // $httpBackend.whenGET('/report/reportList?type=户内&pageIndex=0&pageSize=10').respond(result);
    $httpBackend.whenGET(/\/AgriculturlWeb\/moneyApplication/).passThrough();

}])