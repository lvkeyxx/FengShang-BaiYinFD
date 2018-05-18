angular.module('BaiYin.tabs.homePage.mock', [
    'ngMockE2E',
    'BaiYin.common.mocksData'
])

.run(['$httpBackend', 'mocksData', function($httpBackend, mocksData) {
    // var data = {
    //     handImage: '../images/homePage/index1.png', //图片列表
    //     companyImg: [{
    //         src: '../images/homePage/newscenter.png'
    //     }, {
    //         src: '../images/homePage/companyNews.png'
    //     }, {
    //         src: '../images/homePage/Notice.png'
    //     }]
    // };

    //打包使用数据
    var data = {
        handImage: 'file:///android_asset/www/images/homePage/banner.png', //图片列表
        companyImg: //图标列表
            [{
            src: 'file:///android_asset/www/images/homePage/newsCenter.png'
        }, {
            src: 'file:///android_asset/www/images/homePage/companyNews.png'
        }, {
            src: 'file:///android_asset/www/images/homePage/Notice.png'
        }],
    };

    var result = mocksData.resetData(data);
    // $httpBackend.whenPOST(/\/getApplys/).passThrough();

    $httpBackend.whenGET(/\?getApplys/).respond(result);
    // $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenGET('ServiceName=CMSService&TransName=getContentDetail&UserID=IFSAPP&SignToken=99cdad8d4b1c9149f64b6ead21f9275d1a94534ece24e405331b28a6eca92cb4&ID=10').passThrough();
}])