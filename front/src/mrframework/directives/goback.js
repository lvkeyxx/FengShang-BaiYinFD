angular.module('maxrocky.framework.directives.goback',[
])

.directive('mrGoBack',['$ionicHistory','$parse', '$filter', function($ionicHistory,$parse, $filter){
	return {
		restrict:'C',
		link: function(scope, element, attrs){
            element.on('click',function(){
             	$ionicHistory.goBack();
            });
		}
	};
}])