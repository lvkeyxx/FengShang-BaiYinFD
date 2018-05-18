angular.module('BaiYin.common.httpBaseUrlSupport', [
    'ionic',
    'BaiYin.app.config'
])

.config(['$provide', 'intranetUri', 'outerNetUri', function($provide, intranetUri, outerNetUri) {
    function combineUrl(baseUrl, url) {
        while (url.indexOf('/') === 0) url = url.substring(1);
        if (token != null) {
            return baseUrl + url + '&SignToken=' + token.SignToken + '&UserID=' + token.UserID;
        } else {
            return baseUrl + url;
        }
    }

    //装饰者$http
    $provide.decorator('$http', ['$delegate', function($delegate) {
        var $http = $delegate;

        var wrapper = function() {
            return $http.apply($http, arguments);
        };

        Object.keys($http).filter(function(key) {
            return (typeof $http[key] === 'function');
        }).forEach(function(key) {
            wrapper[key] = function() {
                var url = arguments[0];
                // console.log("url==="+url);
                if (url.match('.tpl.html') || url.indexOf('http://') === 0) {
                    return $http[key].apply($http, arguments);
                } else if (localStorage.getItem('uri') != null) {
                    url = combineUrl(intranetUri, url);
                    arguments[0] = url;
                    if (token != null) {
                        arguments[0] = url+"&urlType=intra";
                    }
                    console.log("进入内网intranetUri==="+url);
                    return $http[key].apply($http, arguments);
                } else if (localStorage.getItem('uri') == null) {
                    url = combineUrl(outerNetUri, url);
                    arguments[0] = url;
                    if (token != null) {
                        arguments[0] = url+"&urlType=outer";
                    }
                    console.log("切入外网outerNetUri==="+url);
                    return $http[key].apply($http, arguments);
                }
            };
        });
        return wrapper;
    }]);
}])