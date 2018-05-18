angular.module('BaiYin.common.savePopShowFrist', [])

.service('savePopShowFrist', [function() {
    this.popShowBlr = false;
    this.create = function(popShowBlr) {
        this.popShowBlr = popShowBlr;
    };
     this.destroy = function(popShowBlr) {
        this.popShowBlr = popShowBlr;
    };
    return this;
}])

.factory('SavePopShowFristService', ['savePopShowFrist', function(savePopShowFrist) {
    var savePopShowFristExample = {};

    savePopShowFristExample.setPopShowBlr = function(popShowBlr) {
        savePopShowFrist.create(popShowBlr);
    }

    savePopShowFristExample.getPopShowBlr = function() {
        return savePopShowFrist;
    };
    return savePopShowFristExample;
}])