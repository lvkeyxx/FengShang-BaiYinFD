angular.module('BaiYin.common.httpTransform', [
    'ionic',
    'BaiYin.app.config'
])

.config(['$httpProvider', function($httpProvider) {
    //注册拦截器
    $httpProvider.interceptors.push('commonResponseParser');
    $httpProvider.defaults.withCredentials = true;
    //设置跨域访问
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; //设置请求头
}])

.factory('commonResponseParser', ['$q', 'HTTP_COMMON_ERROR_MESSAGE_INTRANET', 'HTTP_COMMON_ERROR_MESSAGE_OUTERNET', '$rootScope', function($q, HTTP_COMMON_ERROR_MESSAGE_INTRANET, HTTP_COMMON_ERROR_MESSAGE_OUTERNET, $rootScope) {
    return {
        response: function(response) {
            if (!!response.config.url.match('.tpl.html'))
                return response;
            if (response.data && response.data.code === '0' || response.data.code === 0) {
                return response.data;
            } else if (response.data.msg) {
                if (response.data.code == 0999 || response.data.code == '0999') {
                    $rootScope.$broadcast('tokenBug', [response.data.msg]);
                } else {
                    return $q.reject({
                        code: response.data.code,
                        msg: response.data.msg,
                        status: response.status,
                        headers: response.headers
                    });
                }
            } else {
                return $q.reject(response);
            }
        },
        responseError: function(rejection) {
            if (localStorage.getItem('uri') != null) {
                return $q.reject(HTTP_COMMON_ERROR_MESSAGE_INTRANET);
            } else {
                return $q.reject(HTTP_COMMON_ERROR_MESSAGE_OUTERNET);
            }
        },
        requestError: function(rejection) {
            // do something on error
            if (canRecover(rejection)) {
                return responseOrNewPromise
            }
            return $q.reject(rejection);
        }
    };
}])