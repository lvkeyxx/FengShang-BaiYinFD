angular.module('BaiYin.newLeaves.mock', [
        'ngMockE2E', 'BaiYin.common.mocksData'
    ])
    .run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
        var data = {

        }
        var result = mocksData.resetData(data);
        $httpBackend.whenGET(/.*/).passThrough();
    }]);