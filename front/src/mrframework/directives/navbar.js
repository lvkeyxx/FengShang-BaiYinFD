angular.module('maxrocky.framework.directives.navBar',[
])

.directive('mrNavBar',['$parse', '$filter', function($parse, $filter){

	return {
		restrict:'C',
		scope:{
			opacity:"="
		},
		link: function(scope, element, attrs){
			scope.$watch('opacity',function(newValue){
				newValue=newValue||0;
				element.css('opacity',newValue);
			})
		}
	};
}])