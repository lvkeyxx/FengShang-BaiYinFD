angular.module('BaiYin.common.httpMockBaseUrlSupport', [
    'ionic',
    'ngMockE2E',
    'BaiYin.app.config'
])

.config(['$provide', 'intranetUri', 'outerNetUri', function($provide, intranetUri, outerNetUri) {
    function combineUrl(baseUrl, url) {
        while (url.indexOf('/') === 0) url = url.substring(1);
        if (token != null) {
            console.log(baseUrl + url + '&SignToken=' + token.SignToken + '&UserID=' + token.UserID);
            return baseUrl + url + '&SignToken=' + token.SignToken + '&UserID=' + token.UserID;
        } else {
            return baseUrl + url;
        }
    }

    //装饰者伪HTTP后台
    // $provide.decorator('$httpBackend', ['$delegate', function($delegate) {
    //     var $httpBackend = $delegate;
    //     var when = $httpBackend.when;
    //     $httpBackend.when = function() {
    //         var url = arguments[1];
    //         if (typeof url === 'string' && url.indexOf('http://') !== 0 && (url.indexOf('.tpl.html') === -1 || url.indexOf('.tpl.html') !== url.length - 9)) {
    //             if (localStorage.getItem('uri') == null) {
    //                 url = combineUrl(intranetUri, url);
    //                 arguments[1] = url;
    //             } else {
    //                 url = combineUrl(outerNetUri, url);
    //                 arguments[1] = url;
    //             }
    //             return when.apply($httpBackend, arguments);
    //         } else if (url instanceof RegExp && url.source.indexOf('http:\\/\\/') !== 0) {
    //             if (localStorage.getItem('uri') == null) {
    //                 url = new RegExp(combineUrl(intranetUri, url.source));
    //                 arguments[1] = url;
    //             } else {
    //                 url = new RegExp(combineUrl(outerNetUri, url.source));
    //                 arguments[1] = url;
    //             }
    //             return when.apply($httpBackend, arguments);
    //         } else {
    //             return when.apply($httpBackend, arguments);
    //         }
    //     }

    //     return $httpBackend;
    // }]);
}])