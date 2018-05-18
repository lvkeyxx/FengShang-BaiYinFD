angular.module('maxrocky.framework.directives.rem',[
])

.directive('mrRem',['$parse', '$filter', function($parse, $filter){

	return {
		restrict:'A',
		link: function(scope, element, attrs){
	    var _size = 50;
        var p = (document.body && document
            .body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) /375
       _size = p * 50; 
        document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _size + "px!important");
      
		}
	};
}])